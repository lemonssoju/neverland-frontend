import { createStackNavigator } from '@react-navigation/stack';
import ProfileHome from '../../components/Profile/ProfileHome';
import FollowList from '../../components/Profile/FollowList';
import ProfileEdit from '../../components/Profile/ProfileEdit';

export type ProfileStackParams = {
  ProfileHome: undefined;
  FollowList: {
    follow: string;
  };
  ProfileEdit: undefined;
};

const Stack = createStackNavigator<ProfileStackParams>();

const Profile = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileHome" component={ProfileHome} />
      <Stack.Screen name="FollowList" component={FollowList} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
    </Stack.Navigator>
  );
};

export default Profile;
