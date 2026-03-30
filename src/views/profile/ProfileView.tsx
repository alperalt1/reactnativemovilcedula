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
import Icon from 'react-native-vector-icons/MaterialIcons';
import ButtonCustomProfile from '../../components/profile/ButtonCustomProfile'
import HeaderComponentHome from '../../components/home/HeaderComponentHome'
import HeaderComponent from '../../components/HeaderComponent'
import { useHistoryStore } from '../../store/history/useHistoryStore'

const ProfileView = () => {

  const navigation = useNavigation<NativeStackNavigationProp<NavigationInterface>>();
  const { mutation } = useRegisterMutation();
  const { isPending } = mutation;
  const token = useAuthStore(state => state.token);
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const history = useHistoryStore(state => state.clearHistory);
  const handleLogout = () => {
    logout();   
    history();
  };

  return (
    <AuthLayout>
      <HeaderComponent title={'Perfil'} />
      <HeaderComponentHome name={user?.name || ''} email={user?.email || ''} />
      <Text style={styles.sectionTitle}>Legal y Privacidad</Text>
      <View style={styles.buttonGroup}>
        <ButtonCustomProfile label='Términos y Condiciones' iconname='edit-document' onPress={() => navigation.navigate('TerminosCondicionesView')} />
        <ButtonCustomProfile label='Políticas de Privacidad' iconname='privacy-tip' onPress={() => navigation.navigate('PoliticasPrivacidadView')} />
      </View>

      <Text style={styles.sectionTitle}>Soporte</Text>
      <View style={styles.buttonGroup}>
        <ButtonCustomProfile label='Centro de Ayuda' iconname='contact-support' onPress={() => navigation.navigate('CentroAyudaView')} />
        <ButtonCustomProfile label='Cerrar Sesión' iconname='logout' onPress={handleLogout} />
      </View>
      {/* <View
          style={{
            backgroundColor: Colors.card,
            marginHorizontal: scale(15),
            marginBottom: verticalScale(20),
            paddingHorizontal: scale(5),
            borderRadius: moderateScale(10),
          }}
        >
          <ButtonCustomProfile label='Notificaciones' iconname='notifications' />
          <ButtonCustomProfile label='Ajustes' iconname='settings' />
        </View> */}
    </AuthLayout>
  )
}

export default ProfileView

const styles = StyleSheet.create({
  sectionTitle: {
    marginLeft: scale(20),
    marginBottom: verticalScale(15),
    fontSize: scale(13),
    color: '#888',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  buttonGroup: {
    backgroundColor: Colors.card,
    marginHorizontal: scale(15),
    borderRadius: moderateScale(15),
    marginBottom: verticalScale(15),
    elevation: 2, // Sombra suave para Android
    shadowColor: '#000', // Sombra suave para iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  versionText: {
    textAlign: 'center',
    marginTop: verticalScale(30),
    color: '#bbb',
    fontSize: scale(11)
  }
})