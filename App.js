
 import { NavigationContainer } from '@react-navigation/native';
 import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import NavigatorWrapper from './navigator';


export default function App() {
  
  
 
  return (
    <PaperProvider>
    <NavigationContainer>
      <NavigatorWrapper/>
  </NavigationContainer>
  </PaperProvider>
  );
}
