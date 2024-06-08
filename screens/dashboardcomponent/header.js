import { Text, TouchableOpacity, View } from "react-native"
import { AntDesign, EvilIcons } from '@expo/vector-icons'
import { fieldtexttwo } from "../services/textsetting"
import { useNavigation } from "@react-navigation/native"
import { Badge } from "react-native-paper"
import { primaryColor } from "../services/colortheme"


const Header = ({ title }) => {
    const primary = primaryColor();
    console.log(primary)
    const navigation = useNavigation()
    const handledashboard = () => {
        navigation.navigate('dashboard')

    }
    return (
        <View className="w-full items-center bg-slate-50 ">
            <View className="flex  bg-slate-50 flex-row border-b justify-between border-slate-300 h-20  w-full px-5 items-center">
                <View className="flex-1 flex flex-row">
                    <TouchableOpacity onPress={handledashboard} className="pr-3"><AntDesign name="leftcircle" size={30} color={primary}/></TouchableOpacity>
                    <Text className={`font-bold text-regal-blue ${fieldtexttwo}`}>{title}</Text>

                </View>


                <View className="items-center flex gap-2 flex-row justify-center">
                        <AntDesign name="customerservice" size={30} color={primary} />
                        <TouchableOpacity>
                        
                        <EvilIcons name="bell" size={30} color={primary}/>
                        <View  className="absolute -right-3 " ><Badge className="bg-yellow-500" size={15}>New</Badge></View>
                        

                        </TouchableOpacity>
                        
                    </View>

            </View>

        </View>


    )
}
export default Header