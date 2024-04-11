import { ActivityIndicator, View, Image, Dimensions } from 'react-native';
import { Emphasis } from '../../styles/GlobalText';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { FeedStackParams } from '../../pages/Group/FeedStack';
import IconButton from '../common/IconButton';
import ArrowIcon from '../../assets/common/Arrow.svg';
import { WHITE } from '../../styles/GlobalColor';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import moment from 'moment';
import BottomButton from '../common/BottomButton';
import { TabProps } from '../../../App';

interface PuzzleCreateProps {
  date: string;
  location: string;
  setCreateModal: Dispatch<SetStateAction<boolean>>;
}
const PuzzleCreate = ({
  date,
  location,
  setCreateModal,
}: PuzzleCreateProps) => {
  const { width, height } = Dimensions.get('screen');
  const navigationToPuzzle = useNavigation<StackNavigationProp<TabProps>>();
  const [complete, setComplete] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setComplete(true);
    }, 5000);
  });

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
          {complete && (
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
        {complete ? (
          <Image
            source={{
              uri: 'https://img.allurekorea.com/allure/2022/07/style_62d0cac69cbce-563x700.jpeg',
            }}
            style={{
              width: 320,
              height: 360,
              borderRadius: 8,
              marginVertical: 30,
            }}
          />
        ) : (
          <ActivityIndicator style={{ height: 360 }} />
        )}
        <Emphasis
          style={{ color: WHITE, textAlign: 'center', marginBottom: 90 }}>
          AI 화가가 추억 퍼즐을{'\n'}
          {complete ? '완성했어요!' : '완성하는 중이에요!'}
        </Emphasis>
        {complete && (
          <BottomButton
            label="구경하러 가기"
            onPress={() => {
              setCreateModal(false);
              navigationToPuzzle.navigate('Puzzle', { id: 1 });
            }}
          />
        )}
      </View>
    </View>
  );
};

export default PuzzleCreate;
