import { useState } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import styled from 'styled-components/native';
import { BLACK, MINT, WHITE } from '../../styles/GlobalColor';
import { B14, B16 } from '../../styles/GlobalText';

import { AppItem, UserItem } from './FeedItem';
import SearchIcon from '../../assets/common/Search.svg';

const UserData = [
  {
    category: '영화',
    title: '8월의 크리스마스',
    rep_pic: 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABUEy7m5EHhjNhJ1p1itC34MCXg11eTU7Uvc9eRkDJE9nJsGwZk2mej7FpG_nmWeAFkpcb9f7Gk39ZXsJApq214kipyZe9sXVeIWc.jpg?r=169',
    hashtag: ['로맨스', '멜로', '90년대']
  },
  {
    category: '영화',
    title: '8월의 크리스마스',
    rep_pic: 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABUEy7m5EHhjNhJ1p1itC34MCXg11eTU7Uvc9eRkDJE9nJsGwZk2mej7FpG_nmWeAFkpcb9f7Gk39ZXsJApq214kipyZe9sXVeIWc.jpg?r=169',
    hashtag: ['로맨스', '멜로', '90년대']
  },
  {
    category: '영화',
    title: '8월의 크리스마스',
    rep_pic: 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABUEy7m5EHhjNhJ1p1itC34MCXg11eTU7Uvc9eRkDJE9nJsGwZk2mej7FpG_nmWeAFkpcb9f7Gk39ZXsJApq214kipyZe9sXVeIWc.jpg?r=169',
    hashtag: ['로맨스', '멜로', '90년대']
  },
]

const AppData = [
  {
    title: '이렇게 말하면 기분이 조크등요',
    rep_pic: 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABUEy7m5EHhjNhJ1p1itC34MCXg11eTU7Uvc9eRkDJE9nJsGwZk2mej7FpG_nmWeAFkpcb9f7Gk39ZXsJApq214kipyZe9sXVeIWc.jpg?r=169'
  },
  {
    title: '이렇게 말하면 기분이 조크등요',
    rep_pic: 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABUEy7m5EHhjNhJ1p1itC34MCXg11eTU7Uvc9eRkDJE9nJsGwZk2mej7FpG_nmWeAFkpcb9f7Gk39ZXsJApq214kipyZe9sXVeIWc.jpg?r=169'
  },
  {
    title: '이렇게 말하면 기분이 조크등요',
    rep_pic: 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABUEy7m5EHhjNhJ1p1itC34MCXg11eTU7Uvc9eRkDJE9nJsGwZk2mej7FpG_nmWeAFkpcb9f7Gk39ZXsJApq214kipyZe9sXVeIWc.jpg?r=169'
  },
]

const FeedList = () => {
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    { key: 0, title: '전체', label: '세상' },
    { key: 1, title: '90s', label: '90년대' },
    { key: 2, title: '00s', label: '00년대' },
    { key: 3, title: '10s', label: '10년대' }
  ]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header>
        <Text style={{color: WHITE, fontSize: 24, fontWeight: '700'}}>neverland</Text>
        <TouchableOpacity>
          <SearchIcon />
        </TouchableOpacity>
      </Header>
      <TopMenuBar>
        {routes.map((item) => {
          return (
            <TopMenuItem key={item.key} onPress={() => setIndex(item.key) } pressed={item.key === index}>
              <B14 style={{color: item.key === index ? MINT : WHITE}}>{item.title}</B14>
            </TopMenuItem>
          )
        })}
      </TopMenuBar>
      <View style={{height: 1, backgroundColor: WHITE, width: '100%', position: 'absolute', top: 133}} />
      <FlatList
        data={UserData}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          const { category, title, rep_pic, hashtag } = item;
          return (
            <UserItem
              category={category}
              title={title}
              rep_pic={rep_pic}
              hashtag={hashtag}
            />
          )
        }}
        ListFooterComponent={() => {
          return (
            <>
              <B16 style={{padding: 10, marginTop: 5}}>세상에 이런 일이!</B16>
              <FlatList
                data={AppData}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => {
                  const { title, rep_pic } = item;
                  return (
                    <AppItem
                      title={title}
                      rep_pic={rep_pic}
                    />
                  )
                }}
              />
            </>
          )
        }}
      />
    </SafeAreaView>
  )
}

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`

const TopMenuBar = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
  z-index: 1;
`

const TopMenuItem = styled.TouchableOpacity<{ pressed: boolean }>`
  align-items: center;
  justify-content: center;
  padding: 10px 25px;
  height: 40px;
  border-bottom-width: ${props => props.pressed ? 2 : 0}px;
  border-color: ${MINT};
`

export default FeedList;