import {
  FlatList,
  SafeAreaView,
  Modal,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Pressable,
  Dimensions,
  Share,
} from 'react-native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { FeedStackParams } from '../../pages/Group/FeedStack';
import CustomHeader from '../common/CustomHeader';
import FeedItem, { FeedItemProps } from './FeedItem';
import { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import HomeIcon from '../../assets/common/Home.svg';
import DotsIcon from '../../assets/common/Dots.svg';
import ArrowIcon from '../../assets/common/Arrow.svg';
import {
  Body,
  Caption,
  Subtitle,
  Title,
  Content,
} from '../../styles/GlobalText';
import IconButton from '../common/IconButton';
import { useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../../App';
import { BLACK, LIGHTPURPLE, PURPLE, WHITE } from '../../styles/GlobalColor';
import EditButton from '../common/EditButton';
import GroupCreate from '../Home/GroupCreate';
import BottomButton from '../common/BottomButton';
import ShareModal from '../common/ShareModal';
import ImageStack from '../common/ImageStack';
import { groupState } from '../../recoil/groupState';
import { useRecoilState } from 'recoil';
import Request from '../../services/requests';

// const data = [
//   // {
//   //   writer: '지소민',
//   //   title: '작년 여름 제주에서',
//   //   date: '2023.08.21',
//   //   location: '제주시 한림읍',
//   //   rep_pic: require('../../assets/tmp/feed1.jpeg'),
//   // },
//   {
//     writer: '곽서진',
//     title: '유럽 돌려보내줘',
//     date: '2022.06.30',
//     location: '체코 프라하',
//     rep_pic: require('../../assets/tmp/feed2.jpeg'),
//   },
//   {
//     writer: '한서연',
//     title: '깡총깡총 토끼',
//     date: '2023.05.19',
//     location: '전라북도 군산시',
//     rep_pic: require('../../assets/tmp/feed5.png'),
//   },
//   {
//     writer: '김중현',
//     title: '목포가 여긴가',
//     date: '2020.02.16',
//     location: '전라남도 목포시',
//     rep_pic: require('../../assets/tmp/feed3.jpeg'),
//   },
//   {
//     writer: '이혜인',
//     title: '벚꽃엔딩',
//     date: '2017.04.02',
//     location: '서울시 강동구',
//     rep_pic: require('../../assets/tmp/feed4.jpeg'),
//   },
// ];

interface GroupProfileProps {
  groupName: string;
  startYear: string;
  memberImageList: string[];
  memberCount: number;
  puzzleCount: number;
  dayCount: number;
}

const FeedList = ({
  navigation,
}: StackScreenProps<FeedStackParams, 'FeedList'>) => {
  const navigationToHome =
    useNavigation<StackNavigationProp<RootStackParams>>();
  const { width, height } = Dimensions.get('window');
  const request = Request();
  const [groupIdx, setGroupIdx] = useRecoilState(groupState);
  const [group, setGroup] = useState({
    groupName: '화정동 칠공주',
    startYear: '2008',
    memberImageList: [
      'https://ifh.cc/g/1CLCRY.png', // 4
      'https://ifh.cc/g/06Q0DB.png', // 3
      'https://ifh.cc/g/5ZL9HY.png', // 2
      'https://ifh.cc/g/2xCPH5.png', // 1
      'https://ifh.cc/g/2xCPH5.png', // 1
      'https://ifh.cc/g/2xCPH5.png', // 1
      'https://ifh.cc/g/2xCPH5.png', // 1
    ],
    memberCount: 7,
    puzzleCount: 17,
    dayCount: 16
  });
  const [groupPostList, setGroupPostList] = useState<FeedItemProps[]>([{
    puzzleIdx: 0,
    title: '',
    puzzleImage: '',
    writer: '',
    createdDate: '',
    location: ''
  }])
  const getGroupProfile = async () => {
    const response = await request.get(`/groups/${groupIdx}/profile`);
    console.log(response);
    setGroup(response.result)
  };
  const getPuzzles = async () => {
    const response = await request.get(`/groups/${groupIdx}/puzzles`);
    console.log(response.result.groupPostList);
    setGroupPostList(response.result.groupPostList);
  };

  useEffect(() => {
    if (groupIdx > 0) {
      getGroupProfile();
      getPuzzles();
    }
  }, [groupIdx]);
  const isManager: boolean = false;
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [inviteVisible, setInviteVisible] = useState<boolean>(false);
  const [dotPressed, setDotPressed] = useState<boolean>(false);
  const [joinCode, setJoinCode] = useState<number>(0);
  const onInvite = async () => {
    const response = await request.post(`/groups/${groupIdx}/invite`, {});
    setJoinCode(response.result.joinCode);
    setInviteVisible(true);
  };
  const onDelete = () => {
    const deleteRequest = async () => {
      const response = await request.patch(`/groups/${groupIdx}/delete`, {});
      if (response.isSuccess) navigationToHome.navigate('Home');
    };
    Alert.alert(
      '알림',
      '정말로 그룹을 삭제하시겠습니까?',
      [
        {
          text: '예',
          onPress: deleteRequest,
          style: 'destructive',
        },
        {
          text: '아니오',
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };
  const onQuit = () => {
    const quitRequest = async () => {
      const response = await request.patch(`/groups/${groupIdx}/withdraw`, {});
      console.log(response);
      if (response.isSuccess) navigationToHome.navigate('Home');
    };
    Alert.alert(
      '알림',
      '정말로 그룹을 나가시겠습니까?',
      [
        {
          text: '예',
          onPress: quitRequest,
          style: 'destructive',
        },
        {
          text: '아니오',
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderSection>
        <IconButton onPress={() => navigationToHome.navigate('Home')}>
          <HomeIcon />
        </IconButton>
        <Title>{group.groupName}</Title>
        <IconButton
          onPress={() => {
            setDotPressed(!dotPressed);
          }}>
          <DotsIcon color={BLACK} />
        </IconButton>
      </HeaderSection>
      {dotPressed &&
        (isManager ? (
          <EditButton
            editLabel="그룹 수정"
            deleteLabel="그룹 삭제"
            onEdit={() => setFormVisible(true)}
            onDelete={onDelete}
            style={{ top: 90, right: 15 }}
          />
        ) : (
          <EditButton
            editLabel="나가기"
            onEdit={onQuit}
            style={{ top: 90, right: 15 }}
          />
        ))}

      <FlatList
        data={groupPostList}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => {
          return (
            <BannerSection>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <HorizontalText>
                  <Body>Since </Body>
                  <Body style={{ color: PURPLE }}>{group.startYear}</Body>
                </HorizontalText>
                <RoundButton onPress={onInvite}>
                  <Content style={{ fontWeight: '700', color: WHITE }}>
                    초대하기
                  </Content>
                </RoundButton>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <HorizontalText>
                  <Title>함께한 추억 </Title>
                  <Title style={{ color: PURPLE }}>{group.puzzleCount}</Title>
                  <Title>개</Title>
                </HorizontalText>
              </View>
              <ImageStack data={group.memberImageList} />
              {
                <HorizontalText>
                  <Subtitle>우리가 함께한 지 </Subtitle>
                  <Subtitle style={{ color: PURPLE }}>
                    {group.dayCount}년
                  </Subtitle>
                  <Subtitle>된 날이에요!</Subtitle>
                </HorizontalText>
              }
            </BannerSection>
          );
        }}
        renderItem={({ item }: any) => {
          return (
            <FeedItem
              feed={item}
            />
          );
        }}
      />
      <Modal visible={formVisible} animationType="slide">
        <GroupCreate setFormVisible={setFormVisible} groupIdx={groupIdx} />
      </Modal>
      <ShareModal
        modalVisible={inviteVisible}
        setModalVisible={setInviteVisible}
        code={joinCode}
      />
    </SafeAreaView>
  );
};

const HeaderSection = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
`;

const BannerSection = styled.View`
  background: ${LIGHTPURPLE};
  padding: 20px;
  margin-bottom: 10px;
`;

const HorizontalText = styled.View`
  flex-direction: row;
`;

const RoundButton = styled.TouchableOpacity`
  border-radius: 12px;
  background: ${PURPLE};
  padding: 2px 18px;
`;

export default FeedList;
