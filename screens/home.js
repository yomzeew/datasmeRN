import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import {View,Image,Text,StyleSheet,Platform,SafeAreaView} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
const logoImage = require('./images/logo.png');
import { StatusBar } from "expo-status-bar";

const Home=({navigation})=>{
    const isFocused=useIsFocused()
    const getDeviceStatus = async () => {
        const value = await AsyncStorage.getItem('devicestatus');
        const getStatus = JSON.parse(value);
        return getStatus; // Output: true or false
      };
      
      const goto = async () => {
        const status = await getDeviceStatus();
        if (status) {
          navigation.navigate('login');
        } else {
          navigation.navigate('slider');
        }
      };
      
      
    useEffect(()=>{
        if(isFocused){
            const mystart=setTimeout(()=>{
                goto()
    
            },3000)
            return () => clearTimeout(mystart);

        }
       

    },[isFocused])
    const properties=
        {bgcolor:'#D3F9F9',textlogo:'globalDATA',image:logoImage,resize:'contain', height:50, width:50,color:"#000000",fontsize:24,fontbold:'bold'}


   
        return(
        <SafeAreaView style={styles.andriod} className="flex-1 w-full justify-center flex bg-blue-500">
            <StatusBar style="dark" />
            <View className="flex-1 flex justify-center items-center ">
                <View className="">
               <View className="items-center">
                <Text className="text-white font-bold text-2xl">DatabaseSme</Text>
                </View>
            <View>
            <Text className="text-white text-xs" >Buy Data and Airtime with easy</Text>
            </View>
            </View>
            </View>
            <View className="mb-10">
                <Text className="text-sm text-center" >Powered by Datamaxs.com</Text>
            </View>

            



        </SafeAreaView>
    )
}
export default Home
const styles = StyleSheet.create({
    bgcolor:{
        backgroundColor:'#2C4545',
        
    },
    andriod: {
        paddingTop: Platform.OS === 'android' ? 20 : 0,

    },

   
  });