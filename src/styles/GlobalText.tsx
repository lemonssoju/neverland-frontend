import { Text, TextProps } from 'react-native';
import { WHITE } from './GlobalColor';

export const B24 = ({ children, style, ...rest }: any) => {
  return (
    <Text
      {...rest}
      style={{
      fontSize: 24,
      fontWeight: '700',
      color: WHITE,
      ...style
    }}>
      {children}
    </Text>
  )
}

export const B20 = ({ children, style, ...rest }: any) => {
  return (
    <Text 
      {...rest}
      style={{
      fontSize: 20,
      fontWeight: '700',
      color: WHITE,
      ...style
    }}>
      {children}
    </Text>
  )
}

export const B16 = ({ children, style, ...rest }: any) => {
  return (
    <Text 
      {...rest}
      style={{
      fontSize: 16,
      fontWeight: '700',
      color: WHITE,
      ...style
    }}>
      {children}
    </Text>
  )
}

export const B14 = ({ children, style, ...rest }: any) => {
  return (
    <Text 
      {...rest}
      style={{
      fontSize: 14,
      fontWeight: '700',
      color: WHITE,
      ...style
    }}>
      {children}
    </Text>
  )
}

export const B12 = ({ children, style, ...rest }: any) => {
  return (
    <Text 
      {...rest}
      style={{
      fontSize: 12,
      fontWeight: '700',
      color: WHITE,
      ...style
    }}>
      {children}
    </Text>
  )
}

export const R20 = ({ children, style, ...rest }: any) => {
  return (
    <Text 
      {...rest}
      style={{
      fontSize: 20,
      color: WHITE,
      ...style
    }}>
      {children}
    </Text>
  )
}

export const R16 = ({ children, style, ...rest }: any) => {
  return (
    <Text 
      {...rest}
      style={{
      fontSize: 16,
      color: WHITE,
      ...style
    }}>
      {children}
    </Text>
  )
}

export const R14 = ({ children, style, ...rest }: any) => {
  return (
    <Text 
      {...rest}
      style={{
      fontSize: 14,
      color: WHITE,
      ...style
    }}>
      {children}
    </Text>
  )
}

export const R12 = ({ children, style, ...rest }: any) => {
  return (
    <Text 
      {...rest}
      style={{
      fontSize: 12,
      color: WHITE,
      ...style
    }}>
      {children}
    </Text>
  )
}