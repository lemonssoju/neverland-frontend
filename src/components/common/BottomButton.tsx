import { TouchableOpacity } from 'react-native';
import { B20 } from '../../styles/GlobalText';
import { BLACK, MINT } from '../../styles/GlobalColor';

interface BottomButtonProps {
  label: string;
  onPress: () => void;
}

const BottomButton = ({ label, onPress }: BottomButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={{backgroundColor: MINT, width: 350, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 12 }}>
      <B20 style={{color: BLACK}}>{label}</B20>
    </TouchableOpacity>
  )
}

export default BottomButton;