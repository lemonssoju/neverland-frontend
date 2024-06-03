import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../../App';
import Input from '../common/Input';
import IconButton from '../common/IconButton';
import Request from '../../services/requests';
import { UserProps } from './Settings/SettingsHome';
import { userState } from '../../recoil/userState';
import { useRecoilState } from 'recoil';

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
        <LogoText width={200} />
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
  const request = Request();
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const { width, height } = Dimensions.get('window');
  const [inviteVisible, setInviteVisible] = useState<boolean>(false);
  const [joinCode, setJoinCode] = useState<string>('');
  const [group, setGroup] = useState<GroupProps[]>([
    {
      admin: '',
      groupIdx: 0,
      groupImage: '',
      memberCount: 0,
      name: '',
      recentUpdate: '',
      startYear: '',
    },
  ]);
  const [user, setUser] = useRecoilState<UserProps>(userState);
  const getMyProfile = async () => {
    const response = await request.get('/users/myPage');
    setUser({
      nickname: response.result.nickname,
      profileImage:
        response.result.profileImage || 'https://ifh.cc/g/wKYSNB.png',
    });
  };
  useEffect(() => {
    getMyProfile();
  }, []);
  const onJoin = async () => {
    if (joinCode.length === 0) {
      Alert.alert('빈칸을 채워주세요!');
    } else {
      const response = await request.post('/groups/join', {
        joinCode: joinCode,
      });
      if (response.isSuccess) {
        setInviteVisible(false);
        console.log(response.result);
        setJoinCode('');
        navigationToTab.navigate('GroupTab', {
          groupIdx: response.result.groupIdx,
        });
      } else {
        Alert.alert('그룹 입장에 실패했습니다. 코드를 다시 확인해주세요.');
      }
    }
  };

  const getGroupList = async () => {
    const response = await request.get('/groups');
    setGroup(response.result.groupList);
  };

  useFocusEffect(
    useCallback(() => {
      getGroupList();
    }, [inviteVisible]),
  );

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
            paddingHorizontal: 35,
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
          data={group}
          renderItem={({ item }: any) => {
            return <GroupItem group={item} />;
          }}
        />
      </View>
      <Modal visible={formVisible} animationType="slide">
        <GroupCreate setFormVisible={setFormVisible} />
      </Modal>
      <Modal visible={inviteVisible} transparent>
        <Pressable
          style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
          onPress={() => {
            setInviteVisible(false);
            setJoinCode('');
          }}
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
            keyboardType="numeric"
            value={joinCode}
            onChangeText={code => setJoinCode(code)}
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
