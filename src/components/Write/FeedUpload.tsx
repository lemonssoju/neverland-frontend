import { useState, useEffect } from 'react';
import { Text, TextInput, View, TouchableOpacity, Dimensions, Image, Alert } from 'react-native';
import { ImageLibraryOptions, CameraOptions, launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { TabProps } from '../../../App';
import { StackNavigationProp } from '@react-navigation/stack';

const FeedUpload = () => {
  const { width, height } = Dimensions.get('window');
  const navigationToHome = useNavigation<StackNavigationProp<TabProps>>();
  const [feed, setFeed] = useState({
    title: '',
    content: '',
    photo: [] as any
  });

  const imageOptions: ImageLibraryOptions = {
    mediaType: 'photo',
    maxWidth: 300,
  };

  const cameraOptions: CameraOptions = {
    mediaType: 'photo'
  }

  const pickImage = () => {
    Alert.alert('사진 선택', '', [
      {
        text: '카메라',
        onPress: () => { launchCamera(cameraOptions, response => {
          if (response && response.assets) setFeed({...feed, photo: response.assets})})
        }
      },
      {
        text: '앨범',
        onPress: () => { launchImageLibrary(imageOptions, response => {
          if (response && response.assets) {
            setFeed({...feed, photo: response.assets[0]})
            console.log(response.assets[0], feed.photo.uri)
          }})
        }
      }
    ])
  }

  return (
    <View style={{flex: 1, alignItems: 'center', padding: 10}}>
      <Text>피드 등록</Text>
      <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15}}>
        <Text>제목</Text>
        <TextInput
          value={feed.title} 
          onChangeText={(title) => { setFeed({...feed, title}) }} 
          style={{flex: 1, borderBottomWidth: 1, paddingVertical: 10, marginLeft: 10}}
        />
      </View>
      <View style={{alignItems: 'center', padding: 10}}>
        <Text>내용</Text>
        <TextInput
          value={feed.content} 
          onChangeText={(content) => { setFeed({...feed, content}) }} 
          style={{paddingVertical: 10, marginVertical: 10, borderWidth: 1, width: width*0.9, height: 300 }}
          multiline
        />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15}}>
        <Text>사진</Text>
        <TouchableOpacity style={{borderWidth: 1, padding: 10, marginLeft: 10}} onPress={pickImage}>
          <Text>업로드</Text>
        </TouchableOpacity>
      </View>
      {
        feed.photo.uri !== '' && (
          <Image source={{uri: feed.photo.uri}} style={{width: width*0.5, height: 200}} />
        )
      }
      <TouchableOpacity style={{borderWidth: 1, padding: 10}} onPress={() => navigationToHome.navigate('Home')}>
        <Text>등록</Text>
      </TouchableOpacity>
    </View>
  )
}

export default FeedUpload;
