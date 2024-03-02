import { createStackNavigator } from '@react-navigation/stack';
import ProfileHome from '../components/Profile/ProfileHome';
import FollowList from '../components/Profile/FollowList';

export type ProfileStackParams = {
  ProfileHome: undefined;
  FollowList: undefined;
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
    </Stack.Navigator>
  );
};

export default Profile;
