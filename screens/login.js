import { TextInput,View,Image, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity,Platform,StyleSheet,SafeAreaView,Alert} from "react-native"
import { Entypo,FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState,useCallback } from "react";
import { loginurl } from "./services/endpoints";
import Preloadertwo from "./preloadertwo";
import axios, { all } from'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fieldtextone, fieldtexttwo } from "./services/textsetting";
import { StatusBar } from 'expo-status-bar';
import * as LocalAuthentication from 'expo-local-authentication'
import { useFocusEffect } from "@react-navigation/native";
import { primaryColor } from "./services/colortheme";





const LoginPage=({navigation})=>{
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const [showpass,setshowpass]=useState(true)
    const [errormessage,seterrormessage]=useState('')
    const [preloader,setpreloader]=useState(true)
    const [isBiometricSupported, setIsBiometricSupported] =useState(false);
    const [Objectdata,setObjectdata]=useState('')
    const [Enroll,setEnroll]=useState(false)
    const [details,setdetails]=useState('')
    const [EnrollView,setEnrollView]=useState(false);
    const [Msg,setMsg]=useState('')
    const [statusf,setstatusf]=useState('')
    const checkbiometric=async()=>{
        const compatible = await LocalAuthentication.hasHardwareAsync();
        return setIsBiometricSupported(compatible);

    }
    useEffect(()=>{
        checkbiometric()

    },[])
    const getObjFunc=async()=>{
        try {
            const storedObject = await AsyncStorage.getItem('passdata');
            const myObject = JSON.parse(storedObject);
            console.log(myObject)
            setObjectdata(myObject)
            if (myObject) {
              setemail(myObject.email);
              setdetails(myObject);
              setstatusf(myObject.status)
            } else {
              setemail('');
              setdetails('');
              setstatusf('')
            }
          } catch (error) {
            console.error('Error parsing stored object:', error);
            setemail('');
            setdetails('');
          }
    }
    useFocusEffect(
        useCallback(()=>{
    
            getObjFunc()
        
        },[])
        

    )

   
   
       
           
       
   
 const  handlefingerprint= async () => {
    console.log(details)
    if(isBiometricSupported){
        try {
            if (details && details.status) {
               const emailSql = details.email;
               const passwordSql = details.password;
   
               const authResult = await LocalAuthentication.authenticateAsync();
   
              if (authResult.success) {
                  try {
                       const data = { email: emailSql, password: passwordSql };
                       const response = await axios.post(loginurl, data);
                       
                       if (response.status === 200) {
                           const token = response.data.token;
                           const timestamp = new Date().getTime();
                           
                           // Store timestamp and token
                           await AsyncStorage.setItem('mytimestamp', JSON.stringify(timestamp));
                           await AsyncStorage.setItem('mytoken', JSON.stringify(token));
                           await AsyncStorage.setItem('devicestatus',JSON.stringify(true))
                           
                           setpassword('');
                           navigation.navigate('dashboard');
                       } else {
                           console.log(response.data);
                      }
                    } catch (error) {
                       console.error(error);
                       const errData = error.response.data;
                       const errMsg = errData.errors[0].msg;
                       seterrormessage(errMsg);
                   } finally {
                       setpreloader(true);
                   }
               } else {
                   navigation.navigate('login');
               }
           } else {
               const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
                   setEnrollView(true)
                   setMsg( 'Enroll Your Fingerprint/FaceID in Dashboard,\n Please verify your identity with your password')

              
           }
    } catch (error) {
           console.error(error);
      }

    }else{
        setEnrollView(true)
        setMsg( 'Device is not Compatible with Biometics Login')

    }
       
     };
    
    const showpassword=()=>{
        setshowpass(!showpass)

    }
    const handleregister=()=>{
        navigation.navigate('register')
    }
    const submitlogin=async()=>{
        setpreloader(false)
        if(!email){
            seterrormessage('Email field is empty')
            return
        }
        if(!password){
            seterrormessage('Password field is empty')
        }
        try{
            const data={email:email,password:password}
            const response=await axios.post(loginurl,data)

            console.log(response.data)
            if(response.data.status===200){
                const token=response.data.token
                const gettimestamp=new Date().getTime();
                //store timestamp
                await AsyncStorage.setItem('mytimestamp',JSON.stringify(gettimestamp))
                if (!details||email!==details.email){
                    const passdata={email:email,password:password,status:false}
                await AsyncStorage.setItem('passdata',JSON.stringify(passdata))
                await AsyncStorage.setItem('devicestatus',JSON.stringify(true))
                console.log('ok')
                }
                
                AsyncStorage.setItem('mytoken',JSON.stringify(token))
                setpassword('')
                navigation.navigate('dashboard')

            }


        }catch(error){
            console.error(error)
            console.log(error.response.data)
            const errdata=error.response.data
            const err=errdata.errors[0].msg
            seterrormessage(err)

        }finally{
            setpreloader(true)

        }
    }
    const cancelHandle=()=>{
        setEnrollView(false)
    }
    const handleforgot=()=>{
        navigation.navigate('forgotpassword')
    }
    const handleshowemail=async()=>{
        await AsyncStorage.removeItem('passdata')
        setObjectdata('')
        setdetails('')
        setemail('')

    }

 
    return(
        <View className="h-full">
             {EnrollView &&<View className="h-full w-full absolute flex justify-center items-center z-50 ">
                     <View className="bg-slate-400 h-full w-full absolute opacity-70 flex justify-center items-center"/>
                        <View className="w-52 h-32 bg-slate-700 rounded-xl flex justify-center px-4">
                            <Text className="text-white border-b border-b-slate-200 py-3 text-center">{Msg}</Text>
                            <TouchableOpacity onPress={cancelHandle}><Text className="text-white font-bold py-3 text-center">OK</Text></TouchableOpacity>
                        </View>
                        </View>}
        <SafeAreaView style={styles.andriod} className="flex-1 flex w-screen bg-regal-blue ">
            <StatusBar style="dark" />
           
        <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ flexGrow: 1 }}
        >
   
            <View className="w-full h-1/6">
                <View className="items-center">
                <Image source={require('./images/loginpage.png')} className="w-32 h-32" resizeMode="contain" />
                </View>
            </View>
            <View className="w-full rounded-t-3xl  items-center flex justify-center bg-white flex-1">
            <View className="mt-5" >
                    <Text className="text-blue-950 text-4xl font-semibold">Sign In</Text>
                </View>
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}

        >
            <ScrollView className="mt-10" >
                <View className="items-center"><Text className="text-red-500 text-lg">{errormessage}</Text></View>
            {!Objectdata &&<View>
                <Text className={fieldtextone}>Email</Text>
                <TextInput 
                value={email}
                onChangeText={(text)=>setemail(text)}
                className="h-12 w-80 border bg-white text-lg rounded-2xl px-2" />
            </View>}
            <View className="mt-5">
            <Text className={fieldtextone}>Password</Text>
            <View className="w-80">
            <View className="absolute right-3 top-4 z-50">
                <TouchableOpacity onPress={showpassword}> 
                    <FontAwesome5 name="eye-slash" size={20} color="black" />
                </TouchableOpacity>
               
            </View>
                <TextInput 
                value={password}
                secureTextEntry={showpass}
                onChangeText={(text)=>setpassword(text)}
                className="h-12 w-full border bg-white rounded-2xl px-2 text-lg"
                />
            </View>
            </View> 
           
           <TouchableOpacity onPress={handlefingerprint} className="mt-3 flex flex-row">
            <Entypo name="fingerprint" size={30} color={primaryColor} />
                <Text className={`${fieldtextone} text-blue-700`}>  
                 Login with fingerprint
                </Text>
               
             
                </TouchableOpacity>
            
            <TouchableOpacity onPress={submitlogin} className="bg-regal-blue w-80 mt-3 items-center h-12 flex justify-center rounded-2xl">
                <Text className={`text-cyan-300  ${fieldtextone} font-bold`}>{!preloader?<Preloadertwo/>:'Login'}</Text>
            </TouchableOpacity>
            <View className="flex flex-row justify-between">
            <TouchableOpacity onPress={handleforgot} className="items-center mt-3">
              <Text className={`text-blue-900`}>Forgot your Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleshowemail} className="items-center mt-3">
              <Text className={`text-blue-900`}>Sign New User</Text>
            </TouchableOpacity>

            </View>
            
            <View className="items-center">
            <TouchableOpacity onPress={handleregister} className="items-center mt-3 border-b-2 border-blue-500 w-32">
              <Text className="text-blue-900 text-2xl font-bold">Register</Text>
            </TouchableOpacity>

            </View>
            

            </ScrollView>
            </KeyboardAvoidingView>
            </View>
        </ScrollView>

        </SafeAreaView>
        </View>
        
    )
}
export default LoginPage
const styles = StyleSheet.create({
    checkbox: {
      marginTop: -5,
      width:25,
      height:25,
      marginHorizontal:5
    },
    andriod: {
        paddingTop: Platform.OS === 'android' ? 20 : 0,

    },
  });