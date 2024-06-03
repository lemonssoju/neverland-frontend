import {
  StackNavigationProp,
  StackScreenProps,
  createStackNavigator,
} from '@react-navigation/stack';
import AlbumList from '../../components/Group/Album/AlbumList';
import AlbumDetail from '../../components/Group/Album/AlbumDetail';
import { TabProps } from '../../../App';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

export type AlbumStackParams = {
  AlbumList: any;
  AlbumDetail: { albumIdx: number; albumImage: string };
};

const Stack = createStackNavigator<AlbumStackParams>();

const AlbumStack = ({
  navigation,
  route,
}: StackScreenProps<TabProps, 'Album'>) => {
  const navigationToAlbum =
    useNavigation<StackNavigationProp<AlbumStackParams>>();
  useEffect(() => {
    if (route.params?.albumIdx) {
      navigationToAlbum.push('AlbumDetail', {
        albumIdx: route.params.albumIdx,
        albumImage: route.params.albumImage,
      });
    }
  }, [route.params?.albumImage]);

  return (
    <Stack.Navigator
      initialRouteName="AlbumList"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AlbumList" component={AlbumList} />
      <Stack.Screen name="AlbumDetail" component={AlbumDetail} />
    </Stack.Navigator>
  );
};

export default AlbumStack;
