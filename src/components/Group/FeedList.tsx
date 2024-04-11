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
import { CustomText as Text } from '../../styles/CustomText';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { FeedStackParams } from '../../pages/Group/FeedStack';
import CustomHeader from '../common/CustomHeader';
import FeedItem from './FeedItem';
import PlusButton from '../common/PlusButton';
import FeedUpload from './FeedUpload';
import { useState } from 'react';
import styled from 'styled-components/native';
import HomeIcon from '../../assets/common/Home.svg';
import DotsIcon from '../../assets/common/Dots.svg';
import ArrowIcon from '../../assets/common/Arrow.svg';
import { Body, Caption, Subtitle, Title } from '../../styles/GlobalText';
import IconButton from '../common/IconButton';
import { useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../../App';
import { BLACK, LIGHTPURPLE, PURPLE, WHITE } from '../../styles/GlobalColor';
import EditButton from '../common/EditButton';
import GroupCreate from '../Home/GroupCreate';
import BottomButton from '../common/BottomButton';
import ShareModal from '../common/ShareModal';

const data = [
  {
    writer: '김토끼',
    title: '제주도 여행 기억ㄴrㄴㅣ',
    date: '2023.06.23',
    location: '제주 한림읍',
    rep_pic: require('../../assets/tmp/feed1.jpeg'),
  },
  {
    writer: '곽미미',
    title: '유럽 돌려보내줘',
    date: '2022.08.30',
    location: '체코 프라하',
    rep_pic: require('../../assets/tmp/feed2.jpeg'),
  },
  {
    writer: '이왈왈',
    title: '목포가 여긴가',
    date: '2017.02.16',
    location: '전라남도 목포시',
    rep_pic: require('../../assets/tmp/feed3.jpeg'),
  },
  {
    writer: '최멍멍',
    title: '우리 벚꽃 사진 찍었잖아',
    date: '2017.04.02',
    location: '서울 강동구',
    rep_pic: require('../../assets/tmp/feed4.jpeg'),
  },
];

const FeedList = ({
  navigation,
}: StackScreenProps<FeedStackParams, 'FeedList'>) => {
  const navigationToHome =
    useNavigation<StackNavigationProp<RootStackParams>>();
  const { width, height } = Dimensions.get('window');
  const [group, setGroup] = useState({
    name: '악당 꼬부기',
    since: 2008,
    members: [
      'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
      'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
      'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
      'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
    ],
    puzzles: 17,
    during: 16,
    code: 123456,
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
            <>
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
                    <Caption style={{ fontWeight: '700', color: WHITE }}>
                      초대하기
                    </Caption>
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
                  <View
                    style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    {group.members.slice(0, 3).map((item, index) => {
                      return (
                        <Image
                          key={index}
                          source={{ uri: item }}
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 180,
                            borderColor: PURPLE,
                            borderWidth: 0.7,
                            position: 'absolute',
                            top: 0,
                            right:
                              group.members.length > 3
                                ? index * 20 + 15
                                : index * 20,
                          }}
                        />
                      );
                    })}
                    {group.members.length > 3 && (
                      <View
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 180,
                          borderWidth: 1.2,
                          borderColor: PURPLE,
                          backgroundColor: WHITE,
                          justifyContent: 'center',
                          alignItems: 'center',
                          position: 'absolute',
                          top: 8,
                          right: 0,
                        }}>
                        <Caption style={{ color: PURPLE, lineHeight: 15 }}>
                          +3
                        </Caption>
                      </View>
                    )}
                  </View>
                </View>
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
              {
                <View
                  style={{
                    marginVertical: 15,
                    paddingLeft: 20,
                    paddingRight: 10,
                    paddingVertical: 10,
                    backgroundColor: LIGHTPURPLE,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Body>이런 걸 함께 해보시는 건 어때요?</Body>
                  <IconButton onPress={() => {}}>
                    <ArrowIcon
                      color={BLACK}
                      transform={[{ rotate: '180deg' }]}
                    />
                  </IconButton>
                </View>
              }
            </>
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
        <GroupCreate setFormVisible={setFormVisible} />
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
`;

const HorizontalText = styled.View`
  flex-direction: row;
`;

const RoundButton = styled.TouchableOpacity`
  border-radius: 12px;
  background: ${PURPLE};
  padding: 0 18px;
`;

export default FeedList;
