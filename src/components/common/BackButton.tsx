import { TouchableOpacity } from 'react-native';
import ArrowIcon from '../../assets/common/Arrow.svg';
import { WHITE } from '../../styles/GlobalColor';

interface BackButtonProps {
  onPress: () => void;
}

const BackButton = ({ onPress }: BackButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}}>
      <ArrowIcon width={24} height={24} color={WHITE} strokeWidth={1.5} transform={[{ rotate: '90deg' }]} />
    </TouchableOpacity>
  )
}

export default BackButton;