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
import { Emphasis } from '../../../styles/GlobalText';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { PuzzleStackParams } from '../../../pages/Group/PuzzleStack';
import IconButton from '../../common/IconButton';
import ArrowIcon from '../../../assets/common/Arrow.svg';
import { WHITE } from '../../../styles/GlobalColor';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import BottomButton from '../../common/BottomButton';
import { TabProps } from '../../../../App';
import Request from '../../../services/requests';
import Video from 'react-native-video';
import { useRecoilState } from 'recoil';
import { groupState } from '../../../recoil/groupState';
import ImageResizer from 'react-native-image-resizer';
import { generateImageToImage } from '../../../stable-diffusion/ImageToImage';
import { generateTextToImage } from '../../../stable-diffusion/TextToImage';

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
  const navigationToAlbum = useNavigation<StackNavigationProp<TabProps>>();
  const [realComplete, setRealComplete] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);
  const [albumIdx, setAlbumIdx] = useState<number>(0);
  const [generatedImage, setGeneratedImage] = useState<string>('');

  const sendText = async () => {
    const response = await request.post(
      `/groups/${groupIdx}/puzzles/${puzzleIdx}`,
      {
        puzzleTextList: content,
      },
    );
    console.log('gpt', response);
    if (response.isSuccess) {
      const regex = /([a-zA-Z ,!'?.]+)/g;
      const englishSentences = response.result.description
        .match(regex)
        .join(' ')
        .trim();
      setAlbumIdx(response.result.albumIdx);
      createImage(
        response.result.prompt.length > 0
          ? response.result.prompt
          : englishSentences,
        response.result.albumIdx,
      );
    }
  };

  const createImage = async (text: string, albumIdx: number) => {
    try {
      const images = imageUri
        ? await generateImageToImage({ imageUri, text, style })
        : await generateTextToImage({ text, style });
      setGeneratedImage(images.base64);
      if (images) {
        const formData = new FormData();
        formData.append('image', {
          uri: images.base64,
          name: 'albumImage',
          type: 'image/png',
        });
        const response = await request.post(
          `/groups/${groupIdx}/albums/${albumIdx}/image`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/formdata' },
            transformRequest: () => {
              return formData;
            },
          },
        );

        console.log('res', response, albumIdx);
        // if (!complete) setRealComplete(true);
        setRealComplete(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     if (!complete) {
  //       setComplete(true);
  //     }
  //   }, 15000);

  //   return () => clearTimeout(timeout);
  // }, [complete]);

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
            source={{ uri: generatedImage }}
            style={{
              width: 320,
              height: 360,
              borderRadius: 8,
              marginVertical: 30,
            }}
          />
        ) : complete ? (
          <Image
            source={require('../../../assets/tmp/Puzzlejeju.png')}
            style={{
              width: 320,
              height: 360,
              borderRadius: 8,
              marginVertical: 30,
            }}
          />
        ) : (
          <Video
            source={require('../../../assets/PuzzleAnimation.mp4')}
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
              navigationToAlbum.navigate('Album', {
                albumIdx: albumIdx,
                albumImage: generatedImage,
              });
            }}
          />
        )}
      </View>
    </View>
  );
};

export default PuzzleCreate;
