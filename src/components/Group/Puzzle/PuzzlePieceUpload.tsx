import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
} from 'react-native';
import CustomHeader from '../../common/CustomHeader';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { BLACK, GRAY, LIGHTGRAY } from '../../../styles/GlobalColor';
import { Body, Label } from '../../../styles/GlobalText';
import BottomButton from '../../common/BottomButton';
import Request from '../../../services/requests';
import { useRecoilState } from 'recoil';
import { groupState } from '../../../recoil/groupState';
import { UserProps } from '../../Home/Settings/SettingsHome';
import { userState } from '../../../recoil/userState';

export interface PuzzlePieceProps {
  nickname: string;
  puzzlePieceText: string;
  profileImage: string;
}

interface PuzzlePieceUploadProps {
  puzzleIdx: number;
  setPuzzlePieceModal: Dispatch<SetStateAction<boolean>>;
}
const SubfeedUpload = ({
  puzzleIdx,
  setPuzzlePieceModal,
}: PuzzlePieceUploadProps) => {
  const [puzzlePiece, setPuzzlePiece] = useState<string>('');
  const request = Request();
  const [groupIdx, setGroupIdx] = useRecoilState(groupState);
  const [user, setUser] = useRecoilState<UserProps>(userState);
  const onCreate = async () => {
    console.log(puzzlePiece);
    console.log(groupIdx, puzzleIdx);
    const response = await request.post(
      `/groups/${groupIdx}/puzzles/${puzzleIdx}/puzzlePiece`,
      {
        content: puzzlePiece,
      },
    );
    if (response.isSuccess) setPuzzlePieceModal(false);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader
        label="추억 퍼즐 맞추기"
        onClose={() => {
          setPuzzlePieceModal(false);
        }}
      />
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={10}
        style={{ paddingHorizontal: 20, flex: 1 }}>
        <Pressable
          style={{ width: '100%', height: '100%', position: 'absolute' }}
          onPress={() => Keyboard.dismiss()}
        />
        <View
          style={{
            height: 22,
            width: 1.6,
            backgroundColor: LIGHTGRAY,
            marginLeft: 15,
          }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{ uri: user.profileImage! }}
            style={{ width: 32, height: 32, borderRadius: 180, marginRight: 5 }}
          />
          <Label>{user.nickname}</Label>
        </View>
        <TextInput
          value={puzzlePiece}
          onChangeText={(content: string) => {
            setPuzzlePiece(content);
          }}
          placeholder={
            '추억 퍼즐 내용을 작성해 주세요.\n\n해당 퍼즐 내용을 모아 추억 퍼즐이 완성되니 신중하게 적어주세요.'
          }
          placeholderTextColor={GRAY}
          style={{
            padding: 10,
            color: BLACK,
            fontSize: 16,
            fontFamily: 'Pretendard Variable',
            marginLeft: 25,
            marginTop: 5,
            marginRight: 5,
            flex: 1,
          }}
          multiline
          autoFocus
          maxLength={2000}
        />
        {puzzlePiece.length === 0 && (
          <Body
            style={{
              color: GRAY,
              position: 'absolute',
              fontWeight: '400',
              left: 55,
              paddingRight: 70,
              top: 160,
              lineHeight: 19,
            }}>
            자세히 적으실수록 더 풍성한 내용의 퍼즐 앨범이 완성돼요!
          </Body>
        )}
        <Body
          style={{
            color: GRAY,
            textAlign: 'right',
            marginRight: 5,
            marginVertical: 5,
          }}>
          {puzzlePiece.length} / 100
        </Body>
        <BottomButton label="등록" onPress={onCreate} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SubfeedUpload;
