import { useEffect, useState } from 'react';
import { Alert, SafeAreaView, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from '../../pages/Auth';
import CustomHeader from '../common/CustomHeader';
import Input from '../common/Input';
import BottomButton from '../common/BottomButton';
import styled from 'styled-components/native';
import { BLACK, MINT } from '../../styles/GlobalColor';
import { B16 } from '../../styles/GlobalText';
import Request from '../../services/requests';

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

  const signup = () => {
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
      // 다음으로 이동 ? 회원가입 완료 ?
      navigation.replace('Contents');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'space-between' }}>
      <CustomHeader label="회원정보 입력" />
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
        />
        <DuplicateButton
          style={{ top: 10 }}
          onPress={() => duplicateCheck('loginId')}>
          <B16 style={{ color: BLACK }}>중복 확인</B16>
        </DuplicateButton>
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
            check.nickname && form.nickname ? '사용 가능한 닉네임입니다.' : ''
          }
        />
        <DuplicateButton
          style={{ top: 97 }}
          onPress={() => duplicateCheck('nickname')}>
          <B16 style={{ color: BLACK }}>중복 확인</B16>
        </DuplicateButton>
        <Input
          label="비밀번호"
          value={form.password}
          onChangeText={password => setForm({ ...form, password: password })}
          isRequired
          secureTextEntry
          placeholder="비밀번호를 입력해주세요."
          // description="8자 이상의 알파벳 소문자, 숫자를 포함합니다."
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
          placeholder="비밀번호를 한 번 더 입력해주세요."
          isAlert={!check.password}
          alert="비밀번호가 일치하지 않습니다."
        />
      </View>
      <BottomButton label="다음" onPress={signup} />
    </SafeAreaView>
  );
};

const DuplicateButton = styled.TouchableOpacity`
  background: ${MINT};
  padding: 10px 15px;
  position: absolute;
  border-radius: 12px;
  right: 20px;
`;

export default SignUp;
