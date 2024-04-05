import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { ProfileStackParams } from '../../pages/Group/PuzzleStack';
import CustomHeader from '../common/CustomHeader';

import { B16, B14 } from '../../styles/GlobalText';
import { BLACK, LIGHTBLACK, MINT, WHITE } from '../../styles/GlobalColor';
import SearchBar from '../common/SearchBar';

const data = [
  {
    profile: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
    nickname: '피터팬',
    isFollowed: false,
  },
];

const FollowList = ({
  navigation,
  route,
}: StackScreenProps<ProfileStackParams, 'FollowList'>) => {
  const [showFollowing, setShowFollowing] = useState<boolean>(
    route.params.follow === 'following' ? true : false,
  );
  const [search, setSearch] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(true);
  return (
    <SafeAreaView>
      <CustomHeader label="팔로우 목록" onBack={() => navigation.goBack()} />
      <View style={{ flexDirection: 'row', zIndex: 1 }}>
        <TouchableOpacity
          onPress={() => setShowFollowing(true)}
          style={{
            width: '50%',
            padding: 10,
            alignItems: 'center',
            borderBottomColor: showFollowing ? MINT : 'transparent',
            borderBottomWidth: 2,
          }}>
          <B16 style={{ color: showFollowing ? MINT : WHITE }}>팔로잉</B16>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowFollowing(false)}
          style={{
            width: '50%',
            padding: 10,
            alignItems: 'center',
            borderBottomColor: showFollowing ? 'transparent' : MINT,
            borderBottomWidth: 2,
          }}>
          <B16 style={{ color: showFollowing ? WHITE : MINT }}>팔로워</B16>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: WHITE,
          width: '100%',
          position: 'absolute',
          top: 135,
        }}
      />
      <View style={{ padding: 15 }}>
        <SearchBar
          search={search}
          setSearch={setSearch}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
          placeholder="친구의 닉네임을 검색하세요"
        />
        <FlatList
          data={data}
          style={{ marginTop: 10 }}
          renderItem={({ item }) => {
            const { profile, nickname, isFollowed } = item;
            return (
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  alignItems: 'center',
                  backgroundColor: LIGHTBLACK,
                  borderRadius: 12,
                }}>
                <Image
                  source={{ uri: profile }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 180,
                    marginRight: 10,
                  }}
                />
                <B16 style={{ flex: 1 }}>{nickname}</B16>
                <TouchableOpacity
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 15,
                    borderRadius: 12,
                    backgroundColor: BLACK,
                  }}>
                  <B14>{isFollowed ? '언팔로우' : '팔로우'}</B14>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default FollowList;
