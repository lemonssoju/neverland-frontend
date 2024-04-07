import { TouchableOpacity } from 'react-native';
import { Body } from '../../styles/GlobalText';
import { PURPLE, WHITE } from '../../styles/GlobalColor';
import PuzzleIcon from '../../assets/common/Puzzle.svg';

interface BottomButtonProps {
  label: string;
  puzzle?: boolean;
  onPress: () => void;
}

const PuzzleButton = ({ label, puzzle, onPress }: BottomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: PURPLE,
        width: 350,
        height: 43,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        alignSelf: 'center',
        marginBottom: 5,
        flexDirection: 'row'
      }}>
      {puzzle && <PuzzleIcon style={{marginRight: 10}} />}
      <Body style={{ color: WHITE }}>{label}</Body>
    </TouchableOpacity>
  );
};

export default PuzzleButton;
