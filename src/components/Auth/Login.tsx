import { useContext, useState } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
  Alert,
} from 'react-native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import CustomHeader from '../common/CustomHeader';
import Input from '../common/Input';
import BottomButton from '../common/BottomButton';
import { useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../../App';
import { AuthStackParams } from '../../pages/AuthStack';
import Request from '../../services/requests';
import { setAccessToken, setRefreshToken } from '../../services/storage';

const Login = ({ navigation }: StackScreenProps<AuthStackParams, 'Login'>) => {
  const navigationToTab = useNavigation<StackNavigationProp<RootStackParams>>();
  const request = Request();
  const [form, setForm] = useState<{ loginId: string; password: string }>({
    loginId: '',
    password: '',
  });

  const login = async () => {
    if (form.loginId.length * form.password.length === 0) {
      Alert.alert('빈칸을 채워주세요!');
    } else {
      const response = await request.post('/users/login', {
        loginId: form.loginId,
        password: form.password,
      });
      if (response.isSuccess) {
        setAccessToken(response.result.accessToken);
        setRefreshToken(response.result.refreshToken);
        navigationToTab.replace('Home');
      } else {
        Alert.alert('로그인에 실패하였습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader label="로그인" onBack={() => navigation.goBack()} />
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
        <View style={{ justifyContent: 'center', marginTop: 30 }}>
          <Image
            source={require('../../assets/Puzzle2.png')}
            style={{
              width: 240,
              height: 270,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          />
        </View>
        <View>
          <Input
            label="아이디"
            value={form.loginId}
            onChangeText={loginId => setForm({ ...form, loginId: loginId })}
            isRequired
            placeholder="아이디를 입력해주세요."
          />
          <View style={{ height: 20 }} />
          <Input
            label="비밀번호"
            value={form.password}
            onChangeText={password => setForm({ ...form, password: password })}
            isRequired
            secureTextEntry
            placeholder="비밀번호를 입력해주세요."
          />
        </View>
        <BottomButton label="로그인" onPress={login} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
