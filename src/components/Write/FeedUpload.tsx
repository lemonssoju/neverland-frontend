import { useState, useEffect } from 'react';
import { Text, TextInput, SafeAreaView, View, TouchableOpacity, Dimensions, Image, Alert, Modal } from 'react-native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from '../../pages/Home';

const FeedUpload = ({ navigation }: StackScreenProps<HomeStackParams, 'FeedUpload'>) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'red'}}>

    </SafeAreaView>
  )
}

export default FeedUpload;
