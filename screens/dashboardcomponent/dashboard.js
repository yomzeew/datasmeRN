import { FontAwesome, FontAwesome5, Fontisto } from "@expo/vector-icons"
import { View, Text, TouchableOpacity, Image, SafeAreaView, Platform, StyleSheet, Alert, Share } from "react-native"
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign, Entypo, MaterialIcons, Ionicons, EvilIcons, Octicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { isLessThanOneHour } from "../services/expireTimestamp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { fieldtextfour, fieldtextone, fieldtextthree, fieldtexttwo } from "../services/textsetting";
import { userdetails } from "../services/endpoints";
import axios from "axios";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import BvnScreen from "./BVnScreen";
import Preloader from "../preloader";
import { ScrollView } from "react-native-gesture-handler";
import AlertModal from "../modals/AlertModal";
import Footer from "./footer";
import { LinearGradient } from 'expo-linear-gradient';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';


const Dashboard = () => {
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
    const [indexmsg, setindexmsg] = useState(0)
    const [headline, setheadline] = useState('')
    const [messageArray, setmessageArray] = useState(message || [])
    const [body, setbody] = useState('')
    const [typeofmsg, settypeofmsg] = useState('')
    const [showAlert, setshowAlert] = useState(true)
    const [showrefer, setshowrefer] = useState('')
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

            const messages = await response.data.details.messages[0]
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
    const handlemanualfund=()=>{
        navigation.navigate('manualfund')
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
    const handlemessage = () => {
        const lengthArray = message.length
        if (indexmsg < lengthArray - 1) {
            setindexmsg((prev) => prev + 1)

            console.log('ok')
        } else {
            setshowAlert(false)

        }


    }
    useEffect(() => {
        if (message.length > 0) {
            setheadline(message[indexmsg].headline)
            setbody(message[indexmsg].message)
            settypeofmsg(message[indexmsg].messageType)

        }


    }, [indexmsg])
    const handletranshistory = () => {
        navigation.navigate('transhistorytwo')
    }
    const handlesetting = () => {
        navigation.navigate('settings')

    }
    const translateYrefer = useSharedValue(300);
    const animatedStylesrefer = useAnimatedStyle(() => ({
        transform: [{ translateY: translateYrefer.value }],
    }));
    const handleshowrefer = () => {
        translateYrefer.value = withSpring(0)
        setshowrefer(!showrefer)

    }
    const handlecloserefer = () => {
        setshowrefer(false)
        translateYrefer.value = withSpring(300)

    }

    const handleShare = async () => {
        console.log('ok')
        try {
            const result = await Share.share({
                message:
                    `Download this App on Apple Store or Google Playstore using my Refer Code ${username}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            Alert.alert(error.message);
        }


    }
    const handlecable = () => {
        navigation.navigate('cable')
    }

    return (
        <View className="h-full">
             {showfund &&
                <View className="absolute bottom-0 z-50 h-4/5 border-2 shadow-md shadow-black border-slate-300 ">
                    <Animated.View style={[animatedStyles]}>
                        <View className="w-screen h-full bg-white px-4">
                            <View className="items-end">
                                <TouchableOpacity onPress={handleclose} className="">
                                    <FontAwesome name="times-circle" size={30} />
                                </TouchableOpacity>
                            </View>
                            <View className="flex flex-1  items-center px-5 mt-5">
                                <TouchableOpacity onPress={handleautofund} className="items-center bg-slate-50 rounded-2xl py-3 w-full">
                                    <MaterialCommunityIcons name="wallet-plus" size={50} color="#509DFF" />
                                    <Text className={`${fieldtexttwo} text-blue-900 font-bold`}>Auto Funding</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity  onPress={handlemanualfund} className="items-center bg-slate-100 rounded-2xl py-3 w-full mt-5">
                                    <MaterialCommunityIcons name="cash-fast" size={40} color="#509DFF" />
                                    <Text className={`${fieldtextone} text-blue-900 font-bold`}>Manual Funding</Text>
                                </TouchableOpacity>



                            </View>
                            


                        </View>

                    </Animated.View>
                </View>}

            {showAlert && headline && <View className="absolute w-full h-full z-50">
                <View className="bg-slate-950 opacity-60 h-full w-screen absolute z-50">

                </View>
                <View className="absolute z-50 top-32 h-screen w-screen">
                    <View className="flex justify-center items-center">
                        <AlertModal
                            headline={headline}
                            body={body}
                            type={typeofmsg}
                        />
                        <TouchableOpacity onPress={handlemessage}>
                            <FontAwesome5 name="times-circle" color="#509DFF" size={30} />
                        </TouchableOpacity>
                    </View>

                </View>

            </View>}
            {!bvnstatus &&
                <View className="absolute h-full py-5  bottom-0 z-50">
                    <Animated.View style={[animatedStylesBvn]} >
                        <BvnScreen
                            close={(value) => handlecloseBvn(value)}
                        />
                    </Animated.View>


                </View>
            }
            {showrefer &&
                <View className="absolute bottom-0 z-50 h-1/3  border-2 shadow-md shadow-black border-slate-300 ">
                    <Animated.View style={[animatedStylesrefer]}>
                        <View className="w-screen h-full  bg-white px-4">
                            <View className="items-end">
                                <TouchableOpacity onPress={handlecloserefer} className="">
                                    <FontAwesome name="times-circle" size={30} />
                                </TouchableOpacity>
                            </View>
                            <Text className={`${fieldtextthree} text-center`}>Refer Code</Text>
                            <Text className={`${fieldtextthree} text-center font-bold text-blue-600`}>{username}</Text>
                            <View className="items-center mt-3">
                                <TouchableOpacity className="bg-blue-600  w-32 h-10 rounded-xl flex flex-row items-center justify-center" onPress={handleShare}>
                                    <MaterialIcons name="share" size={24} color="white" /><Text className={`${fieldtextone} text-white`}>Share Code</Text>
                                </TouchableOpacity>


                            </View>

                        </View>

                    </Animated.View>
                </View>

            }
             <SafeAreaView style={styles.andriod} className="flex-1 flex w-full bg-slate-50">
            <StatusBar style="auto" />
           
            <View className="">
                <View className="flex flex-row justify-between px-5 py-5">
                    <View className="items-center flex flex-row justify-center">
                        <TouchableOpacity onPress={handlesetting}><Text className="text-lg font-bold text-blue-950">Hi {username}</Text></TouchableOpacity>
                    </View>
                    <View className="items-center flex gap-2 flex-row justify-center">
                        <AntDesign name="customerservice" size={30} color="#509DFF" />
                        <EvilIcons name="bell" size={30} color="#509DFF" />
                    </View>

                </View>



            </View>
            <View className="flex-1 px-3">
                <LinearGradient
                    colors={['#509DFF', '#60A6FF', '#60A6FF']}
                    className="h-24 rounded-2xl w-full px-5 flex justify-center"
                >
                    <View className="flex  flex-row justify-between">
                        <View>
                            <View>
                                <Text className="text-sm text-white">Balance  <FontAwesome5 name="eye-slash" size={16} color="white" /></Text>

                            </View>
                            <View className="flex flex-row gap-3 items-center">
                                <Text className="font-bold text-lg text-white">{loaderbal ? <Text>&#8358;{getAccount}</Text>  : <Preloader />}</Text>
                                <TouchableOpacity onPress={handlebalance}>
                                    <Fontisto name="spinner-refresh" size={16} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <View>
                                <Text className="text-sm text-white">Commission</Text>

                            </View>
                            <View>
                                <Text className="font-bold text-lg text-white">&#8358;{getBonus}</Text>

                            </View>
                        </View>

                    </View>

                </LinearGradient>




                <View className="bg-white mt-2 rounded-2xl flex flex-row justify-between items-center w-full h-32">
                    <TouchableOpacity onPress={handleshowfund} className="items-center px-5 ">
                        <View>
                            <View className="opacity-40 bg-blue-300 rounded-full h-12 w-12" />


                            <View className="absolute h-12 w-12 items-center flex justify-center"><Entypo name="wallet" size={24} color="#509DFF" /></View>

                        </View>

                        <Text className="text-sm">Fund Wallet</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handletranshistory} className="items-center px-5">
                        <View>
                            <View className="opacity-40 bg-blue-300 rounded-full h-12 w-12" />
                            <View className="absolute h-12 w-12 items-center flex justify-center"><AntDesign name="filetext1" size={30} color="#509DFF" /></View>

                        </View>
                        
                        <Text className="text-sm">Transaction</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleshowrefer} className="items-center px-5">
                        <View>
                            <View className="opacity-40 bg-blue-300 rounded-full h-12 w-12" />
                            <View className="absolute h-12 w-12 items-center flex justify-center"><AntDesign name="addusergroup" size={24} color="#509DFF" /></View>

                        </View>
                        
                        <Text className="text-sm">Refer User</Text>
                    </TouchableOpacity>

                </View>
                <View className="bg-white mt-5 rounded-2xl w-full h-56 px-3  py-3 ">
                    <View className="w-full flex flex-row justify-between mt-2">
                        <View className="items-center">
                            <TouchableOpacity onPress={handlesubdata} className="items-center">
                                <View>
                                    <View className="opacity-40 bg-blue-300 rounded-full h-12 w-12" />
                                    <View className="absolute h-12 w-12 items-center flex justify-center">
                                    <AntDesign name="mobile1" size={30} color="#509DFF" /></View>

                                </View>
                               
                                <Text >Buy Data</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handletranshistory} className="items-center mt-10  ">
                                <View>
                                    <View className="opacity-40 bg-blue-300 rounded-full h-12 w-12" />
                                    <View className="absolute h-12 w-12 items-center flex justify-center">
                                    <AntDesign name="filetext1" size={30} color="#509DFF" /></View>

                                </View>
                               
                                <Text className="text-sm ">Transaction</Text>
                            </TouchableOpacity>

                        </View>
                        <View className="items-center">
                            <TouchableOpacity onPress={handleairtime} className="items-center">
                                <View>
                                    <View className="opacity-40 bg-blue-300 rounded-full h-12 w-12" />
                                    <View className="absolute h-12 w-12 items-center flex justify-center">
                                    <Entypo name="old-mobile" size={30} color="#509DFF" /></View>

                                </View>
                               
                                <Text >Buy Airtime</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleexam} className="items-center mt-10">
                                <View>
                                    <View className="opacity-40 bg-blue-300 rounded-full h-12 w-12" />
                                    <View className="absolute h-12 w-12 items-center flex justify-center">
                                    <Entypo name="open-book" size={30} color="#509DFF" /></View>

                                </View>
                               
                                <Text className="text-sm ">Exam Pin</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="items-center">
                            <TouchableOpacity onPress={handleelect} className="items-center">
                                <View>
                                    <View className="opacity-40 bg-blue-300 rounded-full h-12 w-12" />
                                    <View className="absolute h-12 w-12 items-center flex justify-center">
                                    <MaterialIcons name="electrical-services" size={30} color="#509DFF" /></View>

                                </View>
                             
                                <Text >Electricity</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handlecable} className="items-center mt-10">
                                <View>
                                    <View className="opacity-40 bg-blue-300 rounded-full h-12 w-12" />
                                    <View className="absolute h-12 w-12 items-center flex justify-center">
                                    <Entypo name="tv" size={30} color="#509DFF" /></View>
                                    

                                </View>
                               
                                <Text className="text-sm ">Cable Bill</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View className="mt-5 w-full items-center">
                        <Image source={require('../images/advert.png')} className="h-24 w-full" resizeMode="cover" />

                    </View>







                </View>

            </View>
            <Footer />


        </SafeAreaView>

        </View>
       
    )
}
export default Dashboard
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