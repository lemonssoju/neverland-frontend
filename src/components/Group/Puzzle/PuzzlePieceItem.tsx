import { View, Image } from 'react-native';
import { LIGHTGRAY } from '../../../styles/GlobalColor';
import { Label, Body } from '../../../styles/GlobalText';
import { PuzzlePieceProps } from './PuzzlePieceUpload';

interface PuzzlePieceItemProps {
  puzzlePiece: PuzzlePieceProps;
  background: string;
  isLast: boolean;
}

const PuzzlePieceItem = ({
  puzzlePiece,
  background,
  isLast,
}: PuzzlePieceItemProps) => {
  const { nickname, profileImage, puzzlePieceText } = puzzlePiece;
  return (
    <View style={{ paddingTop: 10, paddingHorizontal: 15 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: profileImage || 'https://ifh.cc/g/6oVnyL.png' }}
          style={{
            width: 32,
            height: 32,
            borderRadius: 180,
            marginRight: 5,
          }}
          resizeMode={profileImage ? 'cover' : 'contain'}
        />
        <Label>{nickname}</Label>
      </View>
      <View
        style={{
          backgroundColor: background,
          marginBottom: 5,
          marginLeft: 35,
          borderRadius: 12,
          paddingVertical: 12,
          paddingHorizontal: 20,
        }}>
        <Body>{puzzlePieceText}</Body>
      </View>
      {!isLast && (
        <View
          style={{
            position: 'absolute',
            left: 31,
            top: 42,
            backgroundColor: LIGHTGRAY,
            width: 1.6,
            height: '100%',
          }}
        />
      )}
    </View>
  );
};

export default PuzzlePieceItem;
