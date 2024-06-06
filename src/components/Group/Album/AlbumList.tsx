import { StackScreenProps } from '@react-navigation/stack';
import { FlatList, SafeAreaView, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AlbumStackParams } from '../../../pages/Group/AlbumStack';
import styled from 'styled-components/native';
import { LIGHTPURPLE, PURPLE, WHITE } from '../../../styles/GlobalColor';
import { useCallback, useEffect, useState } from 'react';
import { Body, Emphasis } from '../../../styles/GlobalText';
import Map from '../../Map/Map';
import { AlbumLocationProps, AlbumTimeProps, AlbumTimeItem } from './AlbumItem';
import { LatLng } from 'react-native-maps';
import { useRecoilState } from 'recoil';
import { groupState } from '../../../recoil/groupState';
import Request from '../../../services/requests';
import { useFocusEffect } from '@react-navigation/native';

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
      albumIdx: 0,
      albumImage: '',
      x: '',
      y: '',
    },
  ]);

  const getAlbumList = async () => {
    const response = await request.get(`/groups/${groupIdx}/albums`, {
      sortType: option,
    });
    if (response.isSuccess) {
      option === 'time'
        ? setAlbumTime(
            response.result.albumList.filter(
              (album: { albumImage: string }) => album.albumImage.length > 0,
            ),
          )
        : setAlbumLocation(
            response.result.albumList.filter(
              (album: { albumImage: string }) => album.albumImage.length > 0,
            ),
          );
    }
  };

  useFocusEffect(
    useCallback(() => {
      getAlbumList();
    }, [option]),
  );

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
            var year = item.puzzleDate.split('-')[0];
            if (
              !isFirstItem &&
              year !== albumTime[index - 1].puzzleDate.split('-')[0]
            ) {
              isYearChanged = true;
            }
            const isLastItemOfYear =
              !isYearChanged &&
              (index === albumTime.length - 1 ||
                year !== albumTime[index + 1].puzzleDate.split('-')[0]);
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
