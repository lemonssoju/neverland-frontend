import { useState, useEffect, useCallback } from 'react';
import {
  Text,
  ScrollView,
  TextInput,
  SafeAreaView,
  View,
  TouchableOpacity,
  Pressable,
  Modal,
  FlatList,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import styled from 'styled-components/native';
import CustomHeader from '../common/CustomHeader';
import Input from '../common/Input';
import BottomButton from '../common/BottomButton';
import PhotoButton from '../common/PhotoButton';
import { Asset } from 'react-native-image-picker';
import {
  BLACK,
  GRAY,
  LIGHTPURPLE,
  MINT,
  PURPLE,
  WHITE,
} from '../../styles/GlobalColor';
import { Caption, Label, Title } from '../../styles/GlobalText';
import InfoIcon from '../../assets/common/Info.svg';
import PaintIcon from '../../assets/common/Paint.svg';
import LinkIcon from '../../assets/common/Link.svg';
import CalendarIcon from '../../assets/common/Calendar.svg';
import { FeedStackParams } from '../../pages/Group/FeedStack';
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';
import Postcode from '@actbase/react-daum-postcode';

export interface FeedProps {
  title: string;
  date: Date;
  location: string;
  content: string;
  rep_pic?: string;
  music?: string;
  musicUrl?: string;
  members: string[];
}

const data = [
  {
    rep_pic: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
    nickname: '피터팬',
  },
  {
    rep_pic: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
    nickname: '황은정',
  },
  {
    rep_pic: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
    nickname: '김예지',
  },
  {
    rep_pic: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
    nickname: '울랄라',
  },
  {
    rep_pic: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
    nickname: '푸하하',
  },
];

const { width, height } = Dimensions.get('window');
const FeedUpload = ({
  navigation,
}: StackScreenProps<FeedStackParams, 'FeedUpload'>) => {
  const [feed, setFeed] = useState<FeedProps>({
    title: '',
    date: new Date(),
    location: '',
    content: '',
    rep_pic: '',
    music: '',
    musicUrl: '',
    members: [],
  });
  const [musicVisible, setMusicVisible] = useState<boolean>(false);
  const [photo, setPhoto] = useState<Asset[]>([
    {
      fileName: '',
      width: 0,
      height: 0,
      uri: '',
    },
  ]);
  const [postModal, setPostModal] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  const showPicker = useCallback((value: boolean) => setShow(value), []);

  const onValueChange = useCallback(
    (event: any, newDate: any) => {
      const selectedDate = newDate || feed.date;
      showPicker(false);
      setFeed({ ...feed, date: selectedDate });
    },
    [feed.date, showPicker],
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
      <CustomHeader
        label="작성하기"
        onClose={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        data={data}
        ListHeaderComponent={() => {
          return (
            <View>
              <View style={{ alignItems: 'center', paddingVertical: 5 }}>
                <PaintIcon style={{ marginVertical: 20 }} />
                <Title>사진과 함께 추억 퍼즐을 생성해드려요</Title>
                <Caption style={{ color: GRAY }}>
                  사진이 없으시다면, 내용을 기반으로 AI 화가가 추억 퍼즐을
                  그려드려요.{' '}
                </Caption>
              </View>
              <PhotoBox>
                <PhotoButton photo={photo} setPhoto={setPhoto} />
              </PhotoBox>
              <Input
                label="제목"
                value={feed.title}
                onChangeText={title => {
                  setFeed({ ...feed, title: title });
                }}
                isRequired
                placeholder="제목을 작성해주세요"
              />
              <Input
                value={moment(feed.date).format('YYYY년 MM월').toString()}
                label="날짜"
                isRequired
              />
              <TouchableOpacity
                onPress={() => showPicker(true)}
                style={{
                  position: 'absolute',
                  bottom: 433,
                  right: 5,
                  zIndex: 1,
                }}>
                <CalendarIcon />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ zIndex: 1 }}
                onPress={() => setPostModal(true)}>
                <Input
                  label="장소"
                  isRequired
                  value={feed.location}
                  placeholder="장소를 입력해주세요."
                  editable={false}
                />
              </TouchableOpacity>
              <Input
                label="같이 들으면 좋은 음악"
                value={feed.music}
                onChangeText={music => {
                  setFeed({ ...feed, music: music });
                }}
                placeholder="가수 - 제목 형식으로 입력해주세요."
                description="우측 아이콘을 클릭해 유튜브 링크를 삽입해주세요."
              />
              <TouchableOpacity
                style={{ position: 'absolute', right: 5, bottom: 263 }}
                onPress={() => setMusicVisible(true)}>
                <LinkIcon />
              </TouchableOpacity>
              <Label>내용 *</Label>
              <TextInput
                value={feed.content}
                onChangeText={content => {
                  setFeed({ ...feed, content: content });
                }}
                style={{
                  borderWidth: 1,
                  borderColor: GRAY,
                  borderRadius: 2,
                  padding: 10,
                  marginBottom: 20,
                  height: 150,
                  color: BLACK,
                  fontSize: 14,
                  fontFamily: 'Pretendard Variable'
                }}
                multiline
              />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Label>퍼즐러 * </Label>
                <InfoIcon />
                <Caption style={{color: GRAY}}> 함께 추억을 공유할 퍼즐러들을 초대하세요.</Caption>
              </View>
            </View>
          );
        }}
        style={{
          paddingHorizontal: 25,
        }}
        renderItem={({ item, index }: { item: any; index: number }) => {
          const { rep_pic, nickname } = item;
          let isInvited = feed.members.includes(nickname);
          let isLastItem = data.length - 1 === index;
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTopWidth: 1,
                borderStartColor: GRAY,
                borderStartWidth: 1,
                borderEndWidth: 1,
                borderEndColor: GRAY,
                borderColor: GRAY,
                borderBottomColor: GRAY,
                borderBottomWidth: isLastItem ? 1 : 0,
                borderTopLeftRadius: index === 0 ? 2 : 0,
                borderTopRightRadius: index === 0 ? 2 : 0,
                borderBottomLeftRadius: isLastItem ? 2 : 0,
                borderBottomRightRadius: isLastItem ? 2 : 0,
                padding: 10,
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={{ uri: rep_pic }}
                  style={{ width: 30, height: 30, borderRadius: 180 }}
                />
                <Label style={{ marginLeft: 10 }}>{nickname}</Label>
              </View>
              <TouchableOpacity
                onPress={() => {
                  isInvited
                    ? setFeed({
                        ...feed,
                        members: feed.members.filter(
                          (member: string) => member !== nickname,
                        ),
                      })
                    : setFeed({
                        ...feed,
                        members: [...feed.members, nickname],
                      });
                }}
                style={{
                  width: 80,
                  height: 25,
                  backgroundColor: isInvited ? LIGHTPURPLE : PURPLE,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 12,
                }}>
                <Caption
                  style={{
                    color: isInvited ? PURPLE : WHITE,
                    fontWeight: '700',
                  }}>
                  {isInvited ? '추가 완료' : '추가'}
                </Caption>
              </TouchableOpacity>
            </View>
          );
        }}
        ListFooterComponentStyle={{ marginTop: 20 }}
        ListFooterComponent={() => {
          return (
            <BottomButton
              label="등록"
              onPress={() => {
                navigation.goBack();
                navigation.navigate('FeedDetail');
              }}
            />
          );
        }}
      />
      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={feed.date}
          minimumDate={new Date(1970, 1)}
          maximumDate={new Date()}
          locale="ko"
        />
      )}
      <Modal visible={musicVisible} transparent>
        <Pressable
          style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
          onPress={() => setMusicVisible(false)}
        />
        <View
          style={{
            backgroundColor: LIGHTPURPLE,
            position: 'absolute',
            width: '80%',
            height: 160,
            top: 340,
            alignSelf: 'center',
            borderRadius: 24,
            padding: 15,
          }}>
          <Input
            label="Youtube"
            value={feed.musicUrl}
            onChangeText={musicUrl => {
              setFeed({ ...feed, musicUrl: musicUrl });
            }}
            placeholder="유튜브 링크를 삽입해주세요."
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 55,
                backgroundColor: PURPLE,
                borderRadius: 12,
              }}
              onPress={() => {
                setFeed({ ...feed, musicUrl: '' });
                setMusicVisible(false);
              }}>
              <Label style={{ color: WHITE }}>취소</Label>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 55,
                backgroundColor: PURPLE,
                borderRadius: 12,
              }}
              onPress={() => setMusicVisible(false)}>
              <Label style={{ color: WHITE }}>완료</Label>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={postModal}>
        <SafeAreaView>
          <CustomHeader
            label="장소 검색"
            onClose={() => {
              setPostModal(false);
            }}
          />
          <Postcode
            style={{ width: width, height: height - 100, marginTop: 100 }}
            onError={() => {
              Alert.alert('주소 검색에 실패하였습니다.');
            }}
            jsOptions={{ animation: true, hideMapBtn: true }}
            onSelected={data => {
              setFeed({ ...feed, location: data.address });
              setPostModal(false);
            }}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const PhotoBox = styled.View`
  margin: 5px 0px;
  border-radius: 2px;
  border: 1px solid ${GRAY};
  width: 100%;
  height: 180px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export default FeedUpload;
