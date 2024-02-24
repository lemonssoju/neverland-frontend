import { View, ImageBackground, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParams } from '../../pages/Home';
import { useNavigation } from '@react-navigation/native';
import { B14, B12 } from '../../styles/GlobalText';

const { width, height } = Dimensions.get('window');

export interface UserItemProps {
  category: string;
  title: string;
  rep_pic: string;
  hashtags: string[];
}

export const UserItem = ({ category, title, rep_pic, hashtags }: UserItemProps) => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParams>>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('FeedDetail')} style={{marginLeft: 10, marginTop: 10, width: width/2 - 15}}>
      <ImageBackground source={{uri: rep_pic}} style={{width: '100%', height: 250}} imageStyle={{borderRadius: 8}}>
        <View style={{position: 'absolute', backgroundColor: 'black', width: '100%', height: '100%', opacity: 0.2, borderRadius: 8}} />
        <View style={{paddingHorizontal: 10, paddingVertical: 15}}>
          <B14>{category}</B14>
          <View style={{justifyContent: 'flex-end', height: '95%'}}>
            <B14 style={{width: '80%'}}>{title}</B14>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              {hashtags.map((item, index) => {
                return (
                  <B12 key={index}>#{item} </B12>
                )
              })}
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
};

export interface AppItemProps {
  category: string;
  title: string;
  rep_pic: string;
  hashtags: string[];
}

export const AppItem = ({ category, title, rep_pic, hashtags }: AppItemProps) => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParams>>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('FeedDetail')} style={{marginHorizontal: 10, width: width/2}}>
      <ImageBackground source={{uri: rep_pic}} style={{width: '100%', height: 120}} imageStyle={{borderRadius: 8}}>
        <View style={{position: 'absolute', backgroundColor: 'black', width: '100%', height: '100%', opacity: 0.2, borderRadius: 8}} />
        <View style={{padding: 10}}>
          <B12>{category}</B12>
          <View style={{height: '75%', justifyContent: 'center'}}>
            <B14 style={{textAlign: 'center'}}>{title}</B14>
          </View>
          <View style={{flexDirection: 'row'}}>
            {hashtags.map((item, index) => {
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
