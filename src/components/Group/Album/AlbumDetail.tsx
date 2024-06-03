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
  Alert,
} from 'react-native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import CommentInput from '../../common/CommentInput';
import CommentItem, { CommentProps } from '../../common/CommentItem';
import {
  Emphasis,
  Caption,
  Label,
  Body,
  Content,
} from '../../../styles/GlobalText';
import {
  BLACK,
  LIGHTGRAY,
  LIGHTPURPLE,
  MIDPURPLE,
  PURPLE,
  WHITE,
} from '../../../styles/GlobalColor';
import TimeIcon from '../../../assets/common/Time.svg';
import MarkerIcon from '../../../assets/common/Marker.svg';
import ArrowIcon from '../../../assets/common/ArrowSmall.svg';
import { AlbumStackParams } from '../../../pages/Group/AlbumStack';
import CustomHeader from '../../common/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import { TabProps } from '../../../../App';
import Request from '../../../services/requests';
import { useRecoilState } from 'recoil';
import { groupState } from '../../../recoil/groupState';

interface AlbumDetailProps {
  title: string;
  puzzleDate: string;
  location: string;
  memberList: string[];
  albumImage: string;
  description: string;
  puzzleIdx: number;
  commentList: CommentProps[];
}

const DetailSection = ({
  album,
  navigation,
}: {
  album: AlbumDetailProps;
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
        <Emphasis style={{ fontSize: 32 }}>{album.title}</Emphasis>
        <View
          style={{
            height: 9,
            backgroundColor: MIDPURPLE,
            width: 18 * (album.title.length + 1),
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
              {album.puzzleDate}
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
              {album.location}
            </Emphasis>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          {album.memberList.slice(0, 4).map((item, index) => {
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
          {album.memberList.length > 4 && (
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
          album.memberList.slice(4).map((item, index) => {
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
            album.albumImage && album.albumImage.length > 0
              ? { uri: album.albumImage }
              : require('../../../assets/tmp/Puzzlejeju.png')
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
          <Body>{album.description}</Body>
          <View
            style={{
              height: 1,
              backgroundColor: LIGHTGRAY,
              marginVertical: 10,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigationToFeed.navigate('Puzzle', { puzzleIdx: album.puzzleIdx });
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
    profile: 'https://ifh.cc/g/5ZL9HY.png',
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

const AlbumDetail = ({
  navigation,
  route,
}: StackScreenProps<AlbumStackParams, 'AlbumDetail'>) => {
  const request = Request();
  const albumIdx = route.params.albumIdx;
  const [groupIdx, setGroupIdx] = useRecoilState(groupState);
  const [album, setAlbum] = useState<AlbumDetailProps>({
    puzzleIdx: 1,
    title: '작년 여름 제주에서',
    puzzleDate: '2023.08.21',
    location: '제주시 한림읍',
    memberList: ['지소민', '김중현', '곽서진', '한서연'],
    albumImage: '',
    description:
      '작년 여름에 우리 제주도 여행했던 거 기억나? 맛집도 잔뜩 가고 바다에서 수영도 하고! 저녁에 본 핑크 노을은 진짜 예술이었지~ 같이 했던 그 추억들 너무 소중해! 이번 여름에도 같이 여행 가자~',
    commentList: [
      {
        commentIdx: 1,
        writer: '곽서진',
        createdDate: '2024.05.24',
        content: '나 오랜만에 이거 보러 다시 왔잖아',
        profileImage:
          'https://dimg.donga.com/wps/NEWS/IMAGE/2023/06/22/119900215.1.jpg',
      },
    ],
  });
  const [comment, setComment] = useState<string>('');
  const [refreshing, setRefresing] = useState<boolean>(false);

  const getAlbumDetail = async () => {
    const response = await request.get(
      `/groups/${groupIdx}/albums/${albumIdx}`,
    );
    if (response.isSuccess) {
      setAlbum(response.result);
      setRefresing(false);
    }
  };

  useEffect(() => {
    // getAlbumDetail();
  }, [refreshing]);

  useEffect(() => {
    if (album.albumImage)
      setAlbum({ ...album, albumImage: route.params?.albumImage });
  }, [route.params?.albumImage]);

  const [commentIdx, setCommentIdx] = useState<number>(0);
  const [focusInput, setFocusInput] = useState<boolean>(false);

  const onComment = async () => {
    if (commentIdx > 0) {
      const response = await request.patch(`/comments/${commentIdx}`, {
        content: comment,
      });
      if (response.isSuccess) {
        Alert.alert('댓글이 수정되었습니다.');
        setCommentIdx(0);
        setComment('');
        setRefresing(true);
      }
    } else {
      const response = await request.post('/comments', {
        albumIdx: albumIdx,
        content: comment,
      });
      if (response.isSuccess) {
        Alert.alert('댓글이 등록되었습니다.');
        setRefresing(true);
      }
    }
  };

  const onCommentDelete = (commentIdx: number) => {
    const deleteRequest = async () => {
      const response = await request.patch(
        `/comments/${commentIdx}/delete`,
        {},
      );
      if (response.isSuccess) {
        Alert.alert('댓글이 삭제되었습니다.');
        setRefresing(true);
      }
    };
    Alert.alert(
      '알림',
      '댓글을 삭제하시겠습니까?',
      [
        {
          text: '삭제',
          onPress: deleteRequest,
        },
        {
          text: '취소',
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };

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
          <FlatList
            data={album.commentList}
            scrollEnabled={false}
            refreshing={refreshing}
            ListHeaderComponent={() => (
              <>
                <DetailSection album={album} navigation={navigation} />
                <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                  <Label
                    style={{ color: PURPLE, marginBottom: 10, fontSize: 16 }}>
                    댓글
                  </Label>
                  <CommentInput
                    comment={comment}
                    setComment={setComment}
                    onPress={onComment}
                    onFocus={() => setFocusInput(true)}
                  />
                </View>
              </>
            )}
            renderItem={({ item }: { item: CommentProps }) => {
              return (
                <CommentItem
                  comment={item}
                  onEdit={() => {
                    setComment(item.content);
                    setCommentIdx(item.commentIdx);
                    setFocusInput(true);
                  }}
                  onDelete={() => onCommentDelete(item.commentIdx)}
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

export default AlbumDetail;
