import { Dispatch, SetStateAction, useState } from 'react';
import { View, TextInput, TextStyle, TextInputProps } from 'react-native';
import { B14, R14 } from '../../styles/GlobalText';
import { GRAY, MINT, WHITE } from '../../styles/GlobalColor';

interface InputProps extends TextInputProps {
  label: string;
  labelStyle?: TextStyle
  isRequired?: boolean;
  description?: string;
  alert?: string;
}

const Input = ({label, labelStyle, isRequired, value, onChangeText, placeholder, description, alert, ...rest}: InputProps) => {
  return (
    <View style={{paddingHorizontal: 20, marginTop: 5, marginBottom: (description || alert) ? 10 : 0}}>
      <B14 style={{marginBottom: 5, ...labelStyle}}>{label} {isRequired && `*`}</B14>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={GRAY}
        style={{borderBottomColor: WHITE, borderBottomWidth: 1, paddingVertical: 5, fontSize: 14, color: WHITE}}
        {...rest}
      />
      <R14 style={{marginTop: 5, color: MINT}}>{alert && alert}{description && description}</R14>
    </View>
  )
}

export default Input;