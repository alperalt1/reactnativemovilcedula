import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Colors } from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props extends TouchableOpacityProps {
  label: string;
  loading?: boolean;
}

const ButtonCustomHome = ({ label, loading = false,...res }: Props) => {
  return (
    <TouchableOpacity
      {...res}
      activeOpacity={0.8}
      style={styles.button}>
      {
        loading ? <ActivityIndicator color="#ffffffff" /> : <Icon name={'search'} size={moderateScale(16)} color={Colors.card} />
      }
      <Text
        style={styles.textbutton}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export default ButtonCustomHome

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    borderRadius: moderateScale(15),
    marginHorizontal: scale(20),
    marginTop: verticalScale(3),
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(40),
  },
  textbutton: {
    fontSize: moderateScale(15),
    marginLeft: scale(10),
    color: 'white',
  }
})