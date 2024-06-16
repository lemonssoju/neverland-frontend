import { useContext, useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
  Alert,
  TextInput,
  Platform,
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
  const [keyboardOpen, setKeyboardOpen] = useState<boolean>(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOpen(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader label="로그인" onBack={() => navigation.goBack()} />
      <KeyboardAwareScrollView
        style={{ paddingHorizontal: 20 }}
        enableOnAndroid
        scrollEnabled={keyboardOpen}
        contentContainerStyle={{ justifyContent: 'space-between', flex: 1 }}>
        <Pressable
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            flex: 1,
          }}
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
        <BottomButton
          label="로그인"
          onPress={login}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;
