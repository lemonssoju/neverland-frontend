import { useState } from 'react';
import { Alert, SafeAreaView, View } from 'react-native';
import CustomHeader from '../../common/CustomHeader';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { SettingsStackParams } from '../../../pages/Settings';
import styled from 'styled-components/native';
import Input from '../../common/Input';
import BottomButton from '../../common/BottomButton';
import { BLACK, MINT } from '../../../styles/GlobalColor';
import { B16, B24 } from '../../../styles/GlobalText';
import { useNavigation } from '@react-navigation/native';
import { HomeStackParams } from '../../../pages/Home';

const Withdraw = ({
  navigation,
}: StackScreenProps<SettingsStackParams, 'Withdraw'>) => {
  const navigationToHome =
    useNavigation<StackNavigationProp<HomeStackParams>>();
  const [form, setForm] = useState<{
    password: string;
    passwordConfirm: string;
  }>({
    password: '',
    passwordConfirm: '',
  });
  const withdrawConfirmAlert = () => {
    Alert.alert(
      '알림',
      '정말로 탈퇴하시겠습니까?',
      [
        {
          text: '예',
          onPress: () => {
            navigationToHome.navigate('FeedList');
          },
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
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <B24 style={{ textAlign: 'center', marginBottom: 80 }}>
          정말로 탈퇴하시겠습니까?
        </B24>
        <Input
          label="비밀번호 입력"
          isRequired
          value={form.password}
          onChangeText={password => setForm({ ...form, password: password })}
          placeholder="비밀번호를 입력해주세요."
          alert="비밀번호가 일치하지 않습니다."
        />
        <Input
          label="비밀번호 확인"
          isRequired
          value={form.passwordConfirm}
          onChangeText={password =>
            setForm({ ...form, passwordConfirm: password })
          }
          placeholder="비밀번호를 한 번 더 입력해주세요."
          alert="비밀번호가 일치하지 않습니다."
        />
      </View>
      <BottomButton label="회원 탈퇴" onPress={withdrawConfirmAlert} />
    </SafeAreaView>
  );
};

export default Withdraw;
