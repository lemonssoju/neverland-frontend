import { useState } from 'react';
import { SafeAreaView, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from '../../pages/Home';
import styled from 'styled-components/native';
import SearchBar from '../common/SearchBar';
import BackButton from '../common/BackButton';
import { UserItem } from './FeedItem';
import { LIGHTBLACK } from '../../styles/GlobalColor';

const FeedSearch = ({ navigation }: StackScreenProps<HomeStackParams, 'FeedSearch'>) => {
  const [search, setSearch] = useState<string>('');
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
    </SafeAreaView>
  )
}

export default FeedSearch;