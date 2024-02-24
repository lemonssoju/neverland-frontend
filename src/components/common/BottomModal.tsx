import {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import styled from 'styled-components/native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import BottomButton from './BottomButton';
import { B16 } from '../../styles/GlobalText';
import { BLACK, MINT, WHITE, LIGHTBLACK } from '../../styles/GlobalColor';
import CheckIcon from '../../assets/common/Check.svg';
import ResetIcon from '../../assets/common/Reset.svg';

interface CategoryModalProps {
  categoryVisible: boolean;
  setCategoryVisible: Dispatch<SetStateAction<boolean>>;
  categories: string[];
  setCategories: Dispatch<SetStateAction<string[]>>;
  unique?: boolean;
}

export const CategoryModal = ({
  categoryVisible,
  setCategoryVisible,
  categories,
  setCategories,
  unique
}: CategoryModalProps) => {
  const categoryRef = useRef<BottomSheetModal>(null);
  const categorySnapPoints = useMemo(() => [unique ? 300 : 280], []);

  const openCategory = () => {
    categoryRef.current?.present();
  };

  const closeCategory = () => {
    categoryRef.current?.close();
    setCategoryVisible(false);
  };

  const renderCategoryBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        style={{ flex: 1 }}
        {...props}
        onPress={closeCategory}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const limitArray = (arr: string[]) => {
    if (arr.length > 1) {
      arr.shift();
      arr.splice(1);
      closeCategory();
    }
  }

  useEffect(() => {
    if (categoryVisible) openCategory();
  }, [categoryVisible]);

  useEffect(() => {
    if (unique) limitArray(categories);
  }, [categories])

  return (
    <BottomSheetModal
      snapPoints={categorySnapPoints}
      ref={categoryRef}
      backdropComponent={renderCategoryBackdrop}
      handleStyle={{
        backgroundColor: LIGHTBLACK,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      }}
      handleIndicatorStyle={{ backgroundColor: '#3F3F3F', width: 60 }}
      backgroundStyle={{ backgroundColor: LIGHTBLACK }}>
      <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 30 }}>
          <B16 style={{ color: MINT }}>카테고리</B16>
          { !unique && 
            <TouchableOpacity onPress={() => setCategories([])} style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center'}}>
              <ResetIcon width={16} height={16} />
            </TouchableOpacity>
          }
        </View>
        <FlatList
          data={['영화', '드라마', '애니메이션', '패션', '음악', '예능']}
          numColumns={2}
          style={{ marginBottom: 5 }}
          renderItem={({ item }: any) => {
            return (
              <CategoryButton
                pressed={categories.includes(item)}
                onPress={() => {
                  categories.includes(item)
                    ? setCategories(
                        categories.filter(
                          (category: string) => category !== item,
                        ),
                      )
                    : setCategories([...categories, item]);
                }}>
                <B16
                  style={{ color: categories.includes(item) ? BLACK : WHITE }}>
                  {item}
                </B16>
              </CategoryButton>
            );
          }}
        />
      </View>
    </BottomSheetModal>
  );
};

interface OrderModalProps {
  orderVisible: boolean;
  setOrderVisible: Dispatch<SetStateAction<boolean>>;
  order: string;
  setOrder: Dispatch<SetStateAction<string>>;
}

export const OrderModal = ({
  orderVisible,
  setOrderVisible,
  order,
  setOrder,
}: OrderModalProps) => {
  const orderRef = useRef<BottomSheetModal>(null);
  const orderSnapPoints = useMemo(() => [200], []);

  const openOrder = () => {
    orderRef.current?.present();
  };

  const closeOrder = () => {
    orderRef.current?.close();
    setOrderVisible(false);
  };

  const renderOrderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        style={{ flex: 1 }}
        {...props}
        onPress={closeOrder}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  useEffect(() => {
    if (orderVisible) openOrder();
  }, [orderVisible]);

  return (
    <BottomSheetModal
      snapPoints={orderSnapPoints}
      ref={orderRef}
      backdropComponent={renderOrderBackdrop}
      handleStyle={{
        backgroundColor: LIGHTBLACK,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      }}
      handleIndicatorStyle={{ backgroundColor: '#3F3F3F', width: 60 }}
      backgroundStyle={{ backgroundColor: LIGHTBLACK }}
      onDismiss={closeOrder}>
      <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
        <B16 style={{ color: MINT, marginBottom: 20 }}>정렬</B16>
        <FlatList
          data={['최신순', '인기순']}
          renderItem={({ item }: any) => {
            return (
              <OrderButton
                onPress={() => {
                  setOrder(item);
                  orderRef.current?.close();
                }}>
                <B16 style={{ color: order === item ? MINT : WHITE }}>
                  {item}
                </B16>
                {order === item && <CheckIcon />}
              </OrderButton>
            );
          }}
        />
      </View>
    </BottomSheetModal>
  );
};

const CategoryButton = styled.TouchableOpacity<{ pressed: boolean }>`
  background: ${props => (props.pressed ? MINT : BLACK)};
  border-radius: 18px;
  width: 160px;
  height: 50px;
  justify-content: center;
  align-items: center;
  margin-vertical: 10px;
  margin-right: 30px;
`;

const OrderButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0px;
`;
