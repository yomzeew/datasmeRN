

import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { View,Image, Text } from 'react-native'
import { SafeAreaView,Platform,StyleSheet } from 'react-native';

const sliderimage1=require('./images/slider1.png')
const sliderimage2=require('./images/slider2.png')
const sliderimage3=require('./images/slider3.png')
const Slider=({navigation})=>{
    const[index,setindex]=useState(0)
    const properties=
        [{bgcolor:'#D3F9F9',
        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
        image:sliderimage1,resize:'contain', 
        imageheight:300, 
        imagewidth:300,
        color:"#000000",
        fontsize:20,
        fontbold:'bold',
  
    },{bgcolor:'#D3F9F9',
    text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    image:sliderimage2
    ,resize:'contain', 
    imageheight:300, 
    imagewidth:300,
    color:"#000000",
    fontsize:20,
    fontbold:'bold',
  
},
{bgcolor:'#D3F9F9',
text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
image:sliderimage3,
resize:'contain', 
imageheight:300, 
imagewidth:300,
color:"#000000",
fontsize:20,
fontbold:'bold',

}]
const caretArray={
caretbg:'#000000',
caretborder:"#000000",
ArrowColor:"#509DFF",
ArrowSize:50
}
const handlenext = () => {
    const lengthArray = properties.length
    if (index < lengthArray - 1) {
        setindex((prev) => prev + 1)
    } else {
        navigation.navigate('welcomepage')
        
    }
}

const handleprev = () => {
    if (index > 0) {
        setindex((prev) => prev - 1)
    } else {
        // Handle when reaching the beginning
        // You may want to loop to the last item or perform other actions
    }
}  
    return(
        <SafeAreaView style={[styles.andriod,styles.bgcolors]} className="flex-1 flex  w-screen">
             <StatusBar style="dark"  />
            <View className="flex-1 flex justify-center item-center">
                    <View className="items-center">
                    <Image source={properties[index].image} resizeMode={properties[index].resize} style={{width:properties[index].imagewidth,height:properties[index].imageheight}} />
                    <View className="px-20"><Text className="text-center" style={{fontSize:properties[index].fontsize}}>{properties[index].text}</Text></View>
                    </View>
                    <View className="flex items-center justify-between pt-10 flex-row px-20">
                        <TouchableOpacity
                        onPress={handleprev}
                        >
                            <FontAwesome name="arrow-circle-left" color={caretArray.ArrowColor}  size={caretArray.ArrowSize} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text className="text-xl">Skip</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={handlenext}
                        >
                            <FontAwesome name="arrow-circle-right" color={caretArray.ArrowColor}  size={caretArray.ArrowSize} />

                        </TouchableOpacity>

                    </View>
            <View className="pt-10 flex flex-row gap-2 justify-center items-center">
                {properties.length>0&&properties.map((item,i)=>(
                    <View key={i} style={{
                        borderColor:caretArray.caretborder,
                        backgroundColor:index==i?caretArray.caretbg:' '

                    }} 
                    className="w-2 h-2 rounded-full border"></View>
                ))}
                


            </View>
          


            </View>

       </SafeAreaView>

    )
}
export default Slider

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
    bgcolors:{backgroundColor:'#D3F9F9'},
  });