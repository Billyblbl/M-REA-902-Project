import React from 'react';
import {
  StyleSheet, TouchableOpacity, Text, ViewStyle,
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#303030',
    padding: 15,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
});

type Props = {
    onPress: () => void,
    style?: ViewStyle,
    title: string,
    titleStyle?: ViewStyle
    disabled?: boolean
}

function StylizedButton({
  onPress, style, title, titleStyle, disabled,
}: Props) {
  const buttonStyle = { ...styles.button, ...style };
  return (
    <TouchableOpacity
      style={{ ...buttonStyle, backgroundColor: disabled ? '#a6a6a6' : buttonStyle.backgroundColor }}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={{ ...styles.buttonText, ...titleStyle }}>{title}</Text>
    </TouchableOpacity>
  );
}

StylizedButton.defaultProps = {
  titleStyle: {},
  style: {},
  disabled: false,
};

export default StylizedButton;
