import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  LayoutChangeEvent,
  Platform,
  Pressable,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomHeader from '../../common/CustomHeader';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { SettingsStackParams } from '../../../pages/HomeStack';
import { Body, Subtitle, Title } from '../../../styles/GlobalText';
import { BLACK, LIGHTPURPLE, PURPLE } from '../../../styles/GlobalColor';
import PhotoIcon from '../../../assets/common/PhotoWithBg.svg';
import PencilIcon from '../../../assets/common/Pencil.svg';
import { PhotoAction } from '../../common/PhotoButton';
import { Asset } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../../../App';
import IconButton from '../../common/IconButton';
import Request from '../../../services/requests';
import {
  getAccessToken,
  removeAccessToken,
  removeRefreshToken,
} from '../../../services/storage';
import { userState } from '../../../recoil/userState';
import { useRecoilState } from 'recoil';

interface OptionProps {
  label: string;
  onPress: () => void;
}

const Option = ({ label, onPress }: OptionProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 17,
        backgroundColor: LIGHTPURPLE,
        borderRadius: 8,
        marginVertical: 7,
      }}>
      <Body style={{ fontWeight: '600' }}>{label}</Body>
    </TouchableOpacity>
  );
};

export interface UserProps {
  nickname: string;
  profileImage: string | null;
}

const SettingsHome = ({
  navigation,
}: StackScreenProps<SettingsStackParams, 'SettingsHome'>) => {
  const navigationToAuth =
    useNavigation<StackNavigationProp<RootStackParams>>();
  const [user, setUser] = useRecoilState<UserProps>(userState);
  const textInputRef = useRef<TextInput | null>(null);
  const [editable, setEditable] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>(user.nickname);
  const request = Request();
  const [photo, setPhoto] = useState<Asset[]>([
    {
      fileName: '',
      width: 0,
      height: 0,
      uri: '',
    },
  ]);

  const onNicknameEdit = async () => {
    if (nickname === user.nickname) {
      setEditable(false);
      setTimeout(() => textInputRef.current?.focus(), 0);
    } else {
      const response = await request.patch('/users/modifyNickname', {
        nickname: nickname,
      });
      if (response.isSuccess) {
        Alert.alert('닉네임이 성공적으로 변경되었습니다.');
        setUser({ ...user, nickname: nickname });
        setEditable(false);
      }
    }
  };

  const onProfileImageEdit = async () => {
    const formData = new FormData();
    formData.append('newImage', {
      uri: photo[0].uri,
      name: photo[0].fileName,
      type: photo[0].uri!.endsWith('.jpg') ? 'image/jpeg' : 'image/png',
    });
    const response = await request.patch('/users/profileImage', formData, {
      headers: {
        'Content-Type': 'multipart/formdata; boundary="boundary"',
      },
      transformRequest: () => {
        return formData;
      },
    });
    if (response.isSuccess) {
      Alert.alert('프로필 이미지가 성공적으로 변경되었습니다.');
      setUser({ ...user, profileImage: photo[0].uri! });
    }
  };
  useEffect(() => {
    photo[0].uri && onProfileImageEdit();
  }, [photo[0].uri]);

  const logout = () => {
    const logoutRequest = async () => {
      const accessToken = await getAccessToken();
      const response = await request.patch('/users/logout', {
        Authorization: accessToken,
      });
      removeAccessToken();
      removeRefreshToken();
      setUser({ nickname: '', profileImage: '' });
      navigationToAuth.replace('Auth');
    };
    Alert.alert(
      '알림',
      '로그아웃하시겠습니까?',
      [
        {
          text: '예',
          onPress: logoutRequest,
          style: 'destructive',
        },
        {
          text: '아니오',
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };
  const [textWidth, setTextWidth] = useState<number>(0);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader label="마이페이지" onBack={() => navigation.goBack()} />
      <View style={{ padding: 20 }}>
        <View style={{ alignItems: 'center', marginBottom: 70 }}>
          <Image
            source={{ uri: photo[0].uri || user.profileImage! }}
            style={{
              width: 140,
              height: 140,
              borderRadius: 180,
              borderWidth: 1.5,
              borderColor: PURPLE,
            }}
            resizeMode={photo[0].uri || user.profileImage ? 'cover' : 'contain'}
          />
          <PhotoAction
            setPhoto={setPhoto}
            style={{ position: 'absolute', zIndex: 1, top: 110, left: 210 }}>
            <PhotoIcon />
          </PhotoAction>
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <TextInput
              ref={textInputRef}
              value={nickname || user.nickname}
              onChangeText={text => setNickname(text)}
              style={{
                fontFamily: 'Pretendard Variable',
                fontWeight: '700',
                fontSize: 20,
                marginTop: Platform.OS === 'ios' ? 0 : -15,
                color: BLACK
              }}
              editable={editable}
              autoFocus={editable}
              onLayout={(event: LayoutChangeEvent) => {
                setTextWidth(event.nativeEvent.layout.width);
              }}
            />
            <Title style={{ letterSpacing: -0.2, fontWeight: '500' }}>님</Title>
            <IconButton
              style={{ position: 'absolute', left: textWidth + 20, top: -5 }}
              onPress={() => {
                editable
                  ? onNicknameEdit()
                  : (setEditable(true),
                    setTimeout(() => textInputRef.current?.focus(), 0));
              }}>
              {editable ? <Body>완료</Body> : <PencilIcon />}
            </IconButton>
            <View
              style={{
                height: 9,
                backgroundColor: LIGHTPURPLE,
                width: textWidth + 15,
                position: 'absolute',
                top: 15,
                zIndex: -1,
              }}
            />
          </View>
        </View>
        <Option
          label="개인정보 변경"
          onPress={() => navigation.navigate('ChangePassword')}
        />
        <Option label="이용약관" onPress={() => {}} />
        <Option label="로그아웃" onPress={logout} />
        <Option
          label="회원 탈퇴"
          onPress={() => navigation.navigate('Withdraw')}
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingsHome;
