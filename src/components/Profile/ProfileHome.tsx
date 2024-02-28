import { useState, useEffect, useCallback } from 'react';
import { Image, SafeAreaView, View, TouchableOpacity, FlatList } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParams } from '../../pages/Profile';
import YoutubePlayer from 'react-native-youtube-iframe';
import { B16, B14, B12 } from '../../styles/GlobalText';

import MusicIcon from '../../assets/common/Music.svg';
import MenuIcon from '../../assets/common/Menu.svg';
import { LIGHTBLACK } from '../../styles/GlobalColor';

interface ProfileProps {
  nickname: string;
  introduction?: string;
  rep_pic?: string;
  music?: string;
  musicUrl?: string;
  following: number;
  follower: number;
}

const ProfileSection = ({ profile, navigation }: { profile: ProfileProps, navigation: any }) => {
  const [follow, setFollow] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);
  const extractVideoId = (url: string): string => {
    const match = url.match(/be\/([^?]+)/);
    return match ? match[1] : '';
  };
  const videoId = extractVideoId(profile.musicUrl ? profile.musicUrl : '');

  // // 자동재생
  // useEffect(() => {
  //   setPlaying(true);
  // }, []);

  return (
    <>
      <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
        <Image source={{uri: profile.rep_pic}} style={{width: 80, height: 80, borderRadius: 180, marginRight: 10}} />
        <View style={{justifyContent: 'space-between', flex: 1, paddingVertical: 5}}>
          <B16>{profile.nickname}</B16>
          <B14>{profile.introduction}</B14>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => navigation.navigate('FollowList')}>
              <B12>팔로잉 {profile.following}</B12>
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft: 10}} onPress={() => navigation.navigate('FollowList')}>
              <B12>팔로우 {profile.follower}</B12>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => setPlaying(!playing)}
            style={{
              flexDirection: 'row',
            }}>
            <B12 style={{ marginRight: 5, width: 100 }}>{profile.music}</B12>
            <MusicIcon width={15} height={15} />
          </TouchableOpacity>
          <YoutubePlayer
            height={0}
            play={playing}
            videoId={videoId}
            onChangeState={onStateChange}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => setFollow(!follow)}
        style={{
          alignItems: 'center', 
          justifyContent: 'center', 
          paddingVertical: 5, 
          backgroundColor: LIGHTBLACK,
          marginHorizontal: 20,
          marginVertical: 10,
          borderRadius: 12
        }}>
        <B16>{follow ? '팔로잉' : '팔로우'}</B16>
      </TouchableOpacity>
    </>
  )
}

const ProfileHome = ({ navigation }: StackScreenProps<ProfileStackParams, 'ProfileHome'>) => {
  const [profile, setProfile] = useState<ProfileProps>({
    nickname: '황은정',
    introduction: '너 ㄸĦ문øłl ㅁı쳐',
    rep_pic: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
    music: '미쓰에이 - Bad girl Good girl',
    musicUrl: 'https://youtu.be/8TeeJvcBdLA?si=yffEamC12OAFs7HQ',
    following: 14,
    follower: 16
  })

  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity style={{alignSelf: 'flex-end', width: 40, height: 40, alignItems: 'center', justifyContent: 'center'}}>
        <MenuIcon width={24} height={24} />
      </TouchableOpacity>
      <ProfileSection profile={profile} navigation={navigation} />
    </SafeAreaView>
  )
}

export default ProfileHome;