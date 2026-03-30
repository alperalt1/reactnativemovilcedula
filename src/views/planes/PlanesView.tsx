import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AuthLayout from '../../components/AuthLayout'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Colors } from '../../constants/Colors'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NavigationInterface } from '../../interface/navigation/NavigationInterface'
import { useNavigation } from '@react-navigation/native'
import { useRegisterMutation } from '../../hooks/auth/useRegisterMutation'
import { useAuthStore } from '../../store/auth/useAuthStore'

const PlanesView = () => {

  const navigation = useNavigation<NativeStackNavigationProp<NavigationInterface>>();
  const { mutation } = useRegisterMutation();
  const { isPending } = mutation;
  const token = useAuthStore(state => state.token);

  return (
    <AuthLayout>
      <View>
        <View>

        </View>

        <View>
          <Text>Bienvenido de nuevodcasdcasdcsdcdscasd</Text>
          <Text>
            {token}
          </Text>
        </View>

        <View>

        </View>
      </View>

      {/* <View>
        <View>
          <Text>
            Consultar Cédula
          </Text>
          <Text>
            Verificación inmediata de identidad
          </Text>
        </View>

        <View>
          <Text>
            Ingrese número de identificación
          </Text>
          <TextInput></TextInput>
          <TouchableOpacity>
            <Text>
              Buscar Ahora
            </Text>
          </TouchableOpacity>
        </View>
      </View> */}

      {/* <View>
        Resume de Actividad
      </View> */}

      {/* <View>
        <View>

        </View>

        <View>
          <Text>Creditos restantes</Text>
          <Text></Text>
        </View>

        <TouchableOpacity>
          <Text>
            Recargar
          </Text>
        </TouchableOpacity>
      </View> */}

      {/* <View>
       <View>
        <Text> Consultas Recientes</Text>
       </View>
       <View>
        <Text> Ver todas</Text>
       </View>
      </View> */}

      {/* <View>
        <View>
          
        </View>
      </View> */}

    </AuthLayout>
  )
}

export default PlanesView

const styles = StyleSheet.create({})