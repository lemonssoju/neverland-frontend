import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native';
import { PuzzleStackParams } from '../../pages/Group/PuzzleStack';
import styled from 'styled-components/native';
import { LIGHTPURPLE, PURPLE, WHITE } from '../../styles/GlobalColor';
import { useState } from 'react';
import { Body } from '../../styles/GlobalText';
import Map from '../Map/Map';
import { PuzzleTimeItem } from './PuzzleItem';

const PuzzleList = ({
  navigation,
  route,
}: StackScreenProps<PuzzleStackParams, 'PuzzleList'>) => {
  const [option, setOption] = useState<string>('시간');
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OptionContainer>
        <OptionButton
          style={{
            backgroundColor: option === '시간' ? PURPLE : 'transparent',
          }}
          onPress={() => setOption('시간')}>
          <Body
            style={{
              fontWeight: '700',
              marginVertical: 6,
              color: option === '시간' ? WHITE : PURPLE,
            }}>
            시간
          </Body>
        </OptionButton>
        <OptionButton
          style={{
            backgroundColor: option === '공간' ? PURPLE : 'transparent',
          }}
          onPress={() => setOption('공간')}>
          <Body
            style={{
              fontWeight: '700',
              marginVertical: 6,
              color: option === '공간' ? WHITE : PURPLE,
            }}>
            공간
          </Body>
        </OptionButton>
      </OptionContainer>
      {option === '시간' ? <></> : <Map />}
    </SafeAreaView>
  );
};

const OptionContainer = styled.View`
  width: 60%;
  justify-content: center;
  align-items: center;
  align-self: center;
  flex-direction: row;
  margin: 10px 0px;
  background: ${LIGHTPURPLE};
  border-radius: 8px;
  border: 1px solid ${PURPLE};
  padding-vertical: 2px;
`;

const OptionButton = styled.TouchableOpacity`
  width: 49%;
  align-items: center;
  border-radius: 6px;
`;

export default PuzzleList;
