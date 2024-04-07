import { useState } from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  Body,
  Emphasis,
  Subtitle,
} from '../../styles/GlobalText';
import { BLACK, WHITE } from '../../styles/GlobalColor';
import styled from 'styled-components/native';

export interface GroupProps {
  name: string;
  members: number;
  leader: string;
  since: string;
  recent: number;
  rep_pic: string;
}

interface GroupItemProps extends GroupProps {
  onPress: () => void;
}

const GroupItem = ({
  name,
  members,
  leader,
  since,
  recent,
  rep_pic,
  onPress,
}: GroupItemProps) => {
  return (
    <TouchableOpacity
      style={{
        width: 320,
        height: 400,
        alignSelf: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        backgroundColor: WHITE,
        borderRadius: 8
      }}>
      <ImageBackground
        source={{ uri: rep_pic }}
        style={{ width: '100%', height: '100%' }}
        imageStyle={{ borderRadius: 8 }}>
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'black',
            width: '100%',
            height: '100%',
            opacity: 0.2,
            borderRadius: 8,
          }}
        />
        <View style={{ padding: 15 }}>
          <Body style={{ color: WHITE, textAlign: 'right' }}>
            Since {since}
          </Body>
          <View style={{ height: '95%', justifyContent: 'flex-end' }}>
            <View style={{ flexDirection: 'row' }}>
              <Emphasis style={{ color: WHITE }}>{name}</Emphasis>
              <Body style={{ color: WHITE }}> | 멤버 {members}명</Body>
            </View>
            <Subtitle style={{ color: WHITE, fontWeight: '500' }}>
              퍼즐 관리자 {leader}
            </Subtitle>
            <Body style={{ color: WHITE, marginBottom: 5, marginTop: 30 }}>
              최근 추억 퍼즐 완성 {recent}일 전
            </Body>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default GroupItem;
