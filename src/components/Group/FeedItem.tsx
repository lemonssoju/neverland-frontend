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
import { FeedStackParams } from '../../pages/Group/FeedStack';
import { useNavigation } from '@react-navigation/native';
import { B14, B12, Content, Subtitle } from '../../styles/GlobalText';
import MarkerIcon from '../../assets/common/Marker.svg';
import { WHITE } from '../../styles/GlobalColor';

const { width, height } = Dimensions.get('window');

export interface FeedItemProps {
  writer: string;
  title: string;
  date: string;
  location: string;
  rep_pic: any;
}

const FeedItem = ({
  writer,
  title,
  date,
  location,
  rep_pic,
}: FeedItemProps) => {
  const navigation = useNavigation<StackNavigationProp<FeedStackParams>>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('FeedDetail', { id: 1});
      }}
      style={{ marginLeft: 10, marginBottom: 10, width: width / 2 - 15 }}>
      <ImageBackground
        source={rep_pic}
        style={{ width: '100%', height: 250 }}
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
            <Content style={{ fontWeight: '600', color: WHITE }}>
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
              {date} | {writer}
            </Content>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default FeedItem;
