import { Dispatch, SetStateAction, useState } from 'react';
import { FlatList, Modal, SafeAreaView, View } from 'react-native';
import CustomHeader from '../common/CustomHeader';
import GroupItem from '../Group/GroupItem';
import PlusButton from '../common/PlusButton';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from '../../pages/HomeStack';
import styled from 'styled-components/native';
import { GRAY, LIGHTPURPLE, PURPLE } from '../../styles/GlobalColor';
import { Body, Title } from '../../styles/GlobalText';
import PuzzleButton from '../common/PuzzleButton';
import UserIcon from '../../assets/common/User.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

const groupData = [
  {
    name: '망미동 여걸사총사',
    introduction: '춤출 땐 Bad girl, 사랑은 Good girl',
    rep_pic: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
  },
  {
    name: '망미동 여걸사총사',
    introduction: '춤출 땐 Bad girl, 사랑은 Good girl',
    rep_pic: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
  },
  {
    name: '망미동 여걸사총사',
    introduction: '춤출 땐 Bad girl, 사랑은 Good girl',
    rep_pic: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
  },
];

const HeaderSection = ({
  setFormVisible,
  navigation
}: {
  setFormVisible: Dispatch<SetStateAction<boolean>>;
  navigation: any;
}) => {
  return (
    <View
      style={{
        backgroundColor: LIGHTPURPLE,
        paddingTop: 70,
        paddingHorizontal: 20,
        paddingBottom: 10
      }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Title style={{ fontWeight: '600' }}>함께 추억을 기록하다,</Title>
          <Title style={{ fontWeight: '600', color: PURPLE }}>Neverland</Title>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={{
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <UserIcon />
        </TouchableOpacity>
      </View>
      <Body style={{ color: GRAY, marginTop: 5 }}>추억을 어쩌구저쩌구</Body>
      <View style={{height: 120}} />
      <PuzzleButton
        label="그룹 만들러가기"
        onPress={() => setFormVisible(true)}
      />
    </View>
  );
};

const GroupList = ({
  navigation,
}: StackScreenProps<HomeStackParams, 'GroupList'>) => {
  const [formVisible, setFormVisible] = useState<boolean>(false);
  return (
    <View style={{ flex: 1 }}>
      <HeaderSection setFormVisible={setFormVisible} navigation={navigation} />
      {/* <FlatList
        data={groupData}
        style={{ paddingHorizontal: 20, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: any) => {
          const { name, introduction, rep_pic } = item;
          return (
            <GroupItem
              name={name}
              introduction={introduction}
              rep_pic={rep_pic}
              onPress={() => {
                // navigation.navigate('FeedList');
              }}
            />
          );
        }}
      /> */}
      <PlusButton
        onPress={() => {
          setFormVisible(true);
        }}
      />
      <Modal visible={formVisible} animationType="slide">
        {/* <CreateGroup setFormVisible={setFormVisible} /> */}
      </Modal>
    </View>
  );
};

export default GroupList;
