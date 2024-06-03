import { StackScreenProps } from '@react-navigation/stack';
import { FlatList, SafeAreaView, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AlbumStackParams } from '../../../pages/Group/AlbumStack';
import styled from 'styled-components/native';
import { LIGHTPURPLE, PURPLE, WHITE } from '../../../styles/GlobalColor';
import { useEffect, useState } from 'react';
import { Body, Emphasis } from '../../../styles/GlobalText';
import Map from '../../Map/Map';
import {
  AlbumLocationProps,
  AlbumTimeProps,
  AlbumTimeItem,
} from './AlbumItem';
import { LatLng } from 'react-native-maps';
import { useRecoilState } from 'recoil';
import { groupState } from '../../../recoil/groupState';
import Request from '../../../services/requests';

// const data: PuzzleTimeItemProps[] = [
//   {
//     date: '2023.12.18',
//     rep_pic: 'https://ifh.cc/g/GmnoTr.png',
//     title: '올해도 즐거운 솔크',
//     content: '크리스마스는 친구들과 보내는 게 진리지',
//     members: [
//       'https://ifh.cc/g/06Q0DB.png', // 3
//       'https://ifh.cc/g/2xCPH5.png', // 1
//       'https://ifh.cc/g/1CLCRY.png', // 4
//       'https://ifh.cc/g/5ZL9HY.png', // 2
//       'https://ifh.cc/g/06Q0DB.png', // 3
//       'https://ifh.cc/g/2xCPH5.png', // 1
//     ],
//   },
//   {
//     date: '2023.08.21',
//     rep_pic: 'https://ifh.cc/g/9zkq09.jpg',
//     title: '작년 제주에서',
//     content: '작년 여름에 우리 제주도 여행했던 거 기억',
//     members: [
//       'https://ifh.cc/g/1CLCRY.png', // 4
//       'https://ifh.cc/g/06Q0DB.png', // 3
//       'https://ifh.cc/g/5ZL9HY.png', // 2
//       'https://ifh.cc/g/2xCPH5.png', // 1
//     ],
//   },
//   {
//     date: '2023.05.19',
//     rep_pic: 'https://ifh.cc/g/jBnKwl.png',
//     title: '깡총깡총 토끼',
//     content: '길가에 누워있는 토끼가 너무 귀여워서',
//     members: [
//       'https://ifh.cc/g/06Q0DB.png', // 3
//       'https://ifh.cc/g/1CLCRY.png', // 4
//       'https://ifh.cc/g/5ZL9HY.png', // 2
//       'https://ifh.cc/g/2xCPH5.png', // 1
//     ],
//   },
//   {
//     date: '2022.09.27',
//     rep_pic: 'https://ifh.cc/g/PokONo.png',
//     title: '노을 러버들의 모임',
//     content: '우리 노을 보려고 떠난 여행이 벌써 몇 번째',
//     members: [
//       'https://static.wikia.nocookie.net/pokemon/images/3/3f/%EC%9D%B4%EB%B8%8C%EC%9D%B4_%EA%B3%B5%EC%8B%9D_%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png/revision/latest?cb=20170405085011&path-prefix=ko', // 4
//       'https://ifh.cc/g/06Q0DB.png', // 3
//       'https://www.econovill.com/news/photo/201603/285365_95988_038.png', // 2
//       'https://ifh.cc/g/2xCPH5.png', // 1
//       'https://www.econovill.com/news/photo/201603/285365_95988_038.png',
//     ],
//   },
//   {
//     date: '2022.04.01',
//     rep_pic: 'https://ifh.cc/g/hasNGY.png',
//     title: '벚꽃엔딩',
//     content: '오랜만에 벚꽃을 보러 멀리 떠났다 그치',
//     members: [
//       'https://www.econovill.com/news/photo/201603/285365_95988_038.png', // 4
//       'https://static.wikia.nocookie.net/pokemon/images/3/3f/%EC%9D%B4%EB%B8%8C%EC%9D%B4_%EA%B3%B5%EC%8B%9D_%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png/revision/latest?cb=20170405085011&path-prefix=ko', // 3
//       'https://ifh.cc/g/5ZL9HY.png', // 2
//       'https://ifh.cc/g/2xCPH5.png', // 1
//     ],
//   },
// ];

const places: { image: string; coor: LatLng }[] = [
  {
    image: 'https://ifh.cc/g/GmnoTr.png', // 서울 근방
    coor: {
      latitude: 37.6,
      longitude: 127.36,
    },
  },
  {
    image: 'https://ifh.cc/g/9zkq09.jpg', // 제주도
    coor: {
      latitude: 33.4,
      longitude: 126.57,
    },
  },
  {
    image: 'https://ifh.cc/g/jBnKwl.png', // 충청도
    coor: {
      latitude: 36.4,
      longitude: 126.9,
    },
  },
  {
    image: 'https://ifh.cc/g/PokONo.png', // 동해
    coor: {
      latitude: 37,
      longitude: 129,
    },
  },
  {
    image: 'https://ifh.cc/g/hasNGY.png', // 남해
    coor: {
      latitude: 35.5,
      longitude: 128.3,
    },
  },
];

const AlbumList = ({
  navigation,
  route,
}: StackScreenProps<AlbumStackParams, 'AlbumList'>) => {
  const [option, setOption] = useState<string>('time');
  const [groupIdx, setGroupIdx] = useRecoilState(groupState);
  const request = Request();

  const [albumTime, setAlbumTime] = useState<AlbumTimeProps[]>([
    {
      albumIdx: 0,
      title: '',
      content: '',
      albumImage: '',
      puzzleDate: '',
      puzzlerCount: 0,
      puzzlerImageList: [],
    },
  ]);
  const [albumLocation, setAlbumLocation] = useState<AlbumLocationProps[]>([
    {
      albumIdx: 1,
      albumImage: 'https://ifh.cc/g/9zkq09.jpg',
      x: '33.4',
      y: '126.57',
    },
  ]);

  const getAlbumList = async () => {
    const response = await request.get(`/groups/${groupIdx}/albums`, {
      sortType: option,
    });
    console.log(response);
    if (response.isSuccess) {
      option === 'time'
        ? setAlbumTime(response.result.albumList)
        : setAlbumLocation(response.result.albumList);
    }
  };

  useEffect(() => {
    getAlbumList();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OptionContainer>
        <OptionButton
          style={{
            backgroundColor: option === 'time' ? PURPLE : 'transparent',
          }}
          onPress={() => setOption('time')}>
          <Body
            style={{
              fontWeight: '700',
              marginVertical: 6,
              color: option === 'time' ? WHITE : PURPLE,
            }}>
            시간
          </Body>
        </OptionButton>
        <OptionButton
          style={{
            backgroundColor: option === 'location' ? PURPLE : 'transparent',
          }}
          onPress={() => setOption('location')}>
          <Body
            style={{
              fontWeight: '700',
              marginVertical: 6,
              color: option === 'location' ? WHITE : PURPLE,
            }}>
            공간
          </Body>
        </OptionButton>
      </OptionContainer>
      {option === 'time' ? (
        <FlatList
          style={{ flex: 1 }}
          data={albumTime}
          renderItem={({
            item,
            index,
          }: {
            item: AlbumTimeProps;
            index: number;
          }) => {
            const isFirstItem = index === 0;
            var isYearChanged = false;
            var year = item.puzzleDate.split('.')[0];
            if (
              !isFirstItem &&
              year !== albumTime[index - 1].puzzleDate.split('.')[0]
            ) {
              isYearChanged = true;
            }
            const isLastItemOfYear =
              !isYearChanged &&
              (index === albumTime.length - 1 ||
                year !== albumTime[index + 1].puzzleDate.split('.')[0]);
            return (
              <>
                {(isFirstItem || isYearChanged) && (
                  <Emphasis style={{ marginLeft: 10 }}>{year}</Emphasis>
                )}
                <AlbumTimeItem
                  navigation={navigation}
                  album={item}
                  isLast={isLastItemOfYear}
                />
              </>
            );
          }}
        />
      ) : (
        <Map navigation={navigation} places={albumLocation} />
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

export default AlbumList;
