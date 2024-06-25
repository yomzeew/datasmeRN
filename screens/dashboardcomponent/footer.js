import { Platform, Text, View} from "react-native"
import { FontAwesome, FontAwesome5, Fontisto,AntDesign,MaterialCommunityIcons,Entypo  } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { primaryColor } from "../services/colortheme"
const Footer=()=>{
    const primary = primaryColor();
    const navigation=useNavigation()
    const handledashboard=()=>{
        navigation.navigate('dashboard')
    }
    const handletranshistory = () => {
        navigation.navigate('transhistorytwo')
    }
    const handlelogout=()=>{
        navigation.navigate('login')

    }
    const handlefund = () => {
        navigation.navigate('autofund')
    }
    return(
        <View className={`w-full ${Platform.OS==='android'?'h-20':'h-24'} bg-slate-100 absolute bottom-0 px-4`}>
            <View className="flex w-full flex-row justify-between items-center h-full">
            <View className="items-center">
            <TouchableOpacity  className="items-center" onPress={handledashboard}>
            <View>
            <View className="bg-regal-blue  rounded-full h-12 w-12" />
            <View className="absolute h-12 w-12 items-center flex justify-center">
                <FontAwesome name="home" size={20} color="white" /></View>
            </View>
           
            <Text className="text-xs text-regal-blue">Home</Text></TouchableOpacity>
            </View>
            <View className="items-center">
            <TouchableOpacity  className="items-center" onPress={handletranshistory}>
            <View>
            <View className="bg-regal-blue  rounded-full h-12 w-12" />
            <View className="absolute h-12 w-12 items-center flex justify-center">
                <AntDesign  name="filetext1" size={20} color="white" /></View>
            </View>
            <Text className="text-xs text-regal-blue">Transaction</Text></TouchableOpacity>
            </View>
            <View className="items-center">
            <TouchableOpacity  className="items-center" onPress={handlefund} >
            <View>
            <View className="bg-regal-blue rounded-full h-12 w-12" />
            <View className="absolute h-12 w-12 items-center flex justify-center"><Entypo name="wallet" size={20} color="white" /></View>
                </View>
                    <Text className="text-xs text-regal-blue">Fund Wallet</Text>
            </TouchableOpacity>
            </View>
            <View className="items-center">
            <TouchableOpacity  className="items-center" onPress={handlelogout}>
            <View>
            <View className="bg-red-500  rounded-full h-12 w-12" />
            <View className="absolute h-12 w-12 items-center flex justify-center"><AntDesign name="logout" size={20} color="white" /></View>
            </View>
            <Text className="text-xs text-regal-blue">Logout</Text>
            </TouchableOpacity>
            </View>

            </View>
           

        </View>

    )
}
export default Footer