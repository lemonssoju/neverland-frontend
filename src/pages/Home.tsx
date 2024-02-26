import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import FeedList from '../components/Home/FeedList';
import FeedSearch from '../components/Home/FeedSearch';
import FeedDetail from '../components/Home/FeedDetail';
import FeedUpload from '../components/Home/FeedUpload';

export type HomeStackParams = {
  FeedList: undefined;
  FeedSearch: undefined;
  FeedDetail: undefined;
  FeedUpload: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParams>();

const Home = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="FeedList" component={FeedList} />
      <Stack.Screen name="FeedSearch" component={FeedSearch} />
      <Stack.Screen name="FeedDetail" component={FeedDetail} />
      <Stack.Screen
        name="FeedUpload"
        component={FeedUpload}
        options={{ presentation: 'transparentModal' }}
      />
    </Stack.Navigator>
  );
};

export default Home;
