import { Text, TouchableOpacity, View } from "react-native"
import { AntDesign, EvilIcons } from '@expo/vector-icons'
import { fieldtexttwo } from "../services/textsetting"
import { useNavigation } from "@react-navigation/native"


const Header = ({ title }) => {
    const navigation = useNavigation()
    const handledashboard = () => {
        navigation.navigate('dashboard')

    }
    return (
        <View className="w-full items-center bg-slate-50 ">
            <View className="flex  bg-slate-50 flex-row border-b justify-between border-slate-300 h-20  w-full px-5 items-center">
                <View className="flex-1 flex flex-row">
                    <TouchableOpacity onPress={handledashboard} className="pr-3"><AntDesign name="leftcircle" size={30} color="navy" /></TouchableOpacity>
                    <Text className={`font-bold text-blue-500 ${fieldtexttwo}`}>{title}</Text>

                </View>


                <View className="items-center flex gap-2 flex-row justify-center">
                    <AntDesign name="customerservice" size={30} color="#509DFF" />
                    <EvilIcons name="bell" size={30} color="#509DFF" />
                </View>

            </View>

        </View>


    )
}
export default Header