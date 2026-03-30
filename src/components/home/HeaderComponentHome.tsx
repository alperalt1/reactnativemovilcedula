import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { version } from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../constants/Colors';

interface Props {
  name: string;
  email: string;
}

const HeaderComponentHome = ({ name, email }: Props) => {
  return (
    <View
      style={styles.container}
    >
      <View style={styles.containerinfo}>
        <View style={styles.containerinfoicon}>
          <Icon name={'person'} size={48} color={'black'} />
        </View>
        <View style={{ alignItems: 'flex-start' }} >
          <Text style={{
            textAlign: 'center',
            color: Colors.textPrimary

          }}>
            {name}
          </Text>
          <Text style={{
            textAlign: 'center',
            color: Colors.textSecondary
          }}>
            {email}
          </Text>
        </View>
      </View>

      <View style={styles.containericon}>
        {/* <Icon name={'notifications'} size={20} color={'black'} /> */}
      </View>
    </View>
  )
}

export default HeaderComponentHome

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.card,
    marginTop: Platform.OS == 'android' ? verticalScale(15) : verticalScale(1),
    marginHorizontal: scale(15),
    marginBottom: verticalScale(20),
    paddingHorizontal: scale(5),
    borderRadius: moderateScale(10),
    height: verticalScale(55)
  },
  containerinfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerinfoicon: {
    width: scale(50),
    height: verticalScale(45),
    backgroundColor: Colors.card,
    borderRadius: moderateScale(200),
    justifyContent: 'center',
    alignItems: 'center',
  },
  containericon: {
    width: scale(30),
    height: verticalScale(25),
    backgroundColor: Colors.card,
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  }
})