import { View,Text,Keyboard,TextInput,TouchableOpacity } from "react-native"
import { fieldtextone, fieldtexttwo } from "../services/textsetting"
import { AntDesign,Feather,FontAwesome5,MaterialIcons} from '@expo/vector-icons';
import { useRef, useState,useEffect} from "react"
import axios from "axios"
import { buydataurl } from "../services/endpoints"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Preloadertwo from "../preloadertwo"
import Statuspage from "./StatusPage";


const PinModal=({alldata,senddata,close,beneficairyarray,interfacePin,debitplatform,closeall})=>{
    const [hideinput,sethideinput]=useState(false)
    const [pin,setpin]=useState('')
    const [errormessage,seterrormessage]=useState('')
    const [messagestatus,setmessagestatus]=useState('')
    const [totalamount,settotalamount]=useState(null)
    const [Loader,setLoader]=useState(false)
    const [showstatus,setshowstatus]=useState(false)
    const numericKeys=[
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['.', '0', 'Del'],

    ]
    useEffect(()=>{
        console.log(beneficairyarray)
        if(interfacePin==='data'){
            let total=0
    
            for (let i = 0; i < beneficairyarray.length; i++) {
            const subplan = beneficairyarray[i].subplan
            const getamount= subplan.split('-')
            total=total+parseInt(getamount[1])
        }
        console.log(total)
            settotalamount(total)
    
        }
        else if(interfacePin==='airtime'){
            let total=0
            for (let i = 0; i < beneficairyarray.length; i++) {
                const amount= beneficairyarray[i].amount
                total=total+parseInt(amount)
            }
            console.log(total)
                settotalamount(total)
    
    
        }
        else if(interfacePin==='exam'){
    
        }
        else if(interfacePin==='cable'){
            settotalamount(senddata.amount)
    
        }
        else if(interfacePin==='electricity'){
            settotalamount(senddata.amount)
    

        }
    
    
      },[])
      const handleallclose=()=>{
       
        closeall(false)
        
        
      }
    const onPress=async(value)=>{
    if (!isNaN(value)) {
        if(pin.length<4){
          setpin((prev)=>prev+value)
        }
        console.log(pin)
    }
    else if(value==='Del'){
        setpin((prev)=>prev.slice(0, -1)); 
        console.log(pin)

    }
    else if(value==='.' &&pin.length===4){
        console.log(senddata)
    const token=JSON.parse(await AsyncStorage.getItem('mytoken'))
    const data={
        "pin" :pin,
        "debit" : debitplatform,
        "request":senddata
      }  
      console.log(data)
    try {
        setLoader(true)
   
        const response=await axios.post(buydataurl,data,{
            headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":'application/json'
        }
    })
    const succesfulOrder = response.data.succesfulOrder;
    const failedOrder = response.data.failedOrder;
    console.log(response.data)

    // failedOrder.forEach((f) => {
    //     const status = f.response.status;
    //     const message = f.response.message

    // })

    // succesfulOrder.forEach((e) => {
    //     console.log(e.response.message)
    //     const message = e.response.message || e.message;
    //     const status = e.response.status;
    // })

    if(interfacePin==='airtime'||interfacePin==='data'){
        if(failedOrder.length>0){
            console.log(failedOrder)
            failedOrder.forEach((f) => {
                const status = f.response.status;
                const message = f.response.message
                
            })

        }
 
    if(succesfulOrder.length>0){
        succesfulOrder.forEach((e) => {
            console.log(e.response.message)
            const message = e.response.message || e.message;
            const status = e.response.status;
        })

    }
    
    const getreasonfororderskip=response.data?.skippedOrder
    const getsuccessfullOrder=response.data?.succesfulOrder
    const getfailOrder=response.data?.failedOrder
    console.log(getfailOrder)
    console.log(getsuccessfullOrder)
   
    let getPlan=[]
     if(getreasonfororderskip.length>0 ){
        for (let i= 0; i < getreasonfororderskip.length; i++) {
           
                getPlan=beneficairyarray.filter((item)=>(
                    getreasonfororderskip[i].serviceID===item.serviceId
                ))
                const newArrayPlan=[...getPlan]
                newArrayPlan[i].reason=getreasonfororderskip[i].skippedReason  

             
      }
      console.log(getPlan)
      let errordisplay=''
            for (let k = 0; k < getPlan.length; k++) {
           
            const planget=interfacePin==='data'?'smeplan':'plan'
            const getplanplan=getPlan[k][planget]
           
                errordisplay=errordisplay+`${getplanplan} to this ${getPlan[k].beneficiary} (${getPlan[k].reason})\n`
            
           
                
            }
            setshowstatus(true)
            seterrormessage(errordisplay)
        
        
     }
     if(getsuccessfullOrder.length>0){
        setshowstatus(true)
        seterrormessage(getsuccessfullOrder[0]?.response?.message)
        setmessagestatus(getsuccessfullOrder[0]?.status)
        


     }
     if (getfailOrder.length>0){
        setshowstatus(true)
        seterrormessage(getfailOrder[0]?.response?.message)
        setmessagestatus(getfailOrder[0]?.status)
     }
    }
    else if(interfacePin==='exam'){
        const getreasonfororderskip=response.data?.skippedOrder
        const getsuccessfullOrder=response.data?.succesfulOrder
        const getfailOrder=response.data?.failedOrder
        if(getreasonfororderskip.length>0){
            let getreson=''
            for (let i = 0; i < getreasonfororderskip.length; i++) {
                const element = getreasonfororderskip[i].skippedReason+'\n';
                getreson=getreson+element
                
            }
            setshowstatus(true)
            seterrormessage(getreson)
          

        }
        if(getsuccessfullOrder.length>0){
            setshowstatus(true)
            seterrormessage(getsuccessfullOrder[0]?.response?.message)
            setmessagestatus(getsuccessfullOrder[0]?.status)
    
    
         }
         if (getfailOrder.length>0){
            setshowstatus(true)
            seterrormessage(getfailOrder[0]?.response?.message)
            setmessagestatus(getfailOrder[0]?.status)
         }
    }
    else if(interfacePin==='cable'){
        const getreasonfororderskip=response.data?.skippedOrder
    const getsuccessfullOrder=response.data?.succesfulOrder
    const getfailOrder=response.data?.failedOrder
        if(getreasonfororderskip.length>0){
            let getreson=''
            for (let i = 0; i < getreasonfororderskip.length; i++) {
                const element = getreasonfororderskip[i].skippedReason+'\n';
                getreson=getreson+element
                
            }
            setshowstatus(true)
            seterrormessage(getreson)
          

        }
        if(getsuccessfullOrder.length>0){
            setshowstatus(true)
            seterrormessage(getsuccessfullOrder[0]?.response?.message)
            setmessagestatus(getsuccessfullOrder[0].status)
    
    
         }
         if (getfailOrder.length>0){
            setshowstatus(true)
            seterrormessage(getfailOrder[0]?.response?.message)
            setmessagestatus(getfailOrder[0]?.status)
         }
        
    }
        else if(interfacePin==='electricity'){
            const getreasonfororderskip=response.data?.skippedOrder
            const getsuccessfullOrder=response.data?.succesfulOrder
            const getfailOrder=response.data?.failedOrder
            if(getreasonfororderskip.length>0){
                let getreson=''
                for (let i = 0; i < getreasonfororderskip.length; i++) {
                    const element = getreasonfororderskip[i].skippedReason+'\n';
                    getreson=getreson+element
                    
                }
                setshowstatus(true)
                seterrormessage(getreson)
              
    
            }
            if(getsuccessfullOrder.length>0){
                setshowstatus(true)
                seterrormessage(getsuccessfullOrder[0]?.response?.message)
                setmessagestatus(getsuccessfullOrder[0].status)
        
        
             }
             if (getfailOrder.length>0){
                setshowstatus(true)
                seterrormessage(getfailOrder[0]?.response?.message)
                setmessagestatus(getfailOrder[0]?.status)
             }
      

    }
    console.log('ok')
}
    
    catch(error){

        const errorMsg=error.response?.data ?? error.message ?? error.code
        setshowstatus(true)
        seterrormessage(errorMsg.msg)
    }
    finally{
        setLoader(false)
    }

    }

    }
    const handleclose=()=>{
        close(false)
      }
    const handlefuncclose=(value)=>{
        close(value)
        setshowstatus(value)
    }
    
    return(
        <View className=" bg-white  rounded-2xl h-full">
            {Loader &&<View className="bg-slate-400 h-full w-full absolute z-50 opacity-70 flex justify-center items-center">
                <Preloadertwo/>
            </View>}
            {showstatus &&<View className="absolute w-full h-full items-center z-50">
                {/* <Statuspage
                message={errormessage}
                messagestatus={messagestatus}
                close={(value)=>handlefuncclose(value)}
                closeall={(value)=>handleallclose(value)}
               
                /> */}
                <View className="h-full w-full flex bg-white rounded-xl items-center">
            {messagestatus==='successfull'?<View className="flex-1 justify-center px-5">
            <View className="items-center"><AntDesign name="check" size={100} color="#509DFF" /></View>
            <Text className={`${fieldtexttwo} font-bold text-center`}>Success</Text>
            <Text className={`${fieldtextone} text-center`}>{errormessage}</Text>
            
            <View className="mt-3 items-center">
                            <TouchableOpacity onPress={handleallclose} className="bg-blue-500 h-12 flex flex-row w-full items-center justify-center rounded-xl"><Text className={`${fieldtextone} text-white`}>Ok</Text></TouchableOpacity>
                            <TouchableOpacity className="bg-blue-700 h-12 flex flex-row w-full items-center justify-center rounded-xl mt-3"><Text className={`${fieldtextone} text-white`}>Share</Text><MaterialIcons name="share" size={24} color="white" /></TouchableOpacity>
            </View>

            

            </View>:
            <View className="flex-1 justify-center px-5 ">
             <View className="items-center"><FontAwesome5 name="times-circle" color="red" size={100} /></View>
             <Text className={`${fieldtexttwo} font-bold text-center`}>Failed</Text>
            <Text className={`${fieldtextone} text-center`}>{errormessage}</Text>
             <View className="mt-3 items-center">
                            <TouchableOpacity onPress={handleclose} className="bg-blue-500 h-12 flex flex-row w-full items-center justify-center rounded-xl"><Text className={`${fieldtextone} text-white`}>Try Again</Text></TouchableOpacity>
                           
            </View>

            </View>}
                </View>
                </View>}
            <View className=" mt-5 items-center">
            <View className="pb-5 border-b border-slate-200 items-end w-full px-2">
               <TouchableOpacity onPress={handleclose}><FontAwesome5 name="times-circle" color="navy" size={30} /></TouchableOpacity> 
                </View>
                <View><Text className={`text-2xl font-bold text-blue-600`}>Authorization</Text></View>
              
                <View>
                    <Text className={`${fieldtextone} text-red-500`}>{errormessage}</Text>
                </View>
            <View>
                    <Text className={`${fieldtextone} text-blue-900`}>{interfacePin!=='exam'?'Total Amount of Data: N'+totalamount:''}</Text>
                </View>
                <View className="flex flex-row justify-center gap-2 items-center mt-3">
                {[...Array(4)].map((_, index) => (
                    <View key={index} className={`h-12 w-12 rounded-xl ${pin.length>index?'bg-blue-600':'bg-white'}  items-center flex justify-center  border border-slate-300`}>
                        {hideinput ?<Text className="text-white">{pin[index]}</Text>:<Text className="text-white">{pin[index]&&'*'}</Text>}
                        </View>
                ))}
               {pin.length===4 &&<TouchableOpacity onPress={() => sethideinput((prev) => !prev)} style={{ marginLeft: 10 }}>
            <Feather name={hideinput ? "eye-off" : "eye"} size={24} color="black" />
          </TouchableOpacity>}
                    
                </View>
            
        <View className="mt-10 h-1/3 ">
        {numericKeys.map((row, rowIndex) => (
          <View key={rowIndex} className="flex gap-2 mt-2 flex-row justify-center">
            {row.map((key, index) => (
              <TouchableOpacity
                key={index}
                className="px-3 w-24 rounded-xl  h-12 items-center flex justify-center bg-white border border-slate-300"
                onPress={() => onPress(key)}
              >
                <Text className={`${fieldtextone}`}>{key==='.'?<AntDesign name="check" size={24} color="blue" />:key}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>


            </View>
        </View>


    )
}
export default PinModal