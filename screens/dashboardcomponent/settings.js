import { SafeAreaView, View, TouchableOpacity, Text, ScrollView, Keyboard, StyleSheet, Platform, TextInput, KeyboardAvoidingView, Settings, Alert, Modal } from "react-native"
import { fieldtextone, fieldtexttwo } from "../services/textsetting"
import { useEffect, useState } from "react"
import { AntDesign, Octicons, FontAwesome, FontAwesome5, Entypo } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native"
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { userdetails } from "../services/endpoints"
import axios from "axios"
import Preloadertwo from "../preloadertwo"
import Header from "./header"
const Settingss = () => {
    const navigation = useNavigation()

    const [email, setemail] = useState('')
    const [loader, setloader] = useState(true)
    const [bvnstatus, setbvnstatus] = useState(true)
    const [username, setusername] = useState('')
    const [fullname, setfullname] = useState('')
    const [phoneno, setphoneno] = useState('')
    const [visible, setVisible] = useState(false);
    const [EnrollView, setEnrollView] = useState(false);
    const [showupdate, setshowupdate] = useState(false)
    const [Msg, setMsg] = useState('')
    const [EditView, setEditView] = useState(false)




    const getuserdetailfunc = async () => {
        try {
            setloader(true)
            const mytoken = await AsyncStorage.getItem('mytoken')
            const mytokenreal = JSON.parse(mytoken)
            console.log(mytokenreal)
            const response = await axios.post(userdetails, null, {
                headers: {
                    Authorization: `Bearer ${mytokenreal}`,
                }
            });
            console.log(response.data)
            const data = response.data.details.user[0]
            console.log(data)
            setfullname(data.fullname)
            setemail(data.email)
            setphoneno(data.number)
            setusername(data.username)



        } catch (error) {

        } finally {
            setloader(false)
        }
    }
    useEffect(() => {

        getuserdetailfunc()

    }, [])

    const handledashboard = () => {
        navigation.navigate('dashboard')

    }
    const handleshowbvn = () => {
        setbvnstatus(!bvnstatus)

    }
    const getObjectdata = async () => {
        const storedObject = await AsyncStorage.getItem('passdata');
        const myObject = JSON.parse(storedObject);
        if (myObject) {
            console.log(myObject);
            return myObject;
        } else {
            return null;
        }
    };

    const Enrollfunction = async () => {
        const userData = await getObjectdata()
        console.log(userData)
        if (userData) {
            if (userData.status === false) {
                userData.status = true
                await AsyncStorage.setItem('passdata', JSON.stringify(userData))
                await AsyncStorage.getItem('passdata').then((storedObject) => {
                    const myObject = JSON.parse(storedObject);
                    if (myObject.status === true) {
                        setEnrollView(true)
                        setMsg('Fingerprint/FaceID for this App is Enroll')



                    }
                    else {
                        setEnrollView(true)
                        setMsg('Fingerprint/FaceID for this App is Failed')

                    }

                });


            }
            else {
                setEnrollView(true)
                setMsg('Fingerprint/FaceID Already Enroll')


            }

        }
        else {
            setEnrollView(true)
            setMsg('Fingerprint/FaceID Not Enroll \n Device is not default Register Device')

        }

    }
    const handlelogout = async () => {
        await AsyncStorage.removeItem('mytoken')
        await AsyncStorage.removeItem('passdata')
       
        navigation.navigate('login')

    }
    const cancelHandle = () => {
        setEnrollView(false)
    }
    const handleupdatenumber = () => {
        setEditView(true)
    }
    const handleclose=()=>{
        setEditView(false)

    }
    const HandleUpdate=()=>{

    }

    return (
        <View className="h-full">
            {EnrollView && <View className="h-full w-full absolute flex justify-center items-center z-50 ">
                <View className="bg-slate-400 h-full w-full absolute opacity-70 flex justify-center items-center" />
                <View className="w-52 h-32 bg-slate-700 rounded-xl flex justify-center px-4">
                    <Text className="text-white border-b border-b-slate-200 py-3 text-center">{Msg}</Text>
                    <TouchableOpacity onPress={cancelHandle}><Text className="text-white font-bold py-3 text-center">OK</Text></TouchableOpacity>
                </View>
            </View>}
            {EditView && <View className="h-full w-full absolute flex justify-center items-center z-50 ">
                <View className="bg-slate-400 h-full w-full absolute opacity-70 flex justify-center items-center" />
                <View className="px-3 w-full">
                    <View className="w-full  flex justify-center px-10 py-5">
                        <View className="bg-slate-50 px-3 py-3  rounded-xl">
                        <View className="items-end mb-3">
                            <TouchableOpacity onPress={handleclose}>
                                <FontAwesome5 name="times-circle" color="navy" size={24} />
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            className="border-slate-400 h-12 text-lg border rounded-lg px-3"
                            keyboardType="numeric"
                            value={phoneno}
                            onChangeText={(text) => setphoneno(text)}
                        />
                        <TouchableOpacity onPress={HandleUpdate} className="h-12 bg-blue-600 mt-3 rounded-xl"><Text className="text-white font-bold py-3 text-center">Update</Text></TouchableOpacity>

                        </View>
                       

                    </View>



                </View>
            </View>}
            {loader &&
                <View className="bg-slate-400 h-full w-full absolute z-50 opacity-70 flex justify-center items-center">
                    <Preloadertwo />
                </View>
            }
            <SafeAreaView style={styles.andriod} className="flex-1 w-screen h-full bg-slate-50">
                <StatusBar style="dark" />

                {showupdate && <View className="h-full w-full absolute flex justify-center items-center z-50 ">
                    <View className="bg-slate-400 h-screen w-full absolute opacity-70 flex justify-center items-center" />
                    <View className="w-52 h-32 bg-slate-700 rounded-xl flex justify-center px-4">
                        <Text className="text-white border-b border-b-slate-200 py-3 text-center">{Msg}</Text>
                        <TouchableOpacity onPress={cancelHandle}><Text className="text-white font-bold py-3 text-center">Update</Text></TouchableOpacity>
                    </View>
                </View>}

                <Header
                    title={'Settings'}
                />
                <View>
                    <View className="flex flex-row justify-between px-5 mt-5">
                        <View>
                            <FontAwesome name="user" size={80} color="black" />
                        </View>
                        <View>
                            <Text>Full Name</Text>
                            <Text>{fullname.toUpperCase()}</Text>
                            <Text className="mt-3">Mobile number</Text>
                            <Text>{phoneno}</Text>

                        </View>

                    </View>

                    <View>
                        <View className="bg-slate-200 mt-3 h-10 flex justify-center px-3">
                            <Text className={`${fieldtextone}`}>Basic Information</Text>
                        </View>
                        <View className="px-3">
                            <Text className="mt-2">First Name</Text>
                            <Text className={`${fieldtextone}`}>{fullname.split(' ')[1]}</Text>
                            <Text className="mt-2">Middle Name</Text>
                            <Text className={`${fieldtextone}`}>{fullname.split(' ')[2]}</Text>
                            <Text className="mt-2">Last Name</Text>
                            <Text className={`${fieldtextone}`}>{fullname.split(' ')[0]}</Text>

                        </View>

                    </View>
                    <View>
                        <View className="bg-slate-200 mt-3 h-10 flex justify-center px-3">
                            <Text className={`${fieldtextone}`}>Contact Information</Text>
                        </View>
                        <View className="px-3">
                            <Text className="mt-2">Email</Text>
                            <Text className={`${fieldtextone}`}>{email.toLowerCase()}</Text>
                            <View className="flex w-full items-center justify-between flex-row">
                                <View>
                                    <Text className="mt-2">Mobile number</Text>
                                    <Text className={`${fieldtextone}`}>{phoneno}</Text>


                                </View>
                                <View className="flex flex-row">
                                    <TouchableOpacity onPress={handleupdatenumber}>
                                        <Entypo name="edit" size={24} color="#509DFF" />
                                        <Text>Edit</Text>
                                    </TouchableOpacity>


                                </View>

                            </View>



                        </View>

                    </View>
                    <View>
                        <View className="bg-slate-200 mt-3 h-10 flex justify-center px-3">
                            <Text className={`${fieldtextone}`}>Security Information</Text>
                        </View>
                        <View className="px-3 items-center flex justify-between flex-row">
                            <View>
                                <Text className="mt-2">BVN</Text>
                                <Text className={`${fieldtextone}`}>{bvnstatus ? '******' : '2223134455'}</Text>

                            </View>
                            <TouchableOpacity onPress={handleshowbvn}>
                                <FontAwesome5 name="eye-slash" size={24} color="#509DFF" />
                            </TouchableOpacity>

                        </View>

                    </View>
                    <View className="mt-3 items-center">
                        <TouchableOpacity onPress={Enrollfunction} className="items-center flex justify-center border-b border-b-blue-300">
                            <Text className={`${fieldtextone} text-blue-600`}>Enroll Your Biometric</Text>
                        </TouchableOpacity>

                    </View>

                    <View className="mt-5 items-center">
                        <TouchableOpacity onPress={handlelogout} className="bg-blue-600 px-2 py-2 rounded-xl w-24 items-center flex justify-center">
                            <Text className={`${fieldtextone} text-white`}>Sign Out</Text>
                        </TouchableOpacity>

                    </View>



                </View>
                <View>



                </View>
                <View>

                </View>
                <View>


                </View>




            </SafeAreaView>

        </View>

    )





}
export default Settingss

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