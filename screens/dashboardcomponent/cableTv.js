import { SafeAreaView, View, TouchableOpacity, Text, ScrollView, Keyboard, StyleSheet, Platform, TextInput, KeyboardAvoidingView } from "react-native"
import { fieldtextone, fieldtexttwo } from "../services/textsetting"
import { useEffect, useState } from "react"
import { AntDesign, Octicons,FontAwesome } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native"
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import ExamData from '../services/ExamDataJson.json'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isLessThanOneHour } from "../services/expireTimestamp"
import { getProductData } from "../services/getdatas"
import { validateEmail } from "../services/validations"
import PinModal from "../modals/PinModal"
import { StatusBar } from "expo-status-bar";
import Preloadertwo from "../preloadertwo"
import Header from "./header"
import ConfirmationPage from "../modals/ConfirmationPage"
import { cabletvapi } from "../services/endpoints"
import axios from "axios"
import Preloader from "../preloader"
const CableTv = () => {
    const navigation = useNavigation()
    const [hkey, sethkey] = useState('flex-1')
    const [getdata, setdata] = useState([])
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const [gettoken, settoken] = useState('')
    const [errormessage, seterrormessage] = useState('')
    const [showpin, setshowpin] = useState(false)
    const [decoderdata, setdecoderdata] = useState([])
    const [plandata, setplandata] = useState([])
    const [showtv, setshowtv] = useState(false)
    const [showplan, setshowplan] = useState(false)
    const [loader,setloader]=useState(true)
    const [decodertext,setdecodertext]=useState('')
    const [plantext,setplantext]=useState('')
    const [decoderid,setdecoderid]=useState('')
    const [amount,setamount]=useState('')
    const [isDisable,setisDisable]=useState(false)
    const [decodernumber,setdecodernumber]=useState('')
    const [datasend,setdatasend]=useState([])
    const [dataplanarray,setdataplanarray]=useState([])
    const [showConf,setshowConf]=useState(false)
    const [decodername,setdecodername]=useState('')
    const [showiucloader,setshowiucloader]=useState(false)
   
    const functiongetExp = async () => {
        const getTime = await AsyncStorage.getItem('mytimestamp')
        const checktoken = isLessThanOneHour(parseInt(getTime, 10))
        if (checktoken === false) {
            navigation.navigate('login')

        }
        else {
            try{
                setloader(true)
                const mytoken = await AsyncStorage.getItem('mytoken')
                const mytokenreal = JSON.parse(mytoken)
                settoken(mytokenreal)
                const mydataall = await getProductData('cable', mytokenreal)
                setdata(mydataall)
                  // get the  decoder
                setdecoderdata(mydataall.decoder)
                setplandata(mydataall.plans)
               

            }catch(error){

            }
            finally{
                setloader(false)

            }

        }

    }
    useEffect(() => {
        functiongetExp();
    }, [])

    const handledashboard = () => {
        navigation.navigate('dashboard')

    }
    const translateYtv = useSharedValue(300);
    const animatedStylestv = useAnimatedStyle(() => ({
        transform: [{ translateY: translateYtv.value }],
    }));
    const handleshowtv = () => {
        console.log(decoderdata)
        translateYtv.value = withSpring(0)
        setshowtv(!showtv)
        setshowplan(false)
        setplantext('')

    }
    const handleclosetv = () => {
        setshowtv(false)
        translateYtv.value = withSpring(300)

    }
    const translateYplan = useSharedValue(300);
    const animatedStylesplan = useAnimatedStyle(() => ({
        transform: [{ translateY: translateYplan.value }],
    }));
    const handleshowplan = () => {
        translateYplan.value = withSpring(0)
        setshowplan(!showplan)
        console.log(decoderid)
        const getdata=plandata.length>0 &&plandata.filter((item)=>(
            item.categoryId===decoderid 
        ))
        console.log(getdata)
        
        setshowtv(false)

    }
    const handlecloseplan = () => {
        setshowplan(false)
        translateYplan.value = withSpring(300)

    }
    const handlepicktv=(decoderId,decoderText)=>{
        setdecoderid(decoderId),
        setdecodertext(decoderText);
        setshowtv(false)
        translateYtv.value = withSpring(300)
        setisDisable(true)
        

    }
    const handlepickplan=(amount,planText)=>{
       console.log(amount)
        setamount(amount);
        setplantext(planText);
        setshowplan(false)
        translateYplan.value = withSpring(300)

    }
    useEffect(()=>{
        if(plandata.length >0 && decoderid){
            const getdata=plandata.length>0 &&plandata.filter((item)=>(
                item.categoryId===decoderid 
            ))
            setdataplanarray(getdata)
    

        }

    },[decodertext])
    const translateYpin= useSharedValue(300);
    const handlesubmit=()=>{
        if(!decodertext){
            seterrormessage('Select Tvs')
          return
        }
        if(!plantext){
            seterrormessage('Select Plan')
            return
        }
         if (!isNaN( decodernumber.replace(/\s+/g, ""))) {
            console.log('ok')
          } else {
            seterrormessage('Decoder Number invalid')
            return

          }
          
        const getdata=plandata.length>0 &&plandata.filter((item)=>(
            item.categoryId===decoderid 
        ))
        
        const decodernumberspace = decodernumber.replace(/\s+/g, "");
        const changeStructure = {
            161:1000,
            162:2000,
            163:3000
           }
        const datato={
             serviceID : changeStructure[decoderid],
            decoderNumber :decodernumberspace,
            decoder : decoderid,
            decodername:decodername,
            decoderNumber:decodernumber,
            amount:amount}
        setdatasend(datato)
        handleConfshow()
       
       
        
    }
   
const animatedStylespin = useAnimatedStyle(() => ({
    transform: [{ translateY: translateYpin.value }],
}));
    const handleclosepin=(value)=>{
        setshowpin(value)
        translateYpin.value=withSpring(300)

    }
    const handledecodernumber=(text)=>{
        setshowiucloader(true)
        setdecodernumber(text)
        


    }
const translateYConf = useSharedValue(800);
const handleConfshow=()=>{
        translateYConf.value = withSpring(0);
        setshowConf(true)
        console.log('ok')
}
const animatedStylesConf = useAnimatedStyle(() => ({
    transform: [{ translateY: translateYConf.value }],
}));
const handlecloseConf=(value)=>{
    setshowConf(value)
    translateYConf.value=withSpring(-800)


}
const checkname=async()=>{
    const decodernumberspace = decodernumber.replace(/\s+/g, "");
    const changeStructure = {
        161:1000,
        162:2000,
        163:3000
       }
    const data= {
        debit : "wallet",
        request : {
        serviceID : changeStructure[decoderid],
        decoderNumber :decodernumberspace,
        decoder : decoderid
            }}
console.log(data)
try{
    const mytoken = await AsyncStorage.getItem('mytoken')
                const token= JSON.parse(mytoken)
    const response = await axios.post(cabletvapi,data, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
    setdecodername(response.data.succesfulOrder[0].response.name)
    
}
catch(error){

}finally{
    setshowiucloader(false)

}
}

    
useEffect(()=>{
    const getnamedecoder=()=>{
        if(decodernumber.length<10){
            return
        }
        else{
            checkname()
          
        }

    }
    getnamedecoder()
  

},[decodernumber])
    
    return (
        <View className="h-full bg-slate-50">   
            <StatusBar style="dark" />
            {loader &&
                <View className="bg-slate-400 h-full w-full absolute z-50 opacity-70 flex justify-center items-center">
                <Preloadertwo/>
                </View>
                }
           

                <SafeAreaView style={styles.andriod} className="flex-1  h-full bg-slate-50">
                {showtv &&
                <View className="absolute bottom-0 z-50  w-full px-2 py-3 h-auto bg-white  border border-slate-400 rounded-xl shadow-lg">
                    <Animated.View style={[animatedStylestv]}>
                        <View className="w-full h-full  bg-white px-4">
                            <View className="items-end">
                                <TouchableOpacity onPress={handleclosetv} className="">
                                    <FontAwesome name="times-circle" size={30} />
                                </TouchableOpacity>
                            </View>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {decoderdata.length>0 &&decoderdata.map((item,index)=>(
                                    <TouchableOpacity key={index} onPress={()=>handlepicktv(item.decoderId,item.decoderText)} className="bg-slate-100 px-5 h-12 flex justify-center w-full border-b border-t border-blue-200 mt-2">
                                        <Text className={`${fieldtextone} font-bold text-blue-900`}>
                                            {item.decoderText}
                                        </Text>
                                       

                                    </TouchableOpacity>
                                ))

                                }
                              

                            </ScrollView>


                        </View>

                    </Animated.View>
                </View>

            }
            {showplan &&
                <View className="absolute bottom-0 z-50 w-full px-2 py-3 h-2/3 bg-white  border border-slate-400 rounded-xl shadow-lg">
                    <Animated.View style={[animatedStylesplan]}>
                        <View className="w-full h-full  bg-white px-4">
                        <View className="items-end">
                                <TouchableOpacity onPress={handlecloseplan} className="">
                                    <FontAwesome name="times-circle" size={30} />
                                </TouchableOpacity>
                            </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                        {dataplanarray.length>0 &&dataplanarray.map((item,index)=>(
                                     <TouchableOpacity key={index} onPress={()=>handlepickplan(item.amount,item.planText)} className="bg-slate-100 px-5 h-12 flex justify-center w-full border-b border-t border-blue-200 mt-2">
                                        <Text className={`${fieldtextone} font-bold text-blue-900`}>
                                            {item.planText.toUpperCase()}
                                        </Text>
                                       

                                    </TouchableOpacity>


                                ))

                                }
                              

                            </ScrollView>
                        </View>

                    </Animated.View>
                </View>

            }
            
        {showConf&&
            <View className="bottom-0 h-full absolute z-50  w-screen">
            <Animated.View  style={[animatedStylesConf]}>
            <ConfirmationPage
            alldata={''}
            beneficairyarray={''}
            senddata={datasend}
            close={(value) => handlecloseConf(value)}
            interfacePin={'cable'}
            />

            </Animated.View>
            
            
        </View>

            }
             {(showtv || showplan || showConf) && <View className="bg-slate-400 h-full w-full absolute z-40 opacity-70 flex justify-center items-center"></View>}     
          
          <Header
          title={'Tv Subscription'}
          />


           <View className={`px-5 ${hkey}`}>
           
               <ScrollView
                   showsVerticalScrollIndicator={false}
                   contentContainerStyle={{ flexGrow: 1 }}>
                   <Text className={`${fieldtextone} text-center text-red-500`}>{errormessage}</Text>
                   <View className="mt-5 px-3">
                       <View>
                           <Text className={`${fieldtextone} text-blue-600`}>Tv</Text>
                           <TouchableOpacity onPress={handleshowtv} className="bg-slate-100 h-12 w-full border rounded-xl border-slate-400 items-center justify-between flex flex-row px-3">
                               <Text className={fieldtextone}>{decodertext?decodertext:'Select Tvs'}</Text>
                               

                           </TouchableOpacity>
                       </View>
                       <View className="mt-3">
                           <Text className={`${fieldtextone} text-blue-600`}>Plan</Text>
                           <TouchableOpacity onPress={isDisable?handleshowplan:null} className="bg-slate-100 h-12 w-full border rounded-xl border-slate-400 items-center justify-between flex flex-row px-3">
                               <Text className={fieldtextone}>{plantext?plantext.toUpperCase():'Select Plan'}</Text>

                           </TouchableOpacity>
                           <View className="mt-3">
                               <Text className={`${fieldtextone} text-blue-600`}>Amount</Text>
                               <View className="bg-slate-100 border border-slate-400 rounded-xl h-12 w-full flex justify-center px-2">
                                   <Text className={fieldtextone}>{amount===''?'--':'N'+amount}</Text>

                               </View>

                           </View>
                           <View className="mt-3  w-full">
                            <View className="h-16 bg-slate-100 w-full flex justify-center rounded-xl">
                            <Text className={`${fieldtexttwo} font-semibold text-center text-slate-400`}>{decodername?decodername:'Decoder Name'}</Text>
                            </View>
                               <Text className={` ${fieldtextone} text-blue-600`}>Decoder Number</Text>
                               <View>
                               {showiucloader &&<View className="h-12 absolute right-2 z-50 justify-center items-center flex">
                                <Preloader/>

                               </View>}
                           <TextInput
                               className="bg-slate-100 border h-12 rounded-xl border-slate-400 px-3 text-lg"
                               onChangeText={(text) => { handledecodernumber(text) }}
                               
                               keyboardType="numeric"
                           />

                               </View>
                               
                               </View>

                           <TouchableOpacity disabled={decodername===''?true:false} onPress={decodername?handlesubmit:null} className={`${decodername?'bg-regal-blue':'bg-blue-300'} w-full  items-center h-10 rounded-xl mt-3 flex justify-center`}>
                               <Text className={`text-white ${fieldtextone}`}>CONTINUE</Text>
                           </TouchableOpacity>


                       </View>

                   </View>


               </ScrollView>
           </View>

           
       </SafeAreaView>

        </View>
        
        
    )
}
export default CableTv
const styles = StyleSheet.create({
    checkbox: {
        marginTop: -5,
        width: 25,
        height: 25,
        marginHorizontal: 5
    },
    andriod: {
        paddingTop: Platform.OS === 'android' ? 30 : 0,

    },
});