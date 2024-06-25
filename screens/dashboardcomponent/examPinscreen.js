import { SafeAreaView,View,TouchableOpacity,Text,ScrollView,Keyboard,StyleSheet,Platform,TextInput,KeyboardAvoidingView } from "react-native"
import { fieldtextone, fieldtexttwo } from "../services/textsetting"
import { useEffect, useState } from "react"
import {AntDesign,Octicons,FontAwesome5} from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native"
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import ExamData from '../services/ExamDataJson.json'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isLessThanOneHour } from "../services/expireTimestamp"
import { getProductData } from "../services/getdatas"
import { validateEmail } from "../services/validations"
import PinModal from "../modals/PinModal"
import { StatusBar } from "expo-status-bar";
import Header from "./header"
import ConfirmationPage from "../modals/ConfirmationPage"
import Preloadertwo from "../preloadertwo"
const ExamPinScreen=()=>{
    const navigation=useNavigation()
    const [hkey, sethkey] = useState('flex-1')
    const [getdata, setdata] = useState([])
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const [showexamdata,setshowexamdata]=useState(false)
    const [gettoken, settoken] = useState('')
    const [examname,setexamname]=useState('')
    const [quatity,setquantity]=useState('')
    const [email,setemail]=useState('')
    const [datasend,setdatasend]=useState('')
    const [errormessage,seterrormessage]=useState('')
    const[showpin,setshowpin]=useState(false)
    const [showConf, setshowConf]=useState(false)
    const [loader,setloader]=useState(true)
    const [senddataforexam,setsenddataforexam]=useState('')
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
                const mydataall = await getProductData('exam', mytokenreal)
                setdata(mydataall)
                console.log(mydataall)
    

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
    const handleshowexam=()=>{
        console.log('ok')
        translateY.value=withSpring(0)
        setshowexamdata(true)
    }
    const handleclose=()=>{
        translateY.value=withSpring(300)
        setshowexamdata(false)

    }
    const handlequantity=(text)=>{
      setquantity(text)
    }
    const handleemail=(text)=>{
        setemail(text)
    }
    const handleselect=(i)=>{
        setexamname(ExamData[i].exam)
        translateY.value=withSpring(300)
        setshowexamdata(false)



    }
    const translateYpin= useSharedValue(300);
    const handlesubmit=()=>{
        if(validateEmail(email)===false){
            seterrormessage('Email Invalid')
          return
        }
        if(quatity!=='1'){
            seterrormessage('Quantity is more than one')
        }
        const getexamarray=getdata.exams
        const getexamidarray=getexamarray.filter((item)=>(
            item.examText.toLowerCase()===examname.toLowerCase()
        ))
        const ServiceID=getexamidarray[0].examId
        const datato={serviceID:ServiceID,quantity:quatity,email:email}
        const senddataforexam={examname:examname,email:email}
        setdatasend(datato)
        setsenddataforexam(senddataforexam)
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
    const handlecloseall=(value)=>{
        setshowConf(value)
        console.log('ok')
        setshowpin(value)
    }
    return(
        <View className="h-full">
            {loader &&
                <View className="bg-slate-400 h-full w-full absolute z-50 opacity-70 flex justify-center items-center">
                <Preloadertwo/>
              
                </View>
                }
            <SafeAreaView style={styles.andriod} className="flex-1 w-screen h-full bg-slate-50">
                     <StatusBar style="dark" />

                    {showexamdata &&
                    <View className="absolute bottom-0 w-full z-50 h-auto py-10 ">
                        <Animated.View style={[animatedStyles]}>
                            <View className="w-full h-full bg-white px-4">
                            <View className="items-end py-2">
                            <TouchableOpacity  onPress={handleclose} className="">
                            <FontAwesome5 name="times-circle" color="navy" size={30} />
                                </TouchableOpacity>
                            </View>
                               {ExamData.length>0 &&ExamData.map((item,index)=>(
                                 <View key={index} className="">
                                    <TouchableOpacity onPress={()=>handleselect(index)} className="bg-slate-100 px-5 h-12 flex justify-center w-full border-b border-t border-blue-200 mt-2"><Text className={`${fieldtexttwo} text-blue-900`}>{item.exam}</Text></TouchableOpacity>
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
            senddataforexam={senddataforexam}
            senddata={datasend}
            close={(value) => handlecloseConf(value)}
            interfacePin={'exam'}
            closeall={(value)=>handlecloseall(value)}
            />

            </Animated.View>
            
            
        </View>

            }
             {(showexamdata||showConf) && <View className="bg-slate-400 h-full w-full absolute z-40 opacity-70 flex justify-center items-center"></View>}
                   <Header
                   title={'Buy E-Pin Exam'}
                   />
        
                   
                    
                    <View className={`px-5 ${hkey}`}>
                        <ScrollView 
                        showsVerticalScrollIndicator={false} 
                        contentContainerStyle={{ flexGrow: 1 }}>
                            <Text className={`${fieldtextone} text-center text-red-500`}>{errormessage}</Text>
                        <View className="mt-5">
                        <Text className={fieldtextone}>Select Exam</Text>
                        <TouchableOpacity onPress={handleshowexam}  className="h-12 w-full border rounded-xl bg-slate-100 border-slate-400 items-center justify-between flex flex-row px-3">
                            <Text className={fieldtextone}>{examname?examname:'---'}</Text>
                            

                        </TouchableOpacity>

                    </View>
                    <View className="mt-3">
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                                <View>
                                <Text className={`font-bold ${fieldtextone} text-slate-500`}>Quantity(only one quantity at a time)</Text>
                            <TextInput
                                className="bg-slate-100 border h-12 rounded-xl border-slate-400 px-3 text-lg"
                                onChangeText={(text) => { handlequantity(text) }}
                                keyboardType="numeric"
                            />

                                </View>
                                <View className="mt-5">
                                <Text className={`font-bold ${fieldtextone} text-slate-500`}>Receiver Email</Text>
                            <TextInput
                                className="bg-slate-100 border h-12 rounded-xl border-slate-400 px-3 text-lg"
                                onChangeText={(text) => { handleemail(text) }}
                                
                                keyboardType="email-address"
                            />
                                </View>
                            
                        </KeyboardAvoidingView>
                    </View>

                            <TouchableOpacity onPress={handlesubmit}  className="w-full bg-regal-blue items-center h-10 rounded-xl mt-3 flex justify-center">
                                    <Text className={`text-white ${fieldtextone}`}>CONTINUE</Text>
                                </TouchableOpacity>
        
                        </ScrollView>
                    </View>
        
        
                </SafeAreaView>

        </View>
                
            )
        
        
     

    
}
export default ExamPinScreen

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