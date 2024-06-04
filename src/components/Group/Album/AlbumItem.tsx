import {
  TouchableOpacity,
  Image,
  View,
  Pressable,
  Dimensions,
} from 'react-native';
import { LIGHTPURPLE, PURPLE, WHITE } from '../../../styles/GlobalColor';
import { Body, Caption, Content, Subtitle } from '../../../styles/GlobalText';
import { useState } from 'react';
import BubbleIcon from '../../../assets/common/Bubble.svg';
import ImageStack from '../../common/ImageStack';

export interface AlbumTimeProps {
  albumIdx: number;
  title: string;
  content: string;
  albumImage: string;
  puzzleDate: string;
  puzzlerCount: number;
  puzzlerImageList: string[];
}

const { width } = Dimensions.get('window');

export const AlbumTimeItem = ({
  navigation,
  album,
  isLast,
}: {
  album: AlbumTimeProps;
  navigation: any;
  isLast: boolean;
}) => {
  const {
    albumIdx,
    title,
    content,
    albumImage,
    puzzleDate,
    puzzlerCount,
    puzzlerImageList,
  } = album;
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 10,
      }}>
      <Content style={{ lineHeight: 14 }}>
        {puzzleDate.split('-')[1] + '/' + puzzleDate.split('-')[2]}
      </Content>
      {!isLast && (
        <View
          style={{
            position: 'absolute',
            top: 10,
            left: 53,
            backgroundColor: PURPLE,
            width: 1.6,
            height: '120%',
          }}
        />
      )}
      <View
        style={{
          position: 'absolute',
          top: 10,
          left: 48,
          backgroundColor: PURPLE,
          width: 12,
          height: 12,
          borderRadius: 180,
        }}
      />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('AlbumDetail', { albumIdx: albumIdx })
        }
        style={{ flexDirection: 'row', marginLeft: 20 }}>
        <Image
          source={{ uri: albumImage }}
          width={100}
          height={100}
          style={{ borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
        />
        <View
          style={{
            backgroundColor: LIGHTPURPLE,
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}>
          <Subtitle>{title}</Subtitle>
          <Content numberOfLines={1} style={{ width: width * 0.5 }}>
            {content}
          </Content>
          <View
            style={{ marginTop: 35, marginLeft: 90, alignItems: 'flex-start' }}>
            <ImageStack data={puzzlerImageList} count={puzzlerCount} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export interface AlbumLocationProps {
  albumIdx: number;
  albumImage: string;
  x: string;
  y: string;
}

export const AlbumPlaceItem = ({
  navigation,
  albumIdx,
  image,
}: {
  navigation: any;
  albumIdx: number;
  image: string;
}) => {
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('AlbumDetail', { albumIdx: albumIdx })
      }
      style={{ width: 100, height: 120 }}>
      <BubbleIcon style={{ position: 'absolute' }} />
      <View
        style={{
          width: 100,
          height: 120,
          alignItems: 'center',
          padding: 5,
        }}>
        <Image
          style={{ width: 90, height: 90, borderRadius: 8 }}
          source={{
            uri: image,
          }}
        />
      </View>
    </Pressable>
  );
};
