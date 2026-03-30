import React, { useState } from 'react'
import { Button, Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import AuthLayout from '../../components/AuthLayout'
import { LoginInterface } from '../../interface/auth/AuthInterface'
import { useLoginMutation } from '../../hooks/auth/useLoginMutation'
import { useAuthStore } from '../../store/auth/useAuthStore'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Colors } from '../../constants/Colors'
import ButtonCustomAuth from '../../components/auth/ButtonCustomAuth'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NavigationInterface } from '../../interface/navigation/NavigationInterface'
import InputCustomAuth from '../../components/auth/InputCustomAuth'


const LoginView = () => {

  const [login, setLogin] = useState<LoginInterface>({
    email: '',
    password: ''
  })
  const navigation = useNavigation<NativeStackNavigationProp<NavigationInterface>>();
  const { mutation } = useLoginMutation();
  const { isPending } = mutation;
  const username = useAuthStore((state) => state.user?.name);

  const handleLogin = (name: keyof LoginInterface, value: string) => {
    setLogin(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleEnviarLogin = () => {
    mutation.mutate(login)
  }

  return (
    <AuthLayout>
      <View style={{
        width: '100%',
        height: verticalScale(100),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: verticalScale(10),
        marginTop: Platform.OS == 'android' ? verticalScale(22) : 0
      }}>
        <Image
          source={require('../../assets/logo.png')}
          style={{
            width: moderateScale(105), 
            height: moderateScale(105),
          }}
          resizeMode='contain'
        />
      </View>
      <View style={{
        width: '100%',
        height: verticalScale(70)
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
          Consulta EC
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 14,
            textAlignVertical: 'center',
            color: Colors.textSecondary
          }}
        >
          Consulte información de forma ágil y segura
        </Text>
      </View>
      <InputCustomAuth
        label={"CORREO ELECTRÓNICO"}
        iconname={'mail'}
        onChangeText={text => handleLogin('email', text)}
        value={login.email}
        keyboardType="email-address"
        autoCapitalize='none'
      />
      <InputCustomAuth
        label={"CONTRASEÑA"}
        iconname={'lock'}
        onChangeText={text => handleLogin('password', text)}
        value={login.password}
        showpassword={true}
        autoCapitalize='none'
      />
      <TouchableOpacity activeOpacity={0.1} style={{ alignSelf: 'flex-end', paddingVertical: verticalScale(5), marginBottom: verticalScale(5) }}>
        <Text
          style={{
            fontSize: moderateScale(13),
            marginRight: scale(20),
            color: Colors.textSecondary
          }}
        >
          ¿Olvidó su contraseña?
        </Text>
      </TouchableOpacity>


      <ButtonCustomAuth
        label='Iniciar Sesión'
        onPress={handleEnviarLogin}
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
          ¿Aún no tienes una cuenta?{' '}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('RegistrarseView')}
          activeOpacity={0.7}
        >
          <Text style={{
            fontSize: moderateScale(14),
            color: Colors.primary,
            fontWeight: 'bold',

          }}>
            Regístrate aquí
          </Text>
        </TouchableOpacity>
      </View>

    </AuthLayout>
  )
}

export default LoginView

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: verticalScale(8),
    paddingHorizontal: scale(10),
  },
  wrapperInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.placeholder,
    borderRadius: moderateScale(15),
    paddingHorizontal: moderateScale(10),
    marginVertical: verticalScale(5)
  },
  input: {
    flex: 1,
    height: verticalScale(50),
    paddingHorizontal: moderateScale(10),

  },

})