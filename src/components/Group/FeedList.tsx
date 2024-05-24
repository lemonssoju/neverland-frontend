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
import FeedItem from './FeedItem';
import { useState } from 'react';
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

const data = [
  // {
  //   writer: '지소민',
  //   title: '작년 여름 제주에서',
  //   date: '2023.08.21',
  //   location: '제주시 한림읍',
  //   rep_pic: require('../../assets/tmp/feed1.jpeg'),
  // },
  {
    writer: '곽서진',
    title: '유럽 돌려보내줘',
    date: '2022.06.30',
    location: '체코 프라하',
    rep_pic: require('../../assets/tmp/feed2.jpeg'),
  },
  {
    writer: '한서연',
    title: '깡총깡총 토끼',
    date: '2023.05.19',
    location: '전라북도 군산시',
    rep_pic: require('../../assets/tmp/feed5.png'),
  },
  {
    writer: '김중현',
    title: '목포가 여긴가',
    date: '2020.02.16',
    location: '전라남도 목포시',
    rep_pic: require('../../assets/tmp/feed3.jpeg'),
  },
  {
    writer: '이혜인',
    title: '벚꽃엔딩',
    date: '2017.04.02',
    location: '서울시 강동구',
    rep_pic: require('../../assets/tmp/feed4.jpeg'),
  },
];

const FeedList = ({
  navigation,
}: StackScreenProps<FeedStackParams, 'FeedList'>) => {
  const navigationToHome =
    useNavigation<StackNavigationProp<RootStackParams>>();
  const { width, height } = Dimensions.get('window');
  const [tmp, setTmp] = useState<boolean>(false);
  const [group, setGroup] = useState({
    name: '화정동 칠공주',
    since: 2008,
    members: [
      'https://ifh.cc/g/1CLCRY.png', // 4
      'https://ifh.cc/g/06Q0DB.png', // 3
      'https://ifh.cc/g/5ZL9HY.png', // 2
      'https://ifh.cc/g/2xCPH5.png', // 1
      'https://ifh.cc/g/2xCPH5.png', // 1
      'https://ifh.cc/g/2xCPH5.png', // 1
      'https://ifh.cc/g/2xCPH5.png', // 1
    ],
    puzzles: 17,
    during: 16,
    code: 627693,
  });
  const isManager: boolean = false;
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [inviteVisible, setInviteVisible] = useState<boolean>(false);
  const [dotPressed, setDotPressed] = useState<boolean>(false);
  const onDelete = () => {
    Alert.alert(
      '알림',
      '정말로 그룹을 삭제하시겠습니까?',
      [
        {
          text: '예',
          onPress: () => {
            navigationToHome.navigate('Home');
          },
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
    Alert.alert(
      '알림',
      '정말로 그룹을 나가시겠습니까?',
      [
        {
          text: '예',
          onPress: () => {
            navigationToHome.navigate('Home');
          },
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
        <Title>{group.name}</Title>
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
        data={data}
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
                  <Body style={{ color: PURPLE }}>{group.since}</Body>
                </HorizontalText>
                <RoundButton onPress={() => setInviteVisible(true)}>
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
                  <Title style={{ color: PURPLE }}>{group.puzzles}</Title>
                  <Title>개</Title>
                </HorizontalText>
              </View>
              <ImageStack data={group.members} />
              {
                <HorizontalText>
                  <Subtitle>우리가 함께한 지 </Subtitle>
                  <Subtitle style={{ color: PURPLE }}>
                    {group.during}년
                  </Subtitle>
                  <Subtitle>된 날이에요!</Subtitle>
                </HorizontalText>
              }
            </BannerSection>
          );
        }}
        renderItem={({ item }) => {
          const { writer, title, location, date, rep_pic } = item;
          return (
            <FeedItem
              writer={writer}
              title={title}
              date={date}
              location={location}
              rep_pic={rep_pic}
            />
          );
        }}
      />
      <Modal visible={formVisible} animationType="slide">
        <GroupCreate setFormVisible={setFormVisible} setTmp={setTmp} />
      </Modal>
      <ShareModal
        modalVisible={inviteVisible}
        setModalVisible={setInviteVisible}
        code={group.code}
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
