import { TouchableOpacity, Image, View, Pressable } from 'react-native';
import { LIGHTPURPLE, PURPLE } from '../../styles/GlobalColor';
import { Body, Caption, Content, Subtitle } from '../../styles/GlobalText';
import { useState } from 'react';
import BubbleIcon from '../../assets/common/Bubble.svg';
import ImageStack from '../common/ImageStack';

interface PuzzleTimeItemProps {
  date: string;
  rep_pic: string;
  title: string;
  content: string;
  members: string[];
}

export const PuzzleTimeItem = ({
  navigation,
  puzzle,
}: {
  puzzle: PuzzleTimeItemProps;
  navigation: any;
}) => {
  const { date, rep_pic, title, content, members } = puzzle;
  return (
    <View style={{ flexDirection: 'row' }}>
      <Content>{date}</Content>
      <TouchableOpacity style={{ flexDirection: 'row' }}>
        <Image source={{ uri: rep_pic }} width={110} height={100} />
        <View>
          <Subtitle>{title}</Subtitle>
          <Content>{content}</Content>
          <ImageStack data={members} />
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
