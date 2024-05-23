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
import { BLACK, GRAY, WHITE } from '../../styles/GlobalColor';
import { Body, Caption, Title } from '../../styles/GlobalText';
import styled from 'styled-components/native';
import PhotoButton from '../common/PhotoButton';
import { Asset } from 'react-native-image-picker';
import Input from '../common/Input';
import BottomButton from '../common/BottomButton';
import CalendarIcon from '../../assets/common/Calendar.svg';
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';
import IconButton from '../common/IconButton';

interface GroupCreateProps {
  setTmp: Dispatch<SetStateAction<boolean>>;
  setFormVisible: Dispatch<SetStateAction<boolean>>;
}

const GroupCreate = ({ setTmp, setFormVisible }: GroupCreateProps) => {
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
      setGroup({ ...group, name: '화정동 칠공주', date: selectedDate });
    },
    [group.date, showPicker],
  );

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
  var isDatePicked =
    moment(group.date).format('YYYY.MM.DD').toString() !==
    moment(new Date()).format('YYYY.MM.DD').toString();

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
          style={{ marginVertical: 10 }}
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
        <View>
          <Input
            value={
              isDatePicked
                ? moment(group.date).format('YYYY년 MM월').toString()
                : undefined
            }
            placeholder="그룹 멤버들과 처음 만난 날짜를 입력해주세요."
            label="처음 만난 날"
            isRequired
            editable={false}
          />
          <IconButton
            onPress={() => showPicker(true)}
            style={{ position: 'absolute', top: 23, right: 3, zIndex: 1 }}>
            <CalendarIcon />
          </IconButton>
        </View>
        <View style={{ marginTop: 20 }}>
          <BottomButton label="등록" onPress={() => {setFormVisible(false); setTmp(true)}} />
        </View>
      </KeyboardAvoidingView>
      {show && (
        <View style={{ alignItems: 'center' }}>
          <MonthPicker
            onChange={onValueChange}
            value={group.date}
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
