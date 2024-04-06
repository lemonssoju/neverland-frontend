import { TouchableOpacity } from 'react-native';
import { B20, Title } from '../../styles/GlobalText';
import { PURPLE, WHITE } from '../../styles/GlobalColor';

interface BottomButtonProps {
  label: string;
  onPress: () => void;
}

const BottomButton = ({ label, onPress }: BottomButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={{backgroundColor: PURPLE, width: 350, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 8, alignSelf: 'center' }}>
      <Title style={{color: WHITE}}>{label}</Title>
    </TouchableOpacity>
  )
}

export default BottomButton;