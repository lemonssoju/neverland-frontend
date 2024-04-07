import {
  FlatList,
  SafeAreaView,
  Modal,
  View,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
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

const data = [
  {
    writer: '황은정',
    title: '망민중 축제 기억ㄴrㄴㅣ',
    subtitle: '아니 우리 의상 보라고;;',
    rep_pic: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
  },
  {
    writer: '황은정',
    title: '망민중 축제 기억ㄴrㄴㅣ',
    subtitle: '아니 우리 의상 보라고;;',
    rep_pic: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
  },
  {
    writer: '황은정',
    title: '망민중 축제 기억ㄴrㄴㅣ',
    subtitle: '아니 우리 의상 보라고;;',
    rep_pic: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
  },
  {
    writer: '황은정',
    title: '망민중 축제 기억ㄴrㄴㅣ',
    subtitle: '아니 우리 의상 보라고;;',
    rep_pic: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
  },
];

const FeedList = ({
  navigation,
}: StackScreenProps<FeedStackParams, 'FeedList'>) => {
  const navigationToHome =
    useNavigation<StackNavigationProp<RootStackParams>>();
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
    during: 10,
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderSection>
        <IconButton onPress={() => navigationToHome.navigate('Home')}>
          <HomeIcon />
        </IconButton>
        <Title>{group.name}</Title>
        <IconButton onPress={() => {}}>
          <DotsIcon />
        </IconButton>
      </HeaderSection>
      <BannerSection>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <HorizontalText>
            <Body>Since </Body>
            <Body style={{ color: PURPLE }}>{group.since}</Body>
          </HorizontalText>
          <RoundButton>
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
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            {group.members.slice(0, 3).map((item, index) => {
              return (
                <Image
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
                      group.members.length > 3 ? index * 20 + 15 : index * 20,
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
                <Caption style={{ color: PURPLE, lineHeight: 15 }}>+3</Caption>
              </View>
            )}
          </View>
        </View>
        {
          <HorizontalText>
            <Subtitle>우리가 함께한 지 </Subtitle>
            <Subtitle style={{ color: PURPLE }}>{group.during}년</Subtitle>
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
            <ArrowIcon color={BLACK} transform={[{ rotate: '180deg' }]} />
          </IconButton>
        </View>
      }
      <FlatList
        data={data}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const { writer, title, subtitle, rep_pic } = item;
          return (
            <FeedItem
              writer={writer}
              title={title}
              subtitle={subtitle}
              rep_pic={rep_pic}
            />
          );
        }}
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
