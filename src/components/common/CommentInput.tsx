import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import SendIcon from '../../assets/common/Send.svg';
import { GRAY, LIGHTPURPLE, MIDPURPLE } from '../../styles/GlobalColor';

interface CommentInputProps {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  onPress: () => void;
}

const CommentInput = ({ comment, setComment, onPress }: CommentInputProps) => {
  return (
    <View
      style={{
        borderColor: MIDPURPLE,
        borderWidth: 1,
        borderRadius: 8,
      }}>
      <TextInput
        value={comment}
        onChangeText={(text: string) => {
          setComment(text);
        }}
        placeholder="댓글을 남겨주세요."
        placeholderTextColor={GRAY}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 12,
          color: GRAY,
          fontSize: 16,
          width: '90%',
        }}
      />
      <TouchableOpacity
        onPress={onPress}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: '10%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SendIcon />
      </TouchableOpacity>
    </View>
  );
};

export default CommentInput;
