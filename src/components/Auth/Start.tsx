import { SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import { B24 } from '../../styles/GlobalText';
import styled from 'styled-components/native';
import { BLACK, MINT } from '../../styles/GlobalColor';

const Start = () => {
  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <B24 style={{fontSize: 40, marginTop: 200, marginBottom: 250}}>neverland</B24>
      <AuthButton>
        <B24 style={{fontSize: 32, color: BLACK}}>로그인</B24>
      </AuthButton>
      <AuthButton>
        <B24 style={{fontSize: 32, color: BLACK}}>회원가입</B24>
      </AuthButton>
    </SafeAreaView>
  )
}

const AuthButton = styled.TouchableOpacity`
  width: 320px;
  height: 70px;
  align-items: center;
  justify-content: center;
  background: ${MINT};
  border-radius: 12px;
  margin: 10px;
`

export default Start;