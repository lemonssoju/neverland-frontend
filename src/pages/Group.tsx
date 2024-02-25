import { createStackNavigator } from '@react-navigation/stack';
import GroupList from '../components/Group/GroupList';
import FeedList from '../components/Group/FeedList';

export type GroupStackParams = {
  GroupList: undefined;
  FeedList: undefined;
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
    </Stack.Navigator>
  );
};

export default Group;
