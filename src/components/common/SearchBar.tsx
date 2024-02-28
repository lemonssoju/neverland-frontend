import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, TextInputProps, TextStyle, TextInput, TouchableOpacity } from 'react-native';
import { GRAY, LIGHTBLACK, WHITE } from "../../styles/GlobalColor";
import SearchIcon from '../../assets/common/Search.svg';
import CloseIcon from '../../assets/common/Close.svg';

interface SearchBarProps extends TextInputProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  isSearching: boolean;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
  placeholder: string;
  style: TextStyle;
}

const SearchBar = ({search, setSearch, isSearching, setIsSearching, placeholder, style, ...rest}: SearchBarProps) => {
  return (
    <View style={{ justifyContent: 'center', ...style}}>
      <TextInput
        value={search}
        onChangeText={(text: string) => {
          setSearch(text);
        }}
        placeholder={placeholder}
        placeholderTextColor={GRAY}
        style={{padding: 10, backgroundColor: LIGHTBLACK, borderRadius: 10, color: GRAY, fontWeight: '700'}}
        returnKeyType='search'
        {...rest}
      />
      <TouchableOpacity style={{position: 'absolute', right: 10}} onPress={() => {setSearch(''); setIsSearching(true)}} >
        {!isSearching && <CloseIcon width={24} height={24} />}
      </TouchableOpacity>
    </View>
  );
}

export default SearchBar;
