import { useEffect, useRef, useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { ScrollView } from "react-native"
import { fieldtextone, fieldtexttwo } from "../services/textsetting"
import { FontAwesome5} from "@expo/vector-icons"
import axios from "axios"
import { buydataurl } from "../services/endpoints"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Preloadertwo from "../preloadertwo"

const PinModaltwo=({alldata,senddata,close,beneficairyarray,interfacePin})=>{
  
    const [pinone,setpinone]=useState(null)
    const [pintwo,setpintwo]=useState(null)
    const [pinthree,setpinthree]=useState(null)
    const [pinfour,setpinfour]=useState(null)
    const [errormessage,seterrormessage]=useState('')
    const [totalamount,settotalamount]=useState(null)
    const [Loader,setLoader]=useState(false)
    const pin1Ref = useRef(null);
    const pin2Ref = useRef(null);
    const pin3Ref = useRef(null);
    const pin4Ref = useRef(null);
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
    else if(interfacePin==='electricity'){
        settotalamount(senddata.amount)

    }


  },[])

  const focusNextInput = (nextInputRef) => {
    nextInputRef.current.focus();
  };
  const handleclose=()=>{
    close(false)
  }
  const handlesubmit=async()=>{
    console.log(senddata)
    const token=JSON.parse(await AsyncStorage.getItem('mytoken'))
    const debitplatform="wallet"
    pin=pinone+pintwo+pinthree+pinfour
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
        }
    })
    if(interfacePin==='airtime'||interfacePin==='data'){
    const getreasonfororderskip=response.data.skippedOrder
    const getsuccessfullOrder=response.data.succesfulOrder
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
           
            seterrormessage(errordisplay)
        
        
     }
     if(getsuccessfullOrder.length>0){
        seterrormessage('Successful')


     }
    }
    else if(interfacePin==='exam'){
        console.log(response.data)
        const getreasonfororderskip=response.data.skippedOrder
        if(getreasonfororderskip.length>0){
            let getreson=''
            for (let i = 0; i < getreasonfororderskip.length; i++) {
                const element = getreasonfororderskip[i].skippedReason+'\n';
                getreson=getreson+element
                
            }
            seterrormessage(getreson)
          

        }
    }
        else if(interfacePin==='electricity'){
            console.log('ok')
            console.log(response.data)
            const getreasonfororderskip=response.data.skippedOrder
            if(getreasonfororderskip.length>0){
                let getreson=''
                for (let i = 0; i < getreasonfororderskip.length; i++) {
                    const element = getreasonfororderskip[i].skippedReason+'\n';
                    getreson=getreson+element
                    
                }
                seterrormessage(getreson)
              
    
            }
      

    }
    console.log('ok')
}
    
    catch(error){

        const errorMsg=error.response?.data ?? error.message ?? error.code
        seterrormessage(errorMsg.msg)
    }
    finally{
        setLoader(false)
    }



  
  }
  
    return(
        <View className="h-full bg-white rounded-2xl py-5 px-3">

            <View className="pb-5 border-b border-slate-200 flex flex-row justify-between">
                <Text className={fieldtexttwo}>Confirm Your Data</Text>
               <TouchableOpacity onPress={handleclose}><FontAwesome5 name="times-circle" color="navy" size={30} /></TouchableOpacity> 
                </View>
                <View>
                    <Text className={`${fieldtextone} text-red-500`}>{errormessage}</Text>
                </View>
                <View>
                    <Text className={`${fieldtextone} text-blue-900`}>{interfacePin!=='exam'?'Total Amount of Data: N'+totalamount:''}</Text>
                </View>
                <View className="mt-10 items-center">
                    <ScrollView
                    showsVerticalScrollIndicator={false} 
                    >
                    <View className="items-center"><Text className={fieldtexttwo}>Enter 4-digit PIN</Text></View>
                    <View className="flex flex-row gap-3">
                        <TextInput ref={pin1Ref} secureTextEntry keyboardType="numeric" maxLength={1}  className="w-12 first-letter:first-line: text-center h-12  border border-slate-300 rounded-xl"
                         onChangeText={(value) => {
                            if (value.length === 1) 
                            focusNextInput(pin2Ref);setpinone(value)

                          }}

                        />
                        <TextInput ref={pin2Ref}  secureTextEntry keyboardType="numeric" maxLength={1}  className="w-12 text-center h-12 first-letter:first-line:  border border-slate-300 rounded-xl"
                         onChangeText={(value) => {
                            if (value.length === 1) focusNextInput(pin3Ref);setpintwo(value);
                          }}
                        />
                        <TextInput ref={pin3Ref}  secureTextEntry keyboardType="numeric" maxLength={1}  className="w-12 text-center h-12 first-letter:first-line:   border border-slate-300 rounded-xl"
                         onChangeText={(value) => {
                            if (value.length === 1) focusNextInput(pin4Ref);setpinthree(value)
                          }}
                        />
                        <TextInput ref={pin4Ref}  secureTextEntry keyboardType="numeric" maxLength={1}  className="w-12 text-center h-12 first-letter:first-line:  border border-slate-300 rounded-xl"
                        onChangeText={(value) => {
                            if (value.length === 1) {
                                setpinfour(value)
                              // Optional: You can perform an action here when the last digit is entered
                            }
                          }}
                        
                        />
                        

                    </View>
                    </ScrollView>
                    <View className="mt-5">
                        <TouchableOpacity onPress={handlesubmit} className="w-64 bg-blue-500 items-center h-10 rounded-xl flex justify-center">
                            <Text className={`text-white ${fieldtextone}`}>{Loader?<Preloadertwo/>:'Send'}</Text>
                        </TouchableOpacity>

                    </View>
                </View>


        </View>
    )
}
export default PinModaltwo