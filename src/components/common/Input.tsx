import { Dispatch, SetStateAction, useState } from 'react';
import { View, TextInput, TextStyle, TextInputProps } from 'react-native';
import { B14, R14 } from '../../styles/GlobalText';
import { MINT, WHITE } from '../../styles/GlobalColor';

interface InputProps extends TextInputProps {
  label: string;
  labelStyle?: TextStyle
  isRequired?: boolean;
  description?: string;
  alert?: string;
}

const InputBox = ({label, labelStyle, isRequired, value, onChangeText, placeholder, description, alert, ...rest}: InputProps) => {
  return (
    <View style={{paddingHorizontal: 20, marginTop: 5}}>
      <B14 style={{marginBottom: 5, ...labelStyle}}>{label} {isRequired && `*`}</B14>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={'#BBBBBB'}
        style={{borderBottomColor: WHITE, borderBottomWidth: 1, paddingVertical: 5, fontSize: 14, color: WHITE}}
        {...rest}
      />
      <R14 style={{marginTop: 5, color: MINT}}>{alert && alert}{description && description}</R14>
    </View>
  )
}

export default InputBox;