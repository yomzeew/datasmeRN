import { SafeAreaView,View,TouchableOpacity,Text,ScrollView,Keyboard,StyleSheet,Platform,TextInput,KeyboardAvoidingView } from "react-native"
import { fieldtextone, fieldtexttwo } from "../services/textsetting"
import { useEffect, useState } from "react"
import {AntDesign,Octicons,FontAwesome5} from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native"
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isLessThanOneHour } from "../services/expireTimestamp"
import { getProductData } from "../services/getdatas"
import { validateEmail } from "../services/validations"
import PinModal from "../modals/PinModal"
import Header from "./header"
import Preloadertwo from "../preloadertwo"
import ConfirmationPage from "../modals/ConfirmationPage"
const ElectricScreen=()=>{
    const navigation=useNavigation()
    const [hkey, sethkey] = useState('flex-1')
    const [getdata, setdata] = useState([])
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const [showdiscodata,setshowdiscodata]=useState(false)
    const [showdiscodatatwo,setshowdiscodatatwo]=useState(false)
    const [discotype,setdiscotype]=useState('')
    const [gettoken, settoken] = useState('')
    const [disconame,setdisconame]=useState('')
    const [meternumber,setmeternumber]=useState('')
    const [amount,setamount]=useState('')
    const [email,setemail]=useState('')
    const [datasend,setdatasend]=useState('')
    const [errormessage,seterrormessage]=useState('')
    const[showpin,setshowpin]=useState(false)
    const [dataservices,setdataservices]=useState([])
    const [Loader,setloader]=useState(true)
    const[showConf,setshowConf]=useState(false)
    const discotypedata=['Prepaid Meter','Postpaid Meter']
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
            const mydataall = await getProductData('elec', mytokenreal)
            setdata(mydataall)
            console.log(mydataall)
            //get disco
            const mydataarray=mydataall.data
            let getService=[]
            for (let i = 0; i < mydataarray.length; i++) {
                const element = mydataarray[i].serviceText;
                getService.push(element)
                
            }
            setdataservices(getService)

            }catch(error){

            }finally{
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
    const translateY = useSharedValue(300);
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardStatus(true);
            sethkey('h-80')
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardStatus(false);
            sethkey('flex-1')
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);
    const handleshowdisco=()=>{
        console.log('ok')
        translateY.value=withSpring(0)
        setshowdiscodata(true)
    }
    const translateYtype = useSharedValue(300);
    const animatedStylestype = useAnimatedStyle(() => ({
        transform: [{ translateY: translateYtype.value }],
    }));

    const handleshowdiscotype=()=>{
        translateYtype.value=withSpring(0)
        setshowdiscodatatwo(true)
    }
    const handleclose=()=>{
        translateY.value=withSpring(300)
        setshowdiscodata(false)

    }
    const handleclosetwo=()=>{
        translateY.value=withSpring(300)
        setshowdiscodatatwo(false)

    }
    const handlemeter=(text)=>{
      setmeternumber(text)
    }
   const handleamount=(text)=>{
    setamount(text)
   }
    const handleemail=(text)=>{
        setemail(text)
    }
    const handleselect=(i)=>{
        setdisconame(dataservices[i])
        translateY.value=withSpring(300)
        setshowdiscodata(false)



    }
    const handleselecttype=(i)=>{
        setdiscotype(discotypedata[i])
        translateYtype.value=withSpring(300)
        setshowdiscodatatwo(false)



    }
    const translateYpin= useSharedValue(300);
    const handlesubmit=()=>{
        if(validateEmail(email)===false){
            seterrormessage('Email Invalid')
          return
        }
        if(!disconame){
            seterrormessage('Select your Disco')
        }
        if(!meternumber){
            seterrormessage('Enter Meter Number')
        }
        const getdiscoarray=getdata.data
        const getdiscosidarray=getdiscoarray.filter((item)=>(
            item.serviceText.toLowerCase()===disconame.toLowerCase()
        ))
        const ServiceID=getdiscosidarray[0].serviceId
        const datato={serviceID:ServiceID,meterNumber:meternumber,email:email,amount:amount}
        setdatasend(datato)
        translateYpin.value=withSpring(0)
        handleConfshow()
        
       
        
    }
   
const animatedStylespin = useAnimatedStyle(() => ({
    transform: [{ translateY: translateYpin.value }],
}));
    const handleclosepin=(value)=>{
        setshowpin(value)
        translateYpin.value=withSpring(300)

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
    return(
        <View className="h-full">
              {Loader &&
                <View className="bg-slate-400 h-full w-full absolute z-50 opacity-70 flex justify-center items-center">
                <Preloadertwo/>
                </View>
                }
             <SafeAreaView style={styles.andriod} className="flex-1 w-screen h-full bg-slate-50">
                    {showdiscodata &&
                    <View className="absolute bottom-0 z-50 h-auto py-10">
                        <Animated.View style={[animatedStyles]}>
                            <View className="w-screen h-full bg-white px-2">
                            <View className="items-end py-2">
                            <TouchableOpacity  onPress={handleclose} className="">
                            <FontAwesome5 name="times-circle" color="navy" size={30} />
                                </TouchableOpacity>
                            </View>
                               {dataservices.length>0 &&dataservices.map((item,index)=>(
                                 <View key={index} className="">
                                    <TouchableOpacity onPress={()=>handleselect(index)} className="bg-slate-100 px-5 h-12 flex justify-center w-full border-b border-t border-blue-200 mt-2"><Text className={`${fieldtextone} text-blue-900 font-bold`}>{item.toUpperCase()}</Text></TouchableOpacity>
                                   
                                 </View>
                               ))}

                            </View>

                      </Animated.View>
                    </View>}
                    {showdiscodatatwo &&
                    <View className="absolute bottom-0 z-50 h-auto py-10 ">
                        <Animated.View style={[animatedStylestype]}>
                            <View className="w-screen h-full bg-white px-4">
                            <View className="items-end py-2">
                            <TouchableOpacity  onPress={handleclosetwo} className="">
                            <FontAwesome5 name="times-circle" color="navy" size={30} />
                                </TouchableOpacity>
                            </View>
                               {discotypedata.length>0 &&discotypedata.map((item,index)=>(
                                 <View key={index} className="">
                                    <TouchableOpacity onPress={()=>handleselecttype(index)} className="bg-slate-100 px-5 h-12 flex justify-center w-full border-b border-t border-blue-200 mt-2"><Text className={`${fieldtextone} text-blue-900 font-bold`}>{item.toUpperCase()}</Text></TouchableOpacity>
                                    <View className="border-b border-slate-300"/>
                                 </View>
                               ))}

                            </View>

                      </Animated.View>
                    </View>}
                     {showConf&&
            <View className="bottom-0 h-full absolute z-50  w-screen">
            <Animated.View  style={[animatedStylesConf]}>
            <ConfirmationPage
            alldata={''}
            beneficairyarray={''}
            senddata={datasend}
            close={(value) => handlecloseConf(value)}
            interfacePin={'electricity'}
            />

            </Animated.View>
            
            
        </View>

            }
                     {(showdiscodata|| showdiscodatatwo||showConf) && <View className="bg-slate-400 h-full w-full absolute z-40 opacity-70 flex justify-center items-center"></View>}
                    <Header
                    title={'Electricity Payment'}
                    />
                
                    <View className={`px-5 ${hkey}`}>
                        <ScrollView 
                        showsVerticalScrollIndicator={false} 
                        contentContainerStyle={{ flexGrow: 1 }}>
                            <Text className={`${fieldtextone} text-center text-red-500`}>{errormessage}</Text>
                        <View className="mt-5">
                        <Text className={fieldtextone}>Select Disco</Text>
                        <TouchableOpacity onPress={handleshowdisco}  className="h-16 w-full border rounded-xl bg-slate-100 border-slate-400 items-center justify-between flex flex-row px-3">
                            <Text className={fieldtextone}>{disconame?disconame.toUpperCase():'---'}</Text>
                           

                        </TouchableOpacity>

                    </View>
                    <View className="mt-5">
                        <Text className={fieldtextone}>Select Disco Type</Text>
                        <TouchableOpacity onPress={handleshowdiscotype}  className="h-16 w-full border rounded-xl bg-slate-100 border-slate-400 items-center justify-between flex flex-row px-3">
                            <Text className={fieldtextone}>{discotype?discotype:'---'}</Text>
                            

                        </TouchableOpacity>

                    </View>
                    <View className="mt-3">
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                                <View>
                                <Text className={`font-bold ${fieldtextone} text-slate-500`}>Enter Meter Number</Text>
                            <TextInput
                                className="bg-slate-100 border h-16 rounded-xl border-slate-400 px-3 text-lg"
                                onChangeText={(text) => { handlemeter(text) }}
                                keyboardType="numeric"
                            />

                                </View>
                                <View className="mt-5">
                                <Text className={`font-bold ${fieldtextone} text-slate-500`}>Amount</Text>
                            <TextInput
                                className="bg-slate-100 border h-16 rounded-xl border-slate-400 px-3 text-lg"
                                onChangeText={(text) => { handleamount(text) }}
                                keyboardType="numeric"
                            />

                                </View>
                                <View className="mt-5">
                                <Text className={`font-bold ${fieldtextone} text-slate-500`}>Receiver Email</Text>
                            <TextInput
                                className="bg-slate-100 border h-16 rounded-xl border-slate-400 px-3 text-lg"
                                onChangeText={(text) => { handleemail(text) }}
                                
                                keyboardType="email-address"
                            />
                                </View>
                            
                        </KeyboardAvoidingView>
                    </View>

                            <TouchableOpacity onPress={handlesubmit}  className="w-full bg-blue-500 items-center h-10 rounded-xl mt-3 flex justify-center">
                                    <Text className={`text-white ${fieldtextone}`}>CONTINUE</Text>
                                </TouchableOpacity>
        
                        </ScrollView>
                    </View>
        
        
                </SafeAreaView>

        </View>
               
            )
        
        
     

    
}
export default ElectricScreen

const styles = StyleSheet.create({
    checkbox: {
        marginTop: -5,
        width: 25,
        height: 25,
        marginHorizontal: 5
    },
    andriod: {
        paddingTop: Platform.OS === 'android' ? 20 : 0,

    },
});