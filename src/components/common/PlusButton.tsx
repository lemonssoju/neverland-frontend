import { TouchableOpacity } from 'react-native';
import PlusIcon from '../../assets/common/Plus.svg';
import { PURPLE } from '../../styles/GlobalColor';

interface PlusButtonProps {
  onPress: () => void;
}

const PlusButton = ({ onPress }: PlusButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: PURPLE, 
        width: 50, 
        height: 50, 
        position: 'absolute', 
        bottom: 20, 
        right: 20, 
        borderRadius: 180
      }}
    >
      <PlusIcon />
    </TouchableOpacity>
  )
}

export default PlusButton;