import { SafeAreaView,View,TouchableOpacity,Text,ScrollView,Keyboard,StyleSheet,Platform,TextInput,KeyboardAvoidingView } from "react-native"
import { fieldtextone, fieldtexttwo } from "../services/textsetting"
import { useEffect, useState } from "react"
import {AntDesign,Octicons} from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native"
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isLessThanOneHour } from "../services/expireTimestamp"
import { StatusBar } from "expo-status-bar";
import axios from "axios"
import { transactions } from "../services/endpoints"
import Preloadertwo from "../preloadertwo"
const TransHistory=()=>{
    const navigation=useNavigation()
    const [getdata, setdata] = useState([])
    const [gettoken, settoken] = useState('')
    const [Success,setSuccessfull]=useState([])
    const [Failed,setFailed]=useState([])
    const [Pending,setPending]=useState([])
    const [widthdefaults,setwidthdefaults]=useState(32)
    const [widthdefaultp,setwidthdefaultp]=useState(24)
    const [widthdefaultf,setwidthdefaultf]=useState(24)
    const [heightdefaults,setheightdefaults]=useState(16)
    const [heightdefaultp,setheightdefaultp]=useState(12)
    const [heightdefaultf,setheightdefaultf]=useState(12)
    const [datashow,setdatashow]=useState([])
    const [Loader, setLoader]=useState(true)

 
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
           try{
            const response=await axios.post(transactions,null,{
                headers: {
                    Authorization: `Bearer ${mytokenreal}`,
                }

            })
            console.log(response.data)
            setdata(response.data.transactions)
            const transactiondata=response.data.transactions
            //get successful transactions
            const successfulldata=transactiondata.filter((item)=>(
                item.status==="successfull"
            ))
            const pendingdata=transactiondata.filter((item)=>(
                item.status==="pending"
            ))
            const faildata=transactiondata.filter((item)=>(
                item.status==="failed"
            ))
            setdatashow(successfulldata)
            setPending(pendingdata)
            setFailed(faildata)
            setSuccessfull(successfulldata)
           

           }catch(error){
            console.log(error)

           }
           finally{
            setLoader(false)
           }





        }

    }
    useEffect(() => {
        functiongetExp();
    }, [])

    const handledashboard = () => {
        navigation.navigate('dashboard')

    }
    const width = useSharedValue(128);
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ width: width.value }],
    }));
    const  handleshowsuccessful=()=>{
        setheightdefaultp(12)
        setwidthdefaultp(24)
        setheightdefaults(16)
        setwidthdefaults(32)
        setheightdefaultf(12)
        setwidthdefaultf(24)
        setdatashow(Success)

    }
    const handleshowpending=()=>{
        setheightdefaultp(16)
        setwidthdefaultp(32)
        setheightdefaults(12)
        setwidthdefaults(24)
        setheightdefaultf(12)
        setwidthdefaultf(24)
        setdatashow(Pending)


    }
    const handleshowfail=()=>{
        setheightdefaultf(16)
        setwidthdefaultf(32)
        setheightdefaults(12)
        setwidthdefaults(24)
        setheightdefaultp(12)
        setwidthdefaultp(24)
        setdatashow(Failed)

    }
   

    return(
                <SafeAreaView style={styles.andriod} className="flex-1 flex w-screen h-full bg-slate-200">
                     <StatusBar style="dark" />
                     {Loader &&
                <View className="bg-slate-400 h-screen w-full absolute z-50 opacity-70 flex justify-center items-center">
                <Preloadertwo/>
                </View>
                }
                     <View className="">
                     <View className="flex gap-5 flex-row border-b border-slate-300 h-20 mt-5 w-screen px-5 items-center">
                        <TouchableOpacity onPress={handledashboard}><AntDesign name="leftcircle" size={30} color="navy" /></TouchableOpacity>
                        <Text className={`font-bold text-blue-500 ${fieldtexttwo}`}>Transaction History</Text>
                    </View>
                    <View className="items-end flex flex-row mt-3 justify-evenly px-2">
                        <TouchableOpacity  onPress={handleshowsuccessful}  className={`bg-blue-500 rounded-t-2xl h-${heightdefaults} w-${widthdefaults} items-center flex justify-center`}>
                            <Text className={`${fieldtextone} text-white`}>Successful</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleshowpending} className={`bg-orange-500 rounded-t-2xl h-${heightdefaultp} w-${widthdefaultp}  items-center flex justify-center`}>
                            <Text className={`${fieldtextone} text-white`}>Pending</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={handleshowfail}  className={`bg-red-500 rounded-t-2xl h-${heightdefaultf}  w-${widthdefaultf}  items-center flex justify-center`}>
                            <Text className={`${fieldtextone} text-white`}>Failed</Text>
                        </TouchableOpacity>

                    </View>

                     </View>
        
                    
                    <View className="mt-3 flex-1 pb-10">
                        <View className="items-center">
                        <ScrollView horizontal className="px-5">
                        <View className="flex gap-5 flex-row justify-evenly w-full">
                        <View className="w-32 bg-blue-500 items-center h-10  justify-center rounded-2xl ">
                            <Text className={`${fieldtextone} text-white `}>Beneficiary</Text>
                        </View>
                        <View className="w-24 bg-blue-500 items-center h-10  justify-center rounded-2xl ">
                            <Text className={`${fieldtextone} text-white`}>Amount</Text>
                        </View>
                        <View className="w-24 bg-blue-400 items-center h-10  justify-center rounded-2xl ">
                            <Text className={`${fieldtextone} text-white`}>Description</Text>
                        </View>
                        <View className="w-24 bg-red-300 items-center h-10  justify-center rounded-2xl ">
                            <Text className={`${fieldtextone} text-white`}>Date</Text>
                        </View>
                       
                       

                        </View>
                        </ScrollView>

                        </View>
                        <View className="h-full">
                       <ScrollView className="flex-1">
                    {datashow.length>0?datashow.map((item,index)=>(
                      <ScrollView horizontal className="px-5 h-16 bg-slate-300 mt-3">
                      <View className="flex gap-5 flex-row justify-evenly w-full">
                      <View className="w-32  items-center justify-center rounded-2xl ">
                          <Text className={` ${fieldtextone}`}>{item.beneficiary}</Text>
                      </View>
                      <View className="w-24  flex justify-center items-center">
                          <Text className="font-bold" >N{item.amount}</Text>
                      </View>
                      <View className="w-24  flex justify-center items-center">
                          <Text className={`font-bold text-slate-600 ${fieldtextone}`} >{item.descr.toUpperCase()}</Text>
                      </View>
                      <View className="w-24 flex justify-center items-center">
                          <Text className="font-bold text-red-500">{item.time}-{item.date}</Text>
                      </View>
                      </View>
                      </ScrollView>

                        )):
                        <View className="items-center mt-5">
                            <Text className={`${fieldtexttwo}`}>No Record Found</Text>

                        </View>
                       }
                       </ScrollView>
                     
                       </View>
                       
                    </View>
                    
                   
        
        
                </SafeAreaView>
            )
        
        
     

    
}
export default TransHistory

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