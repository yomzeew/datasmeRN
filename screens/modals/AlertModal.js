import { ImageBackground, View,Text } from "react-native"
import { fieldtexttwo } from "../services/textsetting"
import { useEffect, useState } from "react"

const AlertModal=({headline,body,type})=>{
   
    
    return(
        <View>
            <ImageBackground
            source={require('../images/modaldisplay.png')}
            className="h-128 w-80"
            resizeMode="contain"
            >
                <View className="h-5/6 flex">
                <View className="px-5 items-center mt-10">
                    <Text className={`${fieldtexttwo} font-bold`}>{headline}</Text>
                </View>
                <View className="flex-1 px-5 flex justify-center items-center">
                    <Text className={`${fieldtexttwo} text-white`}>{body}</Text>
                </View>

                </View>


            </ImageBackground>
        </View>

    )
}
export default AlertModal