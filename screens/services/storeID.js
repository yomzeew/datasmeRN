import AsyncStorage from '@react-native-async-storage/async-storage';
export const storeData=async(value) => {
    try {
      await AsyncStorage.setItem('deviceID',value);
    } catch (e) {
      // saving error
    }
  };
 export const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('deviceID');
      if (value !== null) {
        return value
      }
    } catch (e) {
      // error reading value
    }
  };