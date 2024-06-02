import {
  useState,
  useEffect,
  useCallback,
  SetStateAction,
  Dispatch,
} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Dimensions,
  Modal,
  Alert,
  Pressable,
  Image,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { FeedProps } from './FeedUpload';
import EditButton from '../common/EditButton';
import { Title, Label, Subtitle, Body, Caption } from '../../styles/GlobalText';
import {
  BLACK,
  GRAY,
  LIGHTGRAY,
  LIGHTPURPLE,
  PURPLE,
  WHITE,
} from '../../styles/GlobalColor';
import moment from 'moment';
import PuzzleIcon from '../../assets/common/Puzzle.svg';

import DotsIcon from '../../assets/common/Dots.svg';
import IconButton from '../common/IconButton';
import ArrowIcon from '../../assets/common/Arrow.svg';
import MarkerIcon from '../../assets/common/Marker.svg';
import { FeedStackParams } from '../../pages/Group/FeedStack';
import SubfeedItem from './SubfeedItem';
import SubfeedUpload, { SubfeedProps } from './SubfeedUpload';
import BottomButton from '../common/BottomButton';
import DropDownPicker, {
  ItemType,
  ValueType,
} from 'react-native-dropdown-picker';
import PuzzleCreate from './PuzzleCreate';
import ImageStack from '../common/ImageStack';
import { FeedItemProps } from './FeedItem';
import Request from '../../services/requests';
import { useRecoilState } from 'recoil';
import { groupState } from '../../recoil/groupState';

interface FeedDetailProps extends FeedItemProps {
  content: string;
  puzzleDate: string;
  memberImageList: string[];
  memberCount: number;
  writeCount: number;
  isWriter: boolean;
  hasWrite: boolean;
  puzzlePieces: any[];
}
const { width, height } = Dimensions.get('window');
const DetailSection = ({
  feed,
  navigation,
  setSubfeedModal,
}: {
  feed: FeedDetailProps;
  navigation: any;
  setSubfeedModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [dotPressed, setDotPressed] = useState<boolean>(false);

  let isPuzzleComplete = feed.memberCount === feed.writeCount;
  let puzzleButtonEnabled = feed.isWriter
    ? isPuzzleComplete
      ? true
      : false
    : feed.hasWrite
    ? false
    : true;

  const onDelete = () => {
    Alert.alert(
      '알림',
      '추억을 삭제하시겠습니까?',
      [
        {
          text: '예',
          onPress: () => {
            navigation.navigate('FeedList');
          },
          style: 'destructive',
        },
        {
          text: '아니오',
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };

  const [imageStyleModal, setImageStyleModal] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [items, setItems] = useState<ItemType<ValueType>[]>([
    { label: '아날로그 필름', value: 'analog-film' },
    { label: '시네마틱', value: 'cinematic' },
    { label: '판타지', value: 'fantasy-art' },
    { label: '실사 느낌', value: 'photographic' },
    { label: '라인아트', value: 'line-art' },
  ]);

  const [createModal, setCreateModal] = useState<boolean>(false);
  const onCreate = () => {
    setImageStyleModal(false);
    // setValue('');
    setCreateModal(true);
  };

  return (
    <>
      <ImageBackground
        source={{ uri: feed.puzzleImage }}
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
          {feed.isWriter && (
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
              onEdit={() => {
                navigation.navigate('FeedUpload');
              }}
              onDelete={onDelete}
              style={{ top: 40, right: 15 }}
            />
          )}
        </View>
        <View
          style={{
            marginTop: 140,
            marginLeft: 10,
          }}>
          <Title style={{ color: WHITE }}>{feed.puzzleDate}</Title>
          <Title style={{ color: WHITE }}>{feed.location}</Title>
        </View>
      </ImageBackground>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: LIGHTPURPLE,
        }}>
        <Label style={{ marginBottom: 5 }}>
          {feed.createdDate} | {feed.writer}
        </Label>
        <ImageStack data={feed.memberImageList} />
        <Subtitle style={{ marginBottom: 5 }}>{feed.title}</Subtitle>
        <Body style={{ marginBottom: 15 }}>{feed.content}</Body>
        <TouchableOpacity
          onPress={() => {
            feed.isWriter ? setImageStyleModal(true) : setSubfeedModal(true);
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
          <Body style={{ color: WHITE, fontWeight: '600' }}>
            {feed.isWriter ? '추억 퍼즐 완성하기' : '추억 퍼즐 맞추기'}
            {` (${feed.writeCount}/${feed.memberCount})`}
          </Body>
        </TouchableOpacity>
      </View>
      <Modal visible={imageStyleModal} transparent>
        <Pressable
          style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
          onPress={() => {
            setImageStyleModal(false);
          }}
        />
        <View
          style={{
            backgroundColor: WHITE,
            position: 'absolute',
            width: '80%',
            top: height * 0.35,
            alignSelf: 'center',
            borderRadius: 12,
            padding: 15,
            justifyContent: 'space-between',
          }}>
          <Title style={{ textAlign: 'center' }}>이미지 스타일 선택하기</Title>
          <Caption style={{ color: GRAY, textAlign: 'center' }}>
            원하는 이미지 스타일이 있다면 선택해주세요.
          </Caption>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="이미지 스타일을 선택하세요"
            placeholderStyle={{
              fontFamily: 'Pretendard Variable',
            }}
            style={{
              marginTop: 10,
              marginBottom: 15,
              backgroundColor: LIGHTPURPLE,
              borderColor: 'transparent',
            }}
            labelStyle={{
              fontFamily: 'Pretendard Variable',
            }}
            listItemLabelStyle={{
              fontFamily: 'Pretendard Variable',
            }}
            selectedItemLabelStyle={{
              fontFamily: 'Pretendard Variable',
            }}
            dropDownContainerStyle={{
              backgroundColor: LIGHTPURPLE,
              borderColor: 'transparent',
            }}
          />
          <BottomButton label="생성하기" onPress={onCreate} />
        </View>
      </Modal>
      <Modal visible={createModal} animationType="fade">
        <PuzzleCreate
          date={feed.puzzleDate}
          location={feed.location}
          imageUri={feed.puzzleImage!}
          content={feed.puzzlePieces}
          style={value}
          setCreateModal={setCreateModal}
        />
      </Modal>
    </>
  );
};

const subfeedData: SubfeedProps[] = [
  {
    nickname: '김중현',
    puzzlePieceText:
      '완전 행복했었는데! 우리 저녁에 한림 해수욕장 근처 산책하다가 노을도 봤었잖아. 노을이 핑크색이라서 너무 예뻤어.',
    profileImage: 'https://ifh.cc/g/5ZL9HY.png',
  },{
    nickname: '김중현',
    puzzlePieceText:
      '완전 행복했었는데! 우리 저녁에 한림 해수욕장 근처 산책하다가 노을도 봤었잖아. 노을이 핑크색이라서 너무 예뻤어.',
    profileImage: 'https://ifh.cc/g/5ZL9HY.png',
  },{
    nickname: '김중현',
    puzzlePieceText:
      '완전 행복했었는데! 우리 저녁에 한림 해수욕장 근처 산책하다가 노을도 봤었잖아. 노을이 핑크색이라서 너무 예뻤어.',
    profileImage: 'https://ifh.cc/g/5ZL9HY.png',
  },
  // {
  //   writer: '한서연',
  //   content:
  //     '맞아 기억난다! 벌써 이게 반년 전이네. 맛집도 완전 많이 가고 바다에 들어가서 수영도 했었지~ 그때 우리 청춘이었다..',
  //   profile: 'https://ifh.cc/g/1CLCRY.png',
  // },
  // {
  //   writer: '곽서진',
  //   content:
  //     '핑크 노을이 환상적이었어 또 가고싶다 올해 여름에도 다같이 여행 가자!!! 휴가 날짜 맞춰보자 ㅎㅎ',
  //   profile: 'https://ifh.cc/g/06Q0DB.png',
  // },
];

const FeedDetail = ({
  navigation,
  route,
}: StackScreenProps<FeedStackParams, 'FeedDetail'>) => {
  const feedIdx = route.params.feedIdx;
  const [feed, setFeed] = useState<FeedDetailProps>({
    title: '작년 여름 제주에서',
    content: '여름 제주도 낭만 있고 너무 좋았어\n한 여름 밤의 꿈이다...',
    puzzleDate: '2023.07.21',
    createdDate: '2024.03.21',
    writer: '지소민',
    location: '제주 한림읍',
    puzzleImage:
      'https://img.allurekorea.com/allure/2022/07/style_62d0cac69cbce-563x700.jpeg',
    memberImageList: [
      'https://ifh.cc/g/1CLCRY.png', // 4
      'https://ifh.cc/g/06Q0DB.png', // 3
      'https://ifh.cc/g/5ZL9HY.png', // 2
      'https://ifh.cc/g/2xCPH5.png', // 1
    ],
    isWriter: true,
    hasWrite: false,
    memberCount: 4,
    writeCount: 2,
    puzzleIdx: 1,
    puzzlePieces: [],
  });
  const [groupIdx, setGroupIdx] = useRecoilState(groupState);
  const request = Request();
  const getFeedDetail = async () => {
    const response = await request.get(
      `/groups/${groupIdx}/puzzles/${feedIdx}`,
    );
    console.log(response);
    // setFeed(response.result);
  };

  useEffect(() => {
    getFeedDetail();
  }, [feedIdx]);
  const [subfeedModal, setSubfeedModal] = useState<boolean>(false);
  const onDelete = () => {
    Alert.alert(
      '알림',
      '추억 퍼즐을 삭제하시겠습니까?',
      [
        {
          text: '예',
          onPress: () => {
            navigation.replace('FeedDetail', { feedIdx: 1 });
          },
          style: 'destructive',
        },
        {
          text: '아니오',
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };
  const contentArray: string[] = feed.puzzlePieces.map(item => item.content);
  return (
    <>
      <FlatList
        data={subfeedData}
        ListHeaderComponent={
          <DetailSection
            feed={feed}
            navigation={navigation}
            setSubfeedModal={setSubfeedModal}
          />
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }: { item: any; index: number }) => {
          const randomColors = ['#F5FFF8', '#EEF8FF', '#FFFEEE', '#FFF8F5'];
          return (
            <SubfeedItem
              background={randomColors[index % 4]}
              isLast={subfeedData.length - 1 === index}
              user={'곽서진'}
              subfeed={item}
              onEdit={() => {
                setSubfeedModal(true);
              }}
              onDelete={onDelete}
            />
          );
        }}
        ListFooterComponent={<View style={{ height: 10 }} />}
      />
      <Modal visible={subfeedModal} animationType="slide">
        <SubfeedUpload
          puzzleIdx={feed.puzzleIdx}
          setSubfeedModal={setSubfeedModal}
        />
      </Modal>
    </>
  );
};

export default FeedDetail;
