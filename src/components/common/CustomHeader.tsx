import { View, TouchableOpacity } from 'react-native';
import { Title } from '../../styles/GlobalText';
import ArrowIcon from '../../assets/common/Arrow.svg';
import CloseIcon from '../../assets/common/Close.svg';
import { BLACK } from '../../styles/GlobalColor';

interface CustomHeaderProps {
  label: string;
  onBack?: () => void;
  onClose?: () => void;
}

const CustomHeader = ({ label, onBack, onClose }: CustomHeaderProps) => {
  return (
    <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, borderBottomColor: '#E6E6E6', borderBottomWidth: 1}}>
      {onBack && 
        <TouchableOpacity onPress={onBack} style={{position: 'absolute', bottom: 0, width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}}>
          <ArrowIcon color={BLACK} />
        </TouchableOpacity>
      }
      <Title style={{flex: 1, textAlign: 'center'}}>{label}</Title>
      {onClose && 
        <TouchableOpacity onPress={onClose} style={{position: 'absolute', right: 5, bottom: 0, width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}}>
          <CloseIcon />
        </TouchableOpacity>
      }
    </View>
  )
}

export default CustomHeader;