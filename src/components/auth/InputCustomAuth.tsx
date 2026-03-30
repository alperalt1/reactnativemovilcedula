import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../constants/Colors';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  iconname?: string;
  showpassword?: boolean;
}

const InputCustomAuth = ({ label, error, iconname, showpassword = false, ...rest }: Props) => {
  const [security, setSecurity] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={{color: Colors.textSecondary}}>{label}</Text>
      <View style={styles.wrapperInput}>
        {iconname && <Icon name={iconname} size={moderateScale(25)} color={Colors.textSecondary} />}
        <TextInput
          style={styles.input}
          selectionColor={Colors.placeholder}
          secureTextEntry={security}
          {...rest}
        />
        {showpassword && <TouchableOpacity activeOpacity={0.9} onPress={() => { setSecurity(!security) }}>
          <Icon name={security ? 'visibility' : 'visibility-off'} size={moderateScale(25)} color={Colors.textSecondary} />
        </TouchableOpacity>}
      </View>

      {error && <Text >{error}</Text>}
    </View>
  )
}

export default InputCustomAuth

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: verticalScale(5),
    paddingHorizontal: scale(20),
  },
  wrapperInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: moderateScale(15),
    paddingHorizontal: moderateScale(10),
    marginVertical: verticalScale(5)
  },
  input: {
    flex: 1,
    height: verticalScale(40),
    paddingHorizontal: moderateScale(10),
    
  },

})