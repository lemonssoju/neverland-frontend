import { useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import FeedItem from './FeedItem';
import SearchBar from '../common/SearchBar';

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
  const [search, setSearch] = useState<string>('');

  return (
    <SafeAreaView>
      <SearchBar
        search={search}
        setSearch={setSearch}
      />
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

export default FeedList;