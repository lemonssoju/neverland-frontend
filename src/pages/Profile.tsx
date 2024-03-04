import { createStackNavigator } from '@react-navigation/stack';
import ProfileHome from '../components/Profile/ProfileHome';
import FollowList from '../components/Profile/FollowList';
import ProfileEdit from '../components/Profile/ProfileEdit';
import SettingsHome from '../components/Profile/Settings/SettingsHome';
import MyFeed from '../components/Profile/Settings/MyFeed';
import ChangePassword from '../components/Profile/Settings/ChangePassword';
import Withdraw from '../components/Profile/Settings/Withdraw';

export type ProfileStackParams = {
  ProfileHome: undefined;
  FollowList: {
    follow: string;
  }
  ProfileEdit: undefined;
  SettingsHome: undefined;
  MyFeed: {
    title: string;
  }
  ChangePassword: undefined;
  Withdraw: undefined;
}

const Stack = createStackNavigator<ProfileStackParams>();

const Profile = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name='ProfileHome' component={ProfileHome} />
      <Stack.Screen name='FollowList' component={FollowList} />
      <Stack.Screen name='ProfileEdit' component={ProfileEdit} />
      <Stack.Screen name='SettingsHome' component={SettingsHome} />
      <Stack.Screen name='MyFeed' component={MyFeed} />
      <Stack.Screen name='ChangePassword' component={ChangePassword} />
      <Stack.Screen name='Withdraw' component={Withdraw} />
    </Stack.Navigator>
  );
};

export default Profile;
