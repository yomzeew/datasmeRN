import { FontAwesome, FontAwesome5, Fontisto } from "@expo/vector-icons"
import { View, Text, TouchableOpacity, Image, SafeAreaView, Platform, StyleSheet } from "react-native"
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign, Entypo, MaterialIcons, Ionicons, EvilIcons, Octicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { isLessThanOneHour } from "../services/expireTimestamp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { fieldtextone, fieldtexttwo } from "../services/textsetting";
import { userdetails } from "../services/endpoints";
import axios from "axios";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import BvnScreen from "./BVnScreen";
import Preloader from "../preloader";
import { ScrollView } from "react-native-gesture-handler";
import AlertModal from "../modals/AlertModal";

const Dashboardcopy = () => {
    const navigation = useNavigation();
    const [gettoken, settoken] = useState('')
    const [showfund, setshowfund] = useState(false)
    const [username, setusername] = useState('')
    const [getAccount, setAccount] = useState('')
    const [getBonus, setBonus] = useState('')
    const [bvnstatus, setbvnstatus] = useState(null)
    const [banksArray, setbanksArray] = useState([])
    const [loader, setloader] = useState(true)
    const [loaderbal, setloaderbal] = useState(true)
    const [indexbank, setindexbank] = useState(0)
    const [isDisable, setisDisable] = useState(false)
    const [message, setmessage] = useState([])
    const [indexmsg,setindexmsg]=useState(0)
    const[headline,setheadline]=useState('')
    const[messageArray,setmessageArray]=useState(message||[])
    const [body,setbody]=useState('')
    const [typeofmsg,settypeofmsg]=useState('')
    const [showAlert, setshowAlert]=useState(true)
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
        }

    }
    const getuserdetailfunc = async () => {
        try {
            setloader(false)
            const mytoken = await AsyncStorage.getItem('mytoken')
            const mytokenreal = JSON.parse(mytoken)
            const response = await axios.post(userdetails, null, {
                headers: {
                    Authorization: `Bearer ${mytokenreal}`,
                }
            });

            const messages =await response.data.details.messages[0]
            setheadline(messages.messages[indexmsg].headline)
            setbody(messages.messages[indexmsg].message)
            settypeofmsg(messages.messages[indexmsg].messageType)
            setmessage(messages.messages)
            const data = response.data.details
            const getusername = data.user[0].username
            const account = data.user[0].balance
            const bonus = data.user[0].bonus
            const accountstatus = data.bvnVerification
            setbvnstatus(accountstatus)
            setAccount(account)
            setBonus(bonus)
            setusername(getusername)
            setbanksArray(JSON.parse(data.user[0].banks))
            console.log(JSON.parse(data.user[0].banks))



        } catch (error) {

        } finally {
            setloader(true)
        }
    }
    useEffect(() => {
        functiongetExp();
        console.log(gettoken)
        getuserdetailfunc()

    }, [])

    const handlesubdata = () => {
        navigation.navigate('subdata')
    }
    const handleairtime = () => {
        navigation.navigate('buyairtime')
    }
    const handleexam = () => {
        navigation.navigate('exam')
    }
    const handleelect = () => {
        navigation.navigate('elect')
    }
    const widthcontent = Platform.OS === 'ios' ? 'w-full' : 'w-full'
    const translateY = useSharedValue(300);
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));
    const handleshowfund = () => {
        translateY.value = withSpring(0)
        setshowfund(true)

    }
    const handleclose = () => {
        setshowfund(false)
        translateY.value = withSpring(300)

    }
    const translateYBvn = useSharedValue(-800);
    const animatedStylesBvn = useAnimatedStyle(() => ({
        transform: [{ translateY: translateYBvn.value }],
    }));
    useEffect(() => {
        translateYBvn.value = withSpring(0)

    }, [bvnstatus])

    const handlecloseBvn = (value) => {
        setbvnstatus(value)
        translateYBvn.value = withSpring(-1000)

    }
    const handleautofund = () => {
        navigation.navigate('autofund')
    }
    const handlebalance = async () => {
        console.log(banksArray.length)
        try {
            setloaderbal(false)
            const mytoken = await AsyncStorage.getItem('mytoken')
            const mytokenreal = JSON.parse(mytoken)
            const response = await axios.post(userdetails, null, {
                headers: {
                    Authorization: `Bearer ${mytokenreal}`,
                }
            });
            const data = response.data.details
            const account = data.user[0].balance
            const bonus = data.user[0].bonus
            setAccount(account)
            setBonus(bonus)

        } catch (error) {

        }
        finally {
            setloaderbal(true)
        }


    }
    const handlenextacct = () => {
        const lengthArray = banksArray.length
        if (indexbank < lengthArray - 1) {
            setindexbank((prev) => prev + 1)
        } else {

        }

    }
    const handleprevacct = () => {
        if (indexbank > 0) {
            setindexbank((prev) => prev - 1)
        } else {
            // Handle when reaching the beginning
            // You may want to loop to the last item or perform other actions
        }



    }
    const handlemessage=()=>{
        const lengthArray = message.length
        if (indexmsg < lengthArray - 1) {
            setindexmsg((prev) => prev + 1)
            
            console.log('ok')
        } else {
            setshowAlert(false)

        }
        

    }
    useEffect(()=>{
        if(message.length>0){
            setheadline(message[indexmsg].headline)
        setbody(message[indexmsg].message)
        settypeofmsg(message[indexmsg].messageType)

        }
        

    },[indexmsg])
    const handletranshistory=()=>{
        navigation.navigate('transhistorytwo')
    }
    return (
        <SafeAreaView style={styles.andriod} className="items-center flex-1 w-screen bg-blue-500">
            <StatusBar style="dark" />

            {showfund &&
                <View className="absolute bottom-0 z-50 h-4/5 border-2 shadow-md shadow-black border-slate-300 ">
                    <Animated.View style={[animatedStyles]}>
                        <View className="w-screen h-full bg-white px-4">
                            <View className="items-center">
                                <TouchableOpacity onPress={handleclose} className="">
                                    <Octicons name="horizontal-rule" size={30} color="grey" />
                                </TouchableOpacity>
                            </View>
                            <View className="flex flex-1 items-center px-5 mt-5">
                                <TouchableOpacity onPress={handleautofund} className="items-center bg-slate-50 rounded-2xl py-3 w-full">
                                    <MaterialCommunityIcons name="wallet-plus" size={50} color="#509DFF" />
                                    <Text className={`${fieldtexttwo} text-blue-900 font-bold`}>Auto Funding</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="items-center bg-slate-100 rounded-2xl py-3 w-full mt-5">
                                    <FontAwesome5 name="credit-card" size={50} color="#509DFF" />
                                    <Text className={`${fieldtexttwo} text-blue-900 font-bold`}>ATM Funding</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="items-center bg-slate-100 rounded-2xl py-3 w-full mt-5">
                                    <MaterialCommunityIcons name="cash-fast" size={40} color="#509DFF" />
                                    <Text className={`${fieldtextone} text-blue-900 font-bold`}>Manual Funding</Text>
                                </TouchableOpacity>



                            </View>
                            <View className=""> 
                            <Text className={`${fieldtexttwo} font-bold text-center text-slate-600`}>Choose wisely</Text>
                            <Text className={`${fieldtextone} text-center text-slate-600`}>We are Happy to have you onboard, make payment
                                through auto funding and recieve 20% bonus</Text>
                            <Text className="font-bold text-center text-blue-900 mb-20 bg-blue-200 mt-3">
                                Auto Funding option is highly recommend,
                                Because it's Automated Compare to manual funding
                            </Text>

                            </View>
                            

                        </View>

                    </Animated.View>
                </View>}
           
           {showAlert && headline &&<View className="absolute w-full z-50">
                <View className="bg-slate-950 opacity-60 h-screen w-screen absolute z-50">

                </View>
                <View className="absolute z-50 top-32 h-screen w-screen">
                    <View className="flex justify-center items-center">
                        <AlertModal
                        headline={headline}
                        body={body}
                        type={typeofmsg}
                        />
                        <TouchableOpacity onPress={handlemessage}>
                        <FontAwesome5 name="times-circle" color="#509DFF" size={30}/>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>}
            {!bvnstatus &&
                <View className="absolute h-full bottom-0 z-50">
                    <Animated.View style={[animatedStylesBvn]} >
                        <BvnScreen
                            close={(value) => handlecloseBvn(value)}
                        />
                    </Animated.View>


                </View>
            }

            <View className="bg-blue-500 h-1/5 w-screen ">
                <View className="flex flex-row justify-between px-5 py-5">
                    <View className="items-center flex flex-row justify-center">
                        <MaterialIcons name="menu" size={30} color="white" />
                        <Text className="text-lg font-bold text-blue-950">Hi {username}</Text>
                    </View>
                    <View className="items-center flex gap-2 flex-row justify-center">
                        <AntDesign name="customerservice" size={30} color="white" />
                        <EvilIcons name="bell" size={30} color="white" />
                    </View>

                </View>
            </View>
            <View className="flex-1 w-screen items-center flex bg-white px-5">
                <View className={`rounded-2xl bg-white flex  border border-slate-200 shadow-black -mt-16 shadow-md flex-1 px-5 py-5 ${widthcontent}`}>
                    <View className="flex-1">
                        <View className="flex  flex-row justify-between">
                            <View>
                                <View>
                                    <Text className="text-sm text-slate-400">Balance  <FontAwesome5 name="eye-slash" size={16} color="grey" /></Text>

                                </View>
                                <View className="flex flex-row gap-3 items-center">
                                    <Text className="font-bold text-lg">{loaderbal ? 'N' + getAccount : <Preloader />}</Text>
                                    <TouchableOpacity onPress={handlebalance}>
                                        <Fontisto name="spinner-refresh" size={16} color="#509DFF" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <View>
                                    <Text className="text-sm text-slate-400">Commission</Text>

                                </View>
                                <View>
                                    <Text className="font-bold text-lg">N{getBonus}</Text>

                                </View>
                            </View>

                        </View>

                        <View className="flex flex-row justify-evenly items-center mt-5 bg-white rounded-2xl py-3">
                            <TouchableOpacity onPress={handleshowfund} className="items-center">
                                <Text><MaterialCommunityIcons name="bank-transfer" size={50} color="#509DFF" /></Text>
                                <Text className="text-sm">Deposit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handletranshistory} className="items-center">
                                <Text><AntDesign name="filetext1" size={50} color="#509DFF" /></Text>
                                <Text className="text-sm">Transaction</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="items-center">
                                <Text><FontAwesome5 name="gift" size={50} color="orange" /></Text>
                                <Text className="text-sm">Promo</Text>
                            </TouchableOpacity>

                        </View>
                        <View className="mt-5 h-24 bg-white rounded-2xl py-3">
                            <View className="flex justify-center items-center px-5">
                                <View className="absolute left-4">
                                <TouchableOpacity onPress={handleprevacct}><FontAwesome name="arrow-circle-left" size={24} color="#509DFF" /></TouchableOpacity>
                                    </View>
                                
                                {banksArray.length > 0 && <View className="flex flex-col justify-evenly  items-center">
                                    <View className="border-b border-b-blue-500">
                                        <Text className="font-bold  text-blue-500">{banksArray[indexbank].accountName}</Text>

                                    </View>
                                    <View className="mt-0"><Text className="text-2xl font-bold">{banksArray[indexbank].accountNumber}</Text></View>
                                    <View className="mt-0"><Text className="">{banksArray[indexbank].bank}</Text></View>

                                </View>}
                                <View className="absolute right-4">
                                <TouchableOpacity onPress={isDisable ? null : handlenextacct}><FontAwesome name="arrow-circle-right" size={24} color="#509DFF" /></TouchableOpacity>
                                </View>
                            </View>







                        </View>
                        <View className="mt-5 bg-white rounded-2xl py-3 px-2">
                            <View className="bg-slate-300 rounded-2xl w-28 items-center">
                                <Text className="text-sm font-bold text-blue-900">Recommended</Text></View>
                            <View className="flex flex-row justify-evenly mt-2">
                                <TouchableOpacity onPress={handlesubdata} className="items-center">
                                    <Text>
                                        <AntDesign name="mobile1" size={30} color="lightblue" /></Text>
                                    <Text className={fieldtextone}>Buy Data</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleairtime} className="items-center">
                                    <Text>
                                        <Entypo name="old-mobile" size={30} color="lightblue" /></Text>
                                    <Text className={fieldtextone}>Buy Airtime</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleelect} className="items-center">
                                    <Text>
                                        <MaterialIcons name="electrical-services" size={30} color="lightblue" /></Text>
                                    <Text className={fieldtextone}>Electricity</Text>
                                </TouchableOpacity>

                            </View>




                        </View>
                        <View className="mt-5 bg-white rounded-2xl py-3 px-2">
                            <View className="items-start">
                                <Text className="text-lg font-bold text-blue-900">Services</Text></View>
                            <View className="flex flex-row mt-2  justify-evenly flex-wrap">
                                <View className="items-center">
                                <TouchableOpacity className="items-center ">
                                    <Text>
                                        <AntDesign name="mobile1" size={30} color="lightblue" /></Text>
                                    <Text className="text-sm font-bold">Data&Airtime</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="items-center ">
                                    <Text>
                                        <Ionicons name="tv-outline" size={30} color="lightblue" /></Text>
                                    <Text className="text-sm font-bold">Tv</Text>
                                </TouchableOpacity>
                                </View>
                                <View className="items-center">
                                <TouchableOpacity onPress={handletranshistory} className="items-center  ">
                                    <Text>
                                        <AntDesign name="filetext1" size={30} color="lightblue" /></Text>
                                    <Text className="text-sm font-bold">Transaction</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleexam} className="items-center">
                                    <Text>
                                        <Entypo name="open-book" size={30} color="lightblue" /></Text>
                                    <Text className="text-sm font-bold">Exam Pin</Text>
                                </TouchableOpacity>

                                </View>
                                <View className="items-center">
                                <TouchableOpacity onPress={handleelect} className="items-center   ">
                                    <Text>
                                        <MaterialIcons name="electrical-services" size={30} color="lightblue" /></Text>
                                    <Text className="text-sm font-bold">Electricity</Text>
                                </TouchableOpacity>

                                    
                                <TouchableOpacity className="items-center">
                                    <Text>
                                        <FontAwesome5 name="gift" size={30} color="orange" /></Text>
                                    <Text className="text-sm font-bold">Promo</Text>
                                </TouchableOpacity>



                                </View>

                               
                               


                            </View>




                        </View>

                    </View>

                </View>

            </View>


        </SafeAreaView>
    )

}
export default Dashboardcopy
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