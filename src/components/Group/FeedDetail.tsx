import { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { HomeStackParams } from '../../pages/Home';
import { StackScreenProps } from '@react-navigation/stack';
import { FeedProps } from '../Home/FeedUpload';
import YoutubePlayer from 'react-native-youtube-iframe';
import BackButton from '../common/BackButton';
import HeartButton from '../common/HeartButton';
import EditButton from '../common/EditButton';
import CommentInput from '../common/CommentInput';
import CommentItem from '../common/CommentItem';
import { B12, B16, B14, B20 } from '../../styles/GlobalText';
import { BLACK, LIGHTBLACK, MINT, WHITE } from '../../styles/GlobalColor';

import DotsIcon from '../../assets/common/Dots.svg';
import MusicIcon from '../../assets/common/Music.svg';

interface FeedDetailProps extends FeedProps {
  date: string;
  writer: string;
  like: boolean;
}

const DetailSection = ({
  feed,
  navigation,
  user,
}: {
  feed: FeedDetailProps;
  navigation: any;
  user: string;
}) => {
  const [like, setLike] = useState<boolean>(feed.like);
  const [dotPressed, setDotPressed] = useState<boolean>(false);
  const [playing, setPlaying] = useState(false);
  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);
  const extractVideoId = (url: string): string => {
    const match = url.match(/be\/([^?]+)/);
    return match ? match[1] : '';
  };
  const videoId = extractVideoId(feed.musicUrl ? feed.musicUrl : '');

  // 자동재생
  useEffect(() => {
    setPlaying(true);
  }, []);

  return (
    <>
      <ImageBackground
        source={{ uri: feed.rep_pic }}
        style={{ width: '100%', height: 300 }}
        imageStyle={{ width: '100%', height: 300 }}>
        <View
          style={{
            position: 'absolute',
            backgroundColor: BLACK,
            opacity: 0.2,
            width: '100%',
            height: '100%',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 60,
          }}>
          <BackButton onPress={() => navigation.goBack()} />
          {user === feed.writer && (
            <TouchableOpacity
              onPress={() => setDotPressed(!dotPressed)}
              style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <DotsIcon
                transform={[{ rotate: dotPressed ? '90deg' : '0deg' }]}
              />
            </TouchableOpacity>
          )}
          {dotPressed && (
            <EditButton
              onEdit={() => {}}
              onDelete={() => {}}
              style={{ top: 40, right: 15 }}
            />
          )}
        </View>
        <TouchableOpacity
          onPress={() => setPlaying(!playing)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 160,
            padding: 10,
          }}>
          <MusicIcon />
          <B12 style={{ marginLeft: 5 }}>{feed.music}</B12>
        </TouchableOpacity>
      </ImageBackground>
      <View style={{ paddingHorizontal: 30 }}>
        <View style={{ marginTop: 15, width: '80%' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            <B12 style={{ fontStyle: 'italic', marginRight: 5 }}>
              {feed.date}
            </B12>
            <B12>{feed.writer}</B12>
          </View>
          <B20>{feed.title}</B20>
        </View>
        <HeartButton
          like={like}
          onPress={() => setLike(!like)}
          style={{ position: 'absolute', right: 10, top: 10 }}
        />
        <B16 style={{ marginTop: 5 }}>{feed.subtitle}</B16>
        <B14 style={{ marginTop: 20, lineHeight: 24 }}>{feed.content}</B14>
      </View>
      <YoutubePlayer
        height={0}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
      />
    </>
  );
};

const commentData = [
  {
    writer: '피터팬',
    date: '2023.11.23',
    content: '1998년으로 돌아간 거 같아요!',
    profile:
      'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABUEy7m5EHhjNhJ1p1itC34MCXg11eTU7Uvc9eRkDJE9nJsGwZk2mej7FpG_nmWeAFkpcb9f7Gk39ZXsJApq214kipyZe9sXVeIWc.jpg?r=169',
  },
  {
    writer: '피터팬',
    date: '2023.11.23',
    content: '1998년으로 돌아간 거 같아요!',
    profile:
      'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABUEy7m5EHhjNhJ1p1itC34MCXg11eTU7Uvc9eRkDJE9nJsGwZk2mej7FpG_nmWeAFkpcb9f7Gk39ZXsJApq214kipyZe9sXVeIWc.jpg?r=169',
  },
  {
    writer: '피터팬',
    date: '2023.11.23',
    content: '1998년으로 돌아간 거 같아요!',
    profile:
      'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABUEy7m5EHhjNhJ1p1itC34MCXg11eTU7Uvc9eRkDJE9nJsGwZk2mej7FpG_nmWeAFkpcb9f7Gk39ZXsJApq214kipyZe9sXVeIWc.jpg?r=169',
  },
];

const FeedDetail = ({
  navigation,
}: StackScreenProps<HomeStackParams, 'FeedDetail'>) => {
  const [feed, setFeed] = useState<FeedDetailProps>({
    title: '망민중 축제 기억 ㄴrㄴㅣ',
    subtitle: '아니 우리 의상 보라고;;',
    content:
      '앞에선 한 마디도 못하더니\n뒤에선 내 얘길 안 좋게 해\n참 어이가 없어\nHello hello hello 나 같은 여잔 처음\n(으로 으로 으로) 본 것 같은데\n왜 나를 판단하니\n내가 혹시 두려운 거니\n겉으론 bad girl 속으론 good girl\n나를 잘 알지도 못하면서\n내 겉모습만 보면서\n한심한 여자로 보는\n너의 시선이 난 너무나 웃겨',
    category: '',
    date: '2023.11.23',
    writer: '피터팬',
    rep_pic: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
    music: '미쓰에이 - Bad girl Good girl',
    musicUrl: 'https://youtu.be/8TeeJvcBdLA?si=yffEamC12OAFs7HQ',
    like: true,
  });
  const [comment, setComment] = useState<string>('');

  return (
    <View>
      <FlatList
        data={commentData}
        ListHeaderComponent={() => (
          <>
            <DetailSection
              feed={feed}
              navigation={navigation}
              user={'황은정'}
            />
            <View
              style={{
                height: 1,
                backgroundColor: LIGHTBLACK,
                marginVertical: 20,
                marginHorizontal: 30,
              }}
            />
            <View style={{ paddingHorizontal: 30 }}>
              <B12 style={{ color: MINT, marginBottom: 10 }}>댓글</B12>
              <CommentInput
                comment={comment}
                setComment={setComment}
                onPress={() => {}}
              />
            </View>
          </>
        )}
        renderItem={({ item }: any) => {
          const { writer, date, content, profile } = item;
          return (
            <CommentItem
              writer={writer}
              date={date}
              content={content}
              profile={profile}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          );
        }}
      />
    </View>
  );
};

export default FeedDetail;
