import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useConsultaStore } from '../../store/home/useConsultaStore';
import { verticalScale } from 'react-native-size-matters';

const ResultadoConsultaHome = () => {
  const cedula = useConsultaStore((state) => state.cedula);
  const clearCedula = useConsultaStore((state) => state.clearCedula);
  if (!cedula) return null;
  return (
    <View style={styles.container}>
      <Text style={{color:'white'}}>¡Datos recibidos para: {cedula.nombre}!</Text>
    </View>
  );
};

export default ResultadoConsultaHome

const styles = StyleSheet.create({
  container: {
    height: verticalScale(19),

    backgroundColor: '#443939ff',
  }
});

