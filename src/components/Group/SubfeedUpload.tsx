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
import CustomHeader from '../common/CustomHeader';
import { Dispatch, SetStateAction, useState } from 'react';
import { BLACK, GRAY, LIGHTGRAY } from '../../styles/GlobalColor';
import { Body, Label } from '../../styles/GlobalText';
import BottomButton from '../common/BottomButton';

export interface SubfeedProps {
  writer: string;
  content?: string;
  profile: string;
}

interface SubfeedUploadProps extends SubfeedProps {
  setSubfeedModal: Dispatch<SetStateAction<boolean>>;
}
const SubfeedUpload = ({
  writer,
  content,
  profile,
  setSubfeedModal,
}: SubfeedUploadProps) => {
  const [subfeed, setSubfeed] = useState<string>('');
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader
        label="추억 퍼즐 맞추기"
        onClose={() => {
          setSubfeedModal(false);
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
            source={{ uri: profile }}
            style={{ width: 32, height: 32, borderRadius: 180, marginRight: 5 }}
          />
          <Label>{writer}</Label>
        </View>
        <TextInput
          value={subfeed}
          onChangeText={(content: string) => {
            setSubfeed(content);
          }}
          placeholder={
            '추억 퍼즐 내용을 작성해 주세요.\n\n해당 퍼즐 내용을 모아 추억 퍼즐이 완성되니 신중하게 적어주세요.'
          }
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
        />
        <Body
          style={{
            color: GRAY,
            textAlign: 'right',
            marginRight: 5,
            marginVertical: 5,
          }}>
          {subfeed.length} / 100
        </Body>
        <BottomButton label="등록" onPress={() => setSubfeedModal(false)} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SubfeedUpload;
