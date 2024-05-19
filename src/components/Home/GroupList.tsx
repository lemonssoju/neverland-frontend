import { Dispatch, SetStateAction, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  View,
} from 'react-native';
import CustomHeader from '../common/CustomHeader';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from '../../pages/HomeStack';
import styled from 'styled-components/native';
import { GRAY, LIGHTPURPLE, PURPLE, WHITE } from '../../styles/GlobalColor';
import { Body, Caption, Subtitle, Title } from '../../styles/GlobalText';
import UserIcon from '../../assets/common/User.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { HorizontalCarousel } from '../common/Carousel';
import GroupItem, { GroupProps } from './GroupItem';
import GroupCreate from './GroupCreate';
import LogoText from '../../assets/LogoText.svg';
import MagicIcon from '../../assets/common/Magic.svg';
import RocketIcon from '../../assets/common/Rocket.svg';
import BottomButton from '../common/BottomButton';
import { useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../../App';
import Input from '../common/Input';
import IconButton from '../common/IconButton';

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
        <IconButton onPress={() => navigation.navigate('Settings')}>
          <UserIcon />
        </IconButton>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}>
        <Subtitle style={{ color: WHITE, marginBottom: 10 }}>
          함께 맞춰가는{'\n'}우리의 추억 퍼즐
        </Subtitle>
        <Image
          source={require('../../assets/Puzzle.png')}
          style={{ width: 195, height: 180 }}
        />
      </View>
    </View>
  );
};

const GroupList = ({
  navigation,
}: StackScreenProps<HomeStackParams, 'GroupList'>) => {
  const navigationToTab = useNavigation<StackNavigationProp<RootStackParams>>();
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const { width, height } = Dimensions.get('window');
  const [inviteVisible, setInviteVisible] = useState<boolean>(false);
  const [group, setGroup] = useState<{ name: string; code: string }>({
    name: '',
    code: '',
  });
  const onJoin = () => {
    if (group.code.length * group.name.length === 0) {
      Alert.alert('빈칸을 채워주세요!');
    } else {
      setInviteVisible(false);
      setGroup({ name: '', code: '' });
      navigationToTab.navigate('GroupTab');
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <HeaderSection navigation={navigation} />
      <View style={{ marginTop: 10 }}>
        <Body style={{ marginLeft: 30, marginVertical: 10 }}>
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
          <CardButton
            onPress={() => {
              setInviteVisible(true);
            }}>
            <RocketIcon />
            <Body style={{ fontWeight: '600' }}>그룹 입장하기</Body>
          </CardButton>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Body style={{ marginLeft: 30, marginVertical: 10 }}>
          이제 추억 퍼즐을 맞추러 가볼까요?
        </Body>
        <HorizontalCarousel
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
      <Modal visible={inviteVisible} transparent>
        <Pressable
          style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
          onPress={() => setInviteVisible(false)}
        />
        <View
          style={{
            backgroundColor: WHITE,
            position: 'absolute',
            width: '80%',
            top: height * 0.35,
            alignSelf: 'center',
            borderRadius: 12,
            padding: 15,
            justifyContent: 'space-between',
          }}>
          <Title style={{ textAlign: 'center' }}>그룹 입장하기</Title>
          <Caption style={{ color: GRAY, textAlign: 'center' }}>
            공유받은 그룹 코드를 입력하세요.
          </Caption>
          <Input
            label="그룹 코드"
            isRequired
            value={group.code}
            onChangeText={code => setGroup({ ...group, code: code })}
            placeholder="그룹 코드를 입력하세요"
          />
          <BottomButton label="입장하기" onPress={onJoin} />
        </View>
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
