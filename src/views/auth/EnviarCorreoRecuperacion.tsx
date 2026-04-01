import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ButtonCustomAuth from '../../components/auth/ButtonCustomAuth'
import AuthLayout from '../../components/AuthLayout'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Colors } from '../../constants/Colors'
import { CodigoInterface, LoginInterface, RegisterInterface } from '../../interface/auth/AuthInterface'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NavigationInterface } from '../../interface/navigation/NavigationInterface'
import { useNavigation } from '@react-navigation/native'
import { useLoginMutation } from '../../hooks/auth/useLoginMutation'
import { useAuthStore } from '../../store/auth/useAuthStore'
import { useRegisterMutation } from '../../hooks/auth/useRegisterMutation'
import InputCustomAuth from '../../components/auth/InputCustomAuth'
import HeaderComponent from '../../components/HeaderComponent'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useEnviarCodigoMutation } from '../../hooks/auth/useEnviarCodigoMutation'
import { useResetPasswordStore } from '../../store/auth/useResetPassword'

const EnviarCorreoRecuperacionView = () => {
  const [register, setRegister] = useState<CodigoInterface>({
    email: '',
  })
  const navigation = useNavigation<NativeStackNavigationProp<NavigationInterface>>();
  const { mutation } = useEnviarCodigoMutation();
  const { isPending } = mutation;
  const setEmailPassword = useResetPasswordStore((state) => state.setEmail);
  const handleRegister = (name: keyof CodigoInterface, value: string) => {
    setRegister(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleEnviarLogin = () => {
    if (!register.email.trim()) {
      Alert.alert("Campo obligatorio", "Por favor, ingresa tu correo electrónico.");
      return;
    }
    setEmailPassword(register.email)
    mutation.mutate(register, {
      onSuccess: () => {
        navigation.navigate('RecuperarPasswordView');
        setRegister({email: ''});
      },
      onError: (error: any) => {
        Alert.alert("Error", error?.response?.data?.message || "No se pudo enviar el código.");
      }
    });
  }
  return (
    <AuthLayout>
      <HeaderComponent title={'Olvidé mi contraseña'} />
      <View style={{
        width: '100%',
        height: verticalScale(140),
        marginVertical: verticalScale(34),
        paddingHorizontal: moderateScale(20),
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Icon name={'lock-reset'} size={moderateScale(120)} color={Colors.textSecondary} />
        <Text
          style={{
            textAlign: 'center',
            fontSize: moderateScale(15),
            textAlignVertical: 'center',
            color: Colors.textSecondary
          }}
        >
          Ingresa tu correo electrónico para enviarte el código de recuperación
        </Text>
      </View>
      <InputCustomAuth
        iconname={'mail'}
        onChangeText={text => handleRegister('email', text)}
        value={register.email}
        keyboardType="email-address"
        autoCapitalize='none'
      />

      <View style={{ height: verticalScale(10) }} />
      <ButtonCustomAuth
        label='Enviar Código'
        onPress={handleEnviarLogin}
        loading={isPending}
        disabled={isPending}
      />



    </AuthLayout>
  )
}

export default EnviarCorreoRecuperacionView

const styles = StyleSheet.create({})