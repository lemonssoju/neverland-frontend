import { View, ImageBackground, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParams } from '../../pages/Home';
import { useNavigation } from '@react-navigation/native';
import { WHITE } from '../../styles/GlobalColor';
import { B14, B12 } from '../../styles/GlobalText';

const { width, height } = Dimensions.get('window');

export interface UserItemProps {
  category: string;
  title: string;
  rep_pic: string;
  hashtag: string[];
}

export const UserItem = ({ category, title, rep_pic, hashtag }: UserItemProps) => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParams>>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('FeedDetail')} style={{marginLeft: 10, marginTop: 10, width: width/2 - 15}}>
      <ImageBackground source={{uri: rep_pic}} style={{width: '100%', height: 250}} imageStyle={{borderRadius: 8}}>
        <View style={{position: 'absolute', backgroundColor: 'black', width: '100%', height: '100%', opacity: 0.2, borderRadius: 8}} />
        <View style={{paddingHorizontal: 10, paddingVertical: 15}}>
          <B14 style={{marginBottom: 170}}>{category}</B14>
          <B14>{title}</B14>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            {hashtag.map((item, index) => {
              return (
                <B12 key={index}>#{item} </B12>
              )
            })}
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
};

export interface AppItemProps {
  title: string;
  rep_pic: string;
}

export const AppItem = ({ title, rep_pic }: AppItemProps) => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParams>>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('FeedDetail')} style={{marginTop: 5, marginHorizontal: 10, width: width*0.7}}>
      <ImageBackground source={{uri: rep_pic}} style={{width: '100%', height: 180, alignItems: 'center', justifyContent: 'center'}} imageStyle={{borderRadius: 8}}>
        <View style={{position: 'absolute', backgroundColor: 'black', width: '100%', height: '100%', opacity: 0.2, borderRadius: 8}} />
        <B14>{title}</B14>
      </ImageBackground>
    </TouchableOpacity>
  )
};
