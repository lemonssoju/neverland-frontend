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
import MagicIcon from '../../assets/common/Magic.svg';
import RocketIcon from '../../assets/common/Rocket.svg';

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

const HeaderSection = ({ navigation }: { navigation: any }) => {
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
      <View style={{ height: 150 }} />
    </View>
  );
};

const GroupList = ({
  navigation,
}: StackScreenProps<HomeStackParams, 'GroupList'>) => {
  const [formVisible, setFormVisible] = useState<boolean>(false);
  // 초대코드 입력 및 그룹명 입력 모달
  const [inviteVisible, setInviteVisible] = useState<boolean>(false);
  return (
    <View style={{ flex: 1 }}>
      <HeaderSection navigation={navigation} />
      <View>
        <Body style={{ marginLeft: 35, marginVertical: 10 }}>
          추억을 함께할 그룹에 참여해보세요!
        </Body>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 40,
          }}>
          <CardButton onPress={() => setFormVisible(true)}>
            <MagicIcon />
            <Body style={{ fontWeight: '600' }}>그룹 만들러 가기</Body>
          </CardButton>
          <CardButton onPress={() => {}}>
            <RocketIcon />
            <Body style={{ fontWeight: '600' }}>그룹 입장하기</Body>
          </CardButton>
        </View>
      </View>
      <View style={{ marginTop: 30 }}>
        <Body style={{ marginLeft: 35, marginVertical: 10 }}>
          이제 추억 퍼즐을 맞추러 가볼까요?
        </Body>
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

const CardButton = styled.TouchableOpacity`
  width: 150px;
  height: 125px;
  border-radius: 8px;
  background: ${LIGHTPURPLE};
  shadow-color: black;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  align-items: center;
  justify-content: center;
`;

export default GroupList;
