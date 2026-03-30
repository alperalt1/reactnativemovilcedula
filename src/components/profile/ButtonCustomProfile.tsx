import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import React from 'react'
import { scale, verticalScale } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../constants/Colors';

interface Props extends TouchableOpacityProps {
  iconname: string;
  label: string;
}

const ButtonCustomProfile = ({ iconname, label, ...res }: Props) => {
  return (
    <View style={{
      width: '100%',
      height: verticalScale(45)
    }}>
      <TouchableOpacity
        {...res}
        activeOpacity={0.9}
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: scale(10) }}>
          <Icon name={iconname} size={28} color={'black'} />
          <Text style={{ marginLeft: scale(10), color: Colors.textSecondary }}>{label}</Text>
        </View>
        <Icon name={'chevron-right'} size={35} color={'black'} />
      </TouchableOpacity>
    </View>
  )
}

export default ButtonCustomProfile

const styles = StyleSheet.create({})