import React from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'
import { Colors } from '../../constants/Colors'
import HeaderComponent from '../../components/HeaderComponent'
import Icon from 'react-native-vector-icons/MaterialIcons'

const CentroAyudaView = () => {

  const FaqItem = ({ question, answer }: { question: string; answer: string }) => (
    <View style={styles.faqItem}>
      <Text style={styles.question}>{question}</Text>
      <Text style={styles.answer}>{answer}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <HeaderComponent title="Centro de Ayuda" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        <Text style={styles.sectionTitle}>Preguntas Frecuentes</Text>

        <FaqItem
          question="¿Por qué no carga una consulta?"
          answer="A veces las fuentes oficiales (Registro Civil u otros) presentan intermitencias. Si esto sucede, intente nuevamente en unos minutos."
        />

        <FaqItem
          question="¿Mi historial es privado?"
          answer="Sí, solo usted puede ver las consultas realizadas desde su cuenta personal. Los datos están protegidos en nuestra base de datos."
        />

        <FaqItem
          question="¿Cómo elimino mi cuenta?"
          answer="Para eliminar su cuenta y todos sus registros, debe enviarnos una solicitud formal a través de nuestro correo de contacto."
        />

        <Text style={styles.sectionTitle}>Canales de Contacto</Text>

        <View style={styles.contactCard}>
          <Icon name="email" size={scale(24)} color={Colors.primary} />
          <View style={[styles.contactTextContainer, { flex: 1 }]}>
            <Text style={styles.contactLabel}>Correo Electrónico</Text>
              <Text
                style={styles.contactValue}

              >
                universalworldtechnologyec@gmail.com
              </Text>
          </View>
        </View>
        <Text style={styles.infoText}>
          Nuestro equipo de soporte técnico responde generalmente en un plazo de 24 a 48 horas laborables.
        </Text>

        <View style={{ height: verticalScale(40) }} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default CentroAyudaView

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: scale(20),
  },
  sectionTitle: {
    fontSize: scale(13),
    color: '#888',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: verticalScale(15),
    marginTop: verticalScale(10),
  },
  faqItem: {
    backgroundColor: Colors.card,
    padding: scale(15),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(12),
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  question: {
    fontWeight: 'bold',
    fontSize: scale(14),
    color: Colors.primary,
    marginBottom: verticalScale(5),
  },
  answer: {
    fontSize: scale(13),
    color: '#666',
    lineHeight: scale(18),
    textAlign: 'left',
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    padding: scale(15),
    borderRadius: moderateScale(10),
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  contactTextContainer: {
    marginLeft: scale(15),
    flex: 1,
  },
  contactLabel: {
    fontSize: scale(11),
    color: '#888',
    fontWeight: 'bold',
  },
  contactValue: {
    fontSize: scale(11),
    color: Colors.primary,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: 2,
    flexWrap: 'wrap',
  },
  infoText: {
    textAlign: 'center',
    color: '#999',
    fontSize: scale(11),
    marginTop: verticalScale(20),
    paddingHorizontal: scale(20),
  }
})