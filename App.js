
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
export default function App() {
  const Stack = createStackNavigator();
  return (
    <PaperProvider>
    <NavigationContainer>
    <Stack.Navigator 
    initialRouteName="start"
    navigationOption=""
    screenOptions={{
      headerTitle: null, // Remove the title for all screens
      headerShown: false,
    }}
    >
      <Stack.Screen  name="start" component={Home} />
      <Stack.Screen options={{gestureEnabled:true}} name="slider" component={Slider}/>
     <Stack.Screen options={{gestureEnabled:true}} name="welcomepage" component={WelcomePage}/>
      <Stack.Screen options={{gestureEnabled:false}} name='login' component={LoginPage}/>
      <Stack.Screen options={{gestureEnabled:false}} name='forgotpassword' component={ForgostPassword}/>
      <Stack.Screen options={{gestureEnabled:false}} name='register' component={RegisterPage}/>
      <Stack.Screen options={{gestureEnabled:false}} name="dashboard" component={Dashboard} />
      <Stack.Screen options={{gestureEnabled:false}} name="subdata" component={SendData} />
      <Stack.Screen options={{gestureEnabled:false}} name="buyairtime" component={SendAirtime} />
      <Stack.Screen options={{gestureEnabled:false}} name="exam" component={ExamPinScreen} />
      <Stack.Screen options={{gestureEnabled:false}} name="elect" component={ElectricScreen} />
      <Stack.Screen options={{gestureEnabled:false}} name="autofund" component={AutoFund} />
      <Stack.Screen options={{gestureEnabled:false}} name="manualfund" component={ManualFund} />
      <Stack.Screen options={{gestureEnabled:false}} name="transhistory" component={TransHistory} />
      <Stack.Screen options={{gestureEnabled:false}} name="transhistorytwo" component={TransHistorytwo} />
      <Stack.Screen options={{gestureEnabled:false}} name="transdetail" component={Transactiondetails} /> 
      <Stack.Screen options={{gestureEnabled:false}} name="settings" component={Settingss} /> 
      <Stack.Screen options={{gestureEnabled:false}} name="cable" component={CableTv} /> 
      <Stack.Screen options={{gestureEnabled:false}} name="chatbot" component={ChatBot} /> 
      
      
      {/* 
      <Stack.Screen options={{gestureEnabled:false}} name='forgotpassword' component={PasswordForgot}/>
      <Stack.Screen options={{gestureEnabled:false}} name='usersetting' component={UserSetting}/>
      <Stack.Screen options={{gestureEnabled:false}} name='sendmoney' component={SendMoney} />  */}
     
     
     
    </Stack.Navigator>
  </NavigationContainer>
  </PaperProvider>
  );
}
