import { FontAwesome5 } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity,View,Text,Image } from "react-native"

const ThanksModal=({closefunc})=>{
    const navigation=useNavigation()
    const handlelogin=()=>{
        navigation.navigate('login')
    }
    const handleclose=()=>{
        closefunc(false)

    }
    return(
        <View className="w-80 flex justify-center  bg-white h-105 border border-slate-400 rounded-xl shadow-lg shadow-black">
            <View className="items-end">
            <TouchableOpacity onPress={handleclose}>
                <FontAwesome5 name="times-circle" color="navy" size={30} />

       </TouchableOpacity>
            </View>
           
            <View className="flex-1 items-center justify-center flex">
                <Image source={require('../images/thanks.png')} className="w-24 h-24" resizeMode="contain" />
            <Text className="text-lg">
                Thanks for Registration
            </Text>
            <TouchableOpacity onPress={handlelogin} className="h-12 w-64 bg-regal-blue items-center flex justify-center rounded-xl">
                <Text className="text-lg text-white">Login to Continue</Text>
            </TouchableOpacity>
            </View>
         
        </View>
    )
}
export default ThanksModal