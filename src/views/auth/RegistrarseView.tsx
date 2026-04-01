import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ButtonCustomAuth from '../../components/auth/ButtonCustomAuth'
import AuthLayout from '../../components/AuthLayout'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Colors } from '../../constants/Colors'
import { LoginInterface, RegisterInterface } from '../../interface/auth/AuthInterface'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NavigationInterface } from '../../interface/navigation/NavigationInterface'
import { useNavigation } from '@react-navigation/native'
import { useLoginMutation } from '../../hooks/auth/useLoginMutation'
import { useAuthStore } from '../../store/auth/useAuthStore'
import { useRegisterMutation } from '../../hooks/auth/useRegisterMutation'
import InputCustomAuth from '../../components/auth/InputCustomAuth'

const RegistrarseView = () => {
  const [register, setRegister] = useState<RegisterInterface>({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })
  const navigation = useNavigation<NativeStackNavigationProp<NavigationInterface>>();
  const { mutation } = useRegisterMutation();
  const { isPending } = mutation;

  const handleRegister = (name: keyof RegisterInterface, value: string) => {
    setRegister(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleEnviarLogin = () => {
    mutation.mutate(register)
  }
  return (
    <AuthLayout>

      <View style={{
        width: '100%',
        height: verticalScale(70),
        marginTop: verticalScale(30)
      }}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 27,
            textAlignVertical: 'center',
            color: Colors.textPrimary
          }}
        >
          Crear una cuenta
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 13,
            textAlignVertical: 'center',
            color: Colors.textSecondary
          }}
        >
          Complete sus datos para comenzar
        </Text>
      </View>
      <InputCustomAuth
        label={"NOMBRES"}
        iconname={'person'}
        onChangeText={text => handleRegister('name', text)}
        value={register.name}
        keyboardType="email-address"
      />
      <InputCustomAuth
        label={"CORREO ELECTRÓNICO"}
        iconname={'mail'}
        onChangeText={text => handleRegister('email', text)}
        value={register.email}
        keyboardType="email-address"
        autoCapitalize='none'
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
        label='Registrarse'
        onPress={handleEnviarLogin}
        loading={isPending}
        disabled={isPending}
      />
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: verticalScale(20),
        paddingHorizontal: scale(20),
      }}>
        <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
        <Text style={{
          marginHorizontal: scale(10),
          fontSize: moderateScale(16),
          color: '#666',
          fontWeight: '500'
        }}>
          O
        </Text>
        <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
      </View>


      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(5),
        paddingBottom: verticalScale(20)
      }}>
        <Text style={{
          fontSize: moderateScale(14),
          color: Colors.textSecondary,
        }}>
          ¿Ya tienes una cuenta?{' '}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('LoginView')}
          activeOpacity={0.7}
        >
          <Text style={{
            fontSize: moderateScale(14),
            color: Colors.primary,
            fontWeight: 'bold',

          }}>
            Inicia Sesión
          </Text>
        </TouchableOpacity>
      </View>

    </AuthLayout>
  )
}

export default RegistrarseView

const styles = StyleSheet.create({})