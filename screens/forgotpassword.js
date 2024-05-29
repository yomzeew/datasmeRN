import {Image,Text,View,TouchableOpacity,StyleSheet,Platform,SafeAreaView,TextInput} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { fieldtextone } from './services/textsetting'
import { useState,useEffect } from 'react'
import Preloader from './preloader'
import Preloadertwo from './preloadertwo'
import { useNavigation } from '@react-navigation/native'
const ForgostPassword=()=>{
   const navigation=useNavigation()
    const [passcode,setpasscode]=useState('')
    const [preloader,setpreloader]=useState(true)
    const [seconds, setSeconds] = useState(30);
    useEffect(() => {
        let interval = null;
        if (seconds > 0) {
          interval = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
          }, 1000);
        } else if (seconds === 0) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [seconds]);
      const handlelogin=()=>{
        navigation.navigate('login')
      }
    const submitlogin=()=>{
        
    }
    return(
    <View className="h-full">
    
<SafeAreaView style={styles.andriod} className="flex-1 flex w-screen bg-blue-500 ">
   <StatusBar style="dark" />
  


   <View className="w-full h-1/6">
       <View className="items-center">
       <Image source={require('./images/loginpage.png')} className="w-32 h-32" resizeMode="contain" />
       </View>
   </View>
   <View className="w-full rounded-t-3xl items-center flex  bg-white flex-1">
   <View className="mt-20 " >
           <Text className="text-blue-950 text-2xl font-semibold text-center mb-3">Forgot Password</Text>
           <View className="items-center flex flex-row justify-center mb-5">
              <Text className="text-blue-500 text-lg">I have account</Text>
            <TouchableOpacity onPress={handlelogin} className="px-2">
              <Text className="text-blue-900 text-lg font-bold">Login</Text>
            </TouchableOpacity>
            
            </View>
           <View>
            <View className="absolute z-50 right-0 bg-blue-600 h-12 w-12 flex justify-center items-center rounded-r-xl"><Text className="text-white">{seconds}</Text></View>
        <TextInput 
                onChangeText={(text)=>setpasscode(text)}
                className="h-12 w-full border bg-white rounded-2xl px-2 text-lg"
                />
            </View>
          
            
            <TouchableOpacity onPress={submitlogin} className="bg-blue-600 w-80 mt-3 items-center h-12 flex justify-center rounded-2xl">
                <Text className={`text-cyan-300  ${fieldtextone} font-bold`}>{!preloader?<Preloadertwo/>:'Submit'}</Text>
            </TouchableOpacity>
    </View>
    
      

       
        
               
         
    
   
   </View>


</SafeAreaView>
</View>

)
}
export default ForgostPassword
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