import { useState } from 'react';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import { Body, Emphasis, Subtitle } from '../../styles/GlobalText';
import { BLACK, WHITE } from '../../styles/GlobalColor';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FeedStackParams } from '../../pages/Group/FeedStack';
import { RootStackParams } from '../../../App';

export interface GroupProps {
  admin: string;
  groupIdx: number;
  groupImage: string;
  memberCount: number;
  name: string;
  recentUpdate: string;
  startYear: string;
}

const GroupItem = ({ group }: {group: GroupProps}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const {
    admin,
    groupIdx,
    groupImage,
    memberCount,
    name,
    recentUpdate,
    startYear,
  } = group;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('GroupTab', { groupIdx: groupIdx })}
      style={{
        width: 320,
        height: 250,
        alignSelf: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        backgroundColor: WHITE,
        borderRadius: 8,
      }}>
      <ImageBackground
        source={{ uri: groupImage }}
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
          <Body style={{ color: WHITE, textAlign: 'right', fontWeight: '600' }}>
            Since {startYear}
          </Body>
          <View style={{ height: '90%', justifyContent: 'flex-end' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Emphasis style={{ color: WHITE }}>{name}</Emphasis>
              <Body style={{ color: WHITE }}> | 멤버 {memberCount}명</Body>
            </View>
            <Subtitle style={{ color: WHITE, fontWeight: '500' }}>
              퍼즐 관리자 {admin}
            </Subtitle>
            <Body style={{ color: WHITE, marginBottom: 5, marginTop: 20 }}>
              {recentUpdate ? `최근 추억 퍼즐 완성 ${recentUpdate}일 전` : `완성된 퍼즐이 없습니다`}
            </Body>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default GroupItem;
