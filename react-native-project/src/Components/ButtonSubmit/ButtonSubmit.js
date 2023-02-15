import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

const ButtonSubmit = ({ title, onPress, stylesProp }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ ...styles.btn, stylesProp }}
      onPress={onPress}
    >
      <Text style={styles.btnTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonSubmit;

const styles = StyleSheet.create({
    btn: {
        borderWidth: 1,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'transparent',
        width: '100%',
        height: 51,
    
        backgroundColor: '#FF6C00',
        border: 1,
        borderRadius: 100,
        marginBottom: 16,
      },
      btnTitle: {
        fontSize: 16,
        color: '#ffffff',
      },
  });
  