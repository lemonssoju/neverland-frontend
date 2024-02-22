import { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { HomeStackParams } from '../../pages/Home';
import { StackScreenProps } from '@react-navigation/stack';
import YoutubePlayer from 'react-native-youtube-iframe';
import BackButton from '../common/BackButton';
import HeartButton from '../common/HeartButton';
import EditButton from '../common/EditButton';
import RecommendItem from './RecommendItem';
import { B12, B16, B14, B20 } from '../../styles/GlobalText';
import { BLACK, LIGHTBLACK, MINT, WHITE } from '../../styles/GlobalColor';

import DotsIcon from '../../assets/common/Dots.svg';
import MusicIcon from '../../assets/common/Music.svg';
import HeartIcon from '../../assets/common/Heart.svg';
import CommentInput from '../common/CommentInput';

interface FeedDetailProps {
  title: string;
  subtitle: string;
  content: string;
  date: string;
  writer: string;
  rep_pic: string;
  music?: string;
  musicUrl?: string;
  like: boolean;
}

const RecommendData = [
  { 
    title: '1998년 서울 여성 길거리 패션',
    hashtag: ['패션', '나팔바지'],
    rep_pic: 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABUEy7m5EHhjNhJ1p1itC34MCXg11eTU7Uvc9eRkDJE9nJsGwZk2mej7FpG_nmWeAFkpcb9f7Gk39ZXsJApq214kipyZe9sXVeIWc.jpg?r=169'
  },
  { 
    title: '1998년 서울 여성 길거리 패션',
    hashtag: ['패션', '나팔바지'],
    rep_pic: 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABUEy7m5EHhjNhJ1p1itC34MCXg11eTU7Uvc9eRkDJE9nJsGwZk2mej7FpG_nmWeAFkpcb9f7Gk39ZXsJApq214kipyZe9sXVeIWc.jpg?r=169'
  },
  { 
    title: '1998년 서울 여성 길거리 패션',
    hashtag: ['패션', '나팔바지'],
    rep_pic: 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABUEy7m5EHhjNhJ1p1itC34MCXg11eTU7Uvc9eRkDJE9nJsGwZk2mej7FpG_nmWeAFkpcb9f7Gk39ZXsJApq214kipyZe9sXVeIWc.jpg?r=169'
  }
]

const DetailSection = ({ feed, navigation, user }: { feed: FeedDetailProps, navigation: any, user: string }) => {
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
  }
  const videoId = extractVideoId(feed.musicUrl ? feed.musicUrl : '');
  return (
    <>
      <ImageBackground source={{uri: feed.rep_pic}} style={{width: '100%', height: 300}} imageStyle={{width: '100%', height: 300}}>
        <View style={{position: 'absolute', backgroundColor: BLACK, opacity: 0.2, width: '100%', height: '100%'}} />
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 60}}>
          <BackButton onPress={() => navigation.goBack()} />
          { user  && 
            <TouchableOpacity onPress={() => setDotPressed(!dotPressed)} style={{width: 40, height: 40, alignItems: 'center', justifyContent: 'center'}}>
              <DotsIcon transform={[{ rotate: dotPressed ? '90deg' : '0deg'}]} />
            </TouchableOpacity>
          }
          { dotPressed && <EditButton onEdit={() => {}} onDelete={() => {}} style={{top: 40, right: 15}} /> }
        </View>
        <TouchableOpacity onPress={() => setPlaying(!playing)} style={{flexDirection: 'row', alignItems: 'center', marginTop: 160, padding: 10}}>
          <MusicIcon />
          <B12 style={{marginLeft: 5}}>{feed.music}</B12>
        </TouchableOpacity>
      </ImageBackground>
      <View style={{paddingHorizontal: 30}}>
        <View style={{marginTop: 15, width: '80%'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
            <B12 style={{fontStyle: 'italic', marginRight: 5}}>{feed.date}</B12>
            <B12>{feed.writer}</B12>
          </View>
          <B20>{feed.title}</B20>
        </View>
        <HeartButton like={like} onPress={() => setLike(!like)} style={{position: 'absolute', right: 10, top: 10}} />
        <B16 style={{marginTop: 5}}>{feed.subtitle}</B16>
        <B14 style={{marginTop: 20, lineHeight: 24}}>{feed.content}</B14>
        <B12 style={{color: MINT, marginTop: 30, marginBottom: 10}}>{user}님을 위한 추천 글</B12>
        <FlatList
          data={RecommendData}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}: any) => {
            const { title, hashtag, rep_pic } = item;
            return (
              <RecommendItem
                title={title}
                hashtag={hashtag}
                rep_pic={rep_pic}
              />
            )
          }}
        />
      </View>
      <YoutubePlayer
        height={0}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
      />
    </>
  )
}

const FeedDetail = ({ navigation }: StackScreenProps<HomeStackParams, 'FeedDetail'>) => {
  const [feed, setFeed] = useState<FeedDetailProps>({
    title: '8월의 크리스마스',
    subtitle: '1998년... 당신은 누구와 사랑을 했나요?',
    content: '"좋아하는 남자 친구 없어요?"변두리 사진관에서 아버지를 모시고 사는 노총각 ‘정원’. 시한부 인생을 받아들이고 가족, 친구들과 담담한 이별을 준비하던 어느 날, 주차단속요원 \'다림\'을 만나게 되고 차츰 평온했던 일상이 흔들리기 시작한다."아저씨, 왜 나만 보면 웃어요?"',
    date: '2023.11.23',
    writer: '피터팬',
    rep_pic: 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABUEy7m5EHhjNhJ1p1itC34MCXg11eTU7Uvc9eRkDJE9nJsGwZk2mej7FpG_nmWeAFkpcb9f7Gk39ZXsJApq214kipyZe9sXVeIWc.jpg?r=169',
    music: '델리스파이스 - 고백',
    musicUrl: 'https://youtu.be/BYyVDi8BpZw?si=uBQTU4JpzLrIU84f',
    like: true
  });
  const [comment, setComment] = useState<string>('');
  
  return (
    <View>
      <FlatList
        data={[]}
        ListHeaderComponent={() => 
          <>
            <DetailSection feed={feed} navigation={navigation} user={'황은정'} />
            <View style={{height: 1, backgroundColor: LIGHTBLACK, marginVertical: 20, marginHorizontal: 30}} />
            <View style={{paddingHorizontal: 30}}>
              <B12 style={{color: MINT, marginBottom: 10}}>댓글</B12>
              <CommentInput comment={comment} setComment={setComment} onPress={() => {}} />
            </View>
          </>
        }
        renderItem={({item}: any) => {
          return (
            <></>
          )
        }}
      />
    </View>
  );
};


export default FeedDetail;
