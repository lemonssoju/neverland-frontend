import { createStackNavigator } from '@react-navigation/stack';
import GroupList from '../components/Group/GroupList';
import FeedList from '../components/Group/FeedList';
import FeedDetail from '../components/Group/FeedDetail';

export type GroupStackParams = {
  GroupList: undefined;
  FeedList: undefined;
  FeedDetail: undefined;
}

const Stack = createStackNavigator<GroupStackParams>();

const Group = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="GroupList" component={GroupList} />
      <Stack.Screen name="FeedList" component={FeedList} />
      <Stack.Screen name="FeedDetail" component={FeedDetail} />
    </Stack.Navigator>
  );
};

export default Group;
