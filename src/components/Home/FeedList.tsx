import { FlatList, SafeAreaView } from 'react-native';
import FeedItem from './FeedItem';

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
    <SafeAreaView>
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