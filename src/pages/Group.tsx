import { createStackNavigator } from '@react-navigation/stack';
import GroupList from '../components/Group/GroupList';

export type GroupStackParams = {
  GroupList: undefined;
}

const Stack = createStackNavigator<GroupStackParams>();

const Group = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="GroupList" component={GroupList} />
    </Stack.Navigator>
  );
};

export default Group;
