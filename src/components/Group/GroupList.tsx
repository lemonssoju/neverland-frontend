import { useState } from 'react';
import { FlatList, Modal, SafeAreaView, View } from 'react-native';
import CustomHeader from '../common/CustomHeader';
import GroupItem from './GroupItem';
import PlusButton from '../common/PlusButton';
import { StackScreenProps } from '@react-navigation/stack';
import { GroupStackParams } from '../../pages/Group';
import CreateGroup from './CreateGroup';

const groupData = [
  {
    name: '망미동 여걸사총사',
    introduction: '춤출 땐 Bad girl, 사랑은 Good girl',
    rep_pic: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg'
  },
  {
    name: '망미동 여걸사총사',
    introduction: '춤출 땐 Bad girl, 사랑은 Good girl',
    rep_pic: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg'
  },
  {
    name: '망미동 여걸사총사',
    introduction: '춤출 땐 Bad girl, 사랑은 Good girl',
    rep_pic: 'https://i.ytimg.com/vi/PFsH2I7xeFA/hqdefault.jpg'
  }
]

const GroupList = ({ navigation }: StackScreenProps<GroupStackParams, 'GroupList'>) => {
  const [formVisible, setFormVisible] = useState<boolean>(false);
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader label='그룹 모아보기' />
      <FlatList
        data={groupData}
        style={{paddingHorizontal: 20, paddingTop: 10}}
        showsVerticalScrollIndicator={false}
        renderItem={({item}: any) => {
          const { name, introduction, rep_pic } = item;
          return (
            <GroupItem name={name} introduction={introduction} rep_pic={rep_pic} onPress={() => {navigation.navigate('FeedList')}} />
          )
        }}
      />
      <PlusButton onPress={() => { setFormVisible(true) }} />
      <Modal visible={formVisible} animationType='slide'>
        <CreateGroup setFormVisible={setFormVisible} />
      </Modal>
    </SafeAreaView>
  )
}

export default GroupList;