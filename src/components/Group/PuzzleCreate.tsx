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

interface PuzzleCreateProps {
  date: string;
  location: string;
  imageUri: string;
  content: string[];
  style?: string;
  setCreateModal: Dispatch<SetStateAction<boolean>>;
}
interface GeneratedImages {
  base64: string;
}
const PuzzleCreate = ({
  date,
  location,
  imageUri,
  content,
  style,
  setCreateModal,
}: PuzzleCreateProps) => {
  const { width, height } = Dimensions.get('screen');
  const request = Request();
  const navigationToPuzzle = useNavigation<StackNavigationProp<TabProps>>();
  const [realComplete, setRealComplete] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setComplete(true);
  //   }, 5000);
  // });
  // const [text, setText] = useState<string>('');
  const [generatedImages, setGeneratedImages] = useState<GeneratedImages>({
    base64: '',
  });

  const sendText = async () => {
    const response = await request.post('', {
      text: content,
    });
    if (response.isSuccess) {
      createImage();
    }
  };
  // const image = 'https://img.allurekorea.com/allure/2022/07/style_62d0cac69cbce-563x700.jpeg'
  const text =
    'I remember the trip to Jeju Island with the three of us last summer. We visited many delicious restaurants and even went swimming in the sea. Especially, waking up early in the morning to watch the sunrise was truly blissful. The memories we shared are so precious.';
  const createImage = async () => {
    try {
      const images = await generateImages({ imageUri, text, style });
      console.log(images.base64);
      setGeneratedImages({ base64: images.base64 });
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
    }, 10000); // 8 seconds

    return () => clearTimeout(timeout);
  }, [complete]);
  useEffect(() => {
    createImage();
  }, []);

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!complete) {
      Animated.loop(
        Animated.timing(animation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ).start();
    }
  }, [complete, animation]);

  const animatedStyles: StyleProp<ViewStyle> = {
    transform: [
      {
        rotateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };
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
            source={{ uri: generatedImages.base64 }}
            style={{
              width: 320,
              height: 360,
              borderRadius: 8,
              marginVertical: 30,
            }}
          />
        ) : complete ? (
          <Image
            source={require('../../assets/tmp/puzzle1.png')}
            style={{
              width: 320,
              height: 360,
              borderRadius: 8,
              marginVertical: 30,
            }}
          />
        ) : (
          <Animated.View style={[{ height: 360 }, animatedStyles]}>
            <Image
              source={require('../../assets/Puzzle2.png')}
              style={{ width: 250, height: 280 }}
            />
          </Animated.View>
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
                id: 1,
                rep_pic: generatedImages.base64,
              });
            }}
          />
        )}
      </View>
    </View>
  );
};

export default PuzzleCreate;
