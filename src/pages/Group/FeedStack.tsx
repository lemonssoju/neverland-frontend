import FeedList from '../../components/Group/FeedList';
import FeedDetail from '../../components/Group/FeedDetail';
import FeedUpload from '../../components/Group/FeedUpload';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type FeedStackParams = {
  FeedList: undefined;
  FeedDetail: undefined;
  FeedUpload: undefined;
};

const Stack = createNativeStackNavigator<FeedStackParams>();

const FeedStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="FeedList"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="FeedList" component={FeedList} />
      <Stack.Screen name="FeedDetail" component={FeedDetail} />
      <Stack.Screen
        name="FeedUpload"
        component={FeedUpload}
        options={{ presentation: 'transparentModal' }}
      />
    </Stack.Navigator>
  );
};

export default FeedStack;
