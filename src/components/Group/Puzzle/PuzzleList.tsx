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
import { PuzzleStackParams } from '../../../pages/Group/PuzzleStack';
import PuzzleItem, { PuzzleItemProps } from './PuzzleItem';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import HomeIcon from '../../../assets/common/Home.svg';
import DotsIcon from '../../../assets/common/Dots.svg';
import {
  Body,
  Caption,
  Subtitle,
  Title,
  Content,
} from '../../../styles/GlobalText';
import IconButton from '../../common/IconButton';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../../../App';
import { BLACK, LIGHTPURPLE, PURPLE, WHITE } from '../../../styles/GlobalColor';
import EditButton from '../../common/EditButton';
import GroupCreate from '../../Home/GroupCreate';
import ShareModal from '../../common/ShareModal';
import ImageStack from '../../common/ImageStack';
import { groupState } from '../../../recoil/groupState';
import { useRecoilState } from 'recoil';
import Request from '../../../services/requests';
import { userState } from '../../../recoil/userState';

interface GroupProfileProps {
  admin: string;
  groupName: string;
  startYear: string;
  memberImageList: string[];
  memberCount: number;
  puzzleCount: number;
  dayCount: number;
}

const PuzzleList = ({
  navigation,
}: StackScreenProps<PuzzleStackParams, 'PuzzleList'>) => {
  const navigationToHome =
    useNavigation<StackNavigationProp<RootStackParams>>();
  const { width, height } = Dimensions.get('window');
  const request = Request();
  const [groupIdx, setGroupIdx] = useRecoilState(groupState);
  const [groupProfile, setGroupProfile] = useState<GroupProfileProps>({
    admin: '',
    groupName: '',
    startYear: '',
    memberImageList: [],
    memberCount: 0,
    puzzleCount: 0,
    dayCount: 0,
  });
  const [groupPostList, setGroupPostList] = useState<PuzzleItemProps[]>([
    {
      puzzleIdx: 0,
      title: '',
      puzzleImage: '',
      writer: '',
      createdDate: '',
      location: '',
    },
  ]);
  const [user, setUser] = useRecoilState(userState);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [inviteVisible, setInviteVisible] = useState<boolean>(false);
  const [dotPressed, setDotPressed] = useState<boolean>(false);
  const [joinCode, setJoinCode] = useState<number>(0);
  const getGroupProfile = async () => {
    const response = await request.get(`/groups/${groupIdx}/profile`);
    setGroupProfile(response.result);
  };
  const getPuzzles = async () => {
    const response = await request.get(`/groups/${groupIdx}/puzzles`);
    setGroupPostList(response.result.groupPostList);
  };

  useFocusEffect(
    useCallback(() => {
      if (groupIdx > 0) {
        getGroupProfile();
        getPuzzles();
      }
    }, [groupIdx, formVisible]),
  );
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
        <IconButton
          onPress={() => {
            setGroupIdx(0);
            navigationToHome.navigate('Home');
          }}>
          <HomeIcon />
        </IconButton>
        <Title>{groupProfile.groupName}</Title>
        <IconButton
          onPress={() => {
            setDotPressed(!dotPressed);
          }}>
          <DotsIcon color={BLACK} />
        </IconButton>
      </HeaderSection>
      {dotPressed &&
        (groupProfile.admin === user.nickname ? (
          <EditButton
            editLabel="그룹 수정"
            deleteLabel="그룹 삭제"
            onEdit={() => {
              setFormVisible(true);
              setDotPressed(false);
            }}
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
                  <Body style={{ color: PURPLE }}>
                    {groupProfile.startYear}
                  </Body>
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
                  <Title style={{ color: PURPLE }}>
                    {groupProfile.puzzleCount}
                  </Title>
                  <Title>개</Title>
                </HorizontalText>
              </View>
              <ImageStack
                data={groupProfile.memberImageList}
                count={groupProfile.memberCount}
              />
              {
                <HorizontalText>
                  <Subtitle>우리가 함께한 지 </Subtitle>
                  <Subtitle style={{ color: PURPLE }}>
                    {groupProfile.dayCount}일
                  </Subtitle>
                  <Subtitle>된 날이에요!</Subtitle>
                </HorizontalText>
              }
            </BannerSection>
          );
        }}
        renderItem={({ item }: any) => {
          return <PuzzleItem puzzle={item} />;
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

export default PuzzleList;
