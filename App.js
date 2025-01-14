import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login, Signup, Welcome, Homepage, DetailPage, SupermarketPage } from './screens';

const stack = createNativeStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName = 'Welcome'>
        <stack.Screen
          name='Welcome'
          component={Welcome}
          options={{headerShown:false}}>
        </stack.Screen>

        <stack.Screen
          name='Login'
          component={Login}
          options={{headerShown:false}}>
        </stack.Screen>

        <stack.Screen
          name='Signup'
          component={Signup}
          options={{headerShown:false}}>
        </stack.Screen>

        <stack.Screen
          name='Homepage'
          component={Homepage}
          options={{headerShown:false}}>
        </stack.Screen>

        <stack.Screen
          name='DetailPage'
          component={DetailPage}
          options={{headerShown:false}}>
        </stack.Screen>

        <stack.Screen
          name='SupermarketPage'
          component={SupermarketPage}
          options={{headerShown:false}}>
        </stack.Screen>
      </stack.Navigator>
    </NavigationContainer>
  );
}