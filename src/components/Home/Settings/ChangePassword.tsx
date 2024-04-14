import { useState } from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
  Alert,
} from 'react-native';
import CustomHeader from '../../common/CustomHeader';
import { StackScreenProps } from '@react-navigation/stack';
import { SettingsStackParams } from '../../../pages/HomeStack';
import styled from 'styled-components/native';
import Input from '../../common/Input';
import BottomButton from '../../common/BottomButton';
import { BLACK, MINT, PURPLE, WHITE } from '../../../styles/GlobalColor';
import { B16, Caption } from '../../../styles/GlobalText';
import Request from '../../../services/requests';

interface FormTypes {
  loginId: string;
  password: string;
  newPassword: string;
  newPasswordCheck: string;
}

interface CheckTypes {
  loginId: boolean;
  password: boolean;
  newPassword: boolean;
}

const ChangePassword = ({
  navigation,
}: StackScreenProps<SettingsStackParams, 'ChangePassword'>) => {
  const request = Request();
  const [form, setForm] = useState<FormTypes>({
    loginId: '',
    password: '',
    newPassword: '',
    newPasswordCheck: '',
  });

  const [check, setCheck] = useState<CheckTypes>({
    loginId: true,
    password: true,
    newPassword: true,
  });

  const duplicateCheck = async () => {
    if (form.loginId) {
      const response = await request.post('/users/loginId', {
        loginId: form.loginId,
      });
      if (response.isSuccess) {
        setCheck({ ...check, loginId: true });
      }
    } else {
      Alert.alert('닉네임을 입력해주세요!');
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader label="개인정보 변경" onBack={() => navigation.goBack()} />
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
          <Input
            label="아이디"
            isRequired
            value={form.loginId}
            onChangeText={loginId => {
              setForm({ ...form, loginId: loginId });
              setCheck({ ...check, loginId: false });
            }}
            placeholder="새로운 아이디를 입력해주세요."
            isAlert={!check.loginId && !form.loginId}
            alert="중복된 아이디입니다."
            description={
              check.loginId && form.loginId ? '사용 가능한 아이디입니다.' : ''
            }
          />
          <DuplicateButton style={{ top: 180 }} onPress={duplicateCheck}>
            <Caption style={{ color: WHITE, fontWeight: '700' }}>
              중복 확인
            </Caption>
          </DuplicateButton>
          <Input
            label="기존 비밀번호 입력"
            isRequired
            value={form.password}
            onChangeText={password => setForm({ ...form, password: password })}
            secureTextEntry
            placeholder="기존 비밀번호를 입력해주세요."
            isAlert={!check.password && !form.password}
            alert="비밀번호가 일치하지 않습니다."
          />
          <Input
            label="새로운 비밀번호 입력"
            isRequired
            value={form.newPassword}
            onChangeText={newPassword =>
              setForm({ ...form, newPassword: newPassword })
            }
            secureTextEntry
            placeholder="새로운 비밀번호를 입력해주세요."
            // description="8자 이상의 알파벳 소문자, 숫자를 포함합니다."
            alert="잘못된 형식의 비밀번호입니다."
          />
          <Input
            label="새로운 비밀번호 확인"
            isRequired
            value={form.newPasswordCheck}
            onChangeText={newPasswordCheck => {
              setForm({ ...form, newPasswordCheck: newPasswordCheck });
              setCheck({ ...check, password: false });
            }}
            secureTextEntry
            placeholder="새로운 비밀번호를 한 번 더 입력해주세요."
            isAlert={!check.password}
            alert="비밀번호가 일치하지 않습니다."
          />
        </View>
      </KeyboardAvoidingView>
      <View style={{ paddingHorizontal: 20 }}>
        <BottomButton
          label="변경 완료"
          onPress={() => navigation.replace('SettingsHome')}
        />
      </View>
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

export default ChangePassword;
