
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isLessThanOneHour } from "../services/expireTimestamp"
import axios from "axios"
import { transactions } from "../services/endpoints"
import { Text, View } from "react-native";
import { fieldtextone } from "./textsetting";
export const functiongetdata = async (month,year) => {
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
        const filteredData = transactiondata.filter(transaction => {
            const date = new Date(transaction.date);
            return date.getMonth() === month && date.getFullYear()===year; // 3 represents April (months are 0-indexed)
          });
          const content=filteredData.length>0&&filteredData.map((item,index)=>(
           <View className="border-b border-slate-300 w-full flex justify-between flex-row items-center">
            <View>
                <Text>{item.descr}</Text>
                <Text>{item.date} {item.time}</Text>
            </View>
            <View>
                <Text className={`${fieldtextone} font-bold`}>{item.debit===0?'+'+item.amount:item.debit}</Text>
                {item.status==='successfull'&&
                <Text className="text-green-500">Successfull</Text>
                ||item.status==='pending'&&<Text className="text-orange-500">Pending</Text>
                ||item.status==='failed' &&<Text className="text-red-500">Failed</Text>
                }
                
            </View>


           </View>

          ))
          return content
          
       
       

       }catch(error){
        console.log(error)

       }





    }

}