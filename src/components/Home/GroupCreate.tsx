import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
  ScrollView,
} from 'react-native';
import CustomHeader from '../common/CustomHeader';
import { GRAY, WHITE } from '../../styles/GlobalColor';
import { Body, Caption, Title } from '../../styles/GlobalText';
import styled from 'styled-components/native';
import PhotoButton from '../common/PhotoButton';
import { Asset } from 'react-native-image-picker';
import Input from '../common/Input';
import BottomButton from '../common/BottomButton';
import CalendarIcon from '../../assets/common/Calendar.svg';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import IconButton from '../common/IconButton';

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

  const onValueChange = (newDate: Date) => {
    const selectedDate = newDate || group.date;
    showPicker(false);
    setGroup({ ...group, date: selectedDate });
  };

  const [keyboardOpen, setKeyboardOpen] = useState<boolean>(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOpen(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // console.log(group.date.toISOString().split('T')[0]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
      <CustomHeader label="그룹 만들기" onClose={() => setFormVisible(false)} />
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={10}
        style={{
          paddingHorizontal: 25,
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <Pressable
          style={{ width: '100%', height: '100%', position: 'absolute' }}
          onPress={() => Keyboard.dismiss()}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 10, marginTop: 5 }}
          contentContainerStyle={{ alignItems: 'center' }}
          scrollEnabled={keyboardOpen}>
          <Image
            source={require('../../assets/Puzzle2.png')}
            style={{ width: 170, height: 180 }}
          />
          <Title style={{ marginTop: 15, fontWeight: '600' }}>
            추억을 함께할 그룹을 만들어보아요!
          </Title>
          <Body style={{ color: GRAY }}>
            추억 퍼즐을 맞추고 모아볼 수 있어요
          </Body>
        </ScrollView>
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
          value={moment(group.date).format('YYYY년 MM월 DD일').toString()}
          label="처음 만난 날"
          isRequired
          editable={false}
        />
        <IconButton
          onPress={() => showPicker(true)}
          style={{ position: 'absolute', bottom: 100, right: 30, zIndex: 1 }}>
          <CalendarIcon />
        </IconButton>
        <View style={{ marginTop: 20 }}>
          <BottomButton label="등록" onPress={() => setFormVisible(false)} />
        </View>
      </KeyboardAvoidingView>
      {show && (
        <View style={{ alignItems: 'center' }}>
          <DatePicker
            onDateChange={onValueChange}
            date={group.date}
            mode={'date'}
            minimumDate={new Date(1970, 1)}
            maximumDate={new Date()}
            locale="ko"
          />
        </View>
      )}
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
