import { View, TouchableOpacity } from 'react-native';
import { Title } from '../../styles/GlobalText';
import ArrowIcon from '../../assets/common/Arrow.svg';
import CloseIcon from '../../assets/common/Close.svg';
import { BLACK } from '../../styles/GlobalColor';
import IconButton from './IconButton';

interface CustomHeaderProps {
  label: string;
  onBack?: () => void;
  onClose?: () => void;
}

const CustomHeader = ({ label, onBack, onClose }: CustomHeaderProps) => {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: 1,
      }}>
      {onBack && (
        <IconButton style={{position: 'absolute', bottom: 0}} onPress={onBack}>
          <ArrowIcon color={BLACK} />
        </IconButton>
      )}
      <Title style={{ flex: 1, textAlign: 'center' }}>{label}</Title>
      {onClose && (
        <IconButton style={{position: 'absolute', bottom: 0, right: 5}} onPress={onClose}>
          <CloseIcon />
        </IconButton>
      )}
    </View>
  );
};

export default CustomHeader;
