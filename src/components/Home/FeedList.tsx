import { useState, useRef, useMemo, useCallback } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import { BLACK, LIGHTBLACK, MINT, WHITE } from '../../styles/GlobalColor';
import { B14, B16, R14 } from '../../styles/GlobalText';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { AppItem, UserItem } from './FeedItem';
import BottomButton from '../common/BottomButton';

import SearchIcon from '../../assets/common/Search.svg';
import ArrowIcon from '../../assets/common/Arrow.svg';
import CheckIcon from '../../assets/common/Check.svg';

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

  // 카테고리 모달
  const [categories, setCategories] = useState<string[]>([]);
  const categoryRef = useRef<BottomSheetModal>(null);
  const categorySnapPoints = useMemo(() => [350], []);

  const openCategory = () => {
    categoryRef.current?.present();
  };

  const closeCategory = () => {
    categoryRef.current?.close();
  }

  const renderCategoryBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop style={{flex: 1}} {...props} onPress={closeCategory} pressBehavior='close' appearsOnIndex={0} disappearsOnIndex={-1} />,
    [],
  );

  // 정렬 모달
  const [order, setOrder] = useState<string>('');
  const orderRef = useRef<BottomSheetModal>(null);
  const orderSnapPoints = useMemo(() => [200], []);

  const openOrder = () => {
    orderRef.current?.present();
  }

  const closeOrder = (item: any) => {
    setOrder(item);
    orderRef.current?.close();
  }

  const renderOrderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop style={{flex: 1}} {...props} onPress={closeOrder} pressBehavior='close' appearsOnIndex={0} disappearsOnIndex={-1} />,
    [],
  );

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
        ListHeaderComponent={() => {
          return (
            <View style={{flexDirection: 'row', paddingTop: 15, paddingBottom: 5, paddingHorizontal: 10}}>
              <DropDownButton onPress={openCategory}>
                <R14 style={{color: BLACK, marginRight: 5}}>
                  {categories.length > 0 ? 
                    (categories.length > 1 ? `카테고리 ${categories.length}` : categories) 
                    :
                    '카테고리'
                  }
                </R14>
                <ArrowIcon />
              </DropDownButton>
              <DropDownButton onPress={openOrder}>
                <R14 style={{color: BLACK, marginRight: 5}}>{order}</R14>
                <ArrowIcon />
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
      <BottomSheetModalProvider>
        <BottomSheetModal
          snapPoints={categorySnapPoints}
          ref={categoryRef}
          backdropComponent={renderCategoryBackdrop}
          handleStyle={{backgroundColor: LIGHTBLACK, borderTopLeftRadius: 25, borderTopRightRadius: 25}}
          handleIndicatorStyle={{backgroundColor: '#3F3F3F', width: 60}}
          backgroundStyle={{backgroundColor: LIGHTBLACK}}
        >
          <View style={{paddingHorizontal: 20, paddingVertical: 5}}>
            <B16 style={{color: MINT, marginBottom: 10}}>카테고리</B16>
            <FlatList
              data={['영화', '드라마', '애니메이션', '패션', '음악', '예능']}
              numColumns={2}
              style={{marginBottom: 5}}
              renderItem={({item}: any) => {
                return (
                  <CategoryButton pressed={categories.includes(item)}
                    onPress={() => {
                      categories.includes(item) ? 
                      setCategories(categories.filter((category: any) => category !== item))
                      : 
                      setCategories([...categories, item])
                    }}
                  >
                    <B16 style={{color: categories.includes(item) ? BLACK : WHITE}}>{item}</B16>
                  </CategoryButton>
                )
              }}
            />
            <BottomButton label={'적용하기'} onPress={closeCategory} />
          </View>
        </BottomSheetModal>
        <BottomSheetModal
          snapPoints={orderSnapPoints}
          ref={orderRef}
          backdropComponent={renderOrderBackdrop}
          handleStyle={{backgroundColor: LIGHTBLACK, borderTopLeftRadius: 25, borderTopRightRadius: 25}}
          handleIndicatorStyle={{backgroundColor: '#3F3F3F', width: 60}}
          backgroundStyle={{backgroundColor: LIGHTBLACK}}
        >
          <View style={{paddingHorizontal: 20, paddingVertical: 5}}>
            <B16 style={{color: MINT, marginBottom: 20}}>정렬</B16>
            <FlatList
              data={['최신순', '인기순']}
              renderItem={({item}: any) => {
                return (
                  <OrderButton onPress={() => closeOrder(item)}>
                    <B16 style={{color: order===item ? MINT : WHITE}}>{item}</B16>
                    {order===item && <CheckIcon />}
                  </OrderButton>
                )
              }}
            />
          </View>
        </BottomSheetModal>
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