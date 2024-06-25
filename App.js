
 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';
 import 'react-native-gesture-handler';
import Home from './screens/home';
import Slider from './screens/sliders';
import LoginPage from './screens/login';
import WelcomePage from './screens/welcomepage';
import RegisterPage from './screens/register';
import Dashboard from './screens/dashboardcomponent/dashboard';
import SendData from './screens/dashboardcomponent/senddata';
import SendAirtime from './screens/dashboardcomponent/sendairtime';
import ExamPinScreen from './screens/dashboardcomponent/examPinscreen';
import ElectricScreen from './screens/dashboardcomponent/electricityScreen';
import AutoFund from './screens/dashboardcomponent/autofundscreen';
import TransHistory from './screens/dashboardcomponent/transactionhistory';
import TransHistorytwo from './screens/dashboardcomponent/transhistorytwo';
import Transactiondetails from './screens/dashboardcomponent/transactiondetails';
import PinModal from './screens/modals/PinModal';
import KeyboardCustom from './screens/services/keyboardcustom';
import { PaperProvider } from 'react-native-paper';
import Settingss from './screens/dashboardcomponent/settings';
import CableTv from './screens/dashboardcomponent/cableTv';
import ManualFund from './screens/dashboardcomponent/manualfunding';
import ForgostPassword from './screens/forgotpassword';
import ChatBot from './screens/dashboardcomponent/chatbot';
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
