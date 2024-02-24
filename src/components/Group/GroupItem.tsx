import { useState } from 'react';
import { View, TouchableOpacity, ImageBackground, Touchable } from 'react-native';
import EditButton from '../common/EditButton';
import DotsIcon from '../../assets/common/Dots.svg';
import { B14, B20 } from '../../styles/GlobalText';
import { BLACK } from '../../styles/GlobalColor';

export interface GroupProps {
  name: string;
  introduction: string;
  rep_pic: string;
}

interface GroupItemProps extends GroupProps {
  onPress: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onQuit?: () => void;
}

const GroupItem = ({ name, introduction, rep_pic, onPress, onEdit, onDelete, onQuit }: GroupItemProps) => {
  const [dotPressed, setDotPressed] = useState<boolean>(false);
  return (
    <TouchableOpacity onPress={onPress} style={{paddingBottom: 20}}>
      <ImageBackground source={{uri: rep_pic}} style={{width: 350, height: 220, justifyContent: 'center', alignItems: 'center'}} imageStyle={{borderRadius: 5}}>
        <View style={{position: 'absolute', backgroundColor: 'black', width: '100%', height: '100%', opacity: 0.2, borderRadius: 5}} />
        { 
          <TouchableOpacity
            onPress={() => setDotPressed(!dotPressed)}
            style={{width: 30, height: 30, position: 'absolute', top: 0, right: 0, alignItems: 'center', justifyContent: 'center', zIndex: 1}}
          >
            <DotsIcon width={12} height={23} transform={[{ rotate: '90deg'}]} />
          </TouchableOpacity>
        }
        { dotPressed && ( name ?
          <EditButton onEdit={onEdit!} onDelete={onDelete!} style={{ top: 25, right: 15 }} />
          :
          <TouchableOpacity onPress={onQuit!} style={{position: 'absolute', backgroundColor: BLACK, width: 100, borderRadius: 12, top: 25, right: 15 }}>
            <B14 style={{textAlign: 'center', paddingVertical: 10}}>나가기</B14>
          </TouchableOpacity>
        )}
        <B20 style={{marginBottom: 5}}>{name}</B20>
        <B14>{introduction}</B14>
      </ImageBackground>
    </TouchableOpacity>
  )
}

export default GroupItem;