import PuzzleList from '../../components/Group/Puzzle/PuzzleList';
import PuzzleDetail from '../../components/Group/Puzzle/PuzzleDetail';
import PuzzleUpload from '../../components/Group/Puzzle/PuzzleUpload';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { TabProps } from '../../../App';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

export type PuzzleStackParams = {
  PuzzleList: undefined;
  PuzzleDetail: {
    puzzleIdx: number;
  };
  PuzzleUpload: {
    puzzleIdx?: number;
  };
};

const Stack = createNativeStackNavigator<PuzzleStackParams>();

const PuzzleStack = ({
  navigation,
  route,
}: StackScreenProps<TabProps, 'Puzzle'>) => {
  const navigationToPuzzle =
    useNavigation<StackNavigationProp<PuzzleStackParams>>();
  useEffect(() => {
    if (route.params?.puzzleIdx) {
      navigationToPuzzle.push('PuzzleDetail', {
        puzzleIdx: route.params.puzzleIdx,
      });
    }
  }, [route.params?.puzzleIdx]);
  return (
    <Stack.Navigator
      initialRouteName="PuzzleList"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PuzzleList" component={PuzzleList} />
      <Stack.Screen name="PuzzleDetail" component={PuzzleDetail} />
      <Stack.Screen
        name="PuzzleUpload"
        component={PuzzleUpload}
        options={{ presentation: 'transparentModal' }}
      />
    </Stack.Navigator>
  );
};

export default PuzzleStack;
