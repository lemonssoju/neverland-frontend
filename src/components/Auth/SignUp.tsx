import { useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  LayoutChangeEvent,
  Pressable,
  SafeAreaView,
  View,
} from 'react-native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from '../../pages/AuthStack';
import CustomHeader from '../common/CustomHeader';
import Input from '../common/Input';
import BottomButton from '../common/BottomButton';
import styled from 'styled-components/native';
import { BLACK, PURPLE, WHITE } from '../../styles/GlobalColor';
import { Caption } from '../../styles/GlobalText';
import Request from '../../services/requests';
import { useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../../App';
import { setAccessToken, setRefreshToken } from '../../services/storage';

interface FormTypes {
  loginId: string;
  nickname: string;
  password: string;
  passwordCheck: string;
}

interface CheckTypes {
  loginId: boolean;
  nickname: boolean;
  password: boolean;
}

const SignUp = ({
  navigation,
}: StackScreenProps<AuthStackParams, 'SignUp'>) => {
  const navigationToTab = useNavigation<StackNavigationProp<RootStackParams>>();
  const [form, setForm] = useState<FormTypes>({
    loginId: '',
    nickname: '',
    password: '',
    passwordCheck: '',
  });
  const [check, setCheck] = useState<CheckTypes>({
    loginId: true,
    nickname: true,
    password: true,
  });
  const request = Request();

  const duplicateCheck = async (type: string) => {
    if (type === 'loginId') {
      if (form.loginId) {
        const response = await request.post('/users/loginId', {
          loginId: form.loginId,
        });
        if (response.isSuccess) {
          setCheck({ ...check, loginId: true });
        }
      } else {
        Alert.alert('아이디를 입력해주세요!');
      }
    } else {
      if (form.nickname) {
        const response = await request.post('/users/nickname', {
          loginId: form.nickname,
        });
        if (response.isSuccess) {
          setCheck({ ...check, nickname: true });
        }
      } else {
        Alert.alert('닉네임을 입력해주세요!');
      }
    }
  };

  useEffect(() => {
    if (form.password === form.passwordCheck) {
      setCheck({ ...check, password: true });
    }
  }, [form.passwordCheck]);

  const signup = async () => {
    if (
      form.loginId.length *
        form.nickname.length *
        form.password.length *
        form.passwordCheck.length ===
      0
    ) {
      Alert.alert('빈칸을 채워주세요!');
    } else if (!check.loginId) {
      Alert.alert('아이디 중복 확인을 해주세요!');
    } else if (!check.nickname) {
      Alert.alert('닉네임 중복 확인을 해주세요!');
    } else if (!check.password) {
      Alert.alert('입력한 비밀번호가 일치하지 않습니다!');
    } else {
      const response = await request.post('/users/signup', {
        loginId: form.loginId,
        nickname: form.nickname,
        password: form.password,
        passwordCheck: form.passwordCheck,
      });
      if (response.isSuccess) {
        setAccessToken(response.result.accessToken);
        setRefreshToken(response.result.refreshToken);
        navigationToTab.replace('Home');
      } else {
        Alert.alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
      }
    }
  };
  const [inputHeight, setInputHeight] = useState<number>(0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader label="회원정보 입력" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={10}
        style={{
          paddingHorizontal: 20,
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <Pressable
          style={{ width: '100%', height: '100%', position: 'absolute' }}
          onPress={() => Keyboard.dismiss()}
        />
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <View>
            <Input
              label="아이디"
              value={form.loginId}
              onChangeText={loginId => {
                setForm({ ...form, loginId: loginId });
                setCheck({ ...check, loginId: false });
              }}
              isRequired
              placeholder="아이디를 입력해주세요."
              isAlert={!check.loginId && !form.loginId}
              alert="중복된 아이디입니다."
              description={
                check.loginId && form.loginId ? '사용 가능한 아이디입니다.' : ''
              }
              onLayout={(event: LayoutChangeEvent) => {
                setInputHeight(event.nativeEvent.layout.height);
              }}
            />
            <DuplicateButton
              style={{ top: inputHeight - 5 }}
              onPress={() => duplicateCheck('loginId')}>
              <Caption style={{ color: WHITE, fontWeight: '700' }}>
                중복 확인
              </Caption>
            </DuplicateButton>
          </View>
          <View>
            <Input
              label="닉네임"
              value={form.nickname}
              onChangeText={nickname => {
                setForm({ ...form, nickname: nickname });
                setCheck({ ...check, nickname: false });
              }}
              isRequired
              placeholder="닉네임을 입력해주세요."
              isAlert={!check.nickname && !form.nickname}
              alert="중복된 닉네임입니다."
              description={
                check.nickname && form.nickname
                  ? '사용 가능한 닉네임입니다.'
                  : ''
              }
            />
            <DuplicateButton
              style={{ top: inputHeight - 5 }}
              onPress={() => duplicateCheck('nickname')}>
              <Caption style={{ color: WHITE, fontWeight: '700' }}>
                중복 확인
              </Caption>
            </DuplicateButton>
          </View>
          <Input
            label="비밀번호"
            value={form.password}
            onChangeText={password => setForm({ ...form, password: password })}
            isRequired
            secureTextEntry
            blurOnSubmit={false}
            placeholder="비밀번호를 입력해주세요."
            alert="잘못된 형식의 비밀번호입니다."
          />
          <Input
            label="비밀번호 확인"
            value={form.passwordCheck}
            onChangeText={passwordCheck => {
              setForm({ ...form, passwordCheck: passwordCheck });
              setCheck({ ...check, password: false });
            }}
            isRequired
            secureTextEntry
            blurOnSubmit={false}
            placeholder="비밀번호를 한 번 더 입력해주세요."
            isAlert={!check.password}
            alert="비밀번호가 일치하지 않습니다."
          />
        </View>
        <BottomButton label="가입" onPress={signup} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const DuplicateButton = styled.TouchableOpacity`
  display: flex;
  width: 80px;
  height: 25px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;
  border-radius: 12px;
  background: ${PURPLE};
`;

export default SignUp;
