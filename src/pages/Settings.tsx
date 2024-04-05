import { createStackNavigator } from '@react-navigation/stack';
import SettingsHome from '../components/Home/Settings/SettingsHome';
import MyFeed from '../components/Home/Settings/MyFeed';
import ChangePassword from '../components/Home/Settings/ChangePassword';
import Withdraw from '../components/Home/Settings/Withdraw';

export type SettingsStackParams = {
  SettingsHome: undefined;
  MyFeed: {
    title: string;
  };
  ChangePassword: undefined;
  Withdraw: undefined;
};

const Stack = createStackNavigator<SettingsStackParams>();

const Settings = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SettingsHome" component={SettingsHome} />
      <Stack.Screen name="MyFeed" component={MyFeed} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="Withdraw" component={Withdraw} />
    </Stack.Navigator>
  );
};

export default Settings;
