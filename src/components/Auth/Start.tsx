import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
} from 'react-native';
import { Title } from '../../styles/GlobalText';
import styled from 'styled-components/native';
import { BLACK, PURPLE, WHITE } from '../../styles/GlobalColor';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams } from '../../pages/AuthStack';
import Background from '../../assets/Background.svg';
import Logo from '../../assets/Logo.svg';
import LogoText from '../../assets/LogoText.svg';

const { width, height } = Dimensions.get('screen');
const Start = ({ navigation }: StackScreenProps<AuthStackParams, 'Start'>) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#100125' }}>
      <Background
        style={{ position: 'absolute', top: 0 }}
        width={width}
        height={height}
      />
      <SafeAreaView style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <Image source={require('../../assets/Logo.png')} style={{width: 230, height: 230}} />
        <LogoText style={{marginTop: 50, marginBottom: 180}} />
        <AuthButton onPress={() => navigation.navigate('Login')}>
          <Title style={{ color: WHITE }}>로그인</Title>
        </AuthButton>
        <AuthButton onPress={() => navigation.navigate('SignUp')}>
          <Title style={{ color: WHITE }}>회원가입</Title>
        </AuthButton>
      </SafeAreaView>
    </View>
  );
};

const AuthButton = styled.TouchableOpacity`
  width: 280px;
  height: 50px;
  align-items: center;
  justify-content: center;
  background: ${PURPLE};
  border-radius: 5px;
  margin: 5px;
`;

export default Start;
