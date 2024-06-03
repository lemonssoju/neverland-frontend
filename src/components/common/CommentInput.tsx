import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import SendIcon from '../../assets/common/Send.svg';
import { GRAY, LIGHTPURPLE, MIDPURPLE } from '../../styles/GlobalColor';
import IconButton from './IconButton';

interface CommentInputProps {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  onPress: () => void;
  focusInput: boolean;
}

const CommentInput = ({
  comment,
  setComment,
  onPress,
  focusInput,
}: CommentInputProps) => {
  const inputRef = useRef<TextInput>(null);
  useEffect(() => {
    if (focusInput) {
      inputRef.current?.focus();
    }
  }, [focusInput]);
  return (
    <View
      style={{
        borderColor: MIDPURPLE,
        borderWidth: 1,
        borderRadius: 8,
      }}>
      <TextInput
        value={comment}
        ref={inputRef}
        onChangeText={(text: string) => {
          setComment(text);
        }}
        blurOnSubmit={false}
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
      <IconButton
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
      </IconButton>
    </View>
  );
};

export default CommentInput;
