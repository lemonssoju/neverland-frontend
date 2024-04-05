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
import { GroupStackParams } from '../../pages/Group/Feed';
import { useNavigation } from '@react-navigation/native';
import { B14, B12 } from '../../styles/GlobalText';

const { width, height } = Dimensions.get('window');

export interface FeedItemProps {
  writer: string;
  title: string;
  subtitle: string;
  rep_pic: string;
}

const FeedItem = ({ writer, title, subtitle, rep_pic }: FeedItemProps) => {
  const navigation = useNavigation<StackNavigationProp<GroupStackParams>>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('FeedDetail');
      }}
      style={{ marginLeft: 10, marginTop: 10, width: width / 2 - 15 }}>
      <ImageBackground
        source={{ uri: rep_pic }}
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
        <View style={{ paddingHorizontal: 10, paddingVertical: 15 }}>
          <B14 style={{ textAlign: 'right' }}>{writer}</B14>
          <View style={{ justifyContent: 'flex-end', height: '95%' }}>
            <B14 style={{ width: '90%' }}>{title}</B14>
            <B12 style={{ marginTop: 5 }}>{subtitle}</B12>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default FeedItem;
