import {View,Text,TouchableOpacity} from 'react-native'
import {fieldtextone, fieldtexttwo} from '../services/textsetting.js'
import { ScrollView } from 'react-native'
import { FontAwesome5,AntDesign} from "@expo/vector-icons"
import { useEffect,useState } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import ModalList from '../modals/ModalList.js'
const BulkData=({Beneficiary,close,smeplan,subplan,data,finaldata,arraytosend})=>{
    const [beneficiarys,setbeneficiarys]=useState(Beneficiary)
    const [SendArrays,setSendArrays]=useState(arraytosend)
    const [selectsme,setselectsme]=useState(smeplan)
    const [selectsubplan,setselectsubplan]=useState(subplan)
    const [selectamount,setselectamount]=useState('')
    const [getkeytosend,setkeytosend]=useState('')
    const [getindex,setindex]=useState(null)
    const[datanew,setdatanew]=useState([])
    const [showplan,setshowplan]=useState(false)
    useEffect(()=>{
        const getdataplans=data.plans

    },[])
    const handleclose=()=>{
        close(false)
    }
    const translateY = useSharedValue(300);
    const handleselectPlan=(value)=>{
        setindex(value)
        setshowplan(true)
        setkeytosend('counter')
        const plans=data.plans
        if(!selectsme){
            return
        }
        const getsubplanarray=plans.filter((item)=>(
            item.categoryText===selectsme

        ));
        setdatanew(getsubplanarray)
        translateY.value = withSpring(0);

      

   
   
}
const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
}));
const handleclosePlan=(value)=>{
   
    setshowplan(value)
    translateY.value=withSpring(300)


}
const handleselectindexplan=(value)=>{
    const getsubplan=datanew[value].counter
    const getamount=datanew[value].amount
    const getserviceid=datanew[value].productId
    const newArray=[...beneficiarys]
    const newArraytosend=[...SendArrays]
    newArraytosend[getindex].serviceId=getserviceid
    newArray[getindex].subplan=getsubplan+'-'+getamount
    newArray[getindex].serviceID=getserviceid
    setbeneficiarys(newArray)
    setSendArrays(newArraytosend)
   
    finaldata(beneficiarys,SendArrays)
    
}

    return(
        <View className="py-10 px-3 h-screen ">
            {showplan&& <View className="bottom-0 absolute z-50">     
           <Animated.View style={[animatedStyles]}><ModalList
                        data={datanew}
                        keytosend={getkeytosend}
                        close={(value) => handleclosePlan(value)}
                        planselect={smeplan}
                        getobjectselectindex={(value)=>handleselectindexplan(value)}
                    />
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
                <TouchableOpacity onPress={()=>handleselectPlan(index)} className="h-16 w-full border rounded-xl bg-slate-100 border-slate-400 items-center justify-between flex flex-row px-3">
                            <Text>{item.smeplan}-{item.subplan}</Text>
                            <TouchableOpacity><AntDesign name="down" size={24} color="black" /></TouchableOpacity>

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
export default BulkData