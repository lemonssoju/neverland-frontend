import { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import YoutubePlayer from 'react-native-youtube-iframe';
import BackButton from '../common/BackButton';
import HeartButton from '../common/HeartButton';
import EditButton from '../common/EditButton';
import CommentInput from '../common/CommentInput';
import CommentItem from '../common/CommentItem';
import {
  B12,
  B16,
  B14,
  B20,
  Emphasis,
  Caption,
  Label,
  Body,
} from '../../styles/GlobalText';
import {
  BLACK,
  LIGHTGRAY,
  LIGHTPURPLE,
  MINT,
  PURPLE,
  WHITE,
} from '../../styles/GlobalColor';

import ArrowIcon from '../../assets/common/ArrowSmall.svg';
import { PuzzleStackParams } from '../../pages/Group/PuzzleStack';
import CustomHeader from '../common/CustomHeader';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { TabProps } from '../../../App';

interface PuzzleDetailProps {
  date: Date;
  location: string;
  members: string[];
  rep_pic: string;
  content: string;
}

const DetailSection = ({ puzzle }: { puzzle: PuzzleDetailProps }) => {
  const navigationToFeed = useNavigation<StackNavigationProp<TabProps>>();
  return (
    <>
      <CustomHeader label="퍼즐 앨범" onBack={() => {}} onClose={() => {}} />
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <Emphasis style={{ fontSize: 30 }}>
          {moment(puzzle.date).format('YYYY.MM.DD')}
        </Emphasis>
        <Emphasis style={{ fontSize: 30 }}>{puzzle.location}</Emphasis>
        <View style={{ flexDirection: 'row', marginVertical: 15 }}>
          {puzzle.members.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: '#6200DF26',
                  borderColor: PURPLE,
                  borderWidth: 1,
                  borderRadius: 12,
                  marginRight: 8,
                }}>
                <Caption
                  style={{
                    color: PURPLE,
                    paddingHorizontal: 8,
                  }}>
                  {item}
                </Caption>
              </View>
            );
          })}
        </View>
        <Image
          source={{ uri: puzzle.rep_pic }}
          style={{ width: '100%', height: 360, borderRadius: 8 }}
        />
        <View
          style={{
            backgroundColor: LIGHTPURPLE,
            borderRadius: 8,
            paddingTop: 15,
            paddingHorizontal: 15,
            paddingVertical: 10,
            marginTop: 15,
          }}>
          <Body>{puzzle.content}</Body>
          <View
            style={{
              height: 1,
              backgroundColor: LIGHTGRAY,
              marginVertical: 10,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigationToFeed.navigate('Feed', { id: 1 });
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Caption style={{ color: PURPLE }}>추억 퍼즐 조각 보러가기</Caption>
            <ArrowIcon color={PURPLE} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const commentData = [
  {
    writer: '이왈왈',
    date: '2024.03.22',
    content: '와 제주도 미쳤다 나도 데려가지!!!',
    profile:
      'https://pbs.twimg.com/profile_images/1656346926063960064/YZpCofx8_400x400.jpg'
  },
  {
    writer: '박댕댕',
    date: '2024.03.23',
    content: '우리 사진을 이렇게 만들어주니까 너무 이쁘다',
    profile:
    'https://dimg.donga.com/wps/NEWS/IMAGE/2023/06/22/119900215.1.jpg'
  },
  {
    writer: '최냥냥',
    date: '2023.04.01',
    content: '우리 언제 또 같이 여행갈까? 당장 날짜 잡아',
    profile:
    'https://img2.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202208/09/hani/20220809132012529emoo.jpg',
  },
];

const PuzzleDetail = ({
  navigation,
  route,
}: StackScreenProps<PuzzleStackParams, 'PuzzleDetail'>) => {
  const [puzzle, setPuzzle] = useState<PuzzleDetailProps>({
    date: new Date(2023, 6, 23),
    location: '제주 한림읍',
    members: ['김토끼', '박댕댕', '최냥냥'],
    rep_pic: route.params?.rep_pic,
    content:
      '작년 여름에 우리 제주도 간 여행이 생각나. 맛집도 많이 가고 바다에서 수영도 했었어. 특히 새벽에 노을을 보러 일어나서 정말 행복했었지. 함께한 추억이 너무 소중해.',
  });
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    setPuzzle({ ...puzzle, rep_pic: route.params?.rep_pic})
  }, [route.params?.rep_pic])

  return (
    <SafeAreaView>
      <FlatList
        data={commentData}
        ListHeaderComponent={() => (
          <>
            <DetailSection puzzle={puzzle} />

            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
              <Label style={{ color: PURPLE, marginBottom: 10 }}>댓글</Label>
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
        ListFooterComponent={<View style={{ height: 10 }} />}
      />
    </SafeAreaView>
  );
};

export default PuzzleDetail;
