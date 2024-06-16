import { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, SafeAreaView, View } from 'react-native';
import CustomHeader from '../../common/CustomHeader';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { SettingsStackParams } from '../../../pages/HomeStack';
import styled from 'styled-components/native';
import Input from '../../common/Input';
import BottomButton from '../../common/BottomButton';
import { useNavigation } from '@react-navigation/native';
import { HomeStackParams } from '../../../pages/HomeStack';
import { RootStackParams } from '../../../../App';
import { Emphasis } from '../../../styles/GlobalText';
import Request from '../../../services/requests';
import {
  removeAccessToken,
  removeRefreshToken,
} from '../../../services/storage';
import { useRecoilState } from 'recoil';
import { userState } from '../../../recoil/userState';

interface FormTypes {
  password: string;
  passwordCheck: string;
}

const Withdraw = ({
  navigation,
}: StackScreenProps<SettingsStackParams, 'Withdraw'>) => {
  const navigationToAuth =
    useNavigation<StackNavigationProp<RootStackParams>>();
  const request = Request();
  const [user, setUser] = useRecoilState(userState);
  const [form, setForm] = useState<FormTypes>({
    password: '',
    passwordCheck: '',
  });
  const [check, setCheck] = useState<boolean>(false);
  useEffect(() => {
    if (form.password === form.passwordCheck) {
      setCheck(true);
    }
  }, [form.passwordCheck]);
  const withdraw = () => {
    const withdrawRequest = async () => {
      const response = await request.patch('/users/signout', {
        password: form.password,
      });
      if (response.isSuccess) {
        navigationToAuth.replace('Auth');
        removeAccessToken();
        removeRefreshToken();
        setUser({ nickname: '', profileImage: '' });
      }
    };
    Alert.alert(
      '알림',
      '정말로 탈퇴하시겠습니까?',
      [
        {
          text: '예',
          onPress: withdrawRequest,
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
      <CustomHeader label="회원 탈퇴" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={10}
        style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20 }}>
        <Emphasis style={{ textAlign: 'center', marginBottom: 80 }}>
          정말로 탈퇴하시겠습니까?
        </Emphasis>
        <Input
          label="비밀번호 입력"
          isRequired
          secureTextEntry
          value={form.password}
          onChangeText={password => setForm({ ...form, password: password })}
          placeholder="비밀번호를 입력해주세요."
          alert="비밀번호가 일치하지 않습니다."
        />
        <Input
          label="비밀번호 확인"
          isRequired
          value={form.passwordCheck}
          secureTextEntry
          onChangeText={password => {
            setForm({ ...form, passwordCheck: password });
            setCheck(false);
          }}
          placeholder="비밀번호를 한 번 더 입력해주세요."
          isAlert={!check}
          alert="비밀번호가 일치하지 않습니다."
        />
      </KeyboardAvoidingView>
      <View style={{ paddingHorizontal: 20 }}>
        <BottomButton label="회원 탈퇴" onPress={withdraw} />
      </View>
    </SafeAreaView>
  );
};

export default Withdraw;
