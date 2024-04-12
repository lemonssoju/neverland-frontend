import { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import EditButton from '../common/EditButton';
import { BLACK, GRAY, LIGHTGRAY, LIGHTPURPLE } from '../../styles/GlobalColor';
import DotsIcon from '../../assets/common/Dots.svg';
import {
  Label,
  Content,
  Caption,
  Body,
} from '../../styles/GlobalText';
import { SubfeedProps } from './SubfeedUpload';

interface SubfeedItemProps extends SubfeedProps {
  onEdit: () => void;
  onDelete: () => void;
  background: string;
  isLast: boolean;
  user: string;
}

const SubfeedItem = ({
  writer,
  content,
  profile,
  background,
  user,
  onEdit,
  onDelete,
  isLast,
}: SubfeedItemProps) => {
  const [dotPressed, setDotPressed] = useState<boolean>(false);
  return (
    <View style={{ paddingTop: 10, paddingHorizontal: 15 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: profile }}
          style={{ width: 32, height: 32, borderRadius: 180, marginRight: 5 }}
        />
        <Label>{writer}</Label>
      </View>
      <View
        style={{
          backgroundColor: background,
          marginVertical: 8,
          marginLeft: 35,
          borderRadius: 12,
          paddingVertical: 12,
          paddingHorizontal: 20,
        }}>
        {user === writer && (
          <TouchableOpacity
            onPress={() => setDotPressed(!dotPressed)}
            style={{
              width: 30,
              height: 30,
              position: 'absolute',
              top: 8,
              right: 0,
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}>
            <DotsIcon
              color={BLACK}
              width={12}
              height={23}
              transform={[{ rotate: '90deg' }]}
            />
          </TouchableOpacity>
        )}
        {dotPressed && (
          <EditButton
            editLabel="수정"
            deleteLabel="삭제"
            onEdit={onEdit}
            onDelete={onDelete}
            style={{ top: 30, right: 15 }}
          />
        )}
        <Body>{content}</Body>
      </View>
      {!isLast && (
        <View
          style={{
            position: 'absolute',
            left: 31,
            top: 42,
            backgroundColor: LIGHTGRAY,
            width: 1.6,
            height: '100%',
          }}
        />
      )}
    </View>
  );
};

export default SubfeedItem;
