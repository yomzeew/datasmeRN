import { NavigationContainer } from '@react-navigation/native';
    import { createStackNavigator } from '@react-navigation/stack';
const NavigatorWrapper=()=>{
    const Stack = createStackNavigator();
    return(
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

    )
}
export default NavigatorWrapper