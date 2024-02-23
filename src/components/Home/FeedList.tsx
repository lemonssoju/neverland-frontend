import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from '../../pages/Home';
import styled from 'styled-components/native';
import { BLACK, LIGHTBLACK, MINT, WHITE } from '../../styles/GlobalColor';
import { B14, B16, R14 } from '../../styles/GlobalText';
import {  BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { AppItem, UserItem } from './FeedItem';
import { CategoryModal, OrderModal } from '../common/BottomModal';

import SearchIcon from '../../assets/common/Search.svg';
import ArrowIcon from '../../assets/common/Arrow.svg';

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

const FeedList = ({ navigation }: StackScreenProps<HomeStackParams, 'FeedList'>) => {
  const [era, setEra] = useState<string>('세상');
  const tabs = [
    { title: '전체', label: '세상' },
    { title: '90s', label: '90년대' },
    { title: '00s', label: '00년대' },
    { title: '10s', label: '10년대' }
  ];
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryVisible, setCategoryVisible] = useState<boolean>(false);
  const [order, setOrder] = useState<string>('최신순');
  const [orderVisible, setOrderVisible] = useState<boolean>(false);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header>
        <Text style={{color: WHITE, fontSize: 24, fontWeight: '700'}}>neverland</Text>
        <TouchableOpacity onPress={() => navigation.navigate('FeedSearch')}>
          <SearchIcon />
        </TouchableOpacity>
      </Header>
      <TopMenuBar>
        {tabs.map((item, index) => {
          return (
            <TopMenuItem key={index} onPress={() => setEra(item.label) } pressed={item.label === era}>
              <B14 style={{color: item.label === era ? MINT : WHITE}}>{item.title}</B14>
            </TopMenuItem>
          )
        })}
      </TopMenuBar>
      <View style={{height: 1, backgroundColor: WHITE, width: '100%', position: 'absolute', top: 133}} />
      <FlatList
        data={UserData}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => {
          return (
            <View style={{flexDirection: 'row', paddingTop: 15, paddingBottom: 5, paddingHorizontal: 10}}>
              <DropDownButton onPress={() => setCategoryVisible(true)}>
                <R14 style={{color: BLACK, marginRight: 5}}>
                  {categories.length > 0 ? 
                    (categories.length > 1 ? `카테고리 ${categories.length}` : categories) 
                    :
                    '카테고리'
                  }
                </R14>
                <ArrowIcon color={BLACK} />
              </DropDownButton>
              <DropDownButton onPress={() => setOrderVisible(true)}>
                <R14 style={{color: BLACK, marginRight: 5}}>{order}</R14>
                <ArrowIcon color={BLACK} />
              </DropDownButton>
            </View>
          )
        }}
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
              <B16 style={{padding: 10, marginTop: 5}}>{era}에 이런 일이!</B16>
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
      <BottomSheetModalProvider>
        <CategoryModal categories={categories} setCategories={setCategories} categoryVisible={categoryVisible} setCategoryVisible={setCategoryVisible} />
        <OrderModal order={order} setOrder={setOrder} orderVisible={orderVisible} setOrderVisible={setOrderVisible} />
      </BottomSheetModalProvider>
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

const DropDownButton = styled.TouchableOpacity`
  background: ${MINT};
  border-radius: 24px;
  flex-direction: row;
  padding: 7px 14px;
  align-items: center;
  margin-right: 10px;
`

const CategoryButton = styled.TouchableOpacity<{ pressed: boolean }>`
  background: ${props => props.pressed ? MINT : BLACK};
  border-radius: 18px;
  width: 160px;
  height: 50px;
  justify-content: center;
  align-items: center;
  margin-vertical: 10px;
  margin-right: 30px;
`

const OrderButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0px;
`
export default FeedList;