import { SafeAreaView, View, TouchableOpacity, Text, ScrollView, Keyboard, StyleSheet, Platform, TextInput, KeyboardAvoidingView } from "react-native"
import { fieldtextone, fieldtexttwo } from "../services/textsetting"
import { useEffect, useState } from "react"
import { AntDesign, Octicons, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native"
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isLessThanOneHour } from "../services/expireTimestamp"
import { StatusBar } from "expo-status-bar";
import axios from "axios"
import { transactions } from "../services/endpoints"
import Preloadertwo from "../preloadertwo"
import Header from "./header"
const TransHistorytwo = () => {
    const navigation = useNavigation()
    const [getdata, setdata] = useState([])
    const [visibility, setVisibility] = useState(Array(12).fill(true)); // Initialize visibility state for 12 months
    const [gettoken, settoken] = useState('')
    const [Success, setSuccessfull] = useState([])
    const [Failed, setFailed] = useState([])
    const [Pending, setPending] = useState([])
    const [datashow, setdatashow] = useState([])
    const [Loader, setLoader]=useState(true)
    const [newindex,setnewindex]=useState(new Date().getMonth())

    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    //get the month and year
   
    const year = new Date().getFullYear()

    const getdataall = async () => {
        const getTime = await AsyncStorage.getItem('mytimestamp')
        const checktoken = isLessThanOneHour(parseInt(getTime, 10))
        if (checktoken === false) {
            navigation.navigate('login')

        }
        else {
            const mytoken = await AsyncStorage.getItem('mytoken')
            const mytokenreal = JSON.parse(mytoken)
            settoken(mytokenreal)
            try {
                setLoader(true)
                const response = await axios.post(transactions, null, {
                    headers: {
                        Authorization: `Bearer ${mytokenreal}`,
                    }

                })
                console.log(response.data)
                setdata(response.data.transactions)
                const transactiondata = response.data.transactions
                setdata(transactiondata)
            } catch (error) {

            }
            finally{
                setLoader(false)
            }
        }
    }
    useEffect(() => {
        getdataall()
    }, [])

    const functiongetdata = (month, year) => {
        const filteredData = getdata.filter(transaction => {
          const date = new Date(transaction.date);
          return date.getMonth() === month && date.getFullYear() === year;
        });
        if (filteredData.length>0){
        return <View >{ filteredData.map((item, index) => (
          <TouchableOpacity onPress={()=>handledetails(item.time,item.date,item.descr,item.debit,item.amount,item.beneficiary,item.trx,item.status)} key={index} className="border-b border-slate-300 w-full flex justify-between flex-row items-center h-20">
            <View>
            <Text className={`${fieldtextone} font-bold text-slate-600`}>{item.beneficiary}</Text>
            <Text className={`text-sm font-bold text-slate-600`}>{item.descr.toUpperCase()}</Text>
              <Text>{item.date} {item.time}</Text>
            </View>
            <View className="items-center">
              <Text style={[styles.amount, { color: item.status === 'successfull' ? 'green' : item.status === 'pending' ? 'orange' : 'red' }]}>
                {item.debit === 0 ? `+${item.amount}` : item.debit}
              </Text>
              <Text style={{ color: item.status === 'successfull' ? 'green' : item.status === 'pending' ? 'orange' : 'red' }}>
                {item.status === 'successfull' ? 'Successfull' : item.status === 'pending' ? 'Pending' : 'Failed'}
              </Text>
            </View>
          </TouchableOpacity>
        ))}</View>;
    }
    else{
        return <View className="border-b border-slate-300 w-full flex justify-between flex-row items-center h-16">
            <Text>No Transaction Record</Text>
        </View>
    }
      };
    




    const handledashboard = () => {
        navigation.navigate('dashboard')

    }
    const width = useSharedValue(128);
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ width: width.value }],
    }));
    const handleToggleVisibility = (index) => {
        setVisibility((prevState) => {
          const newState = [...prevState];
          newState[index] = !newState[index]; // Toggle visibility for the clicked month
          return newState;
        });
      };
      const handledetails=(time,date,descr,debit,amount,beneficiary,trx,statusone)=>{
        navigation.navigate('transdetail',{time:time,date:date,descr:descr,debit:debit,amount:amount,beneficiary:beneficiary,trx:trx,statusone:statusone})
      }
      const handlenextprev=()=>{
        if(newindex<0){
            return
        }
        else{
            setnewindex((next)=>next-1)
        }
       

      }
      const handlenextd=()=>{
        if(newindex>new Date().getMonth()){
            return
        }
        else{
            setnewindex((next)=>next+1)
        }
       

      }




    return (
        <View className="h-full">
            {Loader &&
            <View className="bg-slate-400 h-full w-full absolute z-50 opacity-70 flex justify-center items-center">
            <Preloadertwo/>
            </View>
            }
              <SafeAreaView style={styles.andriod} className="flex-1 flex w-screen h-full bg-slate-50">
            <StatusBar style="auto" />
           
                <Header 
                title={'Transaction History'}
                />
            
            <View className="flex flex-1">
            <View className="flex flex-row justify-between px-5 mt-5">
                {newindex===0?<TouchableOpacity></TouchableOpacity>:<TouchableOpacity onPress={handlenextprev}><AntDesign name="caretleft" size={20} color="black" /></TouchableOpacity>}
                <Text className={`${fieldtexttwo} text-blue-900`}>{month[newindex]}</Text>
                {newindex===new Date().getMonth()?<TouchableOpacity></TouchableOpacity>:<TouchableOpacity onPress={handlenextd}><AntDesign name="caretright" size={20} color="black" /></TouchableOpacity>}
                </View>
                <ScrollView 
           showsVerticalScrollIndicator={false} 
           className="flex flex-1">
            <View className="px-3">{functiongetdata(newindex, year)}</View>
             </ScrollView>       
            </View>
           {/* {month.slice(0, monthindex).map((item, index) => (
                    <View className="px-3" key={index}>
                        <TouchableOpacity onPress={()=>handleToggleVisibility(index)} className="flex flex-row gap-2">
                            <Text className={`${fieldtextone} text-blue-700 font-bold`}>{item}</Text>
                            <Ionicons name={visibility[index] ?"caret-down-outline":"caret-up-outline"} size={24} color="black" />
                        </TouchableOpacity>
                      
                        {visibility[index] && functiongetdata(index, year)}
                       
                       
                    </View>
                ))} */}

          
           





        </SafeAreaView>
            
        </View>
        
      
    )





}
export default TransHistorytwo

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