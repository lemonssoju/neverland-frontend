import { FlatList, SafeAreaView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { GroupStackParams } from '../../pages/Group';
import CustomHeader from '../common/CustomHeader';
import FeedItem from './FeedItem';

const data = [
  {
    writer: '황은정',
    title: '망민중 축제 기억ㄴrㄴㅣ',
    subtitle: '아니 우리 의상 보라고;;',
    rep_pic: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg'
  },
  {
    writer: '황은정',
    title: '망민중 축제 기억ㄴrㄴㅣ',
    subtitle: '아니 우리 의상 보라고;;',
    rep_pic: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg'
  },
  {
    writer: '황은정',
    title: '망민중 축제 기억ㄴrㄴㅣ',
    subtitle: '아니 우리 의상 보라고;;',
    rep_pic: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg'
  },
  {
    writer: '황은정',
    title: '망민중 축제 기억ㄴrㄴㅣ',
    subtitle: '아니 우리 의상 보라고;;',
    rep_pic: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg'
  },
]

const FeedList = ({ navigation }: StackScreenProps<GroupStackParams, 'FeedList'>) => {
  return (
    <SafeAreaView>
      <CustomHeader label='망미동 여걸 사총사' onBack={() => navigation.goBack()} />
      <FlatList
          data={data}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            const { writer, title, subtitle, rep_pic } = item;
            return (
              <FeedItem
                writer={writer}
                title={title}
                subtitle={subtitle}
                rep_pic={rep_pic}
              />
            )
          }}
        />
    </SafeAreaView>
  )
}

export default FeedList;
