import { createStackNavigator } from '@react-navigation/stack';
import Start from '../components/Auth/Start';

export type AuthStackParams = {
  Start: undefined;
  Login: undefined;
  SignUp: undefined;
  Contents: undefined;
  Preferences: undefined;
}

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Start" component={Start} />
    </Stack.Navigator>
  )
}

export default Auth;