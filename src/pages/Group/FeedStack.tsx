import { createStackNavigator } from '@react-navigation/stack';
import GroupList from '../../components/Group/GroupList';
import FeedList from '../../components/Group/FeedList';
import FeedDetail from '../../components/Group/FeedDetail';
import FeedUpload from '../../components/Group/FeedUpload';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type GroupStackParams = {
  GroupList: undefined;
  FeedList: undefined;
  FeedDetail: undefined;
  FeedUpload: undefined;
};

const Stack = createNativeStackNavigator<GroupStackParams>();

const FeedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="GroupList" component={GroupList} />
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
