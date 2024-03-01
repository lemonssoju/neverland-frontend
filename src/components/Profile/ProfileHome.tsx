import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  Image,
  SafeAreaView,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  ImageBackground,
  Pressable,
  TextInput,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParams } from '../../pages/Profile';
import YoutubePlayer from 'react-native-youtube-iframe';
import styled from 'styled-components/native';
import { BLACK, LIGHTBLACK, WHITE } from '../../styles/GlobalColor';
import { Asset } from 'react-native-image-picker';
import PhotoButton from '../common/PhotoButton';
import { B16, B14, B12 } from '../../styles/GlobalText';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';

import MusicIcon from '../../assets/common/Music.svg';
import MenuIcon from '../../assets/common/Menu.svg';
import CloseIcon from '../../assets/common/Close.svg';
import BottomButton from '../common/BottomButton';
import { BottomSheetProvider } from '@gorhom/bottom-sheet/lib/typescript/contexts';

interface ProfileProps {
  nickname: string;
  introduction?: string;
  rep_pic?: string;
  music?: string;
  musicUrl?: string;
  following: number;
  follower: number;
  albums?: string[];
}

const ProfileSection = ({
  profile,
  navigation,
}: {
  profile: ProfileProps;
  navigation: any;
}) => {
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
      <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
        <Image
          source={{ uri: profile.rep_pic }}
          style={{ width: 80, height: 80, borderRadius: 180, marginRight: 10 }}
        />
        <View
          style={{
            justifyContent: 'space-between',
            flex: 1,
            paddingVertical: 5,
          }}>
          <B16>{profile.nickname}</B16>
          <B14>{profile.introduction}</B14>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => navigation.navigate('FollowList')}>
              <B12>팔로잉 {profile.following}</B12>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => navigation.navigate('FollowList')}>
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
          borderRadius: 12,
        }}>
        <B16>{follow ? '팔로잉' : '팔로우'}</B16>
      </TouchableOpacity>
    </>
  );
};

const AlbumSection = ({ onPress }: { onPress: () => void }) => {
  return (
    <ImageBackground
      source={require('../../assets/Album.png')}
      style={{ width: '100%', height: '100%' }}
      imageStyle={{ width: 390, height: 460 }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          position: 'absolute',
          top: 5,
          left: 52,
          transform: [{ rotate: '4deg' }],
        }}>
        <Image
          source={{ uri: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg' }}
          style={{ width: 130, height: 200 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPress}
        style={{
          position: 'absolute',
          top: 5,
          right: 54,
          transform: [{ rotate: '-1deg' }],
        }}>
        <Image
          source={{ uri: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg' }}
          style={{ width: 130, height: 200 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPress}
        style={{
          position: 'absolute',
          top: 210,
          left: 38,
          transform: [{ rotate: '4deg' }],
        }}>
        <Image
          source={{ uri: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg' }}
          style={{ width: 130, height: 200 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPress}
        style={{
          position: 'absolute',
          top: 210,
          right: 50,
          transform: [{ rotate: '-1deg' }],
        }}>
        <Image
          source={{ uri: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg' }}
          style={{ width: 130, height: 200 }}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

const data = [
  {
    nickname: '피터팬1',
    profile: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
    content: '널 찾아간다 추억이 보낸 피터팬 따라나섰던 네버랜드',
    date: '2023.12.19',
  },
  {
    nickname: '피터팬2',
    profile: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
    content: '널 찾아간다 추억이 보낸 피터팬 따라나섰던 네버랜드',
    date: '2023.12.19',
  },
  {
    nickname: '피터팬',
    profile: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
    content: '널 찾아간다 추억이 보낸 피터팬 따라나섰던 네버랜드',
    date: '2023.12.19',
  },
  {
    nickname: '피터팬',
    profile: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
    content: '널 찾아간다 추억이 보낸 피터팬 따라나섰던 네버랜드',
    date: '2023.12.19',
  },
  {
    nickname: '피터팬',
    profile: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
    content: '널 찾아간다 추억이 보낸 피터팬 따라나섰던 네버랜드',
    date: '2023.12.19',
  },
];

const GuestSection = () => {
  const guestRef = useRef<BottomSheet>(null);
  const guestSnapPoints = useMemo(() => [60, 600], []);
  const [guestComment, setGuestComment] = useState<string>('');

  return (
    <BottomSheet
      ref={guestRef}
      snapPoints={guestSnapPoints}
      backgroundStyle={{
        backgroundColor: LIGHTBLACK
      }}
      handleStyle={{
        backgroundColor: LIGHTBLACK,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      }}
      handleIndicatorStyle={{ backgroundColor: '#3F3F3F', width: 60 }}>
      <B16 style={{ marginLeft: 20, marginBottom: 10 }}>방명록</B16>
      <BottomSheetFlatList
        data={data}
        numColumns={2}
        renderItem={({ item, index }) => {
          const { nickname, profile, content, date } = item;
          return (
            <View style={{ borderRadius: 18, backgroundColor: BLACK, width: '45%', margin: 10, height: 150 }}>
              <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
                <Image
                  source={{ uri: profile }}
                  style={{ width: 20, height: 20, borderRadius: 180, marginRight: 5 }}
                />
                <B14>{nickname}</B14>
              </View>
              { index === 0 ?
                <View>
                  <TextInput
                    value={guestComment}
                    onChangeText={setGuestComment}
                    multiline
                    style={{height: 70, padding: 10, color: WHITE}}
                  />
                  <TouchableOpacity style={{borderTopWidth: 1, borderTopColor: WHITE, alignItems: 'center', paddingVertical: 10}}>
                    <B16>방명록 등록</B16>
                  </TouchableOpacity>
                </View>
                :
                <View style={{paddingHorizontal: 10, paddingBottom: 10, flex: 1}}>
                  <B12 style={{lineHeight: 24, flex: 1, textAlign: 'center'}}>{content}</B12>
                  <B12 style={{alignSelf: 'flex-end'}}>{date}</B12>
                </View>
              }
            </View>
          );
        }}
      />
    </BottomSheet>
  );
};

const ProfileHome = ({
  navigation,
}: StackScreenProps<ProfileStackParams, 'ProfileHome'>) => {
  const [profile, setProfile] = useState<ProfileProps>({
    nickname: '황은정',
    introduction: '너 ㄸĦ문øłl ㅁı쳐',
    rep_pic: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
    music: '미쓰에이 - Bad girl Good girl',
    musicUrl: 'https://youtu.be/8TeeJvcBdLA?si=yffEamC12OAFs7HQ',
    following: 14,
    follower: 16,
    albums: [],
  });
  const [albumVisible, setAlbumVisible] = useState<boolean>(false);
  const [photo, setPhoto] = useState<Asset[]>([
    {
      fileName: '',
      width: 0,
      height: 0,
      uri: '',
    },
  ]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        style={{
          alignSelf: 'flex-end',
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 8,
        }}>
        <MenuIcon width={24} height={24} />
      </TouchableOpacity>
      <ProfileSection profile={profile} navigation={navigation} />
      <AlbumSection onPress={() => setAlbumVisible(true)} />
      <GuestSection />
      <Modal visible={albumVisible} transparent>
        <Pressable
          style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
          onPress={() => setAlbumVisible(false)}
        />
        <View
          style={{
            backgroundColor: LIGHTBLACK,
            position: 'absolute',
            width: '95%',
            height: 300,
            top: 300,
            alignSelf: 'center',
            borderRadius: 24,
            padding: 10,
          }}>
          <TouchableOpacity
            onPress={() => setAlbumVisible(false)}
            style={{
              position: 'absolute',
              right: 0,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CloseIcon width={24} height={24} />
          </TouchableOpacity>
          <PhotoBox>
            <PhotoButton photo={photo} setPhoto={setPhoto} />
          </PhotoBox>
          <BottomButton label="등록" onPress={() => setAlbumVisible(false)} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const PhotoBox = styled.View`
  margin: 10px;
  border-radius: 8px;
  border: 1px solid ${WHITE};
  width: 130px;
  height: 200px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export default ProfileHome;
