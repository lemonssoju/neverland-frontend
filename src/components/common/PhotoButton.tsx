import React, {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useCallback,
} from 'react';
import { Alert, TouchableOpacity, View, Image, ViewStyle } from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';
import styled from 'styled-components/native';
import PhotoIcon from '../../assets/common/Photo.svg';

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: CameraOptions | ImageLibraryOptions;
}

interface PhotoProps {
  photo: Asset[];
  setPhoto: Dispatch<SetStateAction<Asset[]>>;
}

const CameraActions: Action[] = [
  {
    title: '카메라',
    type: 'capture',
    options: {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 300,
      maxWidth: 300,
    },
  },
  {
    title: '앨범',
    type: 'library',
    options: {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 300,
      maxWidth: 300,
    },
  },
];

export const PhotoAction = ({
  style,
  setPhoto,
  children,
}: {
  style: ViewStyle;
  setPhoto: Dispatch<SetStateAction<Asset[]>>;
  children: any;
}) => {
  const onButtonPress = useCallback(
    (type: string, options: CameraOptions | ImageLibraryOptions) => {
      if (type === 'capture') {
        launchCamera(options, response => {
          if (!response.didCancel && response.assets) {
            setPhoto(response.assets);
          }
        });
      } else {
        launchImageLibrary(options, response => {
          if (!response.didCancel && response.assets) {
            setPhoto(response.assets);
          }
        });
      }
    },
    [],
  );
  return (
    <TouchableOpacity
      style={style}
      onPress={() => {
        Alert.alert('사진 선택', '', [
          {
            text: '카메라',
            onPress: () =>
              onButtonPress(CameraActions[0].type, CameraActions[0].options),
          },
          {
            text: '앨범',
            onPress: () =>
              onButtonPress(CameraActions[1].type, CameraActions[1].options),
          },
          { text: '취소', style: 'destructive' },
        ]);
      }}>
      {children}
    </TouchableOpacity>
  );
};

const PhotoButton = ({ photo, setPhoto }: PhotoProps) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {photo[0]?.uri !== '' ? (
        <PhotoAction
          style={{ width: '100%', height: '100%' }}
          setPhoto={setPhoto}>
          <Image
            source={{ uri: photo[0].uri }}
            style={{ height: '100%', borderRadius: 8 }}
            resizeMode="cover"
          />
        </PhotoAction>
      ) : (
        <PhotoAction
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          setPhoto={setPhoto}>
          <PhotoIcon />
        </PhotoAction>
      )}
    </View>
  );
};

export default PhotoButton;
