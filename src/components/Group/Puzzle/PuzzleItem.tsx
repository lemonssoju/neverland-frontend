import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PuzzleStackParams } from '../../../pages/Group/PuzzleStack';
import { useNavigation } from '@react-navigation/native';
import { Content, Subtitle } from '../../../styles/GlobalText';
import MarkerIcon from '../../../assets/common/Marker.svg';
import { WHITE } from '../../../styles/GlobalColor';

const { width, height } = Dimensions.get('window');

export interface PuzzleItemProps {
  puzzleIdx: number;
  title: string;
  puzzleImage: string;
  writer: string;
  createdDate: string;
  location: string;
}

const PuzzleItem = ({ puzzle }: { puzzle: PuzzleItemProps }) => {
  const navigation = useNavigation<StackNavigationProp<PuzzleStackParams>>();
  const { puzzleIdx, title, puzzleImage, writer, createdDate, location } =
    puzzle;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('PuzzleDetail', { puzzleIdx: puzzleIdx });
      }}
      style={{ marginLeft: 10, marginBottom: 10, width: width / 2 - 15 }}>
      <ImageBackground
        source={{ uri: puzzleImage || 'https://ifh.cc/g/wZmLTn.png' }}
        style={{ width: '100%', height: 250 }}
        resizeMode={puzzleImage ? 'cover' : 'contain'}
        imageStyle={{ borderRadius: 8 }}>
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'black',
            width: '100%',
            height: '100%',
            opacity: 0.2,
            borderRadius: 8,
          }}
        />
        <View style={{ paddingHorizontal: 10, paddingVertical: 5, flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MarkerIcon color={WHITE} />
            <Content
              numberOfLines={1}
              style={{ fontWeight: '600', color: WHITE, width: '90%' }}>
              {' '}
              {location}
            </Content>
          </View>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Subtitle
              style={{ fontWeight: '700', color: WHITE }}
              numberOfLines={1}>
              {title}
            </Subtitle>
            <Content style={{ color: WHITE }}>
              {createdDate} | {writer}
            </Content>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default PuzzleItem;
