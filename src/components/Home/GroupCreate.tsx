import { Dispatch, SetStateAction, useCallback, useState } from 'react';
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
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';

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
    date: new Date(),
  });

  const [show, setShow] = useState<boolean>(false);

  const showPicker = useCallback((value: boolean) => setShow(value), []);

  const onValueChange = useCallback(
    (event: any, newDate: any) => {
      const selectedDate = newDate || group.date;
      showPicker(false);
      setGroup({ ...group, date: selectedDate });
    },
    [group.date, showPicker],
  );

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
        <View style={{ height: 180 }} />
        <PhotoBox>
          <PhotoButton photo={photo} setPhoto={setPhoto} />
        </PhotoBox>
        <Caption style={{ color: GRAY }}>
          그룹의 대표 이미지를 첨부해주세요.
        </Caption>
        <Input
          label="그룹명"
          value={group.name}
          onChangeText={name => {
            setGroup({ ...group, name: name });
          }}
          isRequired
          placeholder="그룹명을 입력해주세요."
        />
        <Input
          value={moment(group.date).format('YYYY년 MM월').toString()}
          label="처음 만난 날"
          isRequired
        />
        <TouchableOpacity
          onPress={() => showPicker(true)}
          style={{ position: 'absolute', bottom: 205, right: 30, zIndex: 1 }}>
          <CalendarIcon />
        </TouchableOpacity>
        {show && (
          <MonthPicker
            onChange={onValueChange}
            value={group.date}
            minimumDate={new Date(1970, 1)}
            maximumDate={new Date()}
            locale="ko"
          />
        )}
        <View style={{ marginTop: 40 }}>
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
