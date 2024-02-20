import { useState } from 'react';
import { Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { WHITE } from '../../styles/GlobalColor';

import FeedItem from './FeedItem';
import SearchBar from '../common/SearchBar';

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

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header>
        <Text style={{color: WHITE, fontSize: 24, fontWeight: '700'}}>neverland</Text>
        <TouchableOpacity>
          <SearchIcon />
        </TouchableOpacity>
      </Header>
      <FlatList
        data={data}
        renderItem={({item}) => {
          const { title, rep_pic } = item;
          return (
            <FeedItem
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

export default FeedList;