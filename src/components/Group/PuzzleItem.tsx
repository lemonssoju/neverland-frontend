import {
  TouchableOpacity,
  Image,
  View,
  Pressable,
  Dimensions,
} from 'react-native';
import { LIGHTPURPLE, PURPLE, WHITE } from '../../styles/GlobalColor';
import { Body, Caption, Content, Subtitle } from '../../styles/GlobalText';
import { useState } from 'react';
import BubbleIcon from '../../assets/common/Bubble.svg';
import ImageStack from '../common/ImageStack';

export interface PuzzleTimeItemProps {
  date: string;
  rep_pic: string;
  title: string;
  content: string;
  members: string[];
}

const { width } = Dimensions.get('window');

export const PuzzleTimeItem = ({
  navigation,
  puzzle,
  isLast,
}: {
  puzzle: PuzzleTimeItemProps;
  navigation: any;
  isLast: boolean;
}) => {
  const { date, rep_pic, title, content, members } = puzzle;
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 10,
      }}>
      <Content style={{ lineHeight: 14 }}>
        {date.split('.')[1] + '/' + date.split('.')[2]}
      </Content>
      {!isLast && (
        <View
          style={{
            position: 'absolute',
            top: 10,
            left: 50,
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
          left: 45,
          backgroundColor: PURPLE,
          width: 12,
          height: 12,
          borderRadius: 180,
        }}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('PuzzleDetail', { id: 1 })}
        style={{ flexDirection: 'row', marginLeft: 20 }}>
        <Image
          source={{ uri: rep_pic }}
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
            <ImageStack data={members} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const PuzzlePlaceItem = ({ navigation }: any) => {
  return (
    <Pressable
      onPress={() => navigation.navigate('PuzzleDetail', { id: 1 })}
      style={{ width: 150, height: 190 }}>
      <BubbleIcon style={{ position: 'absolute' }} />
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          padding: 5,
        }}>
        <Image
          style={{ width: '100%', height: '78%', borderRadius: 8 }}
          source={{
            uri: 'https://img.allurekorea.com/allure/2023/01/style_63d8c8ce24a31-966x1200.jpeg',
          }}
        />
      </View>
    </Pressable>
  );
};
