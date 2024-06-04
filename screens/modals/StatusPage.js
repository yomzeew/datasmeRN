import { AntDesign,Feather,FontAwesome5,MaterialIcons} from '@expo/vector-icons';
import { Text, View,TouchableOpacity } from 'react-native';
import { fieldtextone, fieldtexttwo } from '../services/textsetting';
const Statuspage=({message,close,messagestatus,datamessage})=>{
    const handleclose=()=>{
        console.log('ok')
        close(false)
    }
    return(
        <View className="h-full w-full flex bg-white rounded-xl items-center">
            {messagestatus==='successfull'?<View className="flex-1 justify-center px-5">
            <View className="items-center"><AntDesign name="check" size={100} color="#509DFF" /></View>
            <Text className={`${fieldtexttwo} font-bold text-center`}>Success</Text>
            <Text className={`${fieldtextone} text-center`}>{message}</Text>
            
            <View className="mt-3 items-center">
                            <TouchableOpacity onPress={handleclose} className="bg-blue-500 h-12 flex flex-row w-full items-center justify-center rounded-xl"><Text className={`${fieldtextone} text-white`}>Ok</Text></TouchableOpacity>
                            <TouchableOpacity className="bg-blue-700 h-12 flex flex-row w-full items-center justify-center rounded-xl mt-3"><Text className={`${fieldtextone} text-white`}>Share</Text><MaterialIcons name="share" size={24} color="white" /></TouchableOpacity>
            </View>

            

            </View>:
            <View className="flex-1 justify-center px-5 ">
             <View className="items-center"><FontAwesome5 name="times-circle" color="red" size={100} /></View>
             <Text className={`${fieldtexttwo} font-bold text-center`}>Failed</Text>
            <Text className={`${fieldtextone} text-center`}>{message}</Text>
             <View className="mt-3 items-center">
                            <TouchableOpacity onPress={handleclose} className="bg-blue-500 h-12 flex flex-row w-full items-center justify-center rounded-xl"><Text className={`${fieldtextone} text-white`}>Try Again</Text></TouchableOpacity>
                           
            </View>

            </View>
            }
            
            



        </View>
    )

}
export default Statuspage