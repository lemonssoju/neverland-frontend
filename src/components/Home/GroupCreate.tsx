import { Dispatch, SetStateAction, useState } from 'react';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import CustomHeader from '../common/CustomHeader';
import { GRAY, WHITE } from '../../styles/GlobalColor';
import { Body, Caption, Title } from '../../styles/GlobalText';
import styled from 'styled-components/native';
import PhotoButton from '../common/PhotoButton';
import { Asset } from 'react-native-image-picker';
import Input from '../common/Input';
import BottomButton from '../common/BottomButton';
import CalendarIcon from '../../assets/common/Calendar.svg';

interface GroupCreateProps {
  setFormVisible: Dispatch<SetStateAction<boolean>>;
}

const GroupCreate = ({ setFormVisible }: GroupCreateProps) => {
  const [photo, setPhoto] = useState<Asset[]>([
    {
      fileName: '',
      width: 0,
      height: 0,
      uri: '',
    },
  ]);
  const [group, setGroup] = useState({
    name: '',
    date: '',
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
      <CustomHeader label="그룹 만들기" onClose={() => setFormVisible(false)} />
      <View style={{ paddingHorizontal: 25 }}>
        <Title style={{ marginTop: 20, fontWeight: '600' }}>
          추억을 함께할 그룹을 만들어보아요!
        </Title>
        <Body style={{ color: GRAY, marginTop: 5 }}>
          추억 퍼즐을 함께~어쩌구
        </Body>
        <View style={{ height: 120 }} />
        <PhotoBox>
          <PhotoButton photo={photo} setPhoto={setPhoto} />
        </PhotoBox>
        <Caption style={{ color: GRAY }}>
          그룹의 대표 이미지를 첨부해주세요.
        </Caption>
        <Input label="그룹명" isRequired placeholder="그룹명을 입력해주세요." />
        <Input label="처음 만난 날" isRequired />
        <TouchableOpacity
          style={{ position: 'absolute', bottom: 180, right: 30, zIndex: 1 }}>
          <CalendarIcon />
        </TouchableOpacity>
        <View style={{marginTop: 100}}>
        <BottomButton label="등록" onPress={() => setFormVisible(false)} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const PhotoBox = styled.View`
  margin: 5px 0px;
  border-radius: 2px;
  border: 1px solid ${GRAY};
  width: 100%;
  height: 180px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export default GroupCreate;
