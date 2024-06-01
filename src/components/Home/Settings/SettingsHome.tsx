import { useRef, useState } from 'react';
import {
  Alert,
  Image,
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
import { getAccessToken, removeAccessToken, removeRefreshToken } from '../../../services/storage';

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

interface UserProps {
  nickname: string;
  profile: string;
}

const SettingsHome = ({
  navigation,
}: StackScreenProps<SettingsStackParams, 'SettingsHome'>) => {
  const navigationToAuth =
    useNavigation<StackNavigationProp<RootStackParams>>();
  const [user, setUser] = useState<UserProps>({
    nickname: '곽서진',
    profile: '',
  });
  const textInputRef = useRef<TextInput | null>(null);
  const [editable, setEditable] = useState<boolean>(false);
  const request = Request();
  const [photo, setPhoto] = useState<Asset[]>([{
    fileName: '',
    width: 0,
    height: 0,
    uri: '',
  }]);
  const logout = () => {
    const logoutRequest = async () => {
      const accessToken = await getAccessToken();
      const response = await request.patch('/users/logout', {
        Authorization: accessToken,
      });
      if (response.isSuccess) {
        removeAccessToken();
        removeRefreshToken();
        navigationToAuth.replace('Auth');
      } else {
        Alert.alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
      }
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
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader label="마이페이지" onBack={() => navigation.goBack()} />
      <View style={{ padding: 20 }}>
        <View style={{ alignItems: 'center', marginBottom: 70 }}>
          <Image
            source={
              photo[0].uri
                ? { uri: photo[0].uri }
                : user.profile
                ? { uri: user.profile }
                : require('../../../assets/Puzzle.png')
            }
            style={{
              width: 140,
              height: 140,
              borderRadius: 180,
              borderWidth: 1.5,
              borderColor: PURPLE,
            }}
            resizeMode={photo[0].uri || user.profile ? 'cover' : 'contain'}
          />
          <PhotoAction
            setPhoto={setPhoto}
            style={{ position: 'absolute', zIndex: 1, top: 110, left: 210 }}>
            <PhotoIcon />
          </PhotoAction>
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            {/* <Title style={{ letterSpacing: -0.2 }}>{user.nickname}</Title> */}
            <TextInput
              ref={textInputRef}
              value={user.nickname}
              onChangeText={text => setUser({ ...user, nickname: text })}
              style={{
                fontFamily: 'Pretendard Variable',
                fontWeight: '700',
                fontSize: 20,
              }}
              editable={editable}
              autoFocus={editable}
            />
            <Title style={{ letterSpacing: -0.2, fontWeight: '500' }}>님</Title>
            <IconButton
              style={{ position: 'absolute', left: 80 }}
              onPress={() => {
                editable
                  ? setEditable(false)
                  : (setEditable(true),
                    setTimeout(() => textInputRef.current?.focus(), 0));
              }}>
              {editable ? <Body>완료</Body> : <PencilIcon />}
            </IconButton>
            <View
              style={{
                height: 9,
                backgroundColor: LIGHTPURPLE,
                width: 17 * (user.nickname.length + 1),
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
