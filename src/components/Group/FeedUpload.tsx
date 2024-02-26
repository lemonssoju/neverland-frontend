import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { Text, ScrollView, TextInput, SafeAreaView, View, TouchableOpacity, Pressable, Modal } from 'react-native';
import styled from 'styled-components/native';
import CustomHeader from '../common/CustomHeader';
import Input from '../common/Input';
import BottomButton from '../common/BottomButton';
import PhotoButton from '../common/PhotoButton';
import { Asset } from 'react-native-image-picker';
import { BLACK, LIGHTBLACK, MINT, WHITE } from '../../styles/GlobalColor';
import { B14 } from '../../styles/GlobalText';
import LinkIcon from '../../assets/common/Link.svg';

export interface FeedProps {
  title: string;
  subtitle: string;
  content: string;
  rep_pic: string;
  music?: string;
  musicUrl?: string;
}

interface FeedUploadProps {
  setFormVisible: Dispatch<SetStateAction<boolean>>;
}

const FeedUpload = ({ setFormVisible }: FeedUploadProps) => {
  const [feed, setFeed] = useState<FeedProps>({
    title: '',
    subtitle: '',
    content: '',
    rep_pic: '',
    music: '',
    musicUrl: '',
  });
  const [musicVisible, setMusicVisible] = useState<boolean>(false);
  const [photo, setPhoto] = useState<Asset[]>([{
    fileName: '',
    width: 0,
    height: 0,
    uri: ''
  }]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: BLACK}}>
      <CustomHeader label='작성하기' onClose={() => {setFormVisible(false)}} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <PhotoBox>
          <PhotoButton photo={photo} setPhoto={setPhoto} />
        </PhotoBox>
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
        <Input
          label='같이 들으면 좋은 음악' 
          value={feed.music} 
          onChangeText={(music) => {setFeed({ ...feed, music: music})}}
          placeholder='가수 - 제목 형식으로 입력해주세요.'
          description='우측 아이콘을 클릭해 유튜브 링크를 삽입해주세요.'
        />
        <TouchableOpacity style={{position: 'absolute', right: 20, top: 423}} onPress={() => setMusicVisible(true)}>
          <LinkIcon />
        </TouchableOpacity>
        <View style={{paddingHorizontal: 20, paddingTop: 15}}>
          <B14 style={{marginBottom: 10}}>내용 *</B14>
          <TextInput
            value={feed.content}
            onChangeText={(content) => {setFeed({ ...feed, content: content})}}
            style={{borderWidth: 1, borderColor: WHITE, borderRadius: 8, padding: 10, marginBottom: 20, height: 150, color: WHITE}}
            multiline
          />
          <BottomButton label='등록' onPress={() => { setFormVisible(false) }} />
        </View>
      </ScrollView>
      <Modal visible={musicVisible} transparent>
        <Pressable style={{flex:1, backgroundColor:'rgba(0, 0, 0, 0.2)'}} onPress={() => setMusicVisible(false)} />
        <View style={{backgroundColor: LIGHTBLACK, position: 'absolute', width: '80%', height: 150, top: 340, alignSelf: 'center', borderRadius: 24, paddingVertical: 15}}>
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

const PhotoBox = styled.View`
  margin: 15px 20px;
  border-radius: 8px;
  border: 1px solid ${WHITE};
  width: 80%;
  height: 220px;
  justify-content: center;
  align-items: center;
  align-self: center;
`

export default FeedUpload;
