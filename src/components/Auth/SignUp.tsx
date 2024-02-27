import { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from '../../pages/Auth';
import CustomHeader from '../common/CustomHeader';
import Input from '../common/Input';
import BottomButton from '../common/BottomButton';
import styled from 'styled-components/native';
import { BLACK, MINT } from '../../styles/GlobalColor';
import { B16 } from '../../styles/GlobalText';

const SignUp = ({ navigation }: StackScreenProps<AuthStackParams, 'SignUp'>) => {
  const [form, setForm] = useState<{ id: string; nickname: string; password: string, passwordConfirm: string}>({
    id: '',
    nickname: '',
    password: '',
    passwordConfirm: ''
  });

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'space-between'}}>
      <CustomHeader label='회원정보 입력' />
      <View>
        <Input
          label='아이디' 
          value={form.id} 
          onChangeText={(id) => setForm({...form, id: id})} 
          isRequired 
          placeholder='아이디를 입력해주세요.'
          alert='중복된 아이디입니다.'
        />
        <DuplicateButton style={{top: 10}}>
          <B16 style={{color: BLACK}}>중복 확인</B16>
        </DuplicateButton>
        <Input
          label='닉네임' 
          value={form.nickname} 
          onChangeText={(nickname) => setForm({...form, nickname: nickname})} 
          isRequired 
          placeholder='닉네임을 입력해주세요.'
          alert='중복된 닉네임입니다.'
        />
        <DuplicateButton style={{top: 98}}>
          <B16 style={{color: BLACK}}>중복 확인</B16>
        </DuplicateButton>
        <Input
          label='비밀번호' 
          value={form.password} 
          onChangeText={(password) => setForm({...form, password: password})} 
          isRequired 
          placeholder='비밀번호를 입력해주세요.'
          description='8자 이상의 알파벳 소문자, 숫자를 포함합니다.'
          alert='잘못된 형식의 비밀번호입니다.'
        />
        <Input
          label='비밀번호 확인' 
          value={form.passwordConfirm} 
          onChangeText={(passwordConfirm) => setForm({...form, passwordConfirm: passwordConfirm})} 
          isRequired 
          placeholder='비밀번호를 한 번 더 입력해주세요.' 
          alert='비밀번호가 일치하지 않습니다.'
        />
      </View>
      <BottomButton label='다음' onPress={() => {}} />
    </SafeAreaView>
  )
}

const DuplicateButton = styled.TouchableOpacity`
  background: ${MINT};
  padding: 10px 15px;
  position: absolute;
  border-radius: 12px;
  right: 20px;
`

export default SignUp;