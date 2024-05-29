import { View,Text,TouchableOpacity, ScrollView,Image } from "react-native"
import { mydata } from "../services/sampledata"
import { useEffect, useState } from "react"
import { FontAwesome5} from "@expo/vector-icons"
import { fieldtextone } from "../services/textsetting"
// data,keytosend,close,getobjectselectindex,planselect
const ModalListairtime=({datachoose,close,selection,getobjectselectindex})=>{
    const [mydata,setdata]=useState(datachoose||[])
     
    const handleclosetwo=()=>{
        close(false)
    }
  const handlevalue=(value)=>{
    getobjectselectindex(value)
    close(false)

  }
    return(
        <View className="w-screen h-screen">
             <View className="absolute bottom-0  w-full px-2 py-3 h-auto bg-white  border border-slate-400 rounded-xl shadow-lg">
        <View className="items-end">
        <TouchableOpacity onPress={handleclosetwo}>
            <FontAwesome5 name="times-circle" color="navy" size={30} />
   </TouchableOpacity>
        </View>
        <View>
        <ScrollView
        showsVerticalScrollIndicator={false} 
        >
            {mydata.length>0?mydata.map((item,index)=>{
                let itemshow
                if(selection==='network'){
                    itemshow=item.categoryText
                }
                else if(selection==='plan'){
                    itemshow=item
                }
                return(
                <TouchableOpacity key={index} onPress={()=>handlevalue(index)} className="bg-slate-100 px-5 h-12 flex justify-center w-full border-b border-t border-blue-200 mt-2">
                    <Text className={`${fieldtextone} font-bold text-blue-900`}>
                       {itemshow}
                    </Text>
                </TouchableOpacity>

            )}):<View><Text>No Records Found</Text></View>

            }
            
       </ScrollView>
       <View className="items-center">
        <Image source={require('../images/networkslogo.jpg')} resizeMode="cover" className="w-64 h-32" />
       </View>

        </View>
   
     
</View>


        </View>
        
    )
}
export default ModalListairtime