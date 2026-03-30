import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AuthLayout from '../../components/AuthLayout';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NavigationInterface } from '../../interface/navigation/NavigationInterface';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import HeaderComponent from '../../components/HeaderComponent';
import { useConsultaStore } from '../../store/home/useConsultaStore';
import { Colors } from '../../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const CedulaView = () => {
  const route = useRoute<RouteProp<NavigationInterface, 'CedulaView'>>();
  const cedula = useConsultaStore((state) => state.cedula);
  const { title } = route.params;

  const formatValue = (val: string | undefined) => {
    if (!val || val.trim() === "") return "NO REGISTRA / N/A";
    return val.trim();
  };

  const InfoRow = ({ icon, label, value }: { icon: string; label: string; value?: string }) => (
    <View style={styles.infoRow}>
      <View style={styles.iconCircle}>
        <Icon name={icon} size={scale(18)} color={Colors.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{formatValue(value)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <HeaderComponent title={title} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="badge" size={scale(20)} color={Colors.card} />
            <Text style={styles.cardTitle}>Datos de Identidad</Text>
          </View>
          <View style={styles.cardBody}>
            <InfoRow icon="fingerprint" label="Número de Cédula" value={cedula?.cedula} />
            <InfoRow icon="person" label="Nombres Completos" value={cedula?.nombre} />
            <InfoRow icon="cake" label="Fecha de Nacimiento" value={cedula?.fechaNacimiento} />
            <InfoRow icon="public" label="Nacionalidad" value={cedula?.nacionalidad} />
            <InfoRow icon="wc" label="Género" value={cedula?.genero} />
            <InfoRow icon="verified" label="Condición" value={cedula?.condicionCedulado} />
            <InfoRow icon="event-available" label="Fecha Cedulación" value={cedula?.fechaCedulacion} />
          </View>
        </View>

        <View style={styles.card}>
          <View style={[styles.cardHeader, { backgroundColor: '#2ecc71' }]}>
            <Icon name="home" size={scale(20)} color={Colors.card} />
            <Text style={styles.cardTitle}>Domicilio y Origen</Text>
          </View>
          <View style={styles.cardBody}>
            <InfoRow icon="location-on" label="Lugar de Nacimiento" value={cedula?.lugarNacimiento} />
            <InfoRow icon="map" label="Lugar Domicilio" value={cedula?.lugarDomicilio} />
            <InfoRow icon="navigation" label="Calle Domicilio" value={cedula?.calleDomicilio} />
            <InfoRow icon="home-work" label="Numeración" value={cedula?.numeracionDomicilio} />
          </View>
        </View>

        <View style={styles.card}>
          <View style={[styles.cardHeader, { backgroundColor: '#e67e22' }]}>
            <Icon name="family-restroom" size={scale(20)} color={Colors.card} />
            <Text style={styles.cardTitle}>Estado Civil y Familia</Text>
          </View>
          <View style={styles.cardBody}>
            <InfoRow icon="favorite" label="Estado Civil" value={cedula?.estadoCivil} />
            <InfoRow icon="person-add" label="Cónyuge" value={cedula?.conyuge} />
            <InfoRow icon="male" label="Padre" value={cedula?.nombrePadre} />
            <InfoRow icon="female" label="Madre" value={cedula?.nombreMadre} />
          </View>
        </View>

        <View style={styles.card}>
          <View style={[styles.cardHeader, { backgroundColor: '#9b59b6' }]}>
            <Icon name="school" size={scale(20)} color={Colors.card} />
            <Text style={styles.cardTitle}>Instrucción y Registros</Text>
          </View>
          <View style={styles.cardBody}>
            <InfoRow icon="work" label="Profesión" value={cedula?.profesion} />
            <InfoRow icon="history-edu" label="Instrucción" value={cedula?.instruccion} />
            <InfoRow icon="event-busy" label="Fecha Defunción" value={cedula?.fechaInscripcionDefuncion} />
            <InfoRow icon="transgender" label="Inscripción Género" value={cedula?.fechaInscripcionGenero} />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default CedulaView;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: scale(15),
    paddingBottom: verticalScale(30),
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: moderateScale(15),
    marginBottom: verticalScale(20),
    overflow: 'hidden',
    // Sombras
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardHeader: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(12),
    paddingLeft: scale(15),
  },
  cardTitle: {
    color: Colors.card,
    fontSize: scale(15),
    fontWeight: 'bold',
    marginLeft: scale(10),
  },
  cardBody: {
    padding: scale(15),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(15),
  },
  iconCircle: {
    width: scale(35),
    height: scale(35),
    backgroundColor: '#f0f4f8',
    borderRadius: scale(17.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: scale(12),
    flex: 1,
  },
  label: {
    fontSize: scale(11),
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: scale(14),
    color: '#333',
    fontWeight: '600',
    marginTop: verticalScale(2),
  },
});