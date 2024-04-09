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
import { StackScreenProps } from '@react-navigation/stack';
import { FeedProps } from './FeedUpload';
import EditButton from '../common/EditButton';
import { Title, Label, Subtitle, Body } from '../../styles/GlobalText';
import { BLACK, GRAY, LIGHTGRAY, LIGHTPURPLE, PURPLE, WHITE } from '../../styles/GlobalColor';
import moment from 'moment';
import PuzzleIcon from '../../assets/common/Puzzle.svg';

import DotsIcon from '../../assets/common/Dots.svg';
import IconButton from '../common/IconButton';
import ArrowIcon from '../../assets/common/Arrow.svg';
import MarkerIcon from '../../assets/common/Marker.svg';
import { FeedStackParams } from '../../pages/Group/FeedStack';
import SubfeedItem from './SubfeedItem';

interface FeedDetailProps extends FeedProps {
  writer: string;
  like: boolean;
}

interface SubFeedProps {
  writer: string;
  content: string;
  profile: string;
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
  const isWriter = feed.writer === user;

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
  const subfeed = ['', '', ''];
  let isPuzzleComplete = feed.members.length === subfeed.length;
  let isAlreadyPuzzled = false;
  let puzzleButtonEnabled = isWriter
    ? isPuzzleComplete
      ? true
      : false
    : isAlreadyPuzzled
    ? false
    : true;

  // 자동재생
  // useEffect(() => {
  //   setPlaying(true);
  // }, []);

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
          <IconButton onPress={() => navigation.goBack()}>
            <ArrowIcon color={WHITE} />
          </IconButton>
          {isWriter && (
            <IconButton onPress={() => setDotPressed(!dotPressed)}>
              <DotsIcon
                transform={[{ rotate: dotPressed ? '90deg' : '0deg' }]}
                color={WHITE}
              />
            </IconButton>
          )}
          {dotPressed && (
            <EditButton
              editLabel="수정"
              deleteLabel="삭제"
              onEdit={() => {}}
              onDelete={() => {}}
              style={{ top: 40, right: 15 }}
            />
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 165,
            marginLeft: 10,
          }}>
          <MarkerIcon color={WHITE} />
          <Title style={{ color: WHITE }}> {feed.location}</Title>
        </View>
        {/* <TouchableOpacity
          onPress={() => setPlaying(!playing)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 160,
            padding: 10,
          }}>
          <MusicIcon />
          <B12 style={{ marginLeft: 5 }}>{feed.music}</B12>
        </TouchableOpacity> */}
      </ImageBackground>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: LIGHTPURPLE,
        }}>
        <Label style={{ marginBottom: 5 }}>
          {moment(feed.date).format('YYYY-MM')} | {feed.writer}
        </Label>
        <Subtitle style={{ marginBottom: 5 }}>{feed.title}</Subtitle>
        <Body style={{ marginBottom: 15 }}>{feed.content}</Body>
        <TouchableOpacity
          onPress={() => {
            /* isWriter ? 추억 퍼즐 완성하기 : 추억 퍼즐 맞추기 */
          }}
          disabled={!puzzleButtonEnabled}
          style={{
            backgroundColor: puzzleButtonEnabled ? PURPLE : GRAY,
            width: '100%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            alignSelf: 'center',
            marginBottom: 5,
            flexDirection: 'row',
          }}>
          <PuzzleIcon style={{ marginRight: 10 }} />
          <Body style={{ color: WHITE }}>
            {isWriter ? '추억 퍼즐 완성하기' : '추억 퍼즐 맞추기'}
          </Body>
        </TouchableOpacity>
      </View>
      {/* <YoutubePlayer
        height={0}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
      /> */}
    </>
  );
};

const subfeedData: SubFeedProps[] = [
  {
    writer: '피터팬',
    content:
      '완전 기억남! 토끼가 분명 울고 있었어! 토끼는 무슨 일이 있었던걸까? 주인은 왜 토끼를 버린걸까? 나 너무 궁금해서 미쳐버리는 줄 알았잖아. 내가 제주도에 살았다면 토끼를 데려갔을 거야. 깡총깡총.',
    profile:
      'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABUEy7m5EHhjNhJ1p1itC34MCXg11eTU7Uvc9eRkDJE9nJsGwZk2mej7FpG_nmWeAFkpcb9f7Gk39ZXsJApq214kipyZe9sXVeIWc.jpg?r=169',
  },
  {
    writer: '피터팬',
    content:
      '완전 기억남! 토끼가 분명 울고 있었어! 토끼는 무슨 일이 있었던걸까? 주인은 왜 토끼를 버린걸까? 나 너무 궁금해서 미쳐버리는 줄 알았잖아. 내가 제주도에 살았다면 토끼를 데려갔을 거야. 깡총깡총.',
    profile:
      'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABUEy7m5EHhjNhJ1p1itC34MCXg11eTU7Uvc9eRkDJE9nJsGwZk2mej7FpG_nmWeAFkpcb9f7Gk39ZXsJApq214kipyZe9sXVeIWc.jpg?r=169',
  },
  {
    writer: '피터팬',
    content:
      '완전 기억남! 토끼가 분명 울고 있었어! 토끼는 무슨 일이 있었던걸까? 주인은 왜 토끼를 버린걸까? 나 너무 궁금해서 미쳐버리는 줄 알았잖아. 내가 제주도에 살았다면 토끼를 데려갔을 거야. 깡총깡총.',
    profile:
      'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABUEy7m5EHhjNhJ1p1itC34MCXg11eTU7Uvc9eRkDJE9nJsGwZk2mej7FpG_nmWeAFkpcb9f7Gk39ZXsJApq214kipyZe9sXVeIWc.jpg?r=169',
  },
];

const FeedDetail = ({
  navigation,
}: StackScreenProps<FeedStackParams, 'FeedDetail'>) => {
  const [feed, setFeed] = useState<FeedDetailProps>({
    title: '제주도 여행 갔던 거 기억 ㄴrㄴㅣ',
    content: '길 가다가 바닥에 떨어진 토끼 본거 기억나니!',
    date: new Date(2023, 11, 23),
    writer: '김토끼',
    location: '서울 송파구',
    rep_pic:
      'https://img.allurekorea.com/allure/2022/07/style_62d0cac69cbce-563x700.jpeg',
    music: '미쓰에이 - Bad girl Good girl',
    musicUrl: 'https://youtu.be/8TeeJvcBdLA?si=yffEamC12OAFs7HQ',
    members: ['', '', ''],
    like: true,
  });

  return (
    <FlatList
      data={subfeedData}
      ListHeaderComponent={
        <DetailSection feed={feed} navigation={navigation} user={'김토끼'} />
      }
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }: { item: any; index: number }) => {
        const { writer, content, profile } = item;
        const randomColors = ['#EEF8FF', '#FFF8F5', '#FFFEEE', '#F5FFF8'];
        return (
          <SubfeedItem
            background={randomColors[index % 4]}
            isLast={subfeedData.length - 1 === index}
            user={'피터팬'}
            writer={writer}
            content={content}
            profile={profile}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        );
      }}
    />
  );
};

export default FeedDetail;
