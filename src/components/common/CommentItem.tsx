import { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import EditButton from './EditButton';
import { BLACK, GRAY, LIGHTPURPLE } from '../../styles/GlobalColor';
import DotsIcon from '../../assets/common/Dots.svg';
import { B12, R12, Label, Content, Caption } from '../../styles/GlobalText';

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

const CommentItem = ({
  writer,
  date,
  content,
  profile,
  onEdit,
  onDelete,
}: CommentItemProps) => {
  const [dotPressed, setDotPressed] = useState<boolean>(false);
  return (
    <View
      style={{
        backgroundColor: LIGHTPURPLE,
        borderRadius: 8,
        marginHorizontal: 20,
        marginTop: 10,
      }}>
      {
        <TouchableOpacity
          onPress={() => setDotPressed(!dotPressed)}
          style={{
            width: 30,
            height: 30,
            position: 'absolute',
            top: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}>
          <DotsIcon color={BLACK} width={12} height={23} transform={[{ rotate: '90deg' }]} />
        </TouchableOpacity>
      }
      {dotPressed && (
        <EditButton
          editLabel='수정'
          deleteLabel='삭제'
          onEdit={onEdit}
          onDelete={onDelete}
          style={{ top: 20, right: 15 }}
        />
      )}
      <View style={{ flexDirection: 'row', padding: 18, alignItems: 'center' }}>
        <Image
          source={{ uri: profile }}
          style={{ width: 36, height: 36, borderRadius: 180 }}
        />
        <View style={{ marginLeft: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <Label>{writer}</Label>
            <Caption style={{ color: GRAY, fontSize: 10, marginLeft: 5 }}>
              {date}
            </Caption>
          </View>
          <Content style={{ lineHeight: 24 }}>{content}</Content>
        </View>
      </View>
    </View>
  );
};

export default CommentItem;
