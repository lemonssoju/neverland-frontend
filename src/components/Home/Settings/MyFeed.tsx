import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import { SettingsStackParams } from '../../../pages/Settings';
import CustomHeader from '../../common/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import { HomeStackParams } from '../../../pages/Home';
import { BLACK, GRAY, LIGHTBLACK, MINT } from '../../../styles/GlobalColor';
import { B14, B16 } from '../../../styles/GlobalText';

interface FeedItemProps {
  category: string;
  title: string;
  date: string;
  rep_pic: string;
}

const FeedItem = ({ category, title, date, rep_pic }: FeedItemProps) => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParams>>();
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        borderRadius: 8,
        backgroundColor: LIGHTBLACK,
        marginVertical: 10,
      }}
      onPress={() => navigation.navigate('FeedDetail')}>
      <Image
        source={{ uri: rep_pic }}
        style={{
          width: 90,
          height: '100%',
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
        }}
      />
      <View style={{ padding: 10, alignItems: 'flex-start' }}>
        <View
          style={{
            backgroundColor: MINT,
            borderRadius: 8,
            paddingVertical: 5,
            paddingHorizontal: 8,
          }}>
          <B14 style={{ color: BLACK }}>{category}</B14>
        </View>
        <B16 style={{ marginTop: 5 }}>{title}</B16>
        <B14 style={{ color: GRAY, marginTop: 5 }}>{date}</B14>
      </View>
    </TouchableOpacity>
  );
};

const data = [
  {
    category: '영화',
    title: '8월의 크리스마스',
    date: '2023.11.23',
    rep_pic:
      'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABUEy7m5EHhjNhJ1p1itC34MCXg11eTU7Uvc9eRkDJE9nJsGwZk2mej7FpG_nmWeAFkpcb9f7Gk39ZXsJApq214kipyZe9sXVeIWc.jpg?r=169',
  },
  {
    category: '영화',
    title: '8월의 크리스마스',
    date: '2023.11.23',
    rep_pic:
      'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABUEy7m5EHhjNhJ1p1itC34MCXg11eTU7Uvc9eRkDJE9nJsGwZk2mej7FpG_nmWeAFkpcb9f7Gk39ZXsJApq214kipyZe9sXVeIWc.jpg?r=169',
  },
  {
    category: '영화',
    title: '8월의 크리스마스',
    date: '2023.11.23',
    rep_pic:
      'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABUEy7m5EHhjNhJ1p1itC34MCXg11eTU7Uvc9eRkDJE9nJsGwZk2mej7FpG_nmWeAFkpcb9f7Gk39ZXsJApq214kipyZe9sXVeIWc.jpg?r=169',
  },
  {
    category: '영화',
    title: '8월의 크리스마스',
    date: '2023.11.23',
    rep_pic:
      'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABUEy7m5EHhjNhJ1p1itC34MCXg11eTU7Uvc9eRkDJE9nJsGwZk2mej7FpG_nmWeAFkpcb9f7Gk39ZXsJApq214kipyZe9sXVeIWc.jpg?r=169',
  },
  {
    category: '영화',
    title: '8월의 크리스마스',
    date: '2023.11.23',
    rep_pic:
      'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABUEy7m5EHhjNhJ1p1itC34MCXg11eTU7Uvc9eRkDJE9nJsGwZk2mej7FpG_nmWeAFkpcb9f7Gk39ZXsJApq214kipyZe9sXVeIWc.jpg?r=169',
  },
  {
    category: '영화',
    title: '8월의 크리스마스',
    date: '2023.11.23',
    rep_pic:
      'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABUEy7m5EHhjNhJ1p1itC34MCXg11eTU7Uvc9eRkDJE9nJsGwZk2mej7FpG_nmWeAFkpcb9f7Gk39ZXsJApq214kipyZe9sXVeIWc.jpg?r=169',
  },
];

const MyFeed = ({
  navigation,
  route,
}: StackScreenProps<SettingsStackParams, 'MyFeed'>) => {
  const title = route.params.title;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader label={title} onBack={() => navigation.goBack()} />
      <FlatList
        data={data}
        style={{ paddingHorizontal: 20 }}
        renderItem={({ item }: any) => {
          const { category, title, rep_pic, date } = item;
          return (
            <FeedItem
              category={category}
              title={title}
              rep_pic={rep_pic}
              date={date}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default MyFeed;
