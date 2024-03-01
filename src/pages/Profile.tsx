import { createStackNavigator } from '@react-navigation/stack';
import ProfileHome from '../components/Profile/ProfileHome';

export type ProfileStackParams = {
  ProfileHome: undefined;
}

const Stack = createStackNavigator<ProfileStackParams>();

const Profile = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name='ProfileHome' component={ProfileHome} />
    </Stack.Navigator>
  );
};

export default Profile;
