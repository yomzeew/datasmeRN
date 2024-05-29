import {View,TouchableOpacity,Text} from 'react-native'
import { fieldtextone } from './textsetting'
const KeyboardCustom=({onPress})=>{
    const numericKeys=[
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['.', '0', 'Del'], 
    ]
    return(
        <View className="h-1/3">
        {numericKeys.map((row, rowIndex) => (
          <View key={rowIndex} className="flex flex-row w-full justify-center">
            {row.map((key, index) => (
              <TouchableOpacity
                key={index}
                className="px-3 w-24 rounded-xl  h-12 items-center flex justify-center bg-white border border-slate-300"
                onPress={() => onPress(key)}
              >
                <Text className={`${fieldtextone}`}>{key}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>


    )
}
export default KeyboardCustom