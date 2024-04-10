import { BLACK } from './GlobalColor';
import { CustomText as Text } from './CustomText';

export const B24 = ({ children, style, ...rest }: any) => {
  return (
    <Text
      {...rest}
      style={{
        fontSize: 24,
        fontWeight: '700',
        color: BLACK,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const B20 = ({ children, style, ...rest }: any) => {
  return (
    <Text
      {...rest}
      style={{
        fontSize: 20,
        fontWeight: '700',
        color: BLACK,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const B16 = ({ children, style, ...rest }: any) => {
  return (
    <Text
      {...rest}
      style={{
        fontSize: 16,
        fontWeight: '700',
        color: BLACK,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const B14 = ({ children, style, ...rest }: any) => {
  return (
    <Text
      {...rest}
      style={{
        fontSize: 14,
        fontWeight: '700',
        color: BLACK,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const B12 = ({ children, style, ...rest }: any) => {
  return (
    <Text
      {...rest}
      style={{
        fontSize: 12,
        fontWeight: '700',
        color: BLACK,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const R20 = ({ children, style, ...rest }: any) => {
  return (
    <Text
      {...rest}
      style={{
        fontSize: 20,
        color: BLACK,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const R16 = ({ children, style, ...rest }: any) => {
  return (
    <Text
      {...rest}
      style={{
        fontSize: 16,
        color: BLACK,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const R14 = ({ children, style, ...rest }: any) => {
  return (
    <Text
      {...rest}
      style={{
        fontSize: 14,
        color: BLACK,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const R12 = ({ children, style, ...rest }: any) => {
  return (
    <Text
      {...rest}
      style={{
        fontSize: 12,
        color: BLACK,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const Emphasis = ({ children, style, ...rest }: any) => {
  return (
    <Text
      {...rest}
      style={{
        fontSize: 24,
        color: BLACK,
        fontWeight: 700,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const Title = ({ children, style, ...rest }: any) => {
  return (
    <Text
      {...rest}
      style={{
        fontSize: 20,
        color: BLACK,
        fontWeight: 700,
        lineHeight: 24,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const Subtitle = ({ children, style, ...rest }: any) => {
  return (
    <Text
      {...rest}
      style={{
        fontSize: 18,
        color: BLACK,
        fontWeight: 600,
        lineHeight: 24,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const Body = ({ children, style, ...rest }: any) => {
  return (
    <Text
      {...rest}
      style={{
        fontSize: 16,
        color: BLACK,
        fontWeight: 500,
        lineHeight: 24,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const Label = ({ children, style, ...rest }: any) => {
  return (
    <Text
      {...rest}
      style={{
        fontSize: 14,
        color: BLACK,
        fontWeight: 700,
        lineHeight: 24,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const Content = ({ children, style, ...rest }: any) => {
  return (
    <Text
      {...rest}
      style={{
        fontSize: 14,
        color: BLACK,
        fontWeight: 400,
        lineHeight: 24,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const Caption = ({ children, style, ...rest }: any) => {
  return (
    <Text
      {...rest}
      style={{
        fontSize: 12,
        color: BLACK,
        fontWeight: 400,
        lineHeight: 24,
        ...style,
      }}>
      {children}
    </Text>
  );
};
