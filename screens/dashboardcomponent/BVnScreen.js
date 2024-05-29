import { useState } from "react"
import { View,Text, TextInput,TouchableOpacity } from "react-native"
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { FontAwesome5 } from "@expo/vector-icons"
import DatePick from "../services/datePicker"
import DatePickdate from "../services/datePicker"
import { fieldtextone, fieldtexttwo } from "../services/textsetting"




const BvnScreen=({close})=>{
   
    const [Bvn,setBvn]=useState('')
    const [showdate,setshowdate]=useState(false)
    const [dob,setdob]=useState('')
  
    const handlebvn=(value)=>{
        setBvn(value)
    }
    const translateY = useSharedValue(300);
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));
    
    const handleclosedate=(value)=>{
        setshowdate(value)
        translateY.value=withSpring(300)

    }
    const handleshowdate=()=>{
        translateY.value=withSpring(0)
        setshowdate(true)

    }
    const handledob=(value)=>{
      
        setdob(value)
       

    }  
    const handlesubmit=()=>{

    }
    const handleclosebvn=()=>{
        close(true)
    }
  

    return(
        <View className="bg-white h-full w-screen rounded-2xl">
        {showdate &&
        <Animated.View
        style={[animatedStyles]} 
        className="absolute z-50 w-full bottom-0">
           <DatePickdate
           close={(value)=>handleclosedate(value)}
           dob={(value)=>handledob(value)}
           />
            </Animated.View>}
        
            <View className=" px-3 py-3">
                <View className="">
                    <View className="items-end">
                        <TouchableOpacity onPress={handleclosebvn}><FontAwesome5 name="times-circle" color="black" size={30}/></TouchableOpacity>
                    </View>
                <View>
                <Text className={`${fieldtexttwo} font-bold text-center`}>Please Update Your BVN</Text>
            </View>
            <View className="mt-5">
                <Text className={`${fieldtextone}`}>Enter Your BVN</Text>
                <TextInput
                className="border border-slate-300 w-full h-14 rounded-2xl px-2"
                onChangeText={(text)=>handlebvn(text)}
                keyboardType="numeric"
                />

            </View>
            <View className="mt-3">
                <View className="flex flex-row items-center justify-center">
                    <Text className={`${fieldtexttwo} font-bold text-blue-900`}>{dob}</Text>
                    
                </View>
            <TouchableOpacity onPress={handleshowdate} className="bg-blue-500 items-center h-10 flex justify-center rounded-2xl">
                <Text className={`${fieldtextone} text-white`}>Select Date of Birth</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlesubmit} className="bg-blue-900 items-center mt-5 h-10 flex justify-center rounded-2xl">
                <Text className={`${fieldtextone} text-white`}>Request</Text>
                </TouchableOpacity>
        
        
            </View>

                </View>
          
            <View className="mt-10">
                <Text className={`${fieldtextone} text-slate-500`}>
                    You will need to update your BVN, as it is mandatory 
                    from CENTRAL BANK OF NIGERIA that all users 
                    with virtual accounts should update their BVN 
                    to retain their virtual accounts.
                    </Text>
            </View>
           

            </View>
           

        </View>
    )

}
export default BvnScreen