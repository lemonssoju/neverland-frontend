import { TouchableOpacity, ViewStyle } from 'react-native';

const IconButton = ({
  onPress,
  children,
  style,
}: {
  onPress: () => void;
  children: any;
  style?: ViewStyle;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        zIndex: 1,
        bottom: 0,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}>
      {children}
    </TouchableOpacity>
  );
};

export default IconButton;
