import { View, ImageBackground, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParams } from '../../pages/Home';
import { useNavigation } from '@react-navigation/native';

interface FeedItemProps {
  title: string;
  rep_pic: string;
}

const FeedItem = ({ title, rep_pic }: FeedItemProps) => {
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation<StackNavigationProp<HomeStackParams>>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('FeedDetail')} style={{marginVertical: 10}}>
      <ImageBackground source={{ uri: rep_pic }} style={{width: width, height: 200}} />
      <Text style={{textAlign: 'center'}}>{title}</Text>
    </TouchableOpacity>
  )
}

export default FeedItem;
