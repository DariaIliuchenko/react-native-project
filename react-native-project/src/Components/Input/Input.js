import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';


const Input = ({
  placeholder,
  onFocus,
  value,
  onChangeText,
  stylesProp,
  secureTextEntry,
  name,
}) => {
  const [onPress, setOnPress] = useState(false);

  return (
    <TextInput
      style={{
        ...styles.input,
        borderColor: onPress ? '#FF6C00' : '#E8E8E8',
        backgroundColor: onPress ? '#ffffff' : '#F6F6F6',
        ...stylesProp,
      }}
      name={name}
      placeholder={placeholder}
      onFocus={onFocus}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      onPressIn={() => {
        setOnPress(true);
      }}
      onBlur={() => {
        setOnPress(false);
      }}
    />
  );
};

export default Input;

export const styles = StyleSheet.create({
    input: {
      paddingHorizontal: 16,
      borderWidth: 1,
      height: 50,
      borderRadius: 8,
      fontSize: 16,
      fontFamily: 'Roboto-Regular',
    },
  });