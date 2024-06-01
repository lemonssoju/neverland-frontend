import { Dimensions, Modal, Pressable, Share, View } from 'react-native';
import { BLACK, WHITE } from '../../styles/GlobalColor';
import { Subtitle, Title } from '../../styles/GlobalText';
import { CustomText as Text } from '../../styles/CustomText';
import BottomButton from './BottomButton';
import { Dispatch, SetStateAction } from 'react';

interface ShareModalProps {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  code: number;
  setFormVisible?: Dispatch<SetStateAction<boolean>>;
}

const ShareModal = ({
  code,
  modalVisible,
  setModalVisible,
  setFormVisible,
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
        onPress={
          setFormVisible
            ? () => {
                setFormVisible(false);
                setModalVisible(false);
              }
            : () => setModalVisible(false)
        }
      />
      <View
        style={{
          backgroundColor: WHITE,
          position: 'absolute',
          width: '80%',
          height: 250,
          top: height * 0.4,
          alignSelf: 'center',
          borderRadius: 12,
          padding: 15,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {setFormVisible && (
          <View>
            <Subtitle style={{ textAlign: 'center' }}>
              코드를 공유해 그룹 멤버들을 초대해보세요!
            </Subtitle>
          </View>
        )}
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
