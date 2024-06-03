import { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import EditButton from '../../common/EditButton';
import {
  BLACK,
  GRAY,
  LIGHTGRAY,
  LIGHTPURPLE,
} from '../../../styles/GlobalColor';
import DotsIcon from '../../../assets/common/Dots.svg';
import { Label, Content, Caption, Body } from '../../../styles/GlobalText';
import { PuzzlePieceProps } from './PuzzlePieceUpload';
import IconButton from '../../common/IconButton';
import { useRecoilState } from 'recoil';
import { userState } from '../../../recoil/userState';

interface PuzzlePieceItemProps {
  puzzlePiece: PuzzlePieceProps;
  onEdit: () => void;
  onDelete: () => void;
  background: string;
  isLast: boolean;
}

const PuzzlePieceItem = ({
  puzzlePiece,
  background,
  onEdit,
  onDelete,
  isLast,
}: PuzzlePieceItemProps) => {
  const [user, setUser] = useRecoilState(userState);
  const [dotPressed, setDotPressed] = useState<boolean>(false);
  const { nickname, profileImage, puzzlePieceText } = puzzlePiece;
  return (
    <View style={{ paddingTop: 10, paddingHorizontal: 15 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: profileImage || 'https://ifh.cc/g/wKYSNB.png'}}
          style={{ width: 32, height: 32, borderRadius: 180, marginRight: 5 }}
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
        {user.nickname === nickname && (
          <IconButton
            onPress={() => setDotPressed(!dotPressed)}
            style={{
              width: 30,
              height: 30,
              position: 'absolute',
              top: 8,
              right: 0,
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}>
            <DotsIcon
              color={BLACK}
              width={12}
              height={23}
              transform={[{ rotate: '90deg' }]}
            />
          </IconButton>
        )}
        {dotPressed && (
          <EditButton
            editLabel="수정"
            deleteLabel="삭제"
            onEdit={onEdit}
            onDelete={onDelete}
            style={{ top: 30, right: 15 }}
          />
        )}
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
