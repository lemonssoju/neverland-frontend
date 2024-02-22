import React, { Dispatch, SetStateAction, useState } from "react";
import { View, TextInputProps, TextStyle, TextInput, TouchableOpacity } from "react-native";
import { LIGHTBLACK } from "../../styles/GlobalColor";
import SearchIcon from '../../assets/common/Search.svg';

interface SearchBarProps extends TextInputProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  placeholder: string;
  style: TextStyle;
}

export default function SearchBar({
  search,
  setSearch,
  placeholder,
  style,
  ...rest
}: SearchBarProps) {
  return (
    <View style={{ justifyContent: 'center', ...style}}>
      <TextInput
        value={search}
        onChangeText={(text: string) => {
          setSearch(text);
        }}
        placeholder={placeholder}
        placeholderTextColor={'#BBBBBB'}
        style={{padding: 10, backgroundColor: LIGHTBLACK, borderRadius: 10}}
        {...rest}
      />
      <TouchableOpacity style={{position: 'absolute', right: 10}} >
        <SearchIcon width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
}
