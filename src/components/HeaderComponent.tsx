import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { NavigationInterface } from '../interface/navigation/NavigationInterface';
import { Colors } from '../constants/Colors';

interface Props{
  title?: string
}

const HeaderComponent = ({title}:Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<NavigationInterface>>();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name={'chevron-left'} size={scale(30)} color={Colors.textSecondary} />
      </TouchableOpacity>
      <View style={styles.titleContainer} pointerEvents="none">
        <Text style={styles.titleText}>{title}</Text>
      </View>
      
    </View>

  )
}

export default HeaderComponent

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: moderateScale(15),
    height: verticalScale(50),
    width: '100%',
    position: 'relative',
  },
  backButton: {
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: scale(10),
    zIndex: 10,
    
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  titleText: {
    fontSize: scale(16),
    fontWeight: '700',
    color: Colors.textPrimary,
  }
})