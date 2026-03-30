import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale, verticalScale } from 'react-native-size-matters'
import { Colors } from '../../constants/Colors'
import HeaderComponent from '../../components/HeaderComponent'

const PoliticasPrivacidadView = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <HeaderComponent title="Políticas de Privacidad" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>1. Información Recopilada</Text>
        <Text style={styles.paragraph}>
          Recopilamos datos básicos de su perfil como nombre y correo electrónico para la gestión de su cuenta. Asimismo, registramos los números de identificación consultados para mantener un historial de consultas disponible únicamente para usted.
        </Text>

        <Text style={styles.title}>2. Uso de la Información</Text>
        <Text style={styles.paragraph}>
          Los datos almacenados se utilizan con el fin de proporcionar el servicio de historial, mejorar la estabilidad de la plataforma y garantizar la seguridad de su sesión mediante tokens de autenticación.
        </Text>

        <Text style={styles.title}>3. Almacenamiento y Seguridad</Text>
        <Text style={styles.paragraph}>
          Su información personal y registros de consulta se almacenan en servidores seguros con protocolos de encriptación. No vendemos ni compartimos su información con empresas terceras para fines comerciales o de marketing.
        </Text>

        <Text style={styles.title}>4. Sus Derechos</Text>
        <Text style={styles.paragraph}>
          Usted tiene derecho a acceder a su información en cualquier momento. De igual manera, puede solicitar la eliminación definitiva de su cuenta y de todo su historial de registros comunicándose con nuestro equipo de soporte.
        </Text>

        <Text style={styles.title}>5. Cambios en esta Política</Text>
        <Text style={styles.paragraph}>
          Nos reservamos el derecho de actualizar esta política según sea necesario para cumplir con cambios técnicos o legales. El uso continuado de la aplicación implica la aceptación de estas condiciones.
        </Text>

        <Text style={styles.title}>6. Servicios de Terceros</Text>
        <Text style={styles.paragraph}>
          La aplicación utiliza servicios externos de consulta de datos, como APIs de terceros (por ejemplo, apiconsult), para obtener información mostrada al usuario. No somos una entidad gubernamental ni representamos a ninguna institución pública.
          La información proporcionada es de carácter referencial y depende de la disponibilidad y precisión de dichos servicios externos.
        </Text>

        {/* Espacio final */}
        <View style={{ height: verticalScale(40) }} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default PoliticasPrivacidadView

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: scale(20),
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
    textAlign: 'left', // Alineación limpia sin espacios raros
    letterSpacing: 0.2,
  }
})