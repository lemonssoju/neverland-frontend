import { useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import CustomHeader from '../../common/CustomHeader';
import { StackScreenProps } from '@react-navigation/stack';
import { SettingsStackParams } from '../../../pages/HomeStack';
import { B14, B20 } from '../../../styles/GlobalText';
import { BLACK, PURPLE } from '../../../styles/GlobalColor';

interface OptionProps {
  label: string;
  onPress: () => void;
}

const Option = ({ label, onPress }: OptionProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 20,
        backgroundColor: BLACK,
        borderRadius: 12,
        marginVertical: 10,
      }}>
      <B20>{label}</B20>
    </TouchableOpacity>
  );
};

const SettingsHome = ({
  navigation,
}: StackScreenProps<SettingsStackParams, 'SettingsHome'>) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader label="설정" />
      <View style={{ paddingHorizontal: 20 }}>
        <B14 style={{ color: PURPLE, marginVertical: 10 }}>사용자 정보</B14>
        <Option
          label="내가 쓴 글"
          onPress={() => navigation.navigate('MyFeed', { title: '내가 쓴 글' })}
        />
        <Option
          label="내가 좋아요한 글"
          onPress={() =>
            navigation.navigate('MyFeed', { title: '내가 좋아요한 글' })
          }
        />
        <Option
          label="개인정보 변경"
          onPress={() => navigation.navigate('ChangePassword')}
        />
        <View
          style={{ height: 1, backgroundColor: BLACK, marginVertical: 10 }}
        />
        <B14 style={{ color: PURPLE, marginVertical: 10 }}>사용자 문의</B14>
        <Option label="이용약관" onPress={() => {}} />
        <Option label="로그아웃" onPress={() => {}} />
        <Option
          label="회원 탈퇴"
          onPress={() => navigation.navigate('Withdraw')}
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingsHome;
