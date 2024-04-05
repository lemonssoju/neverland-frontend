import { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import {
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
  View,
  Pressable,
} from 'react-native';
import { ProfileStackParams } from '../../pages/Group/PuzzleStack';
import CustomHeader from '../common/CustomHeader';
import styled from 'styled-components/native';
import { BLACK, LIGHTBLACK, MINT } from '../../styles/GlobalColor';
import { B14, B16 } from '../../styles/GlobalText';
import PhotoButton from '../common/PhotoButton';
import Input from '../common/Input';
import BottomButton from '../common/BottomButton';
import { Asset } from 'react-native-image-picker';
import LinkIcon from '../../assets/common/Link.svg';

export interface ProfileProps {
  nickname: string;
  introduction?: string;
  rep_pic?: string;
  music?: string;
  musicUrl?: string;
}

const ProfileEdit = ({
  navigation,
}: StackScreenProps<ProfileStackParams, 'ProfileEdit'>) => {
  const [profile, setProfile] = useState<ProfileProps>({
    nickname: '황은정',
    introduction: '너 ㄸĦ문øłl ㅁı쳐',
    rep_pic: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg',
    music: '미쓰에이 - Bad girl Good girl',
    musicUrl: 'https://youtu.be/8TeeJvcBdLA?si=yffEamC12OAFs7HQ',
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
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader label="프로필 편집" onBack={() => navigation.goBack()} />
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <Image
          source={{ uri: profile.rep_pic }}
          style={{ width: 85, height: 85, borderRadius: 180 }}
        />
        <TouchableOpacity style={{ marginTop: 10 }}>
          <B16>사진 수정</B16>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, marginTop: 20 }}>
        <Input
          label="닉네임"
          isRequired
          value={profile.nickname}
          onChangeText={nickname =>
            setProfile({ ...profile, nickname: nickname })
          }
        />
        <DuplicateButton style={{ top: 10 }}>
          <B16 style={{ color: BLACK }}>중복 확인</B16>
        </DuplicateButton>
        <Input
          label="상태 메시지"
          value={profile.introduction}
          onChangeText={introduction =>
            setProfile({ ...profile, introduction: introduction })
          }
          placeholder="상태 메시지를 작성해주세요."
        />
        <Input
          label="프로필 뮤직"
          value={profile.music}
          onChangeText={music => setProfile({ ...profile, music: music })}
          placeholder="가수 - 제목 형식으로 입력해주세요."
          description="우측 아이콘을 클릭해 유튜브 링크를 삽입해주세요."
        />
        <TouchableOpacity
          style={{ position: 'absolute', right: 20, top: 175 }}
          onPress={() => setMusicVisible(true)}>
          <LinkIcon />
        </TouchableOpacity>
      </View>
      <BottomButton
        label="수정 완료"
        onPress={() => navigation.navigate('ProfileHome')}
      />
      <Modal visible={musicVisible} transparent>
        <Pressable
          style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
          onPress={() => setMusicVisible(false)}
        />
        <View
          style={{
            backgroundColor: LIGHTBLACK,
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
            value={profile.musicUrl}
            onChangeText={musicUrl => {
              setProfile({ ...profile, musicUrl: musicUrl });
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
                setProfile({ ...profile, musicUrl: '' });
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

const DuplicateButton = styled.TouchableOpacity`
  background: ${MINT};
  padding: 10px 15px;
  position: absolute;
  border-radius: 12px;
  right: 20px;
`;

export default ProfileEdit;
