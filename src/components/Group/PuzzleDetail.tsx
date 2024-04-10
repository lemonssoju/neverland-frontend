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
import YoutubePlayer from 'react-native-youtube-iframe';
import BackButton from '../common/BackButton';
import HeartButton from '../common/HeartButton';
import EditButton from '../common/EditButton';
import CommentInput from '../common/CommentInput';
import CommentItem from '../common/CommentItem';
import { B12, B16, B14, B20 } from '../../styles/GlobalText';
import { BLACK, MINT, WHITE } from '../../styles/GlobalColor';

import DotsIcon from '../../assets/common/Dots.svg';
import MusicIcon from '../../assets/common/Music.svg';
import { PuzzleStackParams } from '../../pages/Group/PuzzleStack';

interface PuzzleDetailProps {
  date: Date,
  location: string;
  members: string[];
  puzzle_pic: string;
  content: string;
}

const DetailSection = ({
  puzzle,
  navigation,
  user,
}: {
  puzzle: PuzzleDetailProps;
  navigation: any;
  user: string;
}) => {
  const [dotPressed, setDotPressed] = useState<boolean>(false);

  return (
    <>
      
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
    date: new Date(2023,11,23),
    location: '제주 한림읍',
    members: ['김댕댕', '김토깽', '김냐옹'],
    puzzle_pic: 'https://img.allurekorea.com/allure/2022/07/style_62d0cac69cbce-563x700.jpeg',
    content: '완전 기억남! 토끼가 분명 울고 있었어! 토끼는 무슨 일이 있었던걸까? 주인은 왜 토끼를 버린걸까? 나 너무 궁금해서 미쳐버리는 줄 알았잖아. 내가 제주도에 살았다면 토끼를 데려갔을 거야. 깡총깡총.',
  });
  const [comment, setComment] = useState<string>('');

  return (
    <View>
      <FlatList
        data={commentData}
        ListHeaderComponent={() => (
          <>
            <DetailSection
              puzzle={puzzle}
              navigation={navigation}
              user={'황은정'}
            />
            <View
              style={{
                height: 1,
                backgroundColor: BLACK,
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

export default PuzzleDetail;