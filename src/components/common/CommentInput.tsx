import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import SendIcon from '../../assets/common/Send.svg';
import { LIGHTBLACK } from '../../styles/GlobalColor';

interface CommentInputProps {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  onPress: () => void;
}

const CommentInput = ({ comment, setComment, onPress }: CommentInputProps) => {
  return (
    <View>
      <TextInput
        value={comment}
        onChangeText={(text: string) => {
          setComment(text);
        }}
        placeholder='댓글을 남겨주세요.'
        placeholderTextColor={'#BBBBBB'}
        style={{paddingVertical: 10, paddingHorizontal: 15, backgroundColor: LIGHTBLACK, borderRadius: 36, color: '#BBBBBB', fontSize: 12}}
      />
      <TouchableOpacity onPress={onPress} style={{position: 'absolute', right: 12, top: 8}}>
        <SendIcon />
      </TouchableOpacity>
    </View>
  )
}

export default CommentInput;