import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Colors } from '../../constants/Colors'
import InputCustomHome from './InputCustomHome'
import ButtonCustomHome from './ButtonCustomHome'

interface Props {
  manejadorTexto: (text: string) => void;
  TextoValue: string;
  manejadorBuscar: () => void;
  isLoading: boolean;
}

const CardConsultaComponentHome = ({ manejadorTexto, TextoValue, manejadorBuscar, isLoading }: Props) => {
  return (
    <View
      style={styles.container}
    >
      <View
        style={styles.containerTitle}
      >
        <View style={styles.decoratorCircle1} />
        <View style={styles.decoratorCircle2} />
        <Text style={styles.titleText}>Consultar Cédula</Text>
        <Text style={styles.subtitleText}>Verificación inmediata de identidad</Text>
      </View>

      <View style={styles.containerInfo}>
        <InputCustomHome
          label={"Ingrese número de identificación"}
          iconname={'call-to-action'}
          onChangeText={text => manejadorTexto(text)}
          value={TextoValue}
          maxLength={10}
          keyboardType='number-pad'
          autoCapitalize='none'
        />
        <ButtonCustomHome
          label='Buscar Ahora'
          onPress={manejadorBuscar}
          disabled={isLoading}
          loading={isLoading}
        />
      </View>

    </View>
  )
}

export default CardConsultaComponentHome

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    marginHorizontal: scale(15),
    borderRadius: moderateScale(20),
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
    overflow: 'visible',
  },
  containerTitle: {
    backgroundColor: Colors.primary,
    borderTopEndRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    paddingVertical: scale(25),
    paddingLeft: scale(20),
    height: verticalScale(110),
    overflow: 'hidden',
    justifyContent: 'center'
  },
  titleText: {
    color: Colors.card,
    fontSize: scale(22),
    fontWeight: 'bold',
    zIndex: 1
  },
  subtitleText: {
    color: 'rgba(255,255,255,0.8)',
    zIndex: 1
  },
  decoratorCircle1: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: scale(100),
    height: scale(100),
    borderRadius: 50,
    top: -scale(30),
    right: -scale(20),
  },
  decoratorCircle2: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.05)',
    width: scale(150),
    height: scale(150),
    borderRadius: 75,
    bottom: -scale(70),
    left: -scale(20),
  },
  containerInfo: {
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
    paddingTop: scale(10),
    paddingBottom: scale(27),
  }
})