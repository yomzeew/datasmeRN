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
import { pushurl, userdetails } from "../services/endpoints";
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
import { Badge,Button } from "react-native-paper";
import { primaryColor,secondaryColor } from "../services/colortheme";
import * as Notifications from "expo-notifications";
import * as Device from 'expo-device';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

const Dashboard = () => {
    const primary = primaryColor();
    const secondary= secondaryColor();

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
    const [expoPushToken, setExpoPushToken] = useState("");
    
  
    useEffect(() => {
    console.log("Registering for push notifications...");
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log("token: ", token);
        setExpoPushToken(token);
      })
      .catch((err) => console.log(err));
  }, []);
  async function registerForPushNotificationsAsync() {
    let token;
    
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
       
      });
    }
  

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId:"94c9974d-c420-41f9-8708-a1faf209a253",
        })
      ).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }



    
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
      const data = { token: expoPushToken, tokenType: "app" };
      const response = await axios.post(`${pushurl}`, data, {
        headers: {
          Authorization: `Bearer ${mytokenreal}`,
        },
      });
  
      console.log(response.data);
   
        

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
            setusername(response.data.details.user[0].username)
            setAccount(response.data.details.user[0].balance)
            setbanksArray(JSON.parse(response.data.details.user[0].banks))
            setBonus(response.data.details.user[0].bonus)
            setbvnstatus(response.data.details.user[0].bvnVerification)
            const messages=response.data.details.messages[0]
            setheadline(messages.messages[indexmsg].headline)
            setbody(messages.messages[indexmsg].message)
            settypeofmsg(messages.messages[indexmsg].messageType)
            setmessage(messages.messages)
          
           
            
           // setusername(getusername)
            
           



        } catch (error) {

        } finally {
            setloader(true)
        }
    }
    useEffect(()=>{
        if(!expoPushToken){
          return
        }else{
            functiongetExp();
    
        }
       
      },[expoPushToken])
    useEffect(() => {
        
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
        setshowfund(false)
        translateY.value = withSpring(300)
        navigation.navigate('autofund')
    }
    const handlemanualfund=()=>{
        setshowfund(false)
        translateY.value = withSpring(300)
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
            handleshowalert()


            console.log('ok')
        } else {
            setshowAlert(false)
            handleclosealert()

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
    const translateYalert = useSharedValue(0);
    const animatedStylesalert = useAnimatedStyle(() => ({
        //transform: [{ translateY: translateYalert.value }],
    }));
    const handleshowalert = () => {
        translateYalert.value = withSpring(0)
       

    }
    const handleclosealert = () => {
       
        translateYalert.value = withSpring(300)

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
    const bounceValue = useSharedValue(0);

    const animatedStylest = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: bounceValue.value,
          },
        ],
      };
    });
    const handleBounce = () => {
        bounceValue.value = withSpring(-10, {
          damping: 2,
          stiffness: 200,
          mass: 1,
        }, () => {
          bounceValue.value = withSpring(0, {
            damping: 2,
            stiffness: 200,
            mass: 1,
          });
        });
      };
      useEffect(()=>{
        const intervalId = setInterval(handleBounce, 2000);
        return () => clearInterval(intervalId);

      },[])
      const handlenavigatechat=()=>{
        navigation.navigate('chatbot')
      }
      const formatAmount = (text) => {
        // Remove non-numeric characters except for dots (for decimals)
        const cleaned = text.replace(/[^0-9.]/g, '');
      
        // Split integer and decimal parts
        const [integerPart, decimalPart] = cleaned.split('.');
      
        // Format integer part with commas
        const formattedIntegerPart = new Intl.NumberFormat('en-US').format(integerPart || '0');
      
        // Return formatted amount with the decimal part if it exists
        return decimalPart !== undefined
          ? `${formattedIntegerPart}.${decimalPart}`
          : formattedIntegerPart;
      };
 

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
                                    <MaterialCommunityIcons name="wallet-plus" size={50} color={primary} />
                                    <Text className={`${fieldtexttwo} text-blue-900 font-bold`}>Auto Funding</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity  onPress={handlemanualfund} className="items-center bg-slate-100 rounded-2xl py-3 w-full mt-5">
                                    <MaterialCommunityIcons name="cash-fast" size={40} color={primary} />
                                    <Text className={`${fieldtextone} text-blue-900 font-bold`}>Manual Funding</Text>
                                </TouchableOpacity>



                            </View>
                            


                        </View>

                    </Animated.View>
                </View>}

            {showAlert && headline && <View className="absolute w-full h-full z-50">
                <View className="bg-slate-950 opacity-60 h-full w-screen absolute z-50">

                </View>
                <View className="absolute z-50 top-32 h-full w-full">
                
                        <Animated.View style={[animatedStylesalert]} >
                            <View className="flex justify-center items-center" >
                            <AlertModal
                            headline={headline}
                            body={body}
                            type={typeofmsg}
                        />
                         <TouchableOpacity onPress={handlemessage}>
                            <FontAwesome5 name="times-circle" color={primary} size={30} />
                        </TouchableOpacity>

                            </View>
                        

                        </Animated.View>
                            
                       
                       
                        
                       
                   

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
            <View className="absolute z-50 bottom-32 right-2">
            <Animated.View style={[animatedStylest]}>
            <Button className="bg-yellow-500" textColor="white"  icon="robot" mode="elevated" onPress={handlenavigatechat}>
              Chat Bot
              </Button>
                </Animated.View>
            </View>
           
            <View className="">
                <View className="flex flex-row justify-between px-5 py-5">
                    <View className="items-center flex flex-row justify-center">
                        <TouchableOpacity onPress={handlesetting}><Text className="text-lg font-bold text-blue-950">Hi {username}</Text></TouchableOpacity>
                    </View>
                    <View className="items-center flex gap-2 flex-row justify-center">
                        <AntDesign name="customerservice" size={30} color="#010bff" />
                        <TouchableOpacity>
                        
                        <EvilIcons name="bell" size={30} color={primary}/>
                        <View  className="absolute -right-3 " ><Badge className="bg-yellow-500" size={15}>New</Badge></View>
                        

                        </TouchableOpacity>
                        
                    </View>

                </View>



            </View>
            <View className="flex-1 px-3">
                <LinearGradient
                    colors={[secondary, primary, primary]}
                    className="h-24 rounded-2xl w-full px-5 flex justify-center"
                >
                    <View className="flex  flex-row justify-between">
                        <View>
                            <View>
                                <Text className="text-sm text-white">Balance  <FontAwesome5 name="eye-slash" size={16} color="white" /></Text>

                            </View>
                            <View className="flex flex-row gap-3 items-center">
                                <Text className="font-bold text-lg text-white">{loaderbal ? <Text>&#8358;{formatAmount(getAccount)}</Text>  : <Preloader />}</Text>
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
                            <View className="bg-regal-blue rounded-full h-12 w-12" />


                            <View className="absolute h-12 w-12 items-center flex justify-center"><Entypo name="wallet" size={24} color="white" /></View>

                        </View>

                        <Text className="text-sm">Fund Wallet</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handletranshistory} className="items-center px-5">
                        <View>
                            <View className="bg-regal-blue rounded-full h-12 w-12" />
                            <View className="absolute h-12 w-12 items-center flex justify-center"><AntDesign name="filetext1" size={30} color="white" /></View>

                        </View>
                        
                        <Text className="text-sm">Transaction</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleshowrefer} className="items-center px-5">
                        <View>
                            <View className="bg-regal-blue rounded-full h-12 w-12" />
                            <View className="absolute h-12 w-12 items-center flex justify-center"><AntDesign name="addusergroup" size={24} color="white" /></View>

                        </View>
                        
                        <Text className="text-sm">Refer User</Text>
                    </TouchableOpacity>

                </View>
                <View className="bg-white mt-5 rounded-2xl w-full h-56 px-3  py-3 ">
                    <View className="w-full flex flex-row justify-between mt-2">
                        <View className="items-center">
                            <TouchableOpacity onPress={handlesubdata} className="items-center">
                                <View>
                                    <View className="bg-regal-blue rounded-full h-12 w-12" />
                                    <View className="absolute h-12 w-12 items-center flex justify-center">
                                    <AntDesign name="mobile1" size={30} color="white" /></View>

                                </View>
                               
                                <Text >Buy Data</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handletranshistory} className="items-center mt-10  ">
                                <View>
                                    <View className=" bg-regal-blue rounded-full h-12 w-12" />
                                    <View className="absolute h-12 w-12 items-center flex justify-center">
                                    <AntDesign name="filetext1" size={30} color="white" /></View>

                                </View>
                               
                                <Text className="text-sm ">Transaction</Text>
                            </TouchableOpacity>

                        </View>
                        <View className="items-center">
                            <TouchableOpacity onPress={handleairtime} className="items-center">
                                <View>
                                    <View className="bg-regal-blue rounded-full h-12 w-12" />
                                    <View className="absolute h-12 w-12 items-center flex justify-center">
                                    <Entypo name="old-mobile" size={30} color="white" /></View>

                                </View>
                               
                                <Text >Buy Airtime</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleexam} className="items-center mt-10">
                                <View>
                                    <View className="bg-regal-blue rounded-full h-12 w-12" />
                                    <View className="absolute h-12 w-12 items-center flex justify-center">
                                    <Entypo name="open-book" size={30} color="white" /></View>

                                </View>
                               
                                <Text className="text-sm ">Exam Pin</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="items-center">
                            <TouchableOpacity onPress={handleelect} className="items-center">
                                <View>
                                    <View className=" bg-regal-blue rounded-full h-12 w-12" />
                                    <View className="absolute h-12 w-12 items-center flex justify-center">
                                    <MaterialIcons name="electrical-services" size={30} color="white" /></View>

                                </View>
                             
                                <Text >Electricity</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handlecable} className="items-center mt-10">
                                <View>
                                    <View className="bg-regal-blue rounded-full h-12 w-12" />
                                    <View className="absolute h-12 w-12 items-center flex justify-center">
                                    <Entypo name="tv" size={30} color="white" /></View>
                                    

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