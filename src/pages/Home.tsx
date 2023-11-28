import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import FeedList from '../components/Home/FeedList';
import FeedDetail from '../components/Home/FeedDetail';

export type HomeStackParams = {
  FeedList: undefined;
  FeedDetail: undefined;
}

const Stack = createNativeStackNavigator<HomeStackParams>();

const Home = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name='FeedList' component={FeedList} />
      <Stack.Screen name='FeedDetail' component={FeedDetail} />
    </Stack.Navigator>
  );
};

export default Home;
