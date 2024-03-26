import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  View,
  Image,
  FlatList,
} from 'react-native';
import styled from 'styled-components/native';
import CustomHeader from '../common/CustomHeader';
import Input from '../common/Input';
import BottomButton from '../common/BottomButton';
import PhotoButton from '../common/PhotoButton';
import SearchBar from '../common/SearchBar';
import { Asset } from 'react-native-image-picker';
import { BLACK, LIGHTBLACK, MINT, WHITE } from '../../styles/GlobalColor';
import { B12, B14 } from '../../styles/GlobalText';

export interface GroupProps {
  name: string;
  introduction: string;
  rep_pic: string;
  members: string[];
}

interface GroupUploadProps {
  setFormVisible: Dispatch<SetStateAction<boolean>>;
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

const CreateGroup = ({ setFormVisible }: GroupUploadProps) => {
  const [group, setGroup] = useState<GroupProps>({
    name: '',
    introduction: '',
    rep_pic: '',
    members: [],
  });
  const [photo, setPhoto] = useState<Asset[]>([
    {
      fileName: '',
      width: 0,
      height: 0,
      uri: '',
    },
  ]);
  const [search, setSearch] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(true);

  const onSearch = () => {
    if (search.length > 0) setIsSearching(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BLACK }}>
      <CustomHeader
        label="그룹 만들기"
        onClose={() => {
          setFormVisible(false);
        }}
      />
      <PhotoBox>
        <PhotoButton photo={photo} setPhoto={setPhoto} />
      </PhotoBox>
      <View style={{ width: '95%', alignSelf: 'center' }}>
        <Input
          label="그룹명"
          value={group.name}
          onChangeText={name => {
            setGroup({ ...group, name: name });
          }}
          isRequired
          placeholder="그룹명을 작성해주세요"
        />
        <Input
          label="한 줄 소개"
          value={group.introduction}
          onChangeText={introduction => {
            setGroup({ ...group, introduction: introduction });
          }}
          isRequired
          placeholder="한 줄 소개를 작성해주세요"
        />
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <B14>친구 초대</B14>
            <SearchBar
              search={search}
              setSearch={setSearch}
              isSearching={isSearching}
              setIsSearching={setIsSearching}
              placeholder="친구의 닉네임을 검색하세요"
              style={{ width: 290, marginLeft: 5 }}
              onSubmitEditing={onSearch}
            />
          </View>
          <FlatList
            data={data}
            style={{
              borderWidth: 1,
              borderColor: WHITE,
              borderRadius: 8,
              maxHeight: 200,
              marginBottom: 20,
              marginTop: 15,
            }}
            renderItem={({ item }: any) => {
              const { rep_pic, nickname } = item;
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottomWidth: 1,
                    borderBottomColor: WHITE,
                    padding: 10,
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={{ uri: rep_pic }}
                      style={{ width: 30, height: 30, borderRadius: 180 }}
                    />
                    <B14 style={{ marginLeft: 10 }}>{nickname}</B14>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      group.members.includes(nickname)
                        ? setGroup({
                            ...group,
                            members: group.members.filter(
                              (member: string) => member !== nickname,
                            ),
                          })
                        : setGroup({
                            ...group,
                            members: [...group.members, nickname],
                          });
                    }}
                    style={{
                      width: 80,
                      height: 25,
                      backgroundColor: group.members.includes(nickname)
                        ? LIGHTBLACK
                        : MINT,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 12,
                    }}>
                    <B12
                      style={{
                        color: group.members.includes(nickname) ? WHITE : BLACK,
                      }}>
                      {group.members.includes(nickname) ? '초대 완료' : '초대'}
                    </B12>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          <BottomButton
            label="등록"
            onPress={() => {
              setFormVisible(false);
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const PhotoBox = styled.View`
  margin: 15px 20px;
  border-radius: 8px;
  border: 1px solid ${WHITE};
  width: 80%;
  height: 220px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export default CreateGroup;
