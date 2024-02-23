import { useState, useEffect } from 'react';
import { Text, TextInput, SafeAreaView, View, TouchableOpacity, Dimensions, Image, Alert, Modal } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from '../../pages/Home';
import styled from 'styled-components/native';
import CustomHeader from '../common/CustomHeader';
import Input from '../common/Input';
import BottomButton from '../common/BottomButton';
import { BLACK, WHITE } from '../../styles/GlobalColor';
import { B14 } from '../../styles/GlobalText';
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
        <DropDownButton>
          <B14>{feed.category}영화</B14>
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
      <TouchableOpacity style={{position: 'absolute', right: 20, top: 298}}>
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
