import { useState } from 'react';
import { SafeAreaView, View, Image } from 'react-native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import CustomHeader from '../common/CustomHeader';
import Input from '../common/Input';
import BottomButton from '../common/BottomButton';
import { useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../../App';
import { AuthStackParams } from '../../pages/AuthStack';

const Login = ({ navigation }: StackScreenProps<AuthStackParams, 'Login'>) => {
  const navigationToTab = useNavigation<StackNavigationProp<RootStackParams>>();
  const [form, setForm] = useState<{ id: string; password: string; }>({
    id: '',
    password: ''
  });

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'space-between'}}>
      <CustomHeader label='로그인' onBack={() => navigation.goBack()} />
      <Image source={require('../../assets/Puzzle2.png')} style={{width: 240, height: 270, alignSelf: 'center'}} />
      <View style={{paddingHorizontal: 25}}>
        <Input
          label='아이디'
          value={form.id} 
          onChangeText={(id) => setForm({...form, id: id})} 
          isRequired 
          placeholder='아이디를 입력해주세요.'
        />
        <View style={{height: 20}} />
        <Input
          label='비밀번호' 
          value={form.password} 
          onChangeText={(password) => setForm({...form, password: password})} 
          isRequired 
          placeholder='비밀번호를 입력해주세요.'
        />
      </View>
      <View style={{paddingHorizontal: 25}}><BottomButton label='로그인' onPress={() => {navigationToTab.replace('Home')}} /></View>
    </SafeAreaView>
  )
}

export default Login;