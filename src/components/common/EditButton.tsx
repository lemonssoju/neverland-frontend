import { View, TouchableOpacity, ViewStyle } from 'react-native';
import { Label } from '../../styles/GlobalText';
import { BLACK, MIDPURPLE, WHITE } from '../../styles/GlobalColor';

interface EditButtonProps {
  onEdit: () => void;
  onDelete: () => void;
  style?: ViewStyle;
}

const EditButton = ({ onEdit, onDelete, style }: EditButtonProps) => {
  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 1,
        backgroundColor: MIDPURPLE,
        width: 100,
        borderRadius: 12,
        ...style,
      }}>
      <TouchableOpacity onPress={onEdit} style={{ paddingVertical: 5 }}>
        <Label style={{ textAlign: 'center', fontWeight: '500' }}>수정</Label>
      </TouchableOpacity>
      <View style={{ height: 1, width: '100%', backgroundColor: WHITE }} />
      <TouchableOpacity onPress={onDelete} style={{ paddingVertical: 5 }}>
        <Label style={{ textAlign: 'center', fontWeight: '500' }}>삭제</Label>
      </TouchableOpacity>
    </View>
  );
};

export default EditButton;
