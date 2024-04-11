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
import { StackScreenProps } from '@react-navigation/stack';
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

interface PuzzleDetailProps {
  date: Date;
  location: string;
  members: string[];
  rep_pic: string;
  content: string;
}

const DetailSection = ({ puzzle }: { puzzle: PuzzleDetailProps }) => {
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
            onPress={() => {}}
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

const PuzzleDetail = ({
  navigation,
}: StackScreenProps<PuzzleStackParams, 'PuzzleDetail'>) => {
  const [puzzle, setPuzzle] = useState<PuzzleDetailProps>({
    date: new Date(2023, 11, 23),
    location: '제주 한림읍',
    members: ['김댕댕', '김토깽', '김냐옹'],
    rep_pic:
      'https://img.allurekorea.com/allure/2022/07/style_62d0cac69cbce-563x700.jpeg',
    content:
      '완전 기억남! 토끼가 분명 울고 있었어! 토끼는 무슨 일이 있었던걸까? 주인은 왜 토끼를 버린걸까? 나 너무 궁금해서 미쳐버리는 줄 알았잖아. 내가 제주도에 살았다면 토끼를 데려갔을 거야. 깡총깡총.',
  });
  const [comment, setComment] = useState<string>('');

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
