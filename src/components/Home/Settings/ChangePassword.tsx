import { useEffect, useState } from 'react';
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
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { SettingsStackParams } from '../../../pages/HomeStack';
import styled from 'styled-components/native';
import Input from '../../common/Input';
import BottomButton from '../../common/BottomButton';
import { BLACK, PURPLE, WHITE } from '../../../styles/GlobalColor';
import { Caption } from '../../../styles/GlobalText';
import Request from '../../../services/requests';
import { RootStackParams } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import {
  removeAccessToken,
  removeRefreshToken,
} from '../../../services/storage';
import { useRecoilState } from 'recoil';
import { userState } from '../../../recoil/userState';

interface FormTypes {
  password: string;
  newPassword: string;
  newPasswordCheck: string;
}

const ChangePassword = ({
  navigation,
}: StackScreenProps<SettingsStackParams, 'ChangePassword'>) => {
  const request = Request();
  const navigationToAuth =
    useNavigation<StackNavigationProp<RootStackParams>>();
  const [user, setUser] = useRecoilState(userState);
  const [form, setForm] = useState<FormTypes>({
    password: '',
    newPassword: '',
    newPasswordCheck: '',
  });
  const [check, setCheck] = useState<boolean>(false);
  const onEdit = async () => {
    const response = await request.patch('/users/modifyPassword', {
      password: form.password,
      newPassword: form.newPassword,
    });
    if (response.isSuccess) {
      Alert.alert('비밀번호를 성공적으로 변경하였습니다. 다시 로그인해주세요!');
      removeAccessToken();
      removeRefreshToken();
      setUser({ nickname: '', profileImage: '' });
      navigationToAuth.replace('Auth');
    }
  };

  useEffect(() => {
    if (form.newPassword === form.newPasswordCheck) {
      setCheck(true);
    }
  }, [form.newPasswordCheck]);

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
            label="기존 비밀번호 입력"
            isRequired
            value={form.password}
            onChangeText={password => setForm({ ...form, password: password })}
            secureTextEntry
            placeholder="기존 비밀번호를 입력해주세요."
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
              setCheck(false);
            }}
            secureTextEntry
            placeholder="새로운 비밀번호를 한 번 더 입력해주세요."
            isAlert={!check}
            alert="비밀번호가 일치하지 않습니다."
          />
        </View>
      </KeyboardAvoidingView>
      <View style={{ paddingHorizontal: 20 }}>
        <BottomButton label="변경 완료" onPress={onEdit} />
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
