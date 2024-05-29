import { View, Button, StyleSheet,Text, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fieldtextone } from './textsetting';
import { useEffect, useState } from 'react';

const DatePickdate=({dob,close})=>{
    const [yearvalue,setyearvalue]=useState('');
    const [monthvalue,setmonthvalue]=useState('')
    const [dayvalue,setdayvalue]=useState('')
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
    const days = Array.from({ length: 31 }, (_, i) => i + 1); // Array of days (1 to 31)
    const years = [];
    const currentYear = new Date().getFullYear();
    const startYear = 1930;
  
    // Generate array of years from 1930 to current year
    for (let year = currentYear; year >= startYear; year--) {
      years.push(year);
    }
  
    const handleSelection = (type, value) => {
      // Handle the selected value (type: 'year', 'month', or 'day')
      console.log(`Selected ${type}:`, value);
      if(type==='year'){
        setyearvalue(value)
      }
      else if(type==='month'){
        setmonthvalue(value)
      }
      else{
        setdayvalue(value)
      }
    };
    const handleclose=()=>{
        close(false)
    }
    const selectdob=()=>{
        let month=monthvalue &&monthvalue<10?'0'+monthvalue:monthvalue
        let day=dayvalue&&dayvalue<10?'0'+dayvalue:dayvalue
        const dateofbirth=yearvalue+'-'+month+'-'+day
        dob(dateofbirth)
    }
    useEffect(()=>{
        selectdob()
    },[yearvalue,monthvalue,dayvalue])
  
    return (
        <View className="">
            <View className="w-full items-center h-64 border border-slate-300 rounded-2xl bg-slate-100 px-5 py-5">
            <View className="flex flex-row gap-3 justify-center items-center  ">
            <ScrollView showsVerticalScrollIndicator={false}  >
          {years.map((year) => (
            <TouchableOpacity 
            className="bg-blue-500 items-center rounded-2xl flex justify-between h-10 mt-2"
              key={year}
              onPress={() => handleSelection('year', year)}
            >
                <Text className={`${fieldtextone} text-white`}>
                {year.toString()}
                </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
   
        <ScrollView showsVerticalScrollIndicator={false} >
          {months.map((month,index) => (
             <TouchableOpacity
             key={month}
             onPress={() => handleSelection('month', index + 1)} 
             className="w-full h-10 mt-2 flex justify-center items-center bg-blue-600 rounded-2xl"

           >
            <Text className={`${fieldtextone} text-white`}>{month}</Text>
           </TouchableOpacity>
          ))}
        </ScrollView>
   
        <ScrollView showsVerticalScrollIndicator={false} >
          {days.map((day) => (
            <TouchableOpacity 
            className="bg-blue-400 items-center rounded-full  flex justify-center h-10 mt-2"
            key={day}
            onPress={() => handleSelection('day', day)}
            >
                <Text className={`${fieldtextone} text-white`}>
                {day<10?'0'+day.toString():day.toString()}
                </Text>

            </TouchableOpacity>
            
        
          ))}
        </ScrollView>

            </View>
           
      </View>
      <View className="w-full mt-2 mb-4 px-5">
            <TouchableOpacity onPress={handleclose} className=" rounded-2xl items-center flex justify-center h-12 bg-slate-300">
                <Text className={`${fieldtextone} text-blue-900`}>Cancel</Text>
            </TouchableOpacity>
    

            </View>
           

        </View>
      
    );
  };
  
  
export default DatePickdate