import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';

interface CustomTextProps extends TextProps {
  style?: any;
}

export function CustomText({
  children,
  style,
  ...rest
}: CustomTextProps): JSX.Element {
  return (
    <Text style={{ fontFamily: 'Pretendard Variable', ...style }} {...rest}>
      {children}
    </Text>
  );
}
