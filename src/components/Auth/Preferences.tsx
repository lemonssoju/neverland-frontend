import { useState } from 'react';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { FlatList, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { AuthStackParams } from '../../pages/Auth';
import CustomHeader from '../common/CustomHeader';
import { R16, R12, B20 } from '../../styles/GlobalText';
import { BLACK, GRAY, LIGHTBLACK, MINT } from '../../styles/GlobalColor';
import BottomButton from '../common/BottomButton';
import { useNavigation } from '@react-navigation/native';
import { HomeStackParams } from '../../pages/Home';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParams, TabProps } from '../../../App';

interface TagProps {
  category: string;
  tags: string[];
}

const preferences : TagProps[] = [
  {
    category: '영화',
    tags: [
      '로맨스',
      '멜로',
      '액션',
      '호러',
      'SF',
      '판타지',
      '전쟁',
      '다큐멘터리',
      '드라마',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
    ],
  },
  {
    category: '드라마',
    tags: [
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
    ],
  },
  {
    category: '애니메이션',
    tags: [
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
    ],
  },
  {
    category: '패션',
    tags: [
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
    ],
  },
  {
    category: '음악',
    tags: [
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
    ],
  },
  {
    category: '예능',
    tags: [
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
      '빈티지',
    ],
  },
];

const Preferences = ({
  navigation,
  route
}: StackScreenProps<AuthStackParams, 'Preferences'>) => {
  const navigationToTab = useNavigation<StackNavigationProp<RootStackParams>>();

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      <CustomHeader label="취향 선택" onBack={() => navigation.goBack()} />
      <FlatList
        data={preferences.filter(preference => route.params.categories.includes(preference.category))}
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 20}}
        ListHeaderComponent={() => (
          <View style={{ alignItems: 'center' }}>
            <R16 style={{ marginTop: 25 }}>
              황은정님께서 관심 있는 콘텐츠를 알려주세요!
            </R16>
            <R12 style={{ color: GRAY, marginTop: 5, marginBottom: 15 }}>
              선택하신 콘텐츠 위주로 피드가 구성돼요.
            </R12>
          </View>
        )}
        renderItem={({ item }: any) => {
          return (
            <View
              style={{
                backgroundColor: LIGHTBLACK,
                borderRadius: 12,
                padding: 15,
                marginVertical: 10
              }}>
              <B20 style={{ color: MINT, marginBottom: 10 }}>{item.category}</B20>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {item.tags.map((tag: string, index: number) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        backgroundColor: BLACK,
                        padding: 10,
                        borderRadius: 12,
                        margin: 5
                      }}>
                      <R12>{tag}</R12>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        }}
        ListFooterComponent={() => (
          <BottomButton label="완료" onPress={() => {navigationToTab.replace('HomeTab', {screen: 'Home'})}} />
        )}
        ListFooterComponentStyle={{marginTop: 10}}
      />
    </SafeAreaView>
  );
};

export default Preferences;
