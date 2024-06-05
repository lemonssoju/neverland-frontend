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
import EditButton from '../../common/EditButton';
import {
  Title,
  Label,
  Subtitle,
  Body,
  Caption,
} from '../../../styles/GlobalText';
import {
  BLACK,
  GRAY,
  LIGHTGRAY,
  LIGHTPURPLE,
  PURPLE,
  WHITE,
} from '../../../styles/GlobalColor';
import moment from 'moment';
import PuzzleIcon from '../../../assets/common/Puzzle.svg';

import DotsIcon from '../../../assets/common/Dots.svg';
import IconButton from '../../common/IconButton';
import ArrowIcon from '../../../assets/common/Arrow.svg';
import { PuzzleStackParams } from '../../../pages/Group/PuzzleStack';
import PuzzlePieceItem from './PuzzlePieceItem';
import PuzzlePieceUpload, { PuzzlePieceProps } from './PuzzlePieceUpload';
import BottomButton from '../../common/BottomButton';
import DropDownPicker, {
  ItemType,
  ValueType,
} from 'react-native-dropdown-picker';
import PuzzleCreate from '../Album/AlbumCreate';
import ImageStack from '../../common/ImageStack';
import { PuzzleItemProps } from './PuzzleItem';
import Request from '../../../services/requests';
import { useRecoilState } from 'recoil';
import { groupState } from '../../../recoil/groupState';
import { userState } from '../../../recoil/userState';
import { UserProps } from '../../Home/Settings/SettingsHome';
import { useFocusEffect } from '@react-navigation/native';
import ImageResizer from 'react-native-image-resizer';

interface PuzzleDetailProps extends PuzzleItemProps {
  content: string;
  puzzleDate: string;
  memberNicknameList: string[];
  memberImageList: string[];
  memberCount: number;
  writeCount: number;
  isWriter: boolean;
  hasWrite: boolean;
  hasAlbum: boolean;
  puzzlePieces: PuzzlePieceProps[];
}
const { width, height } = Dimensions.get('window');
const DetailSection = ({
  puzzle,
  navigation,
  setPuzzlePieceModal,
}: {
  puzzle: PuzzleDetailProps;
  navigation: any;
  setPuzzlePieceModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [dotPressed, setDotPressed] = useState<boolean>(false);
  const [user, setUser] = useRecoilState<UserProps>(userState);

  let isPuzzleComplete = puzzle.memberCount + 1 === puzzle.writeCount;
  let puzzleButtonEnabled = !puzzle.hasAlbum
    ? puzzle.isWriter
      ? isPuzzleComplete
        ? true
        : false
      : puzzle.memberNicknameList.includes(user.nickname)
      ? puzzle.hasWrite
        ? false
        : true
      : false
    : false;
  const request = Request();
  const onDelete = () => {
    const deleteRequest = async () => {
      const response = await request.patch(
        `/puzzles/${puzzle.puzzleIdx}/delete`,
        {},
      );
      if (response.isSuccess) navigation.replace('PuzzleList');
    };
    Alert.alert(
      '알림',
      '추억을 삭제하시겠습니까?',
      [
        {
          text: '예',
          onPress: deleteRequest,
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
  const [puzzleTextList, setPuzzleTextList] = useState<string[]>([]);
  const resizeImage = async (imageUri: string) => {
    try {
      const resizedImageUri = await ImageResizer.createResizedImage(
        imageUri,
        600,
        600,
        'PNG',
        100,
      );

      return resizedImageUri.uri;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const [imageUri, setImageUri] = useState<string>('');
  const handleResizeImage = async () => {
    const resizedUri = await resizeImage(puzzle.puzzleImage);
    if (resizedUri) {
      console.log('image resized successfully');
      setImageUri(resizedUri);
    } else {
      console.error('Failed to resize image');
    }
  };

  const onCreate = () => {
    const contentArray: string[] = puzzle.puzzlePieces.map(
      item => item.puzzlePieceText,
    );
    puzzle.puzzleImage && handleResizeImage();
    setImageStyleModal(false);
    setPuzzleTextList([...contentArray, puzzle.content]);
    setCreateModal(true);
  };

  return (
    <>
      <ImageBackground
        source={{ uri: puzzle.puzzleImage || 'https://ifh.cc/g/6oVnyL.png' }}
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
          {/* {puzzle.isWriter && (
            <IconButton onPress={() => setDotPressed(!dotPressed)}>
              <DotsIcon
                transform={[{ rotate: dotPressed ? '90deg' : '0deg' }]}
                color={WHITE}
              />
            </IconButton>
          )} */}
          {dotPressed && (
            <EditButton
              editLabel="수정"
              deleteLabel="삭제"
              onEdit={() => {
                navigation.navigate('PuzzleUpload', {
                  puzzleIdx: puzzle.puzzleIdx,
                });
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
          <Title style={{ color: WHITE }}>{puzzle.puzzleDate}</Title>
          <Title style={{ color: WHITE }}>{puzzle.location}</Title>
        </View>
      </ImageBackground>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: LIGHTPURPLE,
        }}>
        <Label style={{ marginBottom: 5 }}>
          {puzzle.createdDate} | {puzzle.writer}
        </Label>
        <ImageStack data={puzzle.memberImageList} count={puzzle.memberCount} />
        <Subtitle style={{ marginBottom: 5 }}>{puzzle.title}</Subtitle>
        <Body style={{ marginBottom: 15 }}>{puzzle.content}</Body>
        <TouchableOpacity
          onPress={() => {
            puzzle.isWriter
              ? setImageStyleModal(true)
              : setPuzzlePieceModal(true);
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
            {puzzle.isWriter ? '추억 퍼즐 완성하기' : '추억 퍼즐 맞추기'}
            {` (${puzzle.writeCount}/${puzzle.memberCount + 1})`}
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
          date={puzzle.puzzleDate}
          location={puzzle.location}
          imageUri={imageUri}
          content={puzzleTextList}
          puzzleIdx={puzzle.puzzleIdx}
          style={value}
          setCreateModal={setCreateModal}
        />
      </Modal>
    </>
  );
};

const PuzzleDetail = ({
  navigation,
  route,
}: StackScreenProps<PuzzleStackParams, 'PuzzleDetail'>) => {
  const puzzleIdx = route.params.puzzleIdx;
  const [puzzle, setPuzzle] = useState<PuzzleDetailProps>({
    title: '',
    content: '',
    puzzleDate: '',
    createdDate: '',
    writer: '',
    location: '',
    puzzleImage: '',
    memberImageList: [],
    isWriter: false,
    hasWrite: false,
    hasAlbum: false,
    memberCount: 0,
    writeCount: 0,
    puzzleIdx: 0,
    puzzlePieces: [],
    memberNicknameList: [],
  });
  const [groupIdx, setGroupIdx] = useRecoilState(groupState);
  const request = Request();
  const getPuzzleDetail = async () => {
    const response = await request.get(
      `/groups/${groupIdx}/puzzles/${puzzleIdx}`,
    );
    if (response.isSuccess)
      setPuzzle({ ...response.result, puzzleIdx: puzzleIdx });
  };
  const [puzzlePieceModal, setPuzzlePieceModal] = useState<boolean>(false);
  useFocusEffect(
    useCallback(() => {
      getPuzzleDetail();
    }, [puzzleIdx, puzzlePieceModal]),
  );

  const onDelete = () => {
    Alert.alert(
      '알림',
      '추억 퍼즐을 삭제하시겠습니까?',
      [
        {
          text: '예',
          onPress: () => {
            navigation.replace('PuzzleDetail', { puzzleIdx: 1 });
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
  return (
    <>
      <FlatList
        data={puzzle.puzzlePieces}
        ListHeaderComponent={
          <DetailSection
            puzzle={puzzle}
            navigation={navigation}
            setPuzzlePieceModal={setPuzzlePieceModal}
          />
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }: { item: any; index: number }) => {
          const randomColors = ['#F5FFF8', '#EEF8FF', '#FFFEEE', '#FFF8F5'];
          return (
            <PuzzlePieceItem
              background={randomColors[index % 4]}
              isLast={puzzle.puzzlePieces.length - 1 === index}
              puzzlePiece={item}
              onEdit={() => {
                setPuzzlePieceModal(true);
              }}
              onDelete={onDelete}
            />
          );
        }}
        ListFooterComponent={<View style={{ height: 10 }} />}
      />
      <Modal visible={puzzlePieceModal} animationType="slide">
        <PuzzlePieceUpload
          puzzleIdx={puzzleIdx}
          setPuzzlePieceModal={setPuzzlePieceModal}
        />
      </Modal>
    </>
  );
};

export default PuzzleDetail;
