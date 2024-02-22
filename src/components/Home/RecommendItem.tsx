import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { BLACK, WHITE } from '../../styles/GlobalColor';
import { B12 } from '../../styles/GlobalText';

export interface RecommendItemProps {
  title: string;
  hashtag: string[];
  rep_pic: string;
}

const RecommendItem = ({ title, hashtag, rep_pic }: RecommendItemProps) => {
  return (
    <TouchableOpacity style={{width: 130, height: 130, marginRight: 15}}>
      <ImageBackground source={{uri: rep_pic}} style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{position: 'absolute', backgroundColor: BLACK, opacity: 0.2, width: '100%', height: '100%'}} />
        <B12 style={{textAlign: 'center', width: '70%', lineHeight: 24}}>{title}</B12>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', position: 'absolute', bottom: 10, left: 10}}>
          {hashtag.map((item, index) => {
            return (
              <B12 key={index}>#{item} </B12>
            )
          })}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

export default RecommendItem;