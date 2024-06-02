import {
  ActivityIndicator,
  View,
  Image,
  Dimensions,
  Alert,
  Animated,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Emphasis } from '../../styles/GlobalText';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { FeedStackParams } from '../../pages/Group/FeedStack';
import IconButton from '../common/IconButton';
import ArrowIcon from '../../assets/common/Arrow.svg';
import { WHITE } from '../../styles/GlobalColor';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import BottomButton from '../common/BottomButton';
import { TabProps } from '../../../App';
import generateImages from '../../services/ImageToImage';
import Request from '../../services/requests';
import Video from 'react-native-video';
import { useRecoilState } from 'recoil';
import { groupState } from '../../recoil/groupState';

interface PuzzleCreateProps {
  date: string;
  location: string;
  imageUri: string;
  content: string[];
  puzzleIdx: number;
  style?: string;
  setCreateModal: Dispatch<SetStateAction<boolean>>;
}

interface AlbumProps {
  description: string;
  albumIdx: number;
  albumImage: string;
}
const PuzzleCreate = ({
  date,
  location,
  imageUri,
  content,
  puzzleIdx,
  style,
  setCreateModal,
}: PuzzleCreateProps) => {
  const { width, height } = Dimensions.get('screen');
  const [groupIdx, setGroupIdx] = useRecoilState(groupState);
  const request = Request();
  const navigationToPuzzle = useNavigation<StackNavigationProp<TabProps>>();
  const [realComplete, setRealComplete] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);
  const [album, setAlbum] = useState<AlbumProps>({
    description: '',
    albumIdx: 0,
    albumImage: '',
  });

  const sendText = async () => {
    const response = await request.post(
      `/groups/${groupIdx}/puzzles/${puzzleIdx}`,
      {
        puzzleTextList: content,
      },
    );
    if (response.isSuccess) {
      setAlbum({
        ...album,
        description: response.result.description,
        albumIdx: response.result.albumIdx,
      });
      createImage(response.result.prompt);
    }
  };
  // const image = 'https://img.allurekorea.com/allure/2022/07/style_62d0cac69cbce-563x700.jpeg'
  // const text = 'I remember the trip to Jeju Island with the three of us last summer. We visited many delicious restaurants and even went swimming in the sea. Especially, waking up early in the morning to watch the sunrise was truly blissful. The memories we shared are so precious.';
  const createImage = async (text: string) => {
    try {
      const images = await generateImages({ imageUri, text, style });
      console.log(images.base64);
      const response = await request.post(
        `/groups/${groupIdx}/albums/${album.albumIdx}/image`,
        {
          albumImage: images.base64,
        },
      );
      setAlbum({...album, albumImage: images.base64})
      if (!complete) setRealComplete(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!complete) {
        setComplete(true);
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [complete]);
  useEffect(() => {
    sendText();
  }, []);

  return (
    <View style={{ backgroundColor: '#100125', flex: 1 }}>
      <IconButton
        style={{ marginTop: 60 }}
        onPress={() => {
          setCreateModal(false);
        }}>
        <ArrowIcon color={WHITE} />
      </IconButton>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
          flex: 1,
        }}>
        <View style={{ height: 80 }}>
          {(complete || realComplete) && (
            <>
              <Emphasis
                style={{ fontSize: 36, color: WHITE, textAlign: 'center' }}>
                {date}
              </Emphasis>
              <Emphasis
                style={{ fontSize: 30, color: WHITE, textAlign: 'center' }}>
                {location}
              </Emphasis>
            </>
          )}
        </View>
        {realComplete ? (
          <Image
            source={{ uri: album.albumImage }}
            style={{
              width: 320,
              height: 360,
              borderRadius: 8,
              marginVertical: 30,
            }}
          />
        ) : complete ? (
          <Image
            source={require('../../assets/tmp/Puzzlejeju.png')}
            style={{
              width: 320,
              height: 360,
              borderRadius: 8,
              marginVertical: 30,
            }}
          />
        ) : (
          <Video
            source={require('../../assets/PuzzleAnimation.mp4')}
            style={{
              width: 280,
              height: 360,
            }}
            resizeMode="contain"
            repeat
          />
        )}
        <Emphasis
          style={{ color: WHITE, textAlign: 'center', marginBottom: 90 }}>
          AI 화가가 추억 퍼즐을{'\n'}
          {complete || realComplete ? '완성했어요!' : '완성하는 중이에요!'}
        </Emphasis>
        {(complete || realComplete) && (
          <BottomButton
            label="구경하러 가기"
            onPress={() => {
              setCreateModal(false);
              navigationToPuzzle.navigate('Puzzle', {
                id: album.albumIdx,
                rep_pic: album.albumImage
              });
            }}
          />
        )}
      </View>
    </View>
  );
};

export default PuzzleCreate;
