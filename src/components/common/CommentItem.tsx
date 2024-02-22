import { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import EditButton from './EditButton';
import { LIGHTBLACK } from '../../styles/GlobalColor';
import DotsIcon from '../../assets/common/Dots.svg';
import { B12, R12 } from '../../styles/GlobalText';

export interface CommentProps {
  writer: string;
  date: string;
  content: string;
  profile: string;
}

interface CommentItemProps extends CommentProps {
  onEdit: () => void;
  onDelete: () => void;
}

const CommentItem = ({ writer, date, content, profile, onEdit, onDelete }: CommentItemProps) => {
  const [dotPressed, setDotPressed] = useState<boolean>(false);
  return (
    <View style={{backgroundColor: LIGHTBLACK, borderRadius: 8, marginHorizontal: 30, marginTop: 10}}>
      { 
        <TouchableOpacity
          onPress={() => setDotPressed(!dotPressed)}
          style={{width: 30, height: 30, position: 'absolute', top: 0, right: 0, alignItems: 'center', justifyContent: 'center', zIndex: 1}}
        >
          <DotsIcon width={12} height={23} transform={[{ rotate: '90deg'}]} />
        </TouchableOpacity>
      }
      { dotPressed && <EditButton onEdit={onEdit} onDelete={onDelete} style={{ top: 20, right: 15 }} /> }
      <View style={{flexDirection: 'row', padding: 15, alignItems: 'center'}}>
        <Image source={{uri: profile}} style={{width: 30, height: 30, borderRadius: 180}} />
        <View style={{marginLeft: 10}}>
          <View style={{flexDirection: 'row', marginVertical: 5}}>
            <B12>{writer}</B12>
            <R12 style={{color: '#BBBBBB', fontSize: 10, marginLeft: 5}}>{date}</R12>
          </View>
          <B12 style={{lineHeight: 24}}>{content}</B12>
        </View>
      </View>
    </View>
  )
}

export default CommentItem;