import { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { AuthStackParams } from '../../pages/Auth';
import CustomHeader from '../common/CustomHeader';
import { B16, R12, R16 } from '../../styles/GlobalText';
import { BLACK, GRAY, LIGHTBLACK, MINT, WHITE } from '../../styles/GlobalColor';

import MovieIcon from '../../assets/categories/Movie.svg';
import DramaIcon from '../../assets/categories/Drama.svg';
import AnimationIcon from '../../assets/categories/Animation.svg';
import FashionIcon from '../../assets/categories/Fashion.svg';
import MusicIcon from '../../assets/categories/Music.svg';
import VarietyIcon from '../../assets/categories/Variety.svg';
import BottomButton from '../common/BottomButton';

const Contents = ({ navigation }: StackScreenProps<AuthStackParams, 'Contents'>) => {
  const [categories, setCategories] = useState<string[]>([]);
  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <CustomHeader label='관심 콘텐츠 선택' />
      <R16 style={{marginTop: 25}}>황은정님께서 관심 있는 콘텐츠를 알려주세요!</R16>
      <R12 style={{color: GRAY, marginTop: 5}}>선택하신 콘텐츠 위주로 피드가 구성돼요.</R12>
      <FlatList
        data={['영화', '드라마', '애니메이션', '패션', '음악', '예능']}
        numColumns={2}
        style={{marginTop: 30}}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}: {item: any, index: number}) => {
          return (
            <View style={{width: '50%', alignItems: 'center'}}>
              <TouchableOpacity 
                onPress={() => {
                  categories.includes(item)
                    ? setCategories(
                        categories.filter(
                          (category: string) => category !== item,
                        ),
                      )
                    : setCategories([...categories, item]);
                }}
                style={{borderRadius: 180, backgroundColor: categories.includes(item) ? MINT : LIGHTBLACK, width: 120, height: 120, alignItems: 'center', justifyContent: 'center'}}>
                {{
                  0: <MovieIcon color={categories.includes(item) ? LIGHTBLACK : MINT} />,
                  1: <DramaIcon color={categories.includes(item) ? LIGHTBLACK : MINT} />,
                  2: <AnimationIcon color={categories.includes(item) ? LIGHTBLACK : MINT} />,
                  3: <FashionIcon color={categories.includes(item) ? LIGHTBLACK : MINT} />,
                  4: <MusicIcon color={categories.includes(item) ? LIGHTBLACK : MINT} />,
                  5: <VarietyIcon color={categories.includes(item) ? LIGHTBLACK : MINT} />
                }[index]}
              </TouchableOpacity>
              <B16 style={{fontSize: 18, marginVertical: 20}}>{item}</B16>
            </View>
          )
        }}
      />
      <BottomButton label='다음' onPress={() => navigation.navigate('Preferences', { categories: categories })} />
    </SafeAreaView>
  )
}

export default Contents;