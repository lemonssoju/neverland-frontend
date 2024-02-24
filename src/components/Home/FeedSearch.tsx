import { useState } from 'react';
import { SafeAreaView, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from '../../pages/Home';
import styled from 'styled-components/native';
import SearchBar from '../common/SearchBar';
import BackButton from '../common/BackButton';
import { UserItem } from './FeedItem';
import { LIGHTBLACK, MINT, WHITE } from '../../styles/GlobalColor';
import { B16, R14, R16 } from '../../styles/GlobalText';
import CloseIcon from '../../assets/common/Close.svg';

const data = [
  {
    category: '영화',
    title: '8월의 크리스마스',
    rep_pic: 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABUEy7m5EHhjNhJ1p1itC34MCXg11eTU7Uvc9eRkDJE9nJsGwZk2mej7FpG_nmWeAFkpcb9f7Gk39ZXsJApq214kipyZe9sXVeIWc.jpg?r=169',
    hashtags: ['로맨스', '멜로', '90년대']
  },
  {
    category: '영화',
    title: '8월의 크리스마스',
    rep_pic: 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABUEy7m5EHhjNhJ1p1itC34MCXg11eTU7Uvc9eRkDJE9nJsGwZk2mej7FpG_nmWeAFkpcb9f7Gk39ZXsJApq214kipyZe9sXVeIWc.jpg?r=169',
    hashtags: ['로맨스', '멜로', '90년대']
  },
  {
    category: '영화',
    title: '8월의 크리스마스',
    rep_pic: 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABUEy7m5EHhjNhJ1p1itC34MCXg11eTU7Uvc9eRkDJE9nJsGwZk2mej7FpG_nmWeAFkpcb9f7Gk39ZXsJApq214kipyZe9sXVeIWc.jpg?r=169',
    hashtags: ['로맨스', '멜로', '90년대']
  },
  {
    category: '밈',
    title: '이렇게 말하면 기분이 조크등요',
    rep_pic: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
    hashtags: ['사투리', '서울']
  },
  {
    category: '밈',
    title: '이렇게 말하면 기분이 조크등요',
    rep_pic: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
    hashtags: ['사투리', '서울']
  },
  {
    category: '밈',
    title: '이렇게 말하면 기분이 조크등요',
    rep_pic: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
    hashtags: ['사투리', '서울']
  }
]

const FeedSearch = ({ navigation }: StackScreenProps<HomeStackParams, 'FeedSearch'>) => {
  const [search, setSearch] = useState<string>('');
  const recommendData = ['나팔바지', '지브리', '크리스마스', '디즈니', '핑클', '소녀시대', '상속자들', '동방신기'];
  const [recentSearches, setRecentSearches] = useState<string[]>(['로맨스', '서울 사투리', '응답하라', '서태지와 아이들']);

  return (
    <SafeAreaView>
      <View style={{flexDirection: 'row', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: LIGHTBLACK}}>
        <BackButton onPress={() => navigation.goBack()} />
        <SearchBar 
          search={search}
          setSearch={setSearch}
          placeholder='글 제목, 내용, 해시태그'
          style={{width: 330, marginLeft: 5}}
        />
      </View>
      { search.length > 0 ? (
        <FlatList
          data={data}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            const { category, title, rep_pic, hashtags } = item;
            return (
              <UserItem
                category={category}
                title={title}
                rep_pic={rep_pic}
                hashtags={hashtags}
              />
            )
          }}
        />
      ) : (
        <View style={{padding: 15}}>
          <View>
            <B16 style={{color: MINT}}>추천 검색어</B16>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
              {recommendData.map((item, index) => {
                return (
                  <RecommendItem key={index} onPressIn={() => setSearch(item)} pressed={item === search}>
                    <R14>{item}</R14>
                  </RecommendItem>
                )
              })}
            </View>
          </View>
          <View style={{marginTop: 40}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10}}>
              <B16 style={{color: MINT}}>최근 검색어</B16>
              <TouchableOpacity>
                <R14 style={{color: MINT}}>전체삭제</R14>
              </TouchableOpacity>
            </View>
            <FlatList
              data={recentSearches}
              renderItem={({item}: any) => {
                return (
                  <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: WHITE, justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8}}>
                    <TouchableOpacity onPress={() => setSearch(item)}>
                      <R14>{item}</R14>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setRecentSearches(recentSearches.filter((recent: string) => recent !== item))}>
                      <CloseIcon width={18} height={18} />
                    </TouchableOpacity>
                  </View>
                )
              }}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}

const RecommendItem = styled.TouchableOpacity<{ pressed: boolean }>`
  background: ${props => props.pressed ? MINT : LIGHTBLACK};
  border-radius: 16px;
  padding: 10px 16px;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  margin-bottom: 8px;
`

export default FeedSearch;