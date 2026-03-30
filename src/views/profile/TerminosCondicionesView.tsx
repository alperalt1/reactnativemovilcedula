import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AuthLayout from '../../components/AuthLayout'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Colors } from '../../constants/Colors'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NavigationInterface } from '../../interface/navigation/NavigationInterface'
import { useNavigation } from '@react-navigation/native'
import { useRegisterMutation } from '../../hooks/auth/useRegisterMutation'
import { useAuthStore } from '../../store/auth/useAuthStore'
import Icon from 'react-native-vector-icons/MaterialIcons';
import ButtonCustomProfile from '../../components/profile/ButtonCustomProfile'
import HeaderComponentHome from '../../components/home/HeaderComponentHome'
import HeaderComponent from '../../components/HeaderComponent'
import { SafeAreaView } from 'react-native-safe-area-context'
const TerminosCondicionesView = () => {

  const navigation = useNavigation<NativeStackNavigationProp<NavigationInterface>>();
  const { mutation } = useRegisterMutation();
  const { isPending } = mutation;
  const token = useAuthStore(state => state.token);
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <HeaderComponent title="Términos y Condiciones" />
      <ScrollView style={{ padding: scale(20) }}>
        <Text style={styles.title}>1. Aceptación de Uso</Text>
        <Text style={styles.paragraph}>
          Al utilizar esta aplicación, el usuario acepta que las consultas realizadas tienen un fin estrictamente informativo y personal. El uso indebido de la información es responsabilidad exclusiva del usuario.
        </Text>

        <Text style={styles.title}>2. Origen de la Información</Text>
        <Text style={styles.paragraph}>
          Los datos mostrados provienen de accesos a servicios externos de información. Esta aplicación no altera, modifica ni almacena datos oficiales, funcionando únicamente como un visualizador de información disponible públicamente.
        </Text>

        <Text style={styles.title}>3. No Validez Oficial</Text>
        <Text style={styles.paragraph}>
          Se aclara que la información presentada no tiene validez legal como documento de identidad físico o certificado oficial emitido por el Registro Civil de Ecuador.
        </Text>

        <Text style={styles.title}>4. Almacenamiento y Registro</Text>
        <Text style={styles.paragraph}>
          Para su comodidad y control de cuenta, la aplicación mantiene un historial de las consultas realizadas vinculado a su perfil. Esta información se almacena de forma segura en nuestros servidores y solo es accesible por usted a través de su cuenta personal.
        </Text>

        <Text style={styles.title}>5. Uso Responsable</Text>
        <Text style={styles.paragraph}>
          El usuario se compromete a utilizar la aplicación únicamente con fines personales y legales. Queda prohibido el uso de la información para acoso, discriminación, fraude o cualquier actividad ilícita.
          El usuario es responsable del uso que haga de la información consultada dentro de la aplicación.
        </Text>

        {/* Espacio extra al final para que no quede pegado al borde */}
        <View style={{ height: verticalScale(40) }} />
      </ScrollView>

    </SafeAreaView>
  )
}

export default TerminosCondicionesView

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    fontWeight: 'bold',
    fontSize: scale(15),
    color: Colors.primary,
    marginBottom: verticalScale(8),
    marginTop: verticalScale(5),
  },
  paragraph: {
    fontSize: scale(13),
    color: '#444',
    lineHeight: scale(19),
    marginBottom: verticalScale(20),
    textAlign: 'left',
    letterSpacing: 0.2,
  }
})