import {
  StackNavigationProp,
  StackScreenProps,
  createStackNavigator,
} from '@react-navigation/stack';
import PuzzleList from '../../components/Group/PuzzleList';
import PuzzleDetail from '../../components/Group/PuzzleDetail';
import { TabProps } from '../../../App';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

export type PuzzleStackParams = {
  PuzzleList: any;
  PuzzleDetail: { albumIdx: number; rep_pic: string };
};

const Stack = createStackNavigator<PuzzleStackParams>();

const PuzzleStack = ({
  navigation,
  route,
}: StackScreenProps<TabProps, 'Puzzle'>) => {
  const navigationToPuzzle =
    useNavigation<StackNavigationProp<PuzzleStackParams>>();
  useEffect(() => {
    if (route.params?.albumIdx) {
      navigationToPuzzle.push('PuzzleDetail', {
        albumIdx: route.params.albumIdx,
        rep_pic: route.params.rep_pic,
      });
    }
  }, [route.params?.rep_pic]);

  return (
    <Stack.Navigator
      initialRouteName="PuzzleList"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PuzzleList" component={PuzzleList} />
      <Stack.Screen name="PuzzleDetail" component={PuzzleDetail} />
    </Stack.Navigator>
  );
};

export default PuzzleStack;
