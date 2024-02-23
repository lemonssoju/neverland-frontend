import { useState, useEffect } from 'react';
import { Text, TextInput, SafeAreaView, View, TouchableOpacity, Dimensions, Image, Alert, Modal } from 'react-native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from '../../pages/Home';
import CustomHeader from '../common/CustomHeader';
import { BLACK } from '../../styles/GlobalColor';

const FeedUpload = ({ navigation }: StackScreenProps<HomeStackParams, 'FeedUpload'>) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: BLACK}}>
      <CustomHeader label='작성하기' onClose={() => {navigation.goBack()}} />
    </SafeAreaView>
  )
}

export default FeedUpload;
