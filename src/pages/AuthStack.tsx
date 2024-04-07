import { createStackNavigator } from '@react-navigation/stack';

import Start from '../components/Auth/Start';
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/SignUp';

export type AuthStackParams = {
  Start: undefined;
  Login: undefined;
  SignUp: undefined;
}

const Stack = createStackNavigator<AuthStackParams>();

const Auth = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  )
}

export default Auth;