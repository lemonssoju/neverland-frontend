import FeedList from '../../components/Group/FeedList';
import FeedDetail from '../../components/Group/FeedDetail';
import FeedUpload from '../../components/Group/FeedUpload';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { TabProps } from '../../../App';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

export type FeedStackParams = {
  FeedList: undefined;
  FeedDetail: {
    id: number;
  };
  FeedUpload: undefined;
};

const Stack = createNativeStackNavigator<FeedStackParams>();

const FeedStack = ({
  navigation,
  route,
}: StackScreenProps<TabProps, 'Feed'>) => {
  const navigationToFeed =
    useNavigation<StackNavigationProp<FeedStackParams>>();
  useEffect(() => {
    if (route.params?.id) {
      navigationToFeed.push('FeedDetail', { id: route.params.id });
    }
  }, [route.params?.id]);
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
