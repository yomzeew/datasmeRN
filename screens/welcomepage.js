import { useEffect } from "react"
import { View, Image, Text, TouchableOpacity, SafeAreaView,Platform,StyleSheet } from "react-native"
import { storeData } from "./services/storeID"
import { StatusBar } from 'expo-status-bar';

const WelcomePage = ({navigation}) => {
    
    const handlelogin=()=>{
        navigation.navigate('login')

    }
    return (
        <SafeAreaView style={styles.andriod} className="flex-1 w-screen bg-white flex justify-center">
            <StatusBar style="dark" />
            <View className="w-full">
                <Image source={require('./images/welcome.png')} className="w-full h-80" resizeMode="contain" />
            </View>
            <View className="flex-1 mt-24 items-center flex ">
                <View className=" h-16 rounded-2xl items-center flex justify-center w-72">
                    <Image source={require('./images/logo.png')}  className="w-24 h-24" resizeMode="contain"/>
                    <Text className="text-blue-600 text-5xl font-bold">
                        Welcome!
                    </Text>
                    <Text>
                        Join us and Enjoy Unlimted Data
                    </Text>

                </View>
                

            </View>
            <View className=" absolute bottom-20 w-full">
                <View className="items-center ">
                <TouchableOpacity onPress={handlelogin} className="bg-blue-600 items-center w-72 h-12 flex justify-center rounded-xl">
                        <Text className="text-white text-xl">Get Started</Text>
                    </TouchableOpacity>

                </View>
                 


                </View>




        </SafeAreaView>
    )
}
export default WelcomePage

const styles = StyleSheet.create({
    checkbox: {
      marginTop: -5,
      width:25,
      height:25,
      marginHorizontal:5
    },
    andriod: {
        paddingTop: Platform.OS === 'android' ? 20 : 0,

    },
  });