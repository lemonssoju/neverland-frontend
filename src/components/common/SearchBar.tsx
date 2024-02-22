import React, { Dispatch, SetStateAction, useState } from "react";
import { View, TextInputProps, TextStyle, TextInput, TouchableOpacity } from "react-native";
import { LIGHTBLACK, WHITE } from "../../styles/GlobalColor";
import SearchIcon from '../../assets/common/Search.svg';
import CloseIcon from '../../assets/common/Close.svg';

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
  const [focus, setFocus] = useState<boolean>(false);
  return (
    <View style={{ justifyContent: 'center', ...style}}>
      <TextInput
        value={search}
        onChangeText={(text: string) => {
          setSearch(text);
        }}
        placeholder={placeholder}
        placeholderTextColor={'#BBBBBB'}
        style={{padding: 10, backgroundColor: LIGHTBLACK, borderRadius: 10, color: '#BBBBBB', fontWeight: '700'}}
        onEndEditing={() => setFocus(false)}
        onChange={() => setFocus(true)}
        {...rest}
      />
      <TouchableOpacity style={{position: 'absolute', right: 10}} onPress={() => {search.length > 0 && !focus ? setSearch('') : setSearch(search)}} >
        {search.length > 0 && !focus ? <CloseIcon width={24} height={24} /> : <SearchIcon width={24} height={24} />}
      </TouchableOpacity>
    </View>
  );
}
