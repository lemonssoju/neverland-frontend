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
  Alert,
  Dimensions,
  LayoutChangeEvent,
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
import Request from '../../services/requests';
import ShareModal from '../common/ShareModal';
import { PuzzlerProps } from '../Group/Write/PuzzleUpload';

interface GroupCreateProps {
  groupIdx?: number;
  setFormVisible: Dispatch<SetStateAction<boolean>>;
}

interface GroupProps {
  name: string;
  date: Date;
  memberList: PuzzlerProps[];
}

const GroupCreate = ({ groupIdx, setFormVisible }: GroupCreateProps) => {
  const { width, height } = Dimensions.get('screen');
  const request = Request();
  const [photo, setPhoto] = useState<Asset[]>([
    {
      fileName: '',
      width: 0,
      height: 0,
      uri: '',
    },
  ]);
  const [group, setGroup] = useState<GroupProps>({
    name: '',
    date: new Date(),
    memberList: [],
  });
  const [show, setShow] = useState<boolean>(false);
  const showPicker = useCallback((value: boolean) => setShow(value), []);

  const onValueChange = (event: any, newDate: any) => {
    const selectedDate = newDate || group.date;
    showPicker(false);
    setGroup({ ...group, date: selectedDate });
  };

  const [inviteVisible, setInviteVisible] = useState<boolean>(false);
  const [joinCode, setJoinCode] = useState<number>(0);

  const getGroupData = async () => {
    const response = await request.get(`/groups/${groupIdx}/editView`);
    if (response.isSuccess) {
      setGroup({
        ...group,
        name: response.result.name,
        date: new Date(response.result.startDate),
      });
      setPhoto([
        {
          fileName: 'group-profile',
          width: 0,
          height: 0,
          uri: response.result.groupImage,
        },
      ]);
    }
  };

  const getPuzzler = async () => {
    const response = await request.get(
      `/groups/${groupIdx}/puzzles/puzzlerList`,
    );
    setGroup({
      ...group,
      memberList: response.result.puzzlerList.map(
        (item: { userIdx: number }) => item.userIdx,
      ),
    });
  };

  useEffect(() => {
    if (groupIdx) {
      getGroupData();
      getPuzzler();
    }
  }, [groupIdx]);

  const onCreate = async () => {
    if (group.name.length * photo[0].uri!.length === 0) {
      Alert.alert('빈칸을 모두 채워주세요!');
    } else {
      const formData = new FormData();
      formData.append('image', {
        uri: photo[0].uri,
        name: photo[0].fileName,
        type: photo[0].uri!.endsWith('.jpg') ? 'image/jpeg' : 'image/png',
      });
      if (groupIdx) {
        formData.append('editGroupRequest', {
          string: JSON.stringify({
            name: group.name,
            startDate: group.date.toISOString().split('T')[0].substring(0, 7),
            memberList: group.memberList,
          }),
          type: 'application/json',
        });
        const data = formData.getParts();
        console.log(data);
        const response = await request.patch(
          `/groups/${groupIdx}/edit`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/formdata; boundary="boundary"',
            },
            transformRequest: () => {
              return formData;
            },
          },
        );
        if (response.isSuccess) {
          setInviteVisible(true);
          setFormVisible(false);
          setGroup({
            name: '',
            date: new Date(),
            memberList: [],
          });
          setPhoto([]);
        } else {
          Alert.alert('그룹 수정에 실패했습니다. 다시 시도해주세요.');
        }
      } else {
        formData.append('createGroupRequest', {
          string: JSON.stringify({
            name: group.name,
            startDate: group.date.toISOString().split('T')[0].substring(0, 7),
            memberList: group.memberList,
          }),
          type: 'application/json',
        });
        const response = await request.post('/groups/create', formData, {
          headers: {
            'Content-Type': 'multipart/formdata; boundary="boundary"',
          },
          transformRequest: () => {
            return formData;
          },
        });
        if (response.isSuccess) {
          setJoinCode(response.result.joinCode);
          setInviteVisible(true);
          // setFormVisible(false);
        } else {
          Alert.alert('그룹 생성에 실패했습니다. 다시 시도해주세요.');
        }
      }
    }
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

  var isDatePicked =
    moment(group.date).format('YYYY.MM.DD').toString() !==
    moment(new Date()).format('YYYY.MM.DD').toString();
  const [inputHeight, setInputHeight] = useState<number>(0);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
      <CustomHeader
        label="그룹 만들기"
        onClose={() => {
          setFormVisible(false);
          setGroup({
            name: '',
            date: new Date(),
            memberList: [],
          });
          setPhoto([]);
        }}
      />
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={10}
        style={{
          paddingHorizontal: 25,
          flex: 1,
          justifyContent: 'space-between',
        }}>
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
            onLayout={(event: LayoutChangeEvent) => {
              setInputHeight(event.nativeEvent.layout.height);
            }}
          />
          <IconButton
            onPress={() => {
              Keyboard.dismiss();
              showPicker(true);
            }}
            style={{
              position: 'absolute',
              right: 5,
              top: inputHeight - 15,
              zIndex: 1,
            }}>
            <CalendarIcon />
          </IconButton>
        </View>
        <View style={{ marginTop: 20 }}>
          <BottomButton label="등록" onPress={onCreate} />
        </View>
      </KeyboardAvoidingView>
      {show && (
        <View style={{ alignItems: 'center' }}>
          <MonthPicker
            onChange={onValueChange}
            // onChange={() => handleInputChange('date', date);}
            value={group.date}
            minimumDate={new Date(1970, 1)}
            maximumDate={new Date()}
            locale="ko"
          />
        </View>
      )}
      <ShareModal
        modalVisible={inviteVisible}
        setModalVisible={setInviteVisible}
        code={joinCode}
        onPress={() => {
          setGroup({
            name: '',
            date: new Date(),
            memberList: [],
          });
          setPhoto([]);
          setFormVisible(false);
        }}
      />
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
