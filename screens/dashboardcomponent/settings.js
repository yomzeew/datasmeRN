import { SafeAreaView, View, TouchableOpacity, Text, ScrollView, Keyboard, StyleSheet, Platform, TextInput, KeyboardAvoidingView, Settings, Alert, Modal } from "react-native"
import { fieldtextone, fieldtexttwo } from "../services/textsetting"
import { useEffect, useState } from "react"
import { AntDesign, Octicons, FontAwesome, FontAwesome5, Entypo } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native"
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, Easing  } from 'react-native-reanimated';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { updatedetails, updatepass, updatepin, userdetails } from "../services/endpoints"
import axios from "axios"
import Preloadertwo from "../preloadertwo"
import Header from "./header"
import { primaryColor } from "../services/colortheme"
const Settingss = () => {
    const primary=primaryColor()
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
    const [viewDone,setViewDone]=useState(false)
    const [loaderupdate,setloaderupdate]=useState(false)
    const [Editplatform,setEditplatform]=useState('')
    const [currentvalue,setcurrentvalue]=useState('')
    const [errormessage,seterrormessage]=useState('')
    const [oldpassword,setoldpassword]=useState('')
    const [password,setpassword]=useState('')
    const [showold,setshowold]=useState(true)
    const [shownew,setshownew]=useState(true)
    const [showoldpin,setshowoldpin]=useState(true)
    const [shownewpin,setshownewpin]=useState(true)
    const [pin,setpin]=useState('')
    const [oldpin,setoldpin]=useState('')
    const [showconfirm,setshowconfirm]=useState(true)
    const [confirmpassword,setconfirmpassword]=useState('')
    const [showconfirmpin,setshowconfirmpin]=useState(true)
    const [confirmpin, setpinconfirm]=useState('')




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
    const handleupdate = (value) => {
        setEditplatform(value)
        setEditView(true)
    }
    const handleclose=()=>{
        setEditView(false)

    }
   
    const bounceValue = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => {
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
    
  
      
    const HandleUpdate=async()=>{
        if(Editplatform==='phoneno'){
            const data={
                number:phoneno,
                username:username,
                email:email,
                fullname:fullname,
                }
                const mytoken = await AsyncStorage.getItem('mytoken')
                const mytokenreal = JSON.parse(mytoken)
                try{
                    setloaderupdate(true)
                    const response=await axios.post(updatedetails,data,{
                        headers:{
                            Authorization:`Bearer ${mytokenreal}`
                        }
                    })
                    if(response.data.status===200){
                        setViewDone(true)
                        setEditView(false)
                        handleBounce()
                    }
                
                }catch(error){
                console.error(error)
                }
                finally{
                    setloaderupdate(false)
                
                }
                    }

                 
        else if (Editplatform==='password'){
            if (password !== confirmpassword) {
                seterrormessage('Password and confirmation password do not match.');
                return;
              }
              
              
            const data={
               oldPassword:oldpassword,
                newPassword:password,
                conPassword:confirmpassword,
                }
                const mytoken = await AsyncStorage.getItem('mytoken')
                const mytokenreal = JSON.parse(mytoken)
                try{
                    setloaderupdate(true)
                    const response=await axios.post(updatepass,data,{
                        headers:{
                            Authorization:`Bearer ${mytokenreal}`
                        }
                    })
                    console.log(response.data)
                    if(response.data.status===200){
                        await AsyncStorage.getItem('passdata').then((storedObject) => {
                            const storedObj=JSON.parse(storedObject)
                            const myObject={email:storedObj.email,password:password,status:storedObj.status}
                            AsyncStorage.setItem('passdata',JSON.stringify(myObject))
                        })
                       
                        setViewDone(true)
                        setEditView(false)
                        handleBounce()
                        seterrormessage('')
                    }
                
                }catch(error){
                console.error(error)
                const errormsg=error.response.data
            const errmsg=errormsg.errors[0].msg
            seterrormessage(errmsg.toString())
            console.log(errormsg.errors[0].msg)
                }
                finally{
                    setloaderupdate(false)
                
                }
            

        }  
        else if (Editplatform==='pin'){
            if(pin !== confirmpin){
                seterrormessage('Pin and confirmation pin do not match.');
                return
            }
            const data={
                oldPin:oldpin,
                newPin:pin,
                conPin:confirmpin,
                }
                const mytoken = await AsyncStorage.getItem('mytoken')
                const mytokenreal = JSON.parse(mytoken)
                try{
                    setloaderupdate(true)
                    const response=await axios.post(updatepin,data,{
                        headers:{
                            Authorization:`Bearer ${mytokenreal}`
                        }
                    })
                    console.log(response.data)
                    if(response.data.status===200){
                        setViewDone(true)
                        setEditView(false)
                        handleBounce()
                        seterrormessage('')
                    }
                
                }catch(error){
                console.error(error)
                const errormsg=error.response.data
            const errmsg=errormsg.errors[0].msg
            seterrormessage(errmsg.toString())
            console.log(errormsg.errors[0].msg)
                }
                finally{
                    setloaderupdate(false)
                
                }
            

        }  
    } 

    useEffect(() => {
        const timeoutId = setTimeout(() => {
          setViewDone(false)
        }, 3000);
        return () => clearTimeout(timeoutId);
      }, [viewDone])
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
                       {Editplatform==='phoneno' && <View>
                            <Text>Phone Number</Text>
                        <TextInput
                            className="border-slate-400 h-12 text-lg border rounded-lg px-3"
                            keyboardType="numeric"
                            value={phoneno}
                            onChangeText={(text)=>setphoneno(text)}
                        />

                        </View>}
                        {Editplatform==='password' && <View>
                            <View className="items-center"><Text className="font-bold text-red-500">{errormessage}</Text></View>
                            <ScrollView>
                            <Text className="mt-3">Old Psssword</Text>
                            <View className="w-full">
                                <View className="absolute right-0 h-12 z-50  justify-center flex px-3">
                                <TouchableOpacity onPress={()=>setshowold(!showold)}>{showold?<FontAwesome5 name="eye" size={20} color={primary} />:<FontAwesome5 name="eye-slash" size={20} color={primary} />}</TouchableOpacity>
                                    </View>
                            
                        <TextInput
                            className="border-slate-400 h-12 text-lg border rounded-lg px-3"
                            onChangeText={(text)=>setoldpassword(text)}
                            secureTextEntry={showold}
                        />
                             </View>
                             
                           
                        <View className="mt-3">
                        <Text>New Password</Text>
                        <View className="w-full">
                                <View className="absolute right-0 h-12 z-50 justify-center flex px-3">
                                <TouchableOpacity onPress={()=>setshownew(!shownew)}>{shownew?<FontAwesome5 name="eye" size={20} color={primary} />:<FontAwesome5 name="eye-slash" size={20} color={primary} />}</TouchableOpacity>
                                    </View>
                            
                                    <TextInput
                            className="border-slate-400 h-12 text-lg border rounded-lg px-3"
                            onChangeText={(text)=>setpassword(text)}
                            secureTextEntry={shownew}
                        />
                             </View>
                        
                            </View>
                            <View className="mt-3">
                        <Text>Confirm Password</Text>
                        <View className="w-full">
                                <View className="absolute right-0 h-12 z-50 justify-center flex px-3">
                                <TouchableOpacity onPress={()=>setshowconfirm(!showconfirm)}>{showconfirm?<FontAwesome5 name="eye" size={20} color={primary} />:<FontAwesome5 name="eye-slash" size={20} color={primary} />}</TouchableOpacity>
                                    </View>
                            
                                    <TextInput
                            className="border-slate-400 h-12 text-lg border rounded-lg px-3"
                            onChangeText={(text)=>setconfirmpassword(text)}
                            secureTextEntry={showconfirm}
                            
                        />
                             </View>
                        
                            </View>

                            </ScrollView>
                            
                        

                        </View>}
                        {Editplatform==='pin' && <View>
                            <View className="items-center"><Text className="font-bold text-red-500">{errormessage}</Text></View>
                            <ScrollView>
                            <Text className="mt-3">Old Pin</Text>
                            <View className="w-full">
                                <View className="absolute right-0 h-12 z-50  justify-center flex px-3">
                                <TouchableOpacity onPress={()=>setshowoldpin(!showoldpin)}>{showoldpin?<FontAwesome5 name="eye" size={20} color={primary} />:<FontAwesome5 name="eye-slash" size={20} color={primary} />}</TouchableOpacity>
                                    </View>
                            
                        <TextInput
                            className="border-slate-400 h-12 text-lg border rounded-lg px-3"
                            onChangeText={(text)=>setoldpin(text)}
                            secureTextEntry={showoldpin}
                            keyboardType="numeric"
                            returnKeyType="done"
                            returnKeyLabel="Done"
                        />
                             </View>
                           
                        <View className="mt-3">
                        <Text>New Pin</Text>
                        <View className="w-full">
                                <View className="absolute right-0 h-12 z-50 justify-center flex px-3">
                                <TouchableOpacity onPress={()=>setshownewpin(!shownewpin)}>{shownewpin?<FontAwesome5 name="eye" size={20} color={primary} />:<FontAwesome5 name="eye-slash" size={20} color={primary} />}</TouchableOpacity>
                                    </View>
                            
                                    <TextInput
                            className="border-slate-400 h-12 text-lg border rounded-lg px-3"
                            onChangeText={(text)=>setpin(text)}
                            secureTextEntry={shownewpin}
                            keyboardType="numeric"
                            returnKeyType="done"
                            returnKeyLabel="Done"
                        />
                             </View>
                        
                            </View>
                            <View className="mt-3">
                        <Text>Confirm Pin</Text>
                        <View className="w-full">
                            
                                <View className="absolute right-0 h-12 z-50 justify-center flex px-3">
                                <TouchableOpacity onPress={()=>setshowconfirmpin(!showconfirmpin)}>{showconfirmpin?<FontAwesome5 name="eye" size={20} color={primary} />:<FontAwesome5 name="eye-slash" size={20} color={primary} />}</TouchableOpacity>
                                    </View>
                            
                                    <TextInput
                            className="border-slate-400 h-12 text-lg border rounded-lg px-3"
                            onChangeText={(text)=>setpinconfirm(text)}
                            secureTextEntry={showconfirmpin}
                            keyboardType="numeric"
                            returnKeyType="done"
                            returnKeyLabel="Done"
                          
                        />
                             </View>
                        
                            </View>
                            </ScrollView>
                        

                        </View>}
                        <TouchableOpacity onPress={HandleUpdate} className="h-12 bg-regal-blue mt-3 rounded-xl flex justify-center items-center">{loaderupdate?<Preloadertwo/>:<Text className="text-white font-bold py-3 text-center">Update</Text>}</TouchableOpacity>

                        </View>
                       

                    </View>



                </View>
            </View>}
            {viewDone &&
            <View className="h-full w-full absolute flex justify-center items-center z-50 ">
            <View className="bg-slate-400 h-full w-full absolute opacity-70 flex justify-center items-center" />
            <View className="px-3 w-full">
                <View className="w-full items-center flex justify-center px-10 py-5">
                   
                <View className="bg-slate-50 px-3 w-44 py-3 abosolute z-50 rounded-xl">
                       
                       <Animated.View style={[animatedStyles ]} className="h-16 flex justify-center items-center">
                       <AntDesign name="checkcircle" size={30} color={primary} />
                        <Text className={`${fieldtexttwo} font-semibold`}>Done</Text>
                        </Animated.View>
                       </View>
                   

                </View>



            </View>
        </View>}
            {loader &&
                <View className="bg-slate-400 h-full w-full absolute z-50 opacity-70 flex justify-center items-center">
                    <Preloadertwo />
                </View>
            }
            <SafeAreaView style={styles.andriod} className="flex-1 flex w-screen h-full bg-slate-50">
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
                <View className="flex-1">
                    <ScrollView showsVerticalScrollIndicator={false}>
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
                                    <TouchableOpacity onPress={()=>handleupdate('phoneno')}>
                                        <Entypo name="edit" size={24} color={primary} />
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
                                <FontAwesome5 name="eye-slash" size={24} color={primary} />
                            </TouchableOpacity>

                        </View>
                        <View className="px-3 items-center flex justify-between flex-row">
                            <View>
                                <Text className="mt-2">Change Password</Text>
                                <Text className={`${fieldtextone}`}>******</Text>

                            </View>
                            <View className="flex flex-row">
                                    <TouchableOpacity onPress={()=>handleupdate('password')}>
                                        <Entypo name="edit" size={24} color={primary} />
                                        <Text>Edit</Text>
                                    </TouchableOpacity>


                                </View>

                        </View>
                        <View className="px-3 items-center flex justify-between flex-row">
                            <View>
                                <Text className="mt-2">Change Pin</Text>
                                <Text className={`${fieldtextone}`}>******</Text>

                            </View>
                            <View className="flex flex-row">
                                    <TouchableOpacity onPress={()=>handleupdate('pin')}>
                                        <Entypo name="edit" size={24} color={primary} />
                                        <Text>Edit</Text>
                                    </TouchableOpacity>


                                </View>

                        </View>

                    </View>
                    <View className="mt-3 items-center">
                        <TouchableOpacity onPress={Enrollfunction} className="items-center flex justify-center border-b border-b-blue-300">
                            <Text className={`${fieldtextone} text-regal-blue`}>Enroll Your Biometric</Text>
                        </TouchableOpacity>

                    </View>

                    <View className="mt-5 items-center">
                        <TouchableOpacity onPress={handlelogout} className="bg-regal-blue px-2 py-2 rounded-xl w-24 items-center flex justify-center">
                            <Text className={`${fieldtextone} text-white`}>Sign Out</Text>
                        </TouchableOpacity>

                    </View>
                    </ScrollView>


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