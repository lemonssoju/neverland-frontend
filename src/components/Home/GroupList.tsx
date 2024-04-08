import { Dispatch, SetStateAction, useState } from 'react';
import { FlatList, Modal, SafeAreaView, View } from 'react-native';
import CustomHeader from '../common/CustomHeader';
import PlusButton from '../common/PlusButton';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from '../../pages/HomeStack';
import styled from 'styled-components/native';
import { GRAY, LIGHTPURPLE, PURPLE } from '../../styles/GlobalColor';
import { Body, Title } from '../../styles/GlobalText';
import PuzzleButton from '../common/PuzzleButton';
import UserIcon from '../../assets/common/User.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Carousel from '../common/Carousel';
import GroupItem, { GroupProps } from './GroupItem';
import GroupCreate from './GroupCreate';
import LogoText from '../../assets/LogoText.svg';

const groupData: GroupProps[] = [
  {
    name: '악당 꼬부기',
    members: 9,
    leader: '김꼬북',
    since: '2008',
    recent: 3,
    rep_pic:
      'https://mblogthumb-phinf.pstatic.net/MjAxNzAyMjFfMjcy/MDAxNDg3NjY0Njg3NzYx.6r5I3IC2ylmlmI-HaE08964MDcj-N_fUyYv7X5z1iXUg.tyZXU56CLkgR0TFC1ObNCyvSaEDutcfg5G2kVxxaLW8g.PNG.ioea65ztem/08.20170221_153307.png?type=w800',
  },
  {
    name: '악당 꼬부기',
    members: 9,
    leader: '김꼬북',
    since: '2008',
    recent: 3,
    rep_pic:
      'https://mblogthumb-phinf.pstatic.net/MjAxNzAyMjFfMjcy/MDAxNDg3NjY0Njg3NzYx.6r5I3IC2ylmlmI-HaE08964MDcj-N_fUyYv7X5z1iXUg.tyZXU56CLkgR0TFC1ObNCyvSaEDutcfg5G2kVxxaLW8g.PNG.ioea65ztem/08.20170221_153307.png?type=w800',
  },
  {
    name: '악당 꼬부기',
    members: 9,
    leader: '김꼬북',
    since: '2008',
    recent: 3,
    rep_pic:
      'https://mblogthumb-phinf.pstatic.net/MjAxNzAyMjFfMjcy/MDAxNDg3NjY0Njg3NzYx.6r5I3IC2ylmlmI-HaE08964MDcj-N_fUyYv7X5z1iXUg.tyZXU56CLkgR0TFC1ObNCyvSaEDutcfg5G2kVxxaLW8g.PNG.ioea65ztem/08.20170221_153307.png?type=w800',
  },
];

const HeaderSection = ({
  setFormVisible,
  navigation,
}: {
  setFormVisible: Dispatch<SetStateAction<boolean>>;
  navigation: any;
}) => {
  return (
    <View
      style={{
        backgroundColor: PURPLE,
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <LogoText />
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
      <View style={{ height: 120 }} />
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
      <View>
        <Body style={{ marginLeft: 35, marginVertical: 10 }}>그룹 목록</Body>
        <Carousel
          data={groupData}
          renderItem={({ item }: any) => {
            const {
              name,
              members,
              leader,
              since,
              recent,
              rep_pic,
            }: GroupProps = item;
            return (
              <GroupItem
                name={name}
                members={members}
                leader={leader}
                since={since}
                recent={recent}
                rep_pic={rep_pic}
              />
            );
          }}
        />
      </View>
      <Modal visible={formVisible} animationType="slide">
        <GroupCreate setFormVisible={setFormVisible} />
      </Modal>
    </View>
  );
};

export default GroupList;
