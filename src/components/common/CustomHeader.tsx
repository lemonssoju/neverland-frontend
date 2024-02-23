import { View, TouchableOpacity } from 'react-native';
import BackButton from './BackButton';
import { B24 } from '../../styles/GlobalText';
import CloseIcon from '../../assets/common/Close.svg';

interface CustomHeaderProps {
  label: string;
  onBack?: () => void;
  onClose?: () => void;
}

const CustomHeader = ({ label, onBack, onClose }: CustomHeaderProps) => {
  return (
    <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
      {onBack && 
        <View style={{position: 'absolute'}}>
          <BackButton onPress={onBack} />
        </View>
      }
      <B24 style={{flex: 1, textAlign: 'center'}}>{label}</B24>
      {onClose && 
        <TouchableOpacity onPress={onClose} style={{position: 'absolute', right: 5, width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}}>
          <CloseIcon />
        </TouchableOpacity>
      }
    </View>
  )
}

export default CustomHeader;