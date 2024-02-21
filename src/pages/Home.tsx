import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import FeedMain from '../components/Home/FeedMain';
import FeedDetail from '../components/Home/FeedDetail';

export type HomeStackParams = {
  FeedMain: undefined;
  FeedDetail: undefined;
}

const Stack = createNativeStackNavigator<HomeStackParams>();

const Home = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name='FeedMain' component={FeedMain} />
      <Stack.Screen name='FeedDetail' component={FeedDetail} />
    </Stack.Navigator>
  );
};

export default Home;
