import { KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity, View, Platform, StyleSheet, ScrollView } from "react-native"
import Header from "./header"
import { TextInput } from "react-native-gesture-handler"
import { fieldtexttwo } from "../services/textsetting"
import { Apikeygermini, chatbot } from "../services/endpoints"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Badge, Button } from "react-native-paper"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"
const ChatBot = () => {
    const [message, setMessage] = useState('')
    const [receivedMsg, setreceivedMsg] = useState('')
    const [sendMessage, setsendMessage] = useState('')
    const [messageArray, setmessageArray] = useState([])



    const handlesendMessage = async () => {
        if (!message) {

            return
        }
        const genAI = new GoogleGenerativeAI(Apikeygermini);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        setsendMessage(message);
        setmessageArray(prevArray => [...prevArray, message, '...']);

        try {
            //   const mytoken = await AsyncStorage.getItem('mytoken');
            //   const mytokenreal = JSON.parse(mytoken);
            //   console.log(mytokenreal);
            //   console.log(message);

            //   const datato = { message: message };
            //   const response = await axios.post(chatbot, datato, {
            //     headers: {
            //       Authorization: `Bearer ${mytokenreal}`,
            //     }
            //   });
            const prompt = message
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            console.log(text);
            setreceivedMsg(text);
            setmessageArray(prevArray => [...prevArray.slice(0, -1), text]); // Replace '...' with the received message
        } catch (error) {
            console.error(error);
        } finally {
            setMessage(''); // Clear the input field after sending the message
        }
    };
    return (
        <View className="h-full">
            <SafeAreaView style={styles.andriod} className="flex-1 w-screen h-full bg-slate-50">
                <Header
                    title={'ChatBot'}
                />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="flex-1 bg-slate-900"
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
                >
                    <View className="flex-1 flex px-3 py-3">

                        <View className="items-center h-12 bg-slate-700 rounded-xl flex justify-center"><Text className={`${fieldtexttwo} text-slate-500`}>Ask me questions...</Text></View>
                        <View className="flex-1">
                            <ScrollView>
                                {messageArray.length > 0 && messageArray.map((item, index) => (
                                    <View className={`${index % 2 === 0 ? 'items-end' : 'items-start'}`}>{index % 2 === 0 ? <Text className="text-right text-blue-200">you</Text> : <Text className="text-left text-blue-200">Datamaxs Ai</Text>}<Text key={index} className={`${index % 2 === 0 && 'text-right'} text-white text-lg mt-2`}>{item}</Text></View>
                                ))}

                            </ScrollView>
                        </View>
                        <View>
                            <View className="absolute z-50 right-0 h-12">
                                <TouchableOpacity onPress={handlesendMessage} className="h-12 w-12 text-2xl bg-blue-600 rounded-xl flex justify-center items-center" ><MaterialCommunityIcons name="send" size={24} color="white" /></TouchableOpacity>

                            </View>
                            <TextInput
                                className="h-12 w-full border border-slate-700 bg-slate-600 rounded-xl px-2 text-slate-50 placeholder:text-slate-50"
                                placeholder="Message Datamaxs Ai"
                                placeholderTextColor="#509DFF"
                                onChangeText={(text) => setMessage(text)}
                                value={message}
                            />
                        </View>


                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>

        </View>

    )





}
export default ChatBot

const styles = StyleSheet.create({
    checkbox: {
        marginTop: -5,
        width: 25,
        height: 25,
        marginHorizontal: 5
    },
    andriod: {
        paddingTop: Platform.OS === 'android' ? 20 : 0,

    },
});