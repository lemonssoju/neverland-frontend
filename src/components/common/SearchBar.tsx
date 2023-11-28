import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Text,
  TextInputProps,
  TextStyle,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface SearchBarProps extends TextInputProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export default function SearchBar({
  search,
  setSearch,
  ...rest
}: SearchBarProps) {
  return (
    <View style={{height: 40, width: '90%', alignSelf: 'center', borderRadius: 12, borderWidth: 1}}>
      <TextInput
        value={search}
        onChangeText={(text: string) => {
          setSearch(text);
        }}
        placeholder='검색어를 입력하세요 WWW'
        placeholderTextColor={'black'}
        style={{padding: 10}}
        {...rest}
      />
    </View>
  );
}
