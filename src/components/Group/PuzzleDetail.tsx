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
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
} from 'react-native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import CommentInput from '../common/CommentInput';
import CommentItem from '../common/CommentItem';
import {
  Emphasis,
  Caption,
  Label,
  Body,
  Content,
} from '../../styles/GlobalText';
import {
  BLACK,
  LIGHTGRAY,
  LIGHTPURPLE,
  MIDPURPLE,
  PURPLE,
  WHITE,
} from '../../styles/GlobalColor';
import TimeIcon from '../../assets/common/Time.svg';
import MarkerIcon from '../../assets/common/Marker.svg';
import ArrowIcon from '../../assets/common/ArrowSmall.svg';
import { PuzzleStackParams } from '../../pages/Group/PuzzleStack';
import CustomHeader from '../common/CustomHeader';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { TabProps } from '../../../App';

interface PuzzleDetailProps {
  title: string;
  date: Date;
  location: string;
  members: string[];
  rep_pic: string;
  content: string;
}

const DetailSection = ({
  puzzle,
  navigation,
}: {
  puzzle: PuzzleDetailProps;
  navigation: any;
}) => {
  const navigationToFeed = useNavigation<StackNavigationProp<TabProps>>();
  const [showAll, setShowAll] = useState<boolean>(false);
  return (
    <>
      <CustomHeader
        label="퍼즐 앨범"
        onBack={() => {
          navigation.goBack();
        }}
      />
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <Emphasis style={{ fontSize: 32 }}>{puzzle.title}</Emphasis>
        <View
          style={{
            height: 9,
            backgroundColor: MIDPURPLE,
            width: 18 * (puzzle.title.length + 1),
            position: 'absolute',
            top: 45,
            left: 20,
            zIndex: -1,
          }}
        />
        <View style={{ flexDirection: 'row', marginVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TimeIcon />
            <Emphasis
              style={{ fontSize: 20, marginLeft: 5, fontWeight: '600' }}>
              {moment(puzzle.date).format('YYYY.MM.DD')}
            </Emphasis>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 10,
            }}>
            <MarkerIcon width={20} height={20} color={BLACK} />
            <Emphasis
              style={{ fontSize: 20, marginLeft: 5, fontWeight: '600' }}>
              {puzzle.location}
            </Emphasis>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          {puzzle.members.slice(0, 4).map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: '#6200DF26',
                  borderColor: PURPLE,
                  borderWidth: 1,
                  borderRadius: 16,
                  marginRight: 5,
                }}>
                <Body
                  style={{
                    color: PURPLE,
                    paddingHorizontal: 12,
                    paddingVertical: 2,
                  }}>
                  {item}
                </Body>
              </View>
            );
          })}
          {puzzle.members.length > 4 && (
            <TouchableOpacity
              onPress={() => setShowAll(!showAll)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 5,
              }}>
              <Content style={{ color: PURPLE }}>
                {showAll ? '접어보기' : '더보기'}
              </Content>
              <ArrowIcon
                transform={[{ rotate: showAll ? '270deg' : '90deg' }]}
              />
            </TouchableOpacity>
          )}
        </View>
        {showAll &&
          puzzle.members.slice(4).map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: '#6200DF26',
                  borderColor: PURPLE,
                  borderWidth: 1,
                  borderRadius: 16,
                  marginRight: 8,
                  alignSelf: 'flex-start',
                  marginBottom: 10,
                }}>
                <Body
                  style={{
                    color: PURPLE,
                    paddingHorizontal: 12,
                    paddingVertical: 2,
                  }}>
                  {item}
                </Body>
              </View>
            );
          })}
        <View style={{ height: 10 }} />
        <Image
          source={
            puzzle.rep_pic && puzzle.rep_pic.length > 0
              ? { uri: puzzle.rep_pic }
              : require('../../assets/tmp/Puzzlejeju.png')
          }
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
              navigationToFeed.navigate('Feed', { feedIdx: 1 });
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Content style={{ color: PURPLE, fontWeight: '600' }}>
              추억 퍼즐 조각 보러가기
            </Content>
            <ArrowIcon strokeWidth={1.5} color={PURPLE} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const commentData = [
  {
    writer: '김중현',
    date: '2024.03.22',
    content: '우리 사진을 이렇게 만들어주니까 이쁘네',
    profile:
      'https://ifh.cc/g/5ZL9HY.png',
  },
  {
    writer: '이혜인',
    date: '2023.04.01',
    content: '나도 같이 갔으면 좋았을텐데ㅜㅜ',
    profile:
      'https://static.wikia.nocookie.net/pokemon/images/3/3f/%EC%9D%B4%EB%B8%8C%EC%9D%B4_%EA%B3%B5%EC%8B%9D_%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png/revision/latest?cb=20170405085011&path-prefix=ko',
  },
  {
    writer: '곽서진',
    date: '2024.05.23',
    content: '나 오랜만에 이거 보러 다시 왔잖아',
    profile: 'https://dimg.donga.com/wps/NEWS/IMAGE/2023/06/22/119900215.1.jpg',
  },
];

const PuzzleDetail = ({
  navigation,
  route,
}: StackScreenProps<PuzzleStackParams, 'PuzzleDetail'>) => {
  const [puzzle, setPuzzle] = useState<PuzzleDetailProps>({
    title: '작년 여름 제주에서',
    date: new Date(2023, 7, 21),
    location: '제주시 한림읍',
    members: ['지소민', '김중현', '곽서진', '한서연'],
    rep_pic: '',
    content:
      '작년 여름에 우리 제주도 여행했던 거 기억나? 맛집도 잔뜩 가고 바다에서 수영도 하고! 저녁에 본 핑크 노을은 진짜 예술이었지~ 같이 했던 그 추억들 너무 소중해! 이번 여름에도 같이 여행 가자~',
  });
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    setPuzzle({ ...puzzle, rep_pic: route.params?.rep_pic });
  }, [route.params?.rep_pic]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={10}
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
          <ScrollView>
        {/* <Pressable
          style={{ width: '100%', height: '100%', position: 'absolute' }}
          onPress={() => Keyboard.dismiss()}
        /> */}
        <FlatList
          data={commentData}
          scrollEnabled={false}
          ListHeaderComponent={() => (
            <>
              <DetailSection puzzle={puzzle} navigation={navigation} />
              <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                <Label
                  style={{ color: PURPLE, marginBottom: 10, fontSize: 16 }}>
                  댓글
                </Label>
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PuzzleDetail;
