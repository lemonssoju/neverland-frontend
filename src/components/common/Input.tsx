import { Dispatch, SetStateAction, useState } from 'react';
import { View, TextInput, TextStyle, TextInputProps } from 'react-native';
import { B14, Caption, Label, R14 } from '../../styles/GlobalText';
import { BLACK, GRAY, MINT, PURPLE, WHITE } from '../../styles/GlobalColor';

interface InputProps extends TextInputProps {
  label: string;
  isRequired?: boolean;
  description?: string;
  isAlert?: boolean;
  alert?: string;
}

const Input = ({
  label,
  isRequired,
  value,
  onChangeText,
  placeholder,
  description,
  isAlert,
  alert,
  ...rest
}: InputProps) => {
  return (
    <View
      style={{
        marginTop: 5,
        marginBottom: description || alert ? 10 : 0,
      }}>
      <Label>
        {label} {isRequired && `*`}
      </Label>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={GRAY}
        style={{
          borderColor: GRAY,
          borderWidth: 1,
          paddingVertical: 10,
          paddingHorizontal: 5,
          borderRadius: 2,
          fontSize: 14,
          color: BLACK,
        }}
        {...rest}
      />
      <Caption style={{ marginTop: 3, color: PURPLE }}>
        {isAlert && alert}
        {description && description}{''}
      </Caption>
    </View>
  );
};

export default Input;
