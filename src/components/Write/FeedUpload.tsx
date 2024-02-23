import { useState, useEffect } from 'react';
import { Text, TextInput, SafeAreaView, View, TouchableOpacity, Dimensions, Image, Alert, Modal } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from '../../pages/Home';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';
import CustomHeader from '../common/CustomHeader';
import Input from '../common/Input';
import BottomButton from '../common/BottomButton';
import { CategoryModal } from '../common/BottomModal';
import { BLACK, LIGHTBLACK, MINT, WHITE } from '../../styles/GlobalColor';
import { B12, B14 } from '../../styles/GlobalText';
import ArrowIcon from '../../assets/common/Arrow.svg';
import LinkIcon from '../../assets/common/Link.svg';
import PhotoIcon from '../../assets/common/Photo.svg';

export interface FeedProps {
  title: string;
  subtitle: string;
  content: string;
  category: string;
  rep_pic: string;
  music?: string;
  musicUrl?: string;
}

const FeedUpload = ({ navigation }: StackScreenProps<HomeStackParams, 'FeedUpload'>) => {
  const [feed, setFeed] = useState<FeedProps>({
    title: '',
    subtitle: '',
    content: '',
    category: '',
    rep_pic: '',
    music: '',
    musicUrl: '',
  });
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryVisible, setCategoryVisible] = useState<boolean>(false);
  const [musicVisible, setMusicVisible] = useState<boolean>(false);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: BLACK}}>
      <CustomHeader label='작성하기' onClose={() => {navigation.goBack()}} />
      <Input
        label='제목' 
        value={feed.title} 
        onChangeText={(title) => {setFeed({ ...feed, title: title})}} 
        isRequired 
        placeholder='제목을 작성해주세요' 
      />
      <Input
        label='한 줄 소개' 
        value={feed.subtitle} 
        onChangeText={(subtitle) => {setFeed({ ...feed, subtitle: subtitle})}} 
        isRequired 
        placeholder='한 줄 소개를 작성해주세요' 
      />
      <View style={{paddingHorizontal: 20, marginTop: 5, marginBottom: 15, flexDirection: 'row'}}>
        <B14>콘텐츠 선택 *</B14>
        <DropDownButton onPress={() => setCategoryVisible(true)}>
          <B14>{categories.length > 0 ? categories[0] : `카테고리`}</B14>
          <ArrowIcon color={WHITE} strokeWidth={2} />
        </DropDownButton>
      </View>
      <Input
        label='같이 들으면 좋은 음악' 
        value={feed.music} 
        onChangeText={(music) => {setFeed({ ...feed, music: music})}}
        placeholder='가수 - 제목 형식으로 입력해주세요.'
        description='우측 아이콘을 클릭해 유튜브 링크를 삽입해주세요.'
      />
      <TouchableOpacity style={{position: 'absolute', right: 20, top: 298}} onPress={() => setMusicVisible(true)}>
        <LinkIcon />
      </TouchableOpacity>
      <PhotoBox>
        <TouchableOpacity>
          <PhotoIcon />
        </TouchableOpacity>
      </PhotoBox>
      <View style={{paddingHorizontal: 20}}>
        <B14 style={{marginBottom: 10}}>내용 *</B14>
        <TextInput
          value={feed.content}
          onChangeText={(content) => {setFeed({ ...feed, content: content})}}
          style={{borderWidth: 1, borderColor: WHITE, borderRadius: 8, padding: 10, marginBottom: 20, height: 150, color: WHITE}}
          multiline
        />
        <BottomButton label='등록' onPress={() => navigation.navigate('FeedDetail')} />
      </View>
      <BottomSheetModalProvider>
        <CategoryModal categories={categories} setCategories={setCategories} categoryVisible={categoryVisible} setCategoryVisible={setCategoryVisible} unique />
      </BottomSheetModalProvider>
      <Modal visible={musicVisible} transparent>
        <View style={{backgroundColor: LIGHTBLACK, position: 'absolute', width: '80%', height: 150, top: 330, alignSelf: 'center', borderRadius: 24, paddingVertical: 15}}>
          <Input
            label='Youtube' 
            value={feed.musicUrl} 
            onChangeText={(musicUrl) => {setFeed({ ...feed, musicUrl: musicUrl})}}
            placeholder='유튜브 링크를 삽입해주세요.'
          />
          <View style={{flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between'}}>
            <TouchableOpacity 
              style={{paddingVertical: 15, paddingHorizontal: 52, backgroundColor: MINT, borderRadius: 12}} 
              onPress={() => {
                setFeed({ ...feed, musicUrl: ''}); setMusicVisible(false)
              }}
            >
              <B14 style={{color: BLACK}}>취소</B14>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{paddingVertical: 15, paddingHorizontal: 52, backgroundColor: MINT, borderRadius: 12}}
              onPress={() => setMusicVisible(false)}
            >
              <B14 style={{color: BLACK}}>완료</B14>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const DropDownButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 130px;
  border-bottom-width: 1px;
  border-bottom-color: ${WHITE};
  padding-bottom: 3px;
  margin-left: 20px;
`

const PhotoBox = styled.View`
  margin: 15px 20px;
  border-radius: 8px;
  border: 1px solid ${WHITE};
  width: 350px;
  height: 180px;
  justify-content: center;
  align-items: center;
`

export default FeedUpload;
