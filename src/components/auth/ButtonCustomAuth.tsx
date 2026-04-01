import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Colors } from '../../constants/Colors';

interface Props extends TouchableOpacityProps {
  label: string;
  loading?: boolean;
}

const ButtonCustomAuth = ({ label, loading = false,...res }: Props) => {
  return (
    <TouchableOpacity
      {...res}
      activeOpacity={0.8}
      style={styles.button}>
      {
        loading && <ActivityIndicator color="#ffffffff"/>
      }
      <Text
        style={styles.textbutton}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export default ButtonCustomAuth

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    borderRadius: moderateScale(15),
    marginHorizontal: scale(20),
    marginTop: verticalScale(3),
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(36),
  },
  textbutton: {
    fontSize: moderateScale(15),
    marginLeft: scale(10),
    color: 'white',
  }
})