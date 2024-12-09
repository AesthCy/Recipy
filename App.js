import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login, Signup, Welcome, Homepage, DetailPizza, DetailSpaghetti, DetailMasala, DetailKungPao, DetailPadThai, DetailRamen } from './screens';

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
          name='DetailPizza'
          component={DetailPizza}
          options={{headerShown:false}}>
        </stack.Screen>

        <stack.Screen
          name='DetailSpaghetti'
          component={DetailSpaghetti}
          options={{headerShown:false}}>
        </stack.Screen>

        <stack.Screen
          name='DetailMasala'
          component={DetailMasala}
          options={{headerShown:false}}>
        </stack.Screen>

        <stack.Screen
          name='DetailKungPao'
          component={DetailKungPao}
          options={{headerShown:false}}>
        </stack.Screen>

        <stack.Screen
          name='DetailPadThai'
          component={DetailPadThai}
          options={{headerShown:false}}>
        </stack.Screen>

        <stack.Screen
          name='DetailRamen'
          component={DetailRamen}
          options={{headerShown:false}}>
        </stack.Screen>
      </stack.Navigator>
    </NavigationContainer>
  );
}