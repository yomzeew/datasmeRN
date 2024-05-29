import { Text, TouchableOpacity, View,ScrollView } from "react-native"
import { FontAwesome5,FontAwesome} from "@expo/vector-icons"
import { fieldtextone, fieldtexttwo } from "../services/textsetting"
import { useState,useEffect } from "react"
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import PinModal from "./PinModal";
const ConfirmationPage=({alldata,senddata,close,beneficairyarray,interfacePin,senddataforexam})=>{
    const [totalamount,settotalamount]=useState(null)
    const [debitplatform,setdebitplatform]=useState('')
    const [showpin,setshowpin]=useState(false)
    const [walletstyles,setwallestyles]=useState('border border-blue-600 rounded-lg flex flex-row justify-start items-center h-16 w-full px-5')
    const [bonusstyles,setbonusstyles]=useState('border border-blue-600 rounded-lg flex flex-row justify-start items-center h-16 w-full px-5 mt-3')
    useEffect(()=>{
        if(interfacePin==='data'){
            let total=0
    
            for (let i = 0; i < beneficairyarray.length; i++) {
            const subplan = beneficairyarray[i].subplan
            const getamount= subplan.split('-')
            total=total+parseInt(getamount[1])
        }
        console.log(total)
            settotalamount(total)
    
        }
        else if(interfacePin==='airtime'){
            let total=0
            for (let i = 0; i < beneficairyarray.length; i++) {
                const amount= beneficairyarray[i].amount
                total=total+parseInt(amount)
            }
            console.log(total)
                settotalamount(total)
    
    
        }
        else if(interfacePin==='exam'){
            console.log(senddata)
            settotalamount(senddata.amount)
    
        }
        else if(interfacePin==='cable'){
            settotalamount(senddata.amount)
            console.log(senddata.decoderNumber)
    
        }
        else if(interfacePin==='electricity'){
            
            settotalamount(senddata.amount)
    

        }
    
    
      },[])
    const handleclose=()=>{
        close(false)

    }
    const handledebitplatform=(value)=>{
        setdebitplatform(value)
    }
    const translateYpin= useSharedValue(800);
const animatedStylespin = useAnimatedStyle(() => ({
    transform: [{ translateY: translateYpin.value }],
}));
const handleclosepin=(value)=>{
    setshowpin(value)
    translateYpin.value=withSpring(-800)


}
const handleshowpin=()=>{
    if(beneficairyarray.length>0){
        translateYpin.value = withSpring(0);
        setshowpin(true)
        
        

    }
    else{
        translateYpin.value = withSpring(0);
        setshowpin(true)


        
    }

   
   
}
const handlewallet=()=>{
    setwallestyles('bg-blue-200 rounded-lg flex flex-row justify-start items-center h-16 w-full px-5 ')
    setbonusstyles('border border-blue-600 rounded-lg flex flex-row justify-start items-center h-16 w-full px-5 mt-3')
    setdebitplatform('wallet')
 
  }
  const handlebonus=()=>{
     setwallestyles('border border-blue-600 rounded-lg flex flex-row justify-start items-center h-16 w-full px-5')
     setbonusstyles('bg-blue-200 rounded-lg flex flex-row justify-start items-center h-16 w-full px-5 mt-3')
    setdebitplatform('bonus')
 
  }
    return (
        <View className=" bg-white  rounded-2xl h-full">
             {showpin&&
            <View className="bottom-0 h-full absolute z-50  w-screen">
            <Animated.View  style={[animatedStylespin]}>
            <PinModal
            alldata={alldata}
            senddata={senddata}
            close={(value) => handleclosepin(value)}
            beneficairyarray={beneficairyarray}
            interfacePin={interfacePin}
            debitplatform={debitplatform}

            />

            </Animated.View>
            
            
        </View>

            }
             {(showpin) && <View className="bg-slate-400 h-full w-full absolute z-40 opacity-70 flex justify-center items-center"></View>}
              <View className="pb-5 border-b border-slate-200 items-end">
               <TouchableOpacity onPress={handleclose}><FontAwesome5 name="times-circle" color="navy" size={30} /></TouchableOpacity> 
                </View>
                <View className="items-center mt-3">
                    <Text className={`${fieldtexttwo} font-semibold`}>Confirmation Page</Text>
                </View>
                <View className="px-3 mt-5" >
                <View className="px-5 flex flex-row justify-center bg-yellow-100 h-16 items-center rounded-xl">
                 <FontAwesome name="warning" size={24} color="black" />
                    <Text className="text-slate-500 text-center">
                        Please confirm your transaction before make payment,as it may not be reversible
                    </Text>
                </View>

                </View>
             
                <View className="px-2 w-full items-center mt-3">
                    <View className="bg-blue-600 h-12 w-12 rounded-full flex justify-center items-center">
                    <FontAwesome name="exchange" size={24} color="white" />
                    </View>
                    <Text className={`${fieldtextone} font-semibold`}>Coming Soon</Text>
                
                </View>
                <View className="mt-5 h-1/3">
                {(interfacePin==='cable'||interfacePin==='electricity'||interfacePin==='exam')?
                <View>
                    <View className="items-center">
                       {interfacePin==='electricity' && <Text className={`${fieldtexttwo} text-center font-bold`}>{`Are sure you want to \n Make Payment of`} &#8358;{totalamount} </Text>}
                       {interfacePin==='exam' && <Text className={`${fieldtexttwo} text-center font-bold`}>You are making Payment for {senddataforexam.examname} <Text>check your email: {senddataforexam.email}</Text></Text>}
                       {interfacePin==='cable' && <Text className={`${fieldtexttwo} text-center font-bold`}>Are sure you want to payment to this Decoder Number {senddata.decoderNumber} <Text>with amount of  &#8358;{senddata.amount}</Text></Text>}
                    </View>

                </View>: 
                <ScrollView showsVerticalScrollIndicator={false}   >
                   {beneficairyarray.length>0 &&beneficairyarray.map((item,index)=>{
                    let network=''
                    let amount=''
                    let number=''
                    let plan=''
                    if(interfacePin==='data'){
                         network=item.smeplan.split(' ')[0]
                        amount=item.subplan.split('-')[1]
                        plan=item.smeplan
                        number=item.beneficiary

                    }
                    else if(interfacePin==='airtime'){
                        network=item.plan.split(' ')[0]
                        plan=item.plan
                        number=item.beneficiary
                        amount=item.amount

                    }
                  
                    return(
                        
                    <View key={index} className="border-b border-blue-600">
                    <View className="px-2 flex justify-between flex-row items-center">
                        <Text className={`${fieldtextone} text-slate-600`}>Network</Text>
                        <Text className={`${fieldtextone} text-slate-600`}>{network}</Text>
                    </View>
                    <View className="px-2 flex justify-between flex-row items-center">
                        <Text className={`${fieldtextone} text-slate-600`}>Plan</Text>
                        <Text className={`${fieldtextone} text-slate-600`}>{plan}</Text>
                    </View>
                    <View className="px-2 flex justify-between flex-row items-center">
                        <Text className={`${fieldtextone} text-slate-600`}>Number</Text>
                        <Text className={`${fieldtextone} text-slate-600`}>{number}</Text>
                    </View>
                    <View className="px-2 flex justify-between flex-row items-center">
                        <Text className={`${fieldtextone} text-slate-600`}>Amount</Text>
                        <Text className={`${fieldtextone} text-slate-600`}>&#8358;{amount}</Text>
                    </View>

                    </View>
                        
                    )
                   }) }
           

                </ScrollView>}

                </View>
               
                <View className="px-2">
                    <TouchableOpacity onPress={handlewallet} className={walletstyles}>
                    <FontAwesome5 name="wallet" size={24} color="black" />
                    <Text className={`${fieldtextone} px-3`}>Pay with wallet</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handlebonus}  className={bonusstyles}>
                       
                        <FontAwesome5 name="gift" size={24} color="black" />
                        <Text className={`${fieldtextone} px-3`}>Pay with Bonus</Text>
                        </TouchableOpacity>
                        
                   
                </View>
                <View className="px-2">
                    <TouchableOpacity onPress={handleshowpin} className="bg-blue-600 h-16 w-full items-center flex justify-center mt-3 rounded-xl">
                        <Text className="text-white">Pay &#8358;{totalamount}</Text>
                    </TouchableOpacity>
                </View>
              

        </View>
    )
}
export default ConfirmationPage