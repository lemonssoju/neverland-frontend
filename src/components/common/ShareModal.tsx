import { Dimensions, Modal, Pressable, Share, View } from 'react-native';
import { BLACK, WHITE } from '../../styles/GlobalColor';
import { Title } from '../../styles/GlobalText';
import { CustomText as Text } from '../../styles/CustomText';
import BottomButton from './BottomButton';
import { Dispatch, SetStateAction } from 'react';

interface ShareModalProps {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  code: number;
}

const ShareModal = ({
  code,
  modalVisible,
  setModalVisible,
}: ShareModalProps) => {
  const { width, height } = Dimensions.get('window');
  const onShare = async () => {
    try {
      await Share.share({
        message: code.toString(),
      });
    } catch (err: unknown) {
      console.error(err);
    }
  };
  return (
    <Modal visible={modalVisible} transparent>
      <Pressable
        style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
        onPress={() => setModalVisible(false)}
      />
      <View
        style={{
          backgroundColor: WHITE,
          position: 'absolute',
          width: '80%',
          height: 200,
          top: height * 0.4,
          alignSelf: 'center',
          borderRadius: 12,
          padding: 15,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Title>그룹 코드</Title>
        <Text style={{ fontWeight: '700', color: BLACK, fontSize: 48 }}>
          {code}
        </Text>
        <BottomButton label="공유하기" onPress={onShare} />
      </View>
    </Modal>
  );
};

export default ShareModal;
