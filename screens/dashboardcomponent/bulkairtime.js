import {View,Text,TouchableOpacity,TextInput} from 'react-native'
import {fieldtextone, fieldtexttwo} from '../services/textsetting.js'
import { ScrollView } from 'react-native'
import { FontAwesome5,AntDesign,Octicons} from "@expo/vector-icons"
import { useEffect,useState } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

import ModalListairtime from '../modals/ModalListairtime.js'
const BulkAirtime=({Beneficiary,close,network,data,finaldata,arraytosend,JsonData})=>{
    const [beneficiarys,setbeneficiarys]=useState(Beneficiary)
    const [SendArrays,setSendArrays]=useState(arraytosend)
    const [selectplan,setselectplan]=useState(network)
    const [selectamount,setselectamount]=useState('')
    const [showamountbox,setshowamountbox]=useState(false)
    const [getindex,setindex]=useState(null)
    const[datanew,setdatanew]=useState([])
    const [showplan,setshowplan]=useState(false)
    useEffect(()=>{
        const getdataplans=data.category

    },[])
    const handleclose=()=>{
        close(false)
    }
    const translateY = useSharedValue(300);
    const handleselectPlan=(value)=>{
        setindex(value)
        setshowplan(true)
        const plans=data.category
        if(!selectplan){
            return
        }
        const getsubplanarray=JsonData.filter((item)=>(
            item.network.toLowerCase()===selectplan.toLowerCase()

        ));
        setdatanew(getsubplanarray[0].plans)
        translateY.value = withSpring(0);

      

   
   
}
const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
}));

const handleclosePlan=(value)=>{
   
    setshowplan(value)
    translateY.value=withSpring(300)


}
const translateYbox = useSharedValue(300);
const animatedStylesbox = useAnimatedStyle(() => ({
    transform: [{ translateY: translateYbox.value }],
}));
const handleeditamount=(value)=>{
    setshowamountbox(true)
    setindex(value)
    translateYbox.value=withSpring(0)

}
const handleamount=(text)=>{
setselectamount(text)
}
const handlegetObjectindex=(value)=>{
   
    const getdataplans=data.category
    const getproductId=getdataplans.filter((item)=>(
        item.productText.toLowerCase()===datanew[value].toLowerCase()
    ))

    const getserviceid=getproductId[0].productId
    const newArray=[...beneficiarys]
    const newArraytosend=[...SendArrays]
    console.log(getserviceid)
    newArraytosend[getindex].serviceId=getserviceid
    newArray[getindex].serviceID=getserviceid
    newArray[getindex].plan=datanew[value]
    setbeneficiarys(newArray)
    setSendArrays(newArraytosend)
   
    finaldata(beneficiarys,SendArrays)
    
}
const handlecloseamount=()=>{
    setshowamountbox(false)
}
useEffect(()=>{
    if(!selectamount){
        return
    }
    const newArray=[...beneficiarys]
    const newArraytosend=[...SendArrays]
   
    newArraytosend[getindex].amount=selectamount
    newArray[getindex].amount=selectamount
    finaldata(beneficiarys,SendArrays)
},[selectamount])

    return(
        <View className="py-10 px-3 h-screen ">
            {showplan&& <View className="bottom-0 absolute z-50">     
           <Animated.View style={[animatedStyles]}>
            <ModalListairtime
              close={(value)=> handleclosePlan(value)}
              datachoose={datanew}
              selection={'plan'}
              getobjectselectindex={(value)=>handlegetObjectindex(value)}
          
         
                    />
                    </Animated.View>

            </View>}
            {showamountbox&& <View className="bottom-0 absolute z-50 h-full w-screen px-3 ">     
           <Animated.View style={[animatedStylesbox]} className="w-full">
           <View className="mt-5 bg-white w-full items-center rounded-xl shadow-md shadow-black flex flex-col justify-center h-3/4">
               <TouchableOpacity  onPress={handlecloseamount} className=""><Octicons name="horizontal-rule" size={30} color="grey" /></TouchableOpacity>
            <View className="items-center flex-1 py-10">
            <Text className={fieldtextone}>Enter Amount(min 50naira-max 5000naira)</Text>
                        <TextInput
                                className="bg-slate-100 w-64 border h-12 rounded-xl border-slate-400 px-3 text-lg"
                                onChangeText={(text) => { handleamount(text) }}
                                keyboardType="numeric"
                            />
                            <TouchableOpacity onPress={handlecloseamount} className="bg-blue-500 mt-3 w-64 h-10 items-center flex justify-center rounded-xl">
                                <Text className={`${fieldtextone} text-white`}>Submit</Text>
                            </TouchableOpacity>

            </View>
                   

                    </View>
          
                    </Animated.View>

            </View>}
            <View>
            <View className="items-end">
                <TouchableOpacity onPress={handleclose}><FontAwesome5 name="times-circle" color="navy" size={30} /></TouchableOpacity>
            </View>
            <View className="items-center">
            <Text className={`${fieldtexttwo} font-bold text-blue-900`}>
             Select Plan for each beneficiary
            </Text>
            </View>
            </View>
             <ScrollView showsVerticalScrollIndicator={false} >
            {beneficiarys.length>0?Beneficiary.map((item,index)=>(
            <View key={index} className="mt-2">
                <Text className={`${fieldtextone} font-bold`}>Select Plan for <Text className="text-red-500">{item.beneficiary}</Text> </Text>
                <TouchableOpacity onPress={()=>handleselectPlan(index)} className="h-12 w-full border rounded-xl bg-slate-100 border-slate-400 items-center justify-between flex flex-row px-3">
                            <Text>{item.plan}</Text>
                            <TouchableOpacity><AntDesign name="down" size={24} color="black" /></TouchableOpacity>

                        </TouchableOpacity>
                        <TouchableOpacity  className="h-12 w-full border rounded-xl bg-slate-100 border-slate-400 items-center justify-between flex flex-row px-3 mt-3">
                            <Text>{item.amount}</Text>
                            <TouchableOpacity onPress={()=>handleeditamount(index)}><AntDesign name="edit" size={24} color="black" /></TouchableOpacity>

                        </TouchableOpacity>

            </View>
            )):
            <View>
                <Text>No Records</Text>

            </View>

            }
             <TouchableOpacity onPress={handleclose} className="mt-5 w-full bg-blue-500 items-center h-10 rounded-xl flex justify-center">
                            <Text className={`text-white ${fieldtextone}`}>SAVE PLAN</Text>
                        </TouchableOpacity>

            </ ScrollView>
            
        </View>
    )

}
export default BulkAirtime