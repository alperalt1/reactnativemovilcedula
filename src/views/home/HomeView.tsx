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
import ButtonCustomAuth from '../../components/auth/ButtonCustomAuth'
import InputCustomHome from '../../components/home/InputCustomHome'
import ButtonCustomHome from '../../components/home/ButtonCustomHome'
import { useConsultarMutation } from '../../hooks/home/useConsultarMutation'
import { Consultar } from '../../interface/home/HomeInterface'
import { useConsultaStore } from '../../store/home/useConsultaStore'
import HeaderComponentHome from '../../components/home/HeaderComponentHome'
import CardConsultaComponentHome from '../../components/home/CardConsultaComponentHome'
import TitleDivisorComponentHome from '../../components/home/TitleDivisorComponentHome'
import { useSubscriptionStore } from '../../store/home/useSubscriptionStore'
import { useSubscriptionMutation } from '../../hooks/home/useSubscriptionMutation'
import { useHistoryStore } from '../../store/history/useHistoryStore'
import { useHistoryMutation } from '../../hooks/history/useHistoryMutation'

const HomeView = () => {
  const { isLoading: loadingSub } = useSubscriptionMutation();
  const { isLoading: loadingHistory } = useHistoryMutation();

  const navigation = useNavigation<NativeStackNavigationProp<NavigationInterface>>();
  const { mutation } = useConsultarMutation();
  const { isPending } = mutation;


  const consultas = useSubscriptionStore((state) => state.subscripcion);
  const user = useAuthStore(state => state.user);
  const history = useHistoryStore((state) => state.history);
  const [cedula, setCedula] = useState('');

  const handleCedula = (cedulabuscar: string) => {
    setCedula(cedulabuscar);
  }

  const handleBuscarCedula = () => {
    mutation.mutate({
      identificacion: cedula
    } as Consultar);
    setCedula('');
  }
  const ultimaConsulta = history && history.length > 0 ? history[0] : null;
  return (
    <AuthLayout>

      <HeaderComponentHome name={user?.name || ''} email={user?.email || ''} />
      <CardConsultaComponentHome manejadorTexto={handleCedula} TextoValue={cedula} manejadorBuscar={handleBuscarCedula} isLoading={isPending} />

      <TitleDivisorComponentHome title='Resumen de Actividad' />
      <View style={styles.activityCard}>
        <View style={styles.infoRow}>
          <View style={styles.iconBadge}>
            <Icon name={'account-balance-wallet'} size={scale(24)} color={Colors.primary} />
          </View>
          <View style={{ alignItems: 'flex-start', marginLeft: scale(10) }}>
            <Text style={styles.label}>CRÉDITOS RESTANTES</Text>
            <Text style={styles.value}>
              {loadingSub ? (
                'Cargando...'
              ) : (
                `${consultas?.consultas_disponibles ?? 0} / ${consultas?.plan?.limit_consultas ?? 0}`
              )}
            </Text>
          </View>
        </View>
        
      </View>

      <TitleDivisorComponentHome title='Consultas Recientes' subtitle={'Ver Todas'} goTo={() => navigation.navigate('HistoryView')} />

      <View style={styles.lastConsultCard}>
        <View style={styles.infoRow}>
          <View style={[styles.iconBadge, { backgroundColor: '#F0F4F8' }]}>
            <Icon name={'person-search'} size={scale(24)} color={Colors.primary} />
          </View>

          <View style={{ marginLeft: scale(10), flex: 1 }}>
            <Text style={styles.label}>ÚLTIMA CONSULTA</Text>
            <Text style={styles.value} numberOfLines={1}>
              {loadingHistory ? (
                'Buscando...'
              ) : (
                history && history.length > 0
                  ? history[0].resultado_json.nombre.trim()
                  : "No hay actividad reciente"
              )}
            </Text>
            {history && history.length > 0 && (
              <Text style={{ fontSize: scale(10), color: Colors.textLight, marginTop: 2 }}>
                Identificación: {history[0].cedula_consultada}
              </Text>
            )}
          </View>
        </View>
      </View>

    </AuthLayout>
  )
}

export default HomeView

const styles = StyleSheet.create({
  activityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.card,
    marginHorizontal: scale(15),
    paddingHorizontal: scale(10),
    borderRadius: moderateScale(15),
    height: verticalScale(70),
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.02)', 
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBadge: {
    width: scale(45),
    height: scale(45),
    backgroundColor: Colors.tabBarIndicator,
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: scale(10),
    color: Colors.textLight,
    fontWeight: 'bold',
  },
  value: {
    fontSize: scale(16),
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  btnRecargar: {
    backgroundColor: Colors.tabBarIndicator,
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastConsultCard: {
    backgroundColor: Colors.card,
    marginHorizontal: scale(15),
    padding: scale(12),
    borderRadius: moderateScale(15),
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.02)', 
  },
})