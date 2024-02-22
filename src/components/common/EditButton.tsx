import { View, TouchableOpacity, ViewStyle } from 'react-native';
import { B14 } from '../../styles/GlobalText';
import { BLACK, WHITE } from '../../styles/GlobalColor';

interface EditButtonProps {
  onEdit: () => void;
  onDelete: () => void;
  style?: ViewStyle;
}

const EditButton = ({ onEdit, onDelete, style }: EditButtonProps) => {
  return (
    <View style={{position: 'absolute', backgroundColor: BLACK, width: 100, borderRadius: 12, ...style}}>
      <TouchableOpacity onPress={onEdit} style={{paddingVertical: 10}}>
        <B14 style={{textAlign: 'center'}}>수정</B14>
      </TouchableOpacity>
      <View style={{height: 1, width: '100%', backgroundColor: WHITE}} />
      <TouchableOpacity onPress={onDelete} style={{paddingVertical: 10}}>
        <B14 style={{textAlign: 'center'}}>삭제</B14>
      </TouchableOpacity>
    </View>
  )
}

export default EditButton;