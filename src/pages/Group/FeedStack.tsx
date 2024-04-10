import FeedList from '../../components/Group/FeedList';
import FeedDetail from '../../components/Group/FeedDetail';
import FeedUpload from '../../components/Group/FeedUpload';
import PuzzleCreate from '../../components/Group/PuzzleCreate';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type FeedStackParams = {
  FeedList: undefined;
  FeedDetail: undefined;
  FeedUpload: undefined;
  PuzzleCreate: {
    date: string;
    location: string;
  }
};

const Stack = createNativeStackNavigator<FeedStackParams>();

const FeedStack = () => {
  return (
    <Stack.Navigator
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
      <Stack.Screen name="PuzzleCreate" component={PuzzleCreate} options={{ presentation: 'transparentModal'}} />
    </Stack.Navigator>
  );
};

export default FeedStack;
