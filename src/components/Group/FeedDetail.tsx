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

interface FeedDetailProps extends FeedProps {
  createdAt: string;
  writer: string;
  like: boolean;
}
const { width, height } = Dimensions.get('window');
const DetailSection = ({
  feed,
  navigation,
  user,
  setSubfeedModal,
  subfeedText,
}: {
  feed: FeedDetailProps;
  navigation: any;
  user: string;
  setSubfeedModal: Dispatch<SetStateAction<boolean>>;
  subfeedText: string[];
}) => {
  const [like, setLike] = useState<boolean>(feed.like);
  const [dotPressed, setDotPressed] = useState<boolean>(false);
  const isWriter = feed.writer !== user;

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
          <Title style={{ color: WHITE }}>
            {moment(feed.date).format('YYYY.MM.DD')}
          </Title>
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
          {feed.createdAt} | {feed.writer}
        </Label>
        <ImageStack data={feed.members} />
        <Subtitle style={{ marginBottom: 5 }}>{feed.title}</Subtitle>
        <Body style={{ marginBottom: 15 }}>{feed.content}</Body>
        <TouchableOpacity
          onPress={() => {
            isWriter ? setImageStyleModal(true) : setSubfeedModal(true);
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
            {isWriter ? '추억 퍼즐 완성하기' : '추억 퍼즐 맞추기'}
            {` (${subfeed.length}/${feed.members.length})`}
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
          date={moment(feed.date).format('YYYY.MM.DD')}
          location={feed.location}
          imageUri={feed.rep_pic!}
          content={subfeedText}
          style={value}
          setCreateModal={setCreateModal}
        />
      </Modal>
    </>
  );
};

const subfeedData: SubfeedProps[] = [
  {
    writer: '박댕댕',
    content: '완전 행복했었는데! 우리 새벽에 일어나서 노을도 봤었잖아.',
    profile: 'https://dimg.donga.com/wps/NEWS/IMAGE/2023/06/22/119900215.1.jpg',
  },
  {
    writer: '최냥냥',
    content:
      '맞아 기억나! 맛집도 완전 많이 가고 바다에 들어가서 수영도 했었잖아.',
    profile:
      'https://img2.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202208/09/hani/20220809132012529emoo.jpg',
  },
];

const FeedDetail = ({
  navigation,
}: StackScreenProps<FeedStackParams, 'FeedDetail'>) => {
  const [feed, setFeed] = useState<FeedDetailProps>({
    title: '제주도 여행 갔던 거 기억 ㄴrㄴㅣ',
    content:
      '우리 작년 여름에 제주도 갔던거 기억나? 우리 같이 간 첫 여행이었잖아. 바다도 많이 가고 정말 좋았어.',
    date: new Date(2023, 6, 23),
    createdAt: '2024.03.21',
    writer: '김토끼',
    location: '제주 한림읍',
    rep_pic:
      'https://img.allurekorea.com/allure/2022/07/style_62d0cac69cbce-563x700.jpeg',
    music: '미쓰에이 - Bad girl Good girl',
    musicUrl: 'https://youtu.be/8TeeJvcBdLA?si=yffEamC12OAFs7HQ',
    members: [
      'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
      'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
      'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
      'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
    ],
    like: true,
  });
  const [subfeedModal, setSubfeedModal] = useState<boolean>(false);
  const onDelete = () => {
    Alert.alert(
      '알림',
      '추억 퍼즐을 삭제하시겠습니까?',
      [
        {
          text: '예',
          onPress: () => {
            navigation.replace('FeedDetail', { id: 1 });
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
  const contentArray: string[] = subfeedData.map(item => item.content);

  return (
    <>
      <FlatList
        data={subfeedData}
        ListHeaderComponent={
          <DetailSection
            feed={feed}
            navigation={navigation}
            user={'김토끼'}
            setSubfeedModal={setSubfeedModal}
            subfeedText={contentArray}
          />
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }: { item: any; index: number }) => {
          const { writer, content, profile } = item;
          const randomColors = ['#EEF8FF', '#FFF8F5', '#FFFEEE', '#F5FFF8'];
          return (
            <SubfeedItem
              background={randomColors[index % 4]}
              isLast={subfeedData.length - 1 === index}
              user={'이왈왈'}
              writer={writer}
              content={content}
              profile={profile}
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
          setSubfeedModal={setSubfeedModal}
          writer={'김토끼'}
          profile="https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABUEy7m5EHhjNhJ1p1itC34MCXg11eTU7Uvc9eRkDJE9nJsGwZk2mej7FpG_nmWeAFkpcb9f7Gk39ZXsJApq214kipyZe9sXVeIWc.jpg?r=169"
        />
      </Modal>
    </>
  );
};

export default FeedDetail;
