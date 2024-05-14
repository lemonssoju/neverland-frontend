import { StackScreenProps } from '@react-navigation/stack';
import { FlatList, SafeAreaView, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PuzzleStackParams } from '../../pages/Group/PuzzleStack';
import styled from 'styled-components/native';
import { LIGHTPURPLE, PURPLE, WHITE } from '../../styles/GlobalColor';
import { useState } from 'react';
import { Body, Emphasis } from '../../styles/GlobalText';
import Map from '../Map/Map';
import { PuzzleTimeItem, PuzzleTimeItemProps } from './PuzzleItem';
import { HorizontalCarousel, VerticalCarousel } from '../common/Carousel';

const data: PuzzleTimeItemProps[] = [
  {
    date: '2023.12.18',
    rep_pic:
      'https://pbs.twimg.com/profile_images/1656346926063960064/YZpCofx8_400x400.jpg',
    title: '제주도 소품샵 투어',
    content: '제주도 좋아조하ㅗㅈ아홪홪오핮오하ㅗ앟',
    members: [
      'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
      'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
      'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
      'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
    ],
  },
  {
    date: '2023.12.18',
    rep_pic:
      'https://pbs.twimg.com/profile_images/1656346926063960064/YZpCofx8_400x400.jpg',
    title: '제주도 소품샵 투어',
    content: '제주도 좋아조하ㅗㅈ아홪홪오핮오하ㅗ앟',
    members: [
      'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
      'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
      'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
      'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
    ],
  },
  {
    date: '2022.12.31',
    rep_pic:
      'https://pbs.twimg.com/profile_images/1656346926063960064/YZpCofx8_400x400.jpg',
    title: '제주도 소품샵 투어',
    content: '제주도 좋아조하ㅗㅈ아홪홪오핮오하ㅗ앟',
    members: [
      'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
      'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
      'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
      'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
    ],
  },
  {
    date: '2022.12.18',
    rep_pic:
      'https://pbs.twimg.com/profile_images/1656346926063960064/YZpCofx8_400x400.jpg',
    title: '제주도 소품샵 투어',
    content: '제주도 좋아조하ㅗㅈ아홪홪오핮오하ㅗ앟',
    members: [
      'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
      'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
      'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
      'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
    ],
  },
];

const PuzzleList = ({
  navigation,
  route,
}: StackScreenProps<PuzzleStackParams, 'PuzzleList'>) => {
  const [option, setOption] = useState<string>('시간');
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OptionContainer>
        <OptionButton
          style={{
            backgroundColor: option === '시간' ? PURPLE : 'transparent',
          }}
          onPress={() => setOption('시간')}>
          <Body
            style={{
              fontWeight: '700',
              marginVertical: 6,
              color: option === '시간' ? WHITE : PURPLE,
            }}>
            시간
          </Body>
        </OptionButton>
        <OptionButton
          style={{
            backgroundColor: option === '공간' ? PURPLE : 'transparent',
          }}
          onPress={() => setOption('공간')}>
          <Body
            style={{
              fontWeight: '700',
              marginVertical: 6,
              color: option === '공간' ? WHITE : PURPLE,
            }}>
            공간
          </Body>
        </OptionButton>
      </OptionContainer>
      {option === '시간' ? (
        <FlatList
        style={{flex:1}}
          data={data}
          renderItem={({
            item,
            index,
          }: {
            item: PuzzleTimeItemProps;
            index: number;
          }) => {
            const isFirstItem = index === 0;
            var isYearChanged = false;
            var year = item.date.split('.')[0];
            if (!isFirstItem && year !== data[index - 1].date.split('.')[0]) {
              isYearChanged = true;
            }
            const isLastItemOfYear = !isYearChanged && (index === data.length - 1 || year !== data[index + 1].date.split('.')[0]);
            return (
              <>
                {(isFirstItem || isYearChanged) && <Emphasis style={{marginLeft: 10}}>{year}</Emphasis>}
                <PuzzleTimeItem navigation={navigation} puzzle={item} isLast={isLastItemOfYear} />
              </>
            );
          }}
        />
      ) : (
        <Map navigation={navigation} />
      )}
    </SafeAreaView>
  );
};

const OptionContainer = styled.View`
  width: 60%;
  justify-content: center;
  align-items: center;
  align-self: center;
  flex-direction: row;
  margin: 10px 0px;
  background: ${LIGHTPURPLE};
  border-radius: 8px;
  border: 1px solid ${PURPLE};
  padding-vertical: 2px;
`;

const OptionButton = styled.TouchableOpacity`
  width: 49%;
  align-items: center;
  border-radius: 6px;
`;

export default PuzzleList;
