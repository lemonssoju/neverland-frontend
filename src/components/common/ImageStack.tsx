import { View, Image } from 'react-native';
import { LIGHTPURPLE, PURPLE } from '../../styles/GlobalColor';
import { Caption } from '../../styles/GlobalText';

interface ImageStackProps {
  data: string[];
}

const ImageStack = ({ data }: ImageStackProps) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
      {data.slice(0, 3).map((item, index) => {
        return (
          <Image
            key={index}
            source={{ uri: item }}
            style={{
              width: 35,
              height: 35,
              borderRadius: 180,
              borderColor: PURPLE,
              borderWidth: 0.7,
              position: 'absolute',
              top: -30,
              right: data.length > 3 ? index * 20 + 15 : index * 20,
            }}
          />
        );
      })}
      {data.length > 3 && (
        <View
          style={{
            width: 25,
            height: 25,
            borderRadius: 180,
            borderWidth: 1.2,
            borderColor: PURPLE,
            backgroundColor: LIGHTPURPLE,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: -24,
            right: 0,
          }}>
          <Caption style={{ color: PURPLE, lineHeight: 15 }}>
            +{data.length - 3}
          </Caption>
        </View>
      )}
    </View>
  );
};

export default ImageStack;
