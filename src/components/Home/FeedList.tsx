import { useState } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import styled from 'styled-components/native';
import { BLACK, MINT, WHITE } from '../../styles/GlobalColor';

import { UserItem } from './FeedItem';
import SearchIcon from '../../assets/common/Search.svg';

const data = [
  {
    title: 'title',
    rep_pic: 'https://pyxis.nymag.com/v1/imgs/1e6/840/cbc22db41d890d1ac0ca083c21072da102-05-mean-girls-christmas.2x.h473.w710.jpg',
  },
  {
    title: 'title',
    rep_pic: 'https://pyxis.nymag.com/v1/imgs/1e6/840/cbc22db41d890d1ac0ca083c21072da102-05-mean-girls-christmas.2x.h473.w710.jpg',
  },
  {
    title: 'title',
    rep_pic: 'https://pyxis.nymag.com/v1/imgs/1e6/840/cbc22db41d890d1ac0ca083c21072da102-05-mean-girls-christmas.2x.h473.w710.jpg',
  },
  {
    title: 'title',
    rep_pic: 'https://pyxis.nymag.com/v1/imgs/1e6/840/cbc22db41d890d1ac0ca083c21072da102-05-mean-girls-christmas.2x.h473.w710.jpg',
  },
  {
    title: 'title',
    rep_pic: 'https://pyxis.nymag.com/v1/imgs/1e6/840/cbc22db41d890d1ac0ca083c21072da102-05-mean-girls-christmas.2x.h473.w710.jpg',
  },
]

const FeedList = () => {
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    { key: 0, title: '전체' },
    { key: 1, title: '90s' },
    { key: 2, title: '00s' },
    { key: 3, title: '10s' }
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
              <Text style={{color: item.key === index ? MINT : WHITE, fontSize: 14, fontWeight: '700'}}>{item.title}</Text>
            </TopMenuItem>
          )
        })}
      </TopMenuBar>
      <View style={{height: 1, backgroundColor: WHITE, width: '100%', position: 'absolute', top: 132.5}} />
      <FlatList
        data={data}
        renderItem={({item}) => {
          const { title, rep_pic } = item;
          return (
            <UserItem
              title={title}
              rep_pic={rep_pic}
            />
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
  margin: 5px 0px;
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