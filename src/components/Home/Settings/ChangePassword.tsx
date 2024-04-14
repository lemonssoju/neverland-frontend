import { useState } from 'react';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import CustomHeader from '../../common/CustomHeader';
import { StackScreenProps } from '@react-navigation/stack';
import { SettingsStackParams } from '../../../pages/HomeStack';
import styled from 'styled-components/native';
import Input from '../../common/Input';
import BottomButton from '../../common/BottomButton';
import { BLACK, MINT } from '../../../styles/GlobalColor';
import { B16 } from '../../../styles/GlobalText';

const ChangePassword = ({
  navigation,
}: StackScreenProps<SettingsStackParams, 'ChangePassword'>) => {
  const [form, setForm] = useState<{
    id: string;
    password: string;
    newPassword: string;
    newPasswordConfirm: string;
  }>({
    id: '',
    password: '',
    newPassword: '',
    newPasswordConfirm: '',
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader label="개인정보 변경" onBack={() => navigation.goBack()} />
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Input
          label="아이디"
          isRequired
          value={form.id}
          onChangeText={id => setForm({ ...form, id: id })}
          placeholder="새로운 아이디를 입력해주세요."
          alert="중복된 아이디입니다."
        />
        <DuplicateButton style={{ top: 130 }}>
          <B16 style={{ color: BLACK }}>중복 확인</B16>
        </DuplicateButton>
        <Input
          label="기존 비밀번호 입력"
          isRequired
          value={form.password}
          onChangeText={password => setForm({ ...form, password: password })}
          placeholder="기존 비밀번호를 입력해주세요."
          alert="비밀번호가 일치하지 않습니다."
        />
        <Input
          label="새로운 비밀번호 입력"
          isRequired
          value={form.newPassword}
          onChangeText={password => setForm({ ...form, newPassword: password })}
          placeholder="새로운 비밀번호를 입력해주세요."
          description="8자 이상의 알파벳 소문자, 숫자를 포함합니다."
          alert="잘못된 형식의 비밀번호입니다."
        />
        <Input
          label="새로운 비밀번호 확인"
          isRequired
          value={form.newPasswordConfirm}
          onChangeText={password =>
            setForm({ ...form, newPasswordConfirm: password })
          }
          placeholder="새로운 비밀번호를 한 번 더 입력해주세요."
          alert="비밀번호가 일치하지 않습니다."
        />
      </View>
      <BottomButton
        label="변경 완료"
        onPress={() => navigation.replace('SettingsHome')}
      />
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

export default ChangePassword;
