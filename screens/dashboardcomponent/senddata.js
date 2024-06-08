import { FontAwesome5, AntDesign } from "@expo/vector-icons"
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { ScrollView, TextInput } from "react-native"
import { Text, SafeAreaView, TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, Button } from "react-native"
import { fieldtextone, fieldtexttwo } from "../services/textsetting"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isLessThanOneHour } from "../services/expireTimestamp"
import { getProductData } from "../services/getdatas"
import ModalList from "../modals/ModalList"
import JsonData from "../services/selectionData.json"
import { StatusBar } from 'expo-status-bar';
import { validateformat } from "../services/validations";
import BulkData from "./bulkdata";
import PinModal from "../modals/PinModal";
import Preloadertwo from "../preloadertwo";
import Header from "./header";
import ConfirmationPage from "../modals/ConfirmationPage";



const SendData = () => {
    const [hkey, sethkey] = useState('flex-1')
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const navigation = useNavigation()
    const [gettoken, settoken] = useState('')
    const [getdata, setdata] = useState([])
    const [datachoose, setdatachoose] = useState([])
    const [showmodal, setshowmodal] = useState(false)
    const [getindex, setindex] = useState('');
    const [Planselect,setPlanselect]=useState('')
    const [NetworkName, setNetworkName] = useState('')
    const [getkeytosend, setkeytosend] = useState('')
    const [subplanName,setSubplanName]=useState('')
    const [ServiceID,setServiceID]=useState('')
    const [movement, setmovement] = useState(300)
    const [isDisable,setisDisable]=useState(true)
    const [phonenosvalue,setphonenosvalue]=useState('')
    const [BeneficiaryArray,setBeneficiaryArray]=useState([])
    const [Sendarray,setSendArray]=useState([])
    const [errormessage,seterrormessage]=useState('')
    const [showbulk,setshowbulk]=useState(false)
    const [showConf,setshowConf]=useState(false)
    const [showpin,setshowpin]=useState(false)
    const [Loader, setLoader]=useState(true)
   const [testnumber,settestnumber]=useState('')
    const functiongetExp = async () => {
        const getTime = await AsyncStorage.getItem('mytimestamp')
        const checktoken = isLessThanOneHour(parseInt(getTime, 10))
        if (checktoken === false) {
            navigation.navigate('login')

        }
        else {
            try{
            setLoader(true)
            const mytoken = await AsyncStorage.getItem('mytoken')
            const mytokenreal = JSON.parse(mytoken)
            settoken(mytokenreal)
            const mydataall = await getProductData('data', mytokenreal)
           
            setdata(mydataall)

            }catch(error){

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

   


    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardStatus(true);
            sethkey('h-80')
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardStatus(false);
            sethkey('flex-1')
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);
    const translateY = useSharedValue(300);
    const handleshownetwork = async () => {
        setdatachoose(JsonData)
        setkeytosend('categoryText')
        translateY.value = withSpring(0);
        setshowmodal(true)

    }
    const handleshowplan = async () => {
        setdatachoose(JsonData[getindex].plans)
        console.log(JsonData[getindex].plans)
        setkeytosend('')
        translateY.value = withSpring(0);
        setshowmodal(true)

    }
    const  handlesubplan=async()=>{
        const plans=getdata.plans
        if(!Planselect){
            return
        }
        const getsubplanarray=plans.filter((item)=>(
            item.categoryText===Planselect

        ));
        setdatachoose(getsubplanarray)
        console.log(getsubplanarray)
        setshowmodal(true)
        setkeytosend("counter")
        translateY.value = withSpring(0);
    }
    const handleclose = (value) => {
        setshowmodal(value)
        translateY.value = withSpring(300);

    }
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));
    const handlegetObjectindex = (value) => {
       
        if(getkeytosend===''){
            setPlanselect(datachoose[value])
           
            

        }
        else if(getkeytosend==='categoryText'){
            setindex(value)
            setNetworkName(datachoose[value].network)
            setPlanselect('')
            setSubplanName('')
            setisDisable(false)
            
        }
        else{
            setindex(value)
            setisDisable(true)
            setSubplanName(datachoose[value].counter+'-'+datachoose[value].amount)
            if(BeneficiaryArray.length>0){
                const newArray=[...BeneficiaryArray]
                for (let i = 0; i < newArray.length; i++) {
                    newArray[i].subplan=datachoose[value].counter+'-'+datachoose[value].amount
                    
                }
                setBeneficiaryArray(newArray)
            }
            setServiceID(datachoose[value].productId)
           

        }
      
        
    }
    useEffect(() => {
        const text = testnumber.replace(/[-\s]/g, ''); // Remove existing hyphens and spaces
        let formattedNumber = '';
        for (let i = 0; i < text.length; i++) {
            if (i > 0 && i % 11 === 0) { // Add hyphen after every 11 characters
                formattedNumber += ' - ';
            }
            formattedNumber += text[i];
        }
        settestnumber(formattedNumber);
    }, [testnumber]);

    const handlephone = (text) => {
        settestnumber(text)
    }
   useEffect(() => {
    if (!testnumber) {
        return;
    }
    const text = testnumber.replace(/[-\s]/g, ''); 
    const arrayphone = text.match(/.{1,11}/g);
    let valuephone = "";
    let arraybeneciaryy=[]
    let arraytosend=[]

    for (let i = 0; i < arrayphone.length; i++) {
        // Append each sliced phone number with a dash ("-")
        valuephone += arrayphone[i] + "-";
        if(validateformat(arrayphone[i])){
            seterrormessage('')
        }
        else{
            seterrormessage(`Check for Invalid Phone Number at ${arrayphone[i]}`)
        }
        if(arrayphone[i].length===11){
            //get network id
            const getnetworkarray=JsonData.filter((item)=>(
                item.network===NetworkName
            ))
            const networkid=getnetworkarray[0].id
            const getarray={beneficiary:arrayphone[i],networkid:networkid,smeplan:Planselect,subplan:subplanName,serviceId:ServiceID}
            const datasend={beneficairy:arrayphone[i],network:networkid,serviceID:ServiceID}
            arraybeneciaryy.push(getarray)
            arraytosend.push(datasend)
            
        }
        
    }
    // Remove the trailing dash ("-") at the end
    valuephone = valuephone.slice(0, -1);

    // Update the state with the formatted phone numbers
    setphonenosvalue(valuephone);
    setBeneficiaryArray(arraybeneciaryy)
    setSendArray(arraytosend)

    console.log(BeneficiaryArray);
    console.log(Sendarray);
}, [testnumber,phonenosvalue]);

const translateYbulk = useSharedValue(800);
const handlebulkshow=()=>{
    if(BeneficiaryArray.length>0){
        translateYbulk.value = withSpring(0);
        setshowbulk(true)
        console.log('ok')

    }
    else{
        return
    }
   
}
const animatedStylesbulk = useAnimatedStyle(() => ({
    transform: [{ translateY: translateYbulk.value }],
}));
const handleclosebulk=(value)=>{
    setshowbulk(value)
    translateYbulk.value=withSpring(-800)


}

const translateYpin= useSharedValue(800);
const animatedStylespin = useAnimatedStyle(() => ({
    transform: [{ translateY: translateYpin.value }],
}));
const handleclosepin=(value)=>{
    setshowpin(value)
    translateYpin.value=withSpring(-800)


}
const handleshowpin=()=>{
    if(BeneficiaryArray.length>0){
        translateYpin.value = withSpring(0);
        setshowpin(true)
        
        

    }
    else{
        return
    }
   
   
}

const handlefinadata=(value,valuetwo)=>{
    setBeneficiaryArray(value)
    setSendArray(valuetwo)
    
}
const translateYConf = useSharedValue(800);
const handleConfshow=()=>{
    if(BeneficiaryArray.length>0){
        translateYConf.value = withSpring(0);
        setshowConf(true)
        console.log('ok')

    }
    else{
        return
    }
   
}
const animatedStylesConf = useAnimatedStyle(() => ({
    transform: [{ translateY: translateYConf.value }],
}));
const handlecloseConf=(value)=>{
    setshowConf(value)
    translateYConf.value=withSpring(-800)


}
    return (
        <View className="h-full">
             {Loader &&
                <View className="bg-slate-400 h-full w-full absolute z-50 opacity-70 flex justify-center items-center">
                <Preloadertwo/>
                </View>
                }
                 
                

             <SafeAreaView style={styles.andriod} className="h-full w-screen bg-slate-50">
             <StatusBar style="dark" />
            
            {showmodal && <View className="bottom-0 absolute z-50">
                <Animated.View style={[animatedStyles]}>
                    <ModalList
                        data={datachoose}
                        keytosend={getkeytosend}
                        close={(value) => handleclose(value)}
                        getobjectselectindex={(objectindex) => handlegetObjectindex(objectindex)}
                        planselect={Planselect}
                        
                    />

                </Animated.View>
            </View>

            }
            {showbulk&&
            <View className="bottom-0 absolute z-50  w-screen bg-white">
                <Animated.View style={[animatedStylesbulk]}>
                <BulkData
                Beneficiary={BeneficiaryArray} 
                close={(value) => handleclosebulk(value)}
                smeplan={Planselect}
                subplan={subplanName}
                data={getdata}
                arraytosend={Sendarray}
                finaldata={(value,valuetwo)=>handlefinadata(value,valuetwo)}
                />

                </Animated.View>
                
                
            </View>

            }
            {showpin&&
            <View className="bottom-0 h-5/6 absolute z-50  w-screen">
            <Animated.View  style={[animatedStylespin]}>
            <PinModal
            alldata={getdata}
            senddata={Sendarray}
            close={(value) => handleclosepin(value)}
            beneficairyarray={BeneficiaryArray}
            interfacePin={'data'}

            />

            </Animated.View>
            
            
        </View>

            }
             {showConf&&
            <View className="bottom-0 h-full absolute z-50  w-screen">
            <Animated.View  style={[animatedStylesConf]}>
            <ConfirmationPage
            alldata={getdata}
            senddata={Sendarray}
            close={(value) => handlecloseConf(value)}
            beneficairyarray={BeneficiaryArray}
            interfacePin={'data'}

            />

            </Animated.View>
            
            
        </View>

            }
           <Header
           title={'Data Subscription'}
           />
            {(showmodal || showbulk ||showConf) && <View className="bg-slate-400 h-full w-full absolute z-40 opacity-70 flex justify-center items-center"></View>}
            
            <View className="flex gap-5  justify-center mt-5 flex-row">
                <TouchableOpacity className="bg-regal-blue  rounded-xl h-10 px-3 items-center flex justify-center">
                    <Text className="text-white">Single Purchase</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlebulkshow} className="bg-white text-white rounded-xl h-10 px-3 items-center flex justify-center">
                    <Text>Bulk Purchase</Text>
                </TouchableOpacity>

            </View>
            <View className={`px-5 ${hkey}`}>
                <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={{ flexGrow: 1 }}>
                    <View className="mt-5">
                        <Text className={fieldtextone}>Select Network</Text>
                        <TouchableOpacity onPress={handleshownetwork} className="h-12 w-full border rounded-xl bg-slate-100 border-slate-400 items-center justify-between flex flex-row px-3">
                            <Text className={fieldtextone}>{NetworkName || '---'}</Text>
                            

                        </TouchableOpacity>

                    </View>
                    <View className="mt-5">
                        <Text className={fieldtextone}>Select Plan</Text>
                        <TouchableOpacity 
                        onPress={isDisable?null:handleshowplan} 
                        className="bg-slate-100 h-12 w-full border rounded-xl border-slate-400 items-center justify-between flex flex-row px-3">
                        <Text className={fieldtextone}>{Planselect || '---'}</Text>
                           

                        </TouchableOpacity>

                    </View>
                    <View className="mt-5">
                        <Text className={fieldtextone}>Select Sub Plan</Text>
                        <TouchableOpacity onPress={handlesubplan} className="bg-slate-100 h-12 w-full border rounded-xl border-slate-400 items-center justify-between flex flex-row px-3">
                        <Text className={fieldtextone}>{subplanName|| '---'}{subplanName?'naira':''}</Text>
                            

                        </TouchableOpacity>

                    </View>
                
                    <View className="mt-3">
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                            <Text className={`font-bold ${fieldtextone} text-slate-500`}>Enter Phone Number</Text>
                            <TextInput
                                className="bg-slate-100 border h-12 rounded-xl border-slate-400 px-3 text-lg"
                                onChangeText={(text) => { handlephone(text) }}
                                value={testnumber}
                                keyboardType="numeric"
                            />
                        </KeyboardAvoidingView>
                    </View>
                    <TouchableOpacity onPress={handleConfshow} className="w-full bg-regal-blue items-center h-10 rounded-xl mt-3 flex justify-center">
                            <Text className={`text-white ${fieldtextone}`}>CONTINUE</Text>
                        </TouchableOpacity>

                </ScrollView>
            </View>


        </SafeAreaView>

        </View>
       
    )

}
export default SendData
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