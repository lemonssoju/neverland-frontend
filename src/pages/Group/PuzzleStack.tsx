import {
  StackNavigationProp,
  StackScreenProps,
  createStackNavigator,
} from '@react-navigation/stack';
import PuzzleDetail from '../../components/Group/PuzzleDetail';
import { TabProps } from '../../../App';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

export type PuzzleStackParams = {
  PuzzleDetail: { id: number, rep_pic: string; };
};

const Stack = createStackNavigator<PuzzleStackParams>();

const PuzzleStack = ({
  navigation,
  route,
}: StackScreenProps<TabProps, 'Puzzle'>) => {
  const navigationToPuzzle =
    useNavigation<StackNavigationProp<PuzzleStackParams>>();
  useEffect(() => {
    if (route.params?.id && route.params?.rep_pic) {
      navigationToPuzzle.push('PuzzleDetail', { id: route.params.id, rep_pic: route.params.rep_pic });
    }
  }, [route.params?.rep_pic]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PuzzleDetail" component={PuzzleDetail} />
    </Stack.Navigator>
  );
};

export default PuzzleStack;
