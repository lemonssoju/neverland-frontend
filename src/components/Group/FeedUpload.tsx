import { useState, useEffect } from 'react';
import {
  Text,
  ScrollView,
  TextInput,
  SafeAreaView,
  View,
  TouchableOpacity,
  Pressable,
  Modal,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';
import CustomHeader from '../common/CustomHeader';
import Input from '../common/Input';
import BottomButton from '../common/BottomButton';
import PhotoButton from '../common/PhotoButton';
import { Asset } from 'react-native-image-picker';
import { CategoryModal } from '../common/BottomModal';
import { BLACK, GRAY, MINT, WHITE } from '../../styles/GlobalColor';
import { B14 } from '../../styles/GlobalText';
import ArrowIcon from '../../assets/common/Arrow.svg';
import LinkIcon from '../../assets/common/Link.svg';
import DrawIcon from '../../assets/common/Draw.svg';
import { GroupStackParams } from '../../pages/Group/FeedStack';

export interface FeedProps {
  title: string;
  subtitle: string;
  content: string;
  category: string;
  rep_pic: string;
  music?: string;
  musicUrl?: string;
}

const FeedUpload = ({
  navigation,
  route,
}: StackScreenProps<GroupStackParams, 'FeedUpload'>) => {
  const [feed, setFeed] = useState<FeedProps>({
    title: '',
    subtitle: '',
    content: '',
    category: '',
    rep_pic: '',
    music: '',
    musicUrl: '',
  });
  const [categories, setCategories] = useState<string[]>(['영화']);
  const [categoryVisible, setCategoryVisible] = useState<boolean>(false);
  const [musicVisible, setMusicVisible] = useState<boolean>(false);
  const [photo, setPhoto] = useState<Asset[]>([
    {
      fileName: '',
      width: 0,
      height: 0,
      uri: '',
    },
  ]);
  const [option, setOption] = useState<string>('화가');
  const [drawVisible, setDrawVisible] = useState<boolean>(false);
  const [drawPrompt, setDrawPrompt] = useState<string>('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BLACK }}>
      <CustomHeader
        label="작성하기"
        onClose={() => {
          navigation.goBack();
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <OptionContainer>
          <OptionButton
            style={{
              backgroundColor: option === '화가' ? MINT : 'transparent',
            }}
            onPress={() => setOption('화가')}>
            <B14
              style={{
                marginVertical: 8,
                color: option === '화가' ? BLACK : WHITE,
              }}>
              👩‍🎨 AI 화가
            </B14>
          </OptionButton>
          <OptionButton
            style={{
              backgroundColor: option === '사진' ? MINT : 'transparent',
            }}
            onPress={() => setOption('사진')}>
            <B14
              style={{
                marginVertical: 8,
                color: option === '사진' ? BLACK : WHITE,
              }}>
              📷 직접 선택
            </B14>
          </OptionButton>
        </OptionContainer>
        <PhotoBox>
          {option === '화가' ? (
            <>
              <TouchableOpacity onPress={() => setDrawVisible(true)}>
                <DrawIcon color={WHITE} />
              </TouchableOpacity>
              <B14 style={{ marginTop: 15 }}>AI 화가가 그림을 그려드려요!</B14>
            </>
          ) : (
            <PhotoButton
              photo={photo}
              setPhoto={setPhoto}
              label="원하는 사진을 직접 등록하세요!"
            />
          )}
        </PhotoBox>
        <View style={{ width: '95%', alignSelf: 'center' }}>
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
            label="한 줄 소개"
            value={feed.subtitle}
            onChangeText={subtitle => {
              setFeed({ ...feed, subtitle: subtitle });
            }}
            isRequired
            placeholder="한 줄 소개를 작성해주세요"
          />
          <View
            style={{
              paddingHorizontal: 20,
              marginTop: 5,
              marginBottom: 15,
              flexDirection: 'row',
            }}>
            <B14>콘텐츠 선택 *</B14>
            <DropDownButton onPress={() => setCategoryVisible(true)}>
              <B14>{categories[0]}</B14>
              <ArrowIcon color={WHITE} strokeWidth={2} />
            </DropDownButton>
          </View>
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
            style={{ position: 'absolute', right: 20, top: 210 }}
            onPress={() => setMusicVisible(true)}>
            <LinkIcon />
          </TouchableOpacity>
          <View style={{ paddingHorizontal: 20, paddingTop: 15 }}>
            <B14 style={{ marginBottom: 10 }}>내용 *</B14>
            <TextInput
              value={feed.content}
              onChangeText={content => {
                setFeed({ ...feed, content: content });
              }}
              style={{
                borderWidth: 1,
                borderColor: WHITE,
                borderRadius: 8,
                padding: 10,
                marginBottom: 20,
                height: 150,
                color: WHITE,
              }}
              multiline
            />
            <BottomButton
              label="등록"
              onPress={() => {
                navigation.goBack();
                navigation.navigate('FeedDetail');
              }}
            />
          </View>
        </View>
      </ScrollView>
      <BottomSheetModalProvider>
        <CategoryModal
          categories={categories}
          setCategories={setCategories}
          categoryVisible={categoryVisible}
          setCategoryVisible={setCategoryVisible}
          unique
        />
      </BottomSheetModalProvider>
      <Modal visible={drawVisible} transparent>
        <Pressable
          style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
          onPress={() => setDrawVisible(false)}
        />
        <View
          style={{
            backgroundColor: BLACK,
            position: 'absolute',
            width: '80%',
            height: 250,
            top: 300,
            alignSelf: 'center',
            borderRadius: 24,
            paddingVertical: 15,
            alignItems: 'center',
          }}>
          <B14 style={{ marginVertical: 10 }}>
            DALL-E에게 원하는 그림을 요청해주세요!
          </B14>
          <TextInput
            value={drawPrompt}
            onChangeText={content => {
              setDrawPrompt(content);
            }}
            style={{
              borderWidth: 1,
              borderColor: WHITE,
              borderRadius: 8,
              padding: 10,
              marginTop: 10,
              marginBottom: 20,
              height: 100,
              color: WHITE,
              width: '90%',
            }}
            multiline
            placeholder="90년대 서울 패션 어쩌구 저쩌구를 그려줘"
            placeholderTextColor={GRAY}
          />
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <TouchableOpacity
              style={{
                paddingVertical: 15,
                paddingHorizontal: 52,
                backgroundColor: MINT,
                borderRadius: 12,
              }}
              onPress={() => {
                setDrawPrompt('');
                setDrawVisible(false);
              }}>
              <B14 style={{ color: BLACK }}>취소</B14>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 15,
                paddingHorizontal: 52,
                backgroundColor: MINT,
                borderRadius: 12,
              }}
              onPress={() => setDrawVisible(false)}>
              <B14 style={{ color: BLACK }}>완료</B14>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={musicVisible} transparent>
        <Pressable
          style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
          onPress={() => setMusicVisible(false)}
        />
        <View
          style={{
            backgroundColor: BLACK,
            position: 'absolute',
            width: '80%',
            height: 150,
            top: 340,
            alignSelf: 'center',
            borderRadius: 24,
            paddingVertical: 15,
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
              paddingHorizontal: 20,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                paddingVertical: 15,
                paddingHorizontal: 52,
                backgroundColor: MINT,
                borderRadius: 12,
              }}
              onPress={() => {
                setFeed({ ...feed, musicUrl: '' });
                setMusicVisible(false);
              }}>
              <B14 style={{ color: BLACK }}>취소</B14>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 15,
                paddingHorizontal: 52,
                backgroundColor: MINT,
                borderRadius: 12,
              }}
              onPress={() => setMusicVisible(false)}>
              <B14 style={{ color: BLACK }}>완료</B14>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const DropDownButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 130px;
  border-bottom-width: 1px;
  border-bottom-color: ${WHITE};
  padding-bottom: 3px;
  margin-left: 20px;
`;

const OptionContainer = styled.View`
  width: 80%;
  justify-content: center;
  align-items: center;
  align-self: center;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 2px;
  background: ${BLACK};
  border-radius: 8px;
  padding-vertical: 5px;
`;

const OptionButton = styled.TouchableOpacity`
  width: 48%;
  align-items: center;
  border-radius: 8px;
`;

const PhotoBox = styled.View`
  margin-horizontal: 20px;
  margin-bottom: 15px;
  border-radius: 8px;
  background: ${BLACK};
  width: 80%;
  height: 220px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export default FeedUpload;
