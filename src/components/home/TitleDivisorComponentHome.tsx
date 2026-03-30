import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { scale, verticalScale } from 'react-native-size-matters'
import { Colors } from '../../constants/Colors';

interface Props {
  title: string;
  subtitle?: string;
  goTo?: () => void;
}

const TitleDivisorComponentHome = ({ title, subtitle, goTo }: Props) => {
  return (
    <View
      style={styles.contenedor}
    >
      <View>
        <Text style={{
          color: Colors.textPrimary
        }}> {title}</Text>
      </View>
      <View>
        {
          subtitle && (
            <TouchableOpacity activeOpacity={0.8} onPress={goTo}>
              <Text style={{
                color: Colors.textSecondary
              }}> {subtitle}</Text>
            </TouchableOpacity>
          )
        }
      </View>
    </View>
  )
}

export default TitleDivisorComponentHome

const styles = StyleSheet.create({
  contenedor: {
    marginVertical: verticalScale(15),
    marginHorizontal: scale(15),
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})