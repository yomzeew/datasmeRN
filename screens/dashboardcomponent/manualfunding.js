import { FontAwesome5, AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { ScrollView, TextInput } from "react-native"
import { Text, SafeAreaView, TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, Button } from "react-native"
import { fieldtextone, fieldtextthree, fieldtexttwo } from "../services/textsetting"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isLessThanOneHour } from "../services/expireTimestamp"
import { getProductData } from "../services/getdatas"
import { StatusBar } from 'expo-status-bar';
import axios from "axios"
import { bankpreview, manualfunding } from "../services/endpoints"
import * as Clipboard from 'expo-clipboard';
import Preloadertwo from "../preloadertwo"
import Preloader from "../preloader"
import Header from "./header"
const ManualFund=()=>{
    const [gettoken,settoken]=useState('')
    const [userdata,setuserdata]=useState([])
    const [loader,setloader]=useState(false)
    const navigation=useNavigation()
    const functiongetExp = async () => {
        const getTime = await AsyncStorage.getItem('mytimestamp')
        const checktoken = isLessThanOneHour(parseInt(getTime, 10))
        if (checktoken === false) {
            navigation.navigate('login')

        }
        else {
            const mytoken = await AsyncStorage.getItem('mytoken')
            const mytokenreal = JSON.parse(mytoken)
            settoken(mytokenreal)
            console.log(mytokenreal)
            try{
                setloader(true)
                const response=await axios.post(manualfunding, null, {
                    headers: {
                      Authorization: `Bearer ${mytokenreal}`,
                    }
                  });
                  console.log('myok')
                  console.log(response.data)
                  setuserdata(response.data.accounts.bank)
                 
            }
            catch(error){

            }finally{
                setloader(false)
            }
          





        }

    }
    useEffect(() => {
        functiongetExp();
    }, [])
    const handledashboard=()=>{
        navigation.navigate('dashboard')

    }
    const handlecopy=async(value)=>{
        await Clipboard.setStringAsync(value);

    }
    return(
        <SafeAreaView style={styles.andriod} className="flex-1 bg-white w-screen ">
           {loader && <View className="absolute z-50 h-full w-full">
           <View className="absolute h-screen w-full bg-slate-300 opacity-80"/>
           <View className="absolute z-50 h-screen w-full"><Preloader/></View>
            
            

            </View>}
            <View className="flex h-full">
            <StatusBar style="dark" />
            
            <Header
            title={'Manual Funding'}
            />
            <View className="px-3 flex-1 items-center flex justify-center">
            <View className="h-20 bg-slate-200 w-full px-3 py-3 rounded-xl mt-10">
                <Text className="text-slate-400 text-center">
                    The auto funding involves the users sending money to the 
                    account below and the user's wallets will be credited immediately
                </Text>
            </View>
            <View className="items-center">
                <Text className={`${fieldtexttwo} font-bold`}>Account Details</Text>
            </View>
            {<ScrollView showsVerticalScrollIndicator={false} className="w-full" >
                {userdata.length>0 && userdata.map((item,index)=>(
                <View key={index} className="items-center border rounded-xl border-slate-300 mt-3 w-full px-5 py-3">
                    <View className="absolute z-50 right-4 top-4">
                        <TouchableOpacity onPress={()=>handlecopy(item.number)}>
                            <FontAwesome5 name="copy" size={24} color="#509DFF" />
                            </TouchableOpacity>
                            </View>
                            
                    <View className="items-center">
                        <Text className={`${fieldtexttwo} font-bold`}>{item.bank}</Text>
                        <Text className={`${fieldtextthree} font-bold`}>{item.number}</Text>
                        <Text className={`${fieldtextone} font-bold`}>{item.name}</Text>
                    

                    </View>
                   

                </View>
            ))}
               
            </ScrollView>}

            </View>
            

</View>
        </SafeAreaView>

    )
}
export default ManualFund

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