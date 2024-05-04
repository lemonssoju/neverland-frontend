import { TouchableOpacity, Image, View } from 'react-native';
import { LIGHTPURPLE, PURPLE } from '../../styles/GlobalColor';
import { Body, Caption, Content, Subtitle } from '../../styles/GlobalText';
import { useState } from 'react';
import BubbleIcon from '../../assets/common/Bubble.svg';

export const PuzzleTimeItem = () => {
  return <TouchableOpacity></TouchableOpacity>;
};

export const PuzzlePlaceItem = () => {
  return (
    <TouchableOpacity style={{width: 150, height: 150}}>
      <BubbleIcon width={150} height={150} style={{ position: 'absolute' }} />
      <View style={{padding: 10}}>
      <Image
        style={{ width: 100, height: 100 }}
        source={{
          uri: 'https://img.allurekorea.com/allure/2023/01/style_63d8c8ce24a31-966x1200.jpeg',
        }}
      />
      </View>
    </TouchableOpacity>
  );
};
