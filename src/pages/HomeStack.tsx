import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
// Main
import GroupList from '../components/Home/GroupList';
// Settings
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

const SettingsStack = createNativeStackNavigator<SettingsStackParams>();

const Settings = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SettingsStack.Screen name="SettingsHome" component={SettingsHome} />
      <SettingsStack.Screen name="MyFeed" component={MyFeed} />
      <SettingsStack.Screen name="ChangePassword" component={ChangePassword} />
      <SettingsStack.Screen name="Withdraw" component={Withdraw} />
    </SettingsStack.Navigator>
  );
};

export type HomeStackParams = {
  GroupList: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParams>();

const Home = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="GroupList" component={GroupList} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default Home;
