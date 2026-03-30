import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import AuthLayout from '../../components/AuthLayout';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../../constants/Colors';
import { useHistoryStore } from '../../store/history/useHistoryStore';
import { useHistoryMutation } from '../../hooks/history/useHistoryMutation';
import HeaderComponent from '../../components/HeaderComponent';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationInterface } from '../../interface/navigation/NavigationInterface';
import { useConsultaStore } from '../../store/home/useConsultaStore';
import { downloadExcel } from '../../hooks/excel/downloadExcel';

const HistoryView = () => {
  const navigation = useNavigation<NativeStackNavigationProp<NavigationInterface>>();
  const setCedula = useConsultaStore((state) => state.setCedula);
  const { isLoading, refetch, isFetching } = useHistoryMutation();
  const history = useHistoryStore((state) => state.history);

  const manejarPresionItem = (item: any) => {
    setCedula(item.resultado_json);
    navigation.navigate('CedulaView', { title: 'Detalle de Consulta' });
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-EC', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading && history.length === 0) {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <HeaderComponent title={'Historial de Consultas'} />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Cargando historial...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleDownload = async () => {
    await downloadExcel();
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{ flex: 1 }}>
        <HeaderComponent title={'Historial de Consultas'} />
        <View >
          <TouchableOpacity onPress={handleDownload} style={styles.download}>
            <Text style={{ fontSize: scale(15), color: Colors.background }}>Descargar Historial</Text>
            <Icon name="download" size={scale(20)} color={Colors.background} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={history}
          contentContainerStyle={styles.listContainer}
          keyExtractor={(item) => item.id.toString()}
          refreshing={isFetching}
          onRefresh={refetch}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => manejarPresionItem(item)}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <Icon name="person" size={scale(24)} color={Colors.primary} />
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.nameText} numberOfLines={1}>
                  {item.resultado_json.nombre.trim()}
                </Text>
                <Text style={styles.idText}>C.I: {item.cedula_consultada}</Text>
                <Text style={styles.dateText}>{formatDate(item.created_at)}</Text>
              </View>

              <Icon name="chevron-right" size={scale(20)} color={Colors.textLight} />
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              {isLoading ? (
                <ActivityIndicator size="large" color={Colors.primary} />
              ) : (
                <Text style={styles.emptyText}>No hay registros aún</Text>
              )}
            </View>
          )}
        />

      </View>

    </SafeAreaView>
  );
};

export default HistoryView;

const styles = StyleSheet.create({
  download: {
    alignSelf: 'center', 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderRadius: scale(20), 
    backgroundColor: Colors.secondary, 
    height: verticalScale(30), 
    paddingHorizontal: scale(12), 
    marginBottom: verticalScale(10)
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContainer: {
    paddingHorizontal: scale(15),
    paddingBottom: verticalScale(20),
    paddingTop: verticalScale(10),
  },
  card: {
    backgroundColor: Colors.card,
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(12),
    borderRadius: moderateScale(15),
    marginBottom: verticalScale(12),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: scale(45),
    height: scale(45),
    backgroundColor: '#F0F4F8',
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    marginLeft: scale(12),
  },
  nameText: {
    fontSize: scale(14),
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textTransform: 'uppercase',
  },
  idText: {
    fontSize: scale(12),
    color: Colors.textLight,
    marginTop: 2,
  },
  dateText: {
    fontSize: scale(10),
    color: '#999',
    marginTop: 4,
  },
  emptyContainer: {
    marginTop: verticalScale(80),
    alignItems: 'center',
    opacity: 0.5,
  },
  emptyText: {
    fontSize: scale(16),
    color: Colors.textLight,
    marginTop: verticalScale(10),
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: verticalScale(100),
  },
  loadingText: {
    marginTop: verticalScale(10),
    color: Colors.textPrimary,
    fontSize: scale(14),
    fontWeight: '500',
  },
});