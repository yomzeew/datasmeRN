import { TextInput,View,Image, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity,StyleSheet,Platform } from "react-native"
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import axios from "axios";
import { signup } from "./services/endpoints";
import { validateEmail, validateFullName, validatePhoneNumber, validatePin, validateUsername } from "./services/validations";
import Checkbox from 'expo-checkbox';
import Preloadertwo from "./preloadertwo";
import ThanksModal from "./modals/ThanksRegModal";
import { fieldtextfour, fieldtextone, fieldtexttwo } from "./services/textsetting";
import { SafeAreaView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import * as LocalAuthentication from 'expo-local-authentication'
import AsyncStorage from "@react-native-async-storage/async-storage";



const RegisterPage=({navigation})=>{
    const [showpass,setshowpass]=useState(true)
    const [showpin,setshowpin]=useState(true)
    const [errormessage,seterrormessage]=useState('')
    const [fullname,setfullname]=useState('')
    const [email,setemail]=useState('')
    const [username,setusername]=useState('')
    const [phoneno,setphoneno]=useState('')
    const [password,setpassword]=useState('')
    const [pin,setpin]=useState('')
    const [isChecked, setChecked] = useState(false);
    const [preloader,setpreloader]=useState(false)
    const [showmodal,setshowmodal]=useState(false)
    const [Enroll,setEnroll]=useState(false)
    const [IsBiometricSupported,setIsBiometricSupported]=useState(false)
    const checkbiometric=async()=>{
        const compatible = await LocalAuthentication.hasHardwareAsync();
        return setIsBiometricSupported(compatible);

    }
    useEffect(()=>{
        checkbiometric()

    },[])

    const handlelogin=()=>{
        navigation.navigate('login')
    }
    const showpassword=()=>{
        setshowpass(!showpass)

    }
    const handleshowpin=()=>{
        setshowpin(!showpin)
        

    }
    const submitSignup=async ()=>{
        // const db=await SQLite.openDatabaseAsync('dbtable')
        setpreloader(true)
        if(!fullname){
            seterrormessage('Full Name Field is empty')
            setpreloader(false)
            return
        }
        if(!email){
            seterrormessage('Email Field is empty')
            setpreloader(false)
            return
        }
        if(!username){
            seterrormessage('Username Field is empty')
            setpreloader(false)
            return
        }
        if(!phoneno){
            seterrormessage('Phone Number Field is empty')
            setpreloader(false)
            return
        }
        if(!password){
            seterrormessage('Password Field is empty')
            setpreloader(false)
            return
        }
        if(!pin){
            seterrormessage('Pin Field is empty')
            setpreloader(false)
            return
        }
        if(!validateFullName(fullname)){
            seterrormessage('Invalid Full Name e.g John Doe')
            setpreloader(false)
            return
        }
        if(!validateUsername(username)){
            seterrormessage('Username is less than 6 Characters')
            setpreloader(false)
            return 
        }
        if(!validateEmail(email)){
            seterrormessage('Invalid Email')
            setpreloader(false)
            return
        }
        if(!validatePhoneNumber(phoneno)){
            seterrormessage('Invalid Phone Number')
            setpreloader(false)
            return 
        }
        if (!validatePin){
            seterrormessage('Invalid Pin')
            setpreloader(false)
            return 
        }
        try{
            const data={
            username :username,
            fullName : fullname,
            email : email,
            phoneNumber : phoneno,
            agree : isChecked,
            pin : pin,
            password : password
  }
            const response=await axios.post(signup,data)

            const datares=response.data.status
            if(datares===200){
                const passdata={email:email,password:password,status:Enroll}
               await AsyncStorage.setItem('passdata',JSON.stringify(passdata))
               await AsyncStorage.setItem('devicestatus',JSON.stringify(true))
                    setshowmodal(true);
                
            }

        }catch(error){
            console.log(error)
            const errormsg=error.response.data
            const errmsg=errormsg.errors[0].msg
            seterrormessage(errmsg.toString())
            console.log(errormsg.errors[0].msg)
        }  finally{
            
            setpreloader(false)

        }      
    

    }
    const handleclose=(value)=>{
        setshowmodal(value)

    }
    
    return(
        <SafeAreaView style={styles.andriod}  className="flex-1 flex w-screen bg-blue-500">
            <StatusBar style="dark" />
           {showmodal &&<View className="absolute z-50 w-full items-center top-60">
            <ThanksModal
            closefunc={(value)=>handleclose(value)}
            />
            </View>
           
            }
           <View className="">
        
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            

        >
            <ScrollView
             showsVerticalScrollIndicator={false} 
            >

            <View className=" w-full h-1/6">
                <View className="items-center">
                <Image source={require('./images/loginpage.png')} className="w-32 h-32" resizeMode="contain" />
                </View>
            </View>
            <View className="w-full rounded-t-3xl  items-center flex justify-center bg-white pb-10">
            <View className="mt-10" >
                    <Text className={`text-blue-950 ${fieldtextfour} font-semibold`}>Create Account</Text>
                </View>
            <View className="items-center flex flex-rrow mt-3">
              <Text className="text-blue-500 text-lg">I have account</Text>
            <TouchableOpacity onPress={handlelogin} className="px-2">
              <Text className="text-blue-900 text-lg font-bold">Login</Text>
            </TouchableOpacity>
            
            </View>
    
           
            <View className="mt-0">
                <View className="items-center w-64"><Text className="text-red-500 text-lg">{errormessage}</Text></View>
                <Text className={fieldtextone}>Full Name</Text>
                <TextInput 
                className="h-12 w-80 border bg-white text-lg rounded-2xl px-2"
                onChangeText={(text)=>setfullname(text)}
                 />
            </View>
            <View className="mt-3">
                <Text className={fieldtextone}>Username</Text>
                <TextInput 
                onChangeText={(text)=>setusername(text)}
                className="h-12 w-80 border bg-white text-lg rounded-2xl px-2" />
            </View>
            <View className="mt-3">
                <Text className={fieldtextone}>Email Address</Text>
                <TextInput 
                onChangeText={(text)=>setemail(text)}
                className="h-12 w-80 border bg-white text-lg rounded-2xl px-2" />
            </View>
            <View className="mt-3">
                <Text className={fieldtextone}>Phone Number</Text>
                <TextInput 
                keyboardType="numeric"
                onChangeText={(text)=>setphoneno(text)}
                className="h-12 w-80 border bg-white rounded-2xl px-2 text-lg" />
            </View>
            <View className="mt-3">
            <Text className={fieldtextone}>Password</Text>
            <View className="w-80">
            <View className="absolute right-3 top-4 z-50">
                <TouchableOpacity onPress={showpassword}> 
                    <FontAwesome5 name="eye-slash" size={20} color="black" />
                </TouchableOpacity>
               
            </View>
                <TextInput 
                secureTextEntry={showpass}
                onChangeText={(text)=>setpassword(text)}
                className="h-12 w-full border bg-white rounded-2xl px-2 text-lg"
                />
            </View>
            </View> 
            <View className="mt-5">
            <Text className={fieldtextone}>Pin</Text>
            <View className="w-80">
            <View className="absolute right-3 top-4 z-50">
            <TouchableOpacity onPress={handleshowpin}> 
                    <FontAwesome5 name="eye-slash" size={20} color="black" />
                </TouchableOpacity>
            </View>
                <TextInput
                keyboardType='numeric'
                onChangeText={(text)=>setpin(text)}
                secureTextEntry={showpin} 
                className="h-12 w-full border bg-white rounded-2xl px-2 text-lg"
                />

            </View>
           
            </View>
            <View className="mt-3 flex flex-row justify-center items-center ">
                <Text className={`${fieldtextone} font-bold`}>
                    I have agree to terms and condition 
                </Text>
                <Checkbox
          style={styles.checkbox}
          className="rounded-lg"
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#4630EB' : undefined}
        />
            </View>
            <TouchableOpacity onPress={submitSignup} className="bg-blue-600 w-80 mt-3 items-center h-12 flex justify-center rounded-2xl">
                {!preloader?<Text className={`text-cyan-300 ${fieldtexttwo}  font-bold`}>Submit</Text>:<Preloadertwo/>}
            </TouchableOpacity>
           
            </View>
            </ScrollView>
            </KeyboardAvoidingView>
        
        </View> 
        </SafeAreaView>
        
    )
}
export default RegisterPage

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