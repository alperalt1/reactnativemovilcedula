import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ButtonCustomAuth from '../../components/auth/ButtonCustomAuth'
import AuthLayout from '../../components/AuthLayout'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Colors } from '../../constants/Colors'
import { LoginInterface, RecuperarPasswordInterface, RegisterInterface } from '../../interface/auth/AuthInterface'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NavigationInterface } from '../../interface/navigation/NavigationInterface'
import { useNavigation } from '@react-navigation/native'
import { useLoginMutation } from '../../hooks/auth/useLoginMutation'
import { useAuthStore } from '../../store/auth/useAuthStore'
import { useRegisterMutation } from '../../hooks/auth/useRegisterMutation'
import InputCustomAuth from '../../components/auth/InputCustomAuth'
import HeaderComponent from '../../components/HeaderComponent'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useResetPasswordStore } from '../../store/auth/useResetPassword'
import { useResetPasswordMutation } from '../../hooks/auth/useResetPasswordMutation'

const RecuperarPasswordView = () => {
  const emailUser = useResetPasswordStore((state) => state.email);
  const [register, setRegister] = useState<RecuperarPasswordInterface>({
    codigo: '',
    email: emailUser || '',
    password: '',
    password_confirmation: ''
  })
  const navigation = useNavigation<NativeStackNavigationProp<NavigationInterface>>();
  const { mutation } = useResetPasswordMutation();
  const { isPending } = mutation;
  const handleRegister = (name: keyof RecuperarPasswordInterface, value: string) => {
    setRegister(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleEnviarLogin = () => {
    const { codigo, password, password_confirmation } = register;

    if (!codigo.trim()) {
      Alert.alert("Código requerido", "Por favor, ingresa el código que recibiste en tu correo.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Contraseña muy corta", "La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== password_confirmation) {
      Alert.alert("Las contraseñas no coinciden", "Asegúrate de escribir la misma contraseña en ambos campos.");
      return;
    }
    mutation.mutate(register, {
      onSuccess: () => {
        Alert.alert("¡Éxito!", "Tu contraseña ha sido restablecida correctamente.", [
          { text: "OK", onPress: () => navigation.navigate('LoginView') }
        ]);
        setRegister({ email: '', codigo: '', password: '', password_confirmation: '' });
      },
      onError: (error: any) => {
        Alert.alert("Error", error?.response?.data?.message || "No se pudo enviar los datos.");
      }
    });

  }
  return (
    <AuthLayout>
      <HeaderComponent title={'Restablecer contraseña'} />
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
        label={"CODIGO"}
        iconname={'person'}
        onChangeText={text => handleRegister('codigo', text)}
        value={register.codigo}
        keyboardType="email-address"
      />

      <InputCustomAuth
        label={"CONTRASEÑA"}
        iconname={'lock'}
        onChangeText={text => handleRegister('password', text)}
        value={register.password}
        showpassword={true}
        autoCapitalize='none'
      />

      <InputCustomAuth
        label={"CONFIRMAR CONTRASEÑA"}
        iconname={'lock'}
        onChangeText={text => handleRegister('password_confirmation', text)}
        value={register.password_confirmation}
        showpassword={true}
        autoCapitalize='none'
      />

      <View style={{ height: verticalScale(10) }} />
      <ButtonCustomAuth
        label='Enviar'
        onPress={handleEnviarLogin}
        loading={isPending}
        disabled={isPending}
      />



    </AuthLayout>
  )
}

export default RecuperarPasswordView

const styles = StyleSheet.create({})