import { Text } from 'react-native';
import { WHITE } from './GlobalColor';

export const B20 = ({ children, style }: any) => {
  return (
    <Text style={{
      fontSize: 20,
      fontWeight: '700',
      color: WHITE,
      ...style
    }}>
      {children}
    </Text>
  )
}

export const B16 = ({ children, style }: any) => {
  return (
    <Text style={{
      fontSize: 16,
      fontWeight: '700',
      color: WHITE,
      ...style
    }}>
      {children}
    </Text>
  )
}

export const B14 = ({ children, style }: any) => {
  return (
    <Text style={{
      fontSize: 14,
      fontWeight: '700',
      color: WHITE,
      ...style
    }}>
      {children}
    </Text>
  )
}

export const B12 = ({ children, style }: any) => {
  return (
    <Text style={{
      fontSize: 12,
      fontWeight: '700',
      color: WHITE,
      ...style
    }}>
      {children}
    </Text>
  )
}

export const R20 = ({ children, style }: any) => {
  return (
    <Text style={{
      fontSize: 20,
      color: WHITE,
      ...style
    }}>
      {children}
    </Text>
  )
}

export const R16 = ({ children, style }: any) => {
  return (
    <Text style={{
      fontSize: 16,
      color: WHITE,
      ...style
    }}>
      {children}
    </Text>
  )
}

export const R14 = ({ children, style }: any) => {
  return (
    <Text style={{
      fontSize: 14,
      color: WHITE,
      ...style
    }}>
      {children}
    </Text>
  )
}

export const R12 = ({ children, style }: any) => {
  return (
    <Text style={{
      fontSize: 12,
      color: WHITE,
      ...style
    }}>
      {children}
    </Text>
  )
}