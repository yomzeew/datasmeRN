import { View,Text,SafeAreaView,TouchableOpacity, StyleSheet,Platform, } from "react-native"
import { StatusBar } from "expo-status-bar"
import { useNavigation, useRoute } from "@react-navigation/native"
import { AntDesign, Octicons, FontAwesome5, Ionicons,MaterialIcons } from '@expo/vector-icons'
import { fieldtextone, fieldtexttwo } from "../services/textsetting"
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { htmlreceipt } from "../html/receipttemplate"


const Transactiondetails=()=>{
    const navigation=useNavigation()
    const route=useRoute()
    const {time,date,descr,debit,amount,beneficiary,trx,statusone}=route.params
    const handledashboard=()=>{
        navigation.navigate('transhistorytwo')

    }
    const handledownload=()=>{

    }
    const handleshare=async()=>{
    const html=htmlreceipt(date,time,trx,amount,debit,statusone,beneficiary,descr)
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });

    }

    return(
        <SafeAreaView style={styles.andriod} className="flex-1 flex w-screen h-full bg-slate-200">
                     <StatusBar style="dark" />
                     
                     <View className="flex gap-5 flex-row border-b border-slate-300 h-20 mt-5 w-screen px-5 items-center">
                        <TouchableOpacity onPress={handledashboard}><AntDesign name="leftcircle" size={30} color="navy" /></TouchableOpacity>
                        <Text className={`font-bold text-blue-500 ${fieldtexttwo}`}>Transaction Receipt</Text>
                    </View>
                    <View className="px-3 flex-1 flex items-center justify-center">
                        <View className="px-5 py-5 border border-blue-500 rounded-xl">
                        <View>
                        <Text className={`${fieldtexttwo} font-bold text-blue-900`}>Transaction Details</Text>
                        </View>
                        <View className="mt-3">
                            <Text className={`${fieldtextone}`}>Date:{date}</Text>
                            <Text className={`${fieldtextone}`}>Time:{time}</Text>
                            <Text className={`${fieldtextone}`}>Reference:{trx}</Text>
                            <Text className={`${fieldtextone}`}>Amount:N{amount}</Text>
                            <Text className={`${fieldtextone}`}>Type:{debit===0?'Credit':'Debit'}</Text>
                            <Text className={`${fieldtextone}`}>Status:{statusone}</Text>
                        </View>
                        <View className="mt-10">
                        <Text className={`${fieldtexttwo} font-bold text-blue-900`}>Account Details</Text>
                        </View>
                        <View>
                            <Text className={`${fieldtextone} font-bold`}>Beneficiary:{beneficiary}</Text>
                            <Text className={`${fieldtextone} font-bold`}>Description:{descr.toUpperCase()}</Text>
                        </View>

                        </View>
                        <View className="flex flex-row gap-5 mt-3 items-center">
                            <TouchableOpacity onPress={handleshare} className="bg-blue-700 h-12 flex flex-row w-28 items-center justify-center rounded-xl"><Text className={`${fieldtextone} text-white`}>Share</Text><MaterialIcons name="share" size={24} color="white" /></TouchableOpacity>
                        </View>
                    </View>
                   

                   
        
                    
                   
                   
        
        
                </SafeAreaView>
    )
}
export default Transactiondetails
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