import { TouchableOpacity, ViewStyle } from 'react-native';
import HeartIcon from '../../assets/common/Heart.svg';
import { BLACK, PURPLE } from '../../styles/GlobalColor';

interface HeartButtonProps {
  like: boolean;
  onPress: () => void;
  style?: ViewStyle
}

const HeartButton = ({ like, onPress, style }: HeartButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={{width: 40, height: 40, alignItems: 'center', justifyContent: 'center', ...style}}>
      <HeartIcon color={like ? PURPLE : 'transparent'} />
    </TouchableOpacity>
  )
}

export default HeartButton;