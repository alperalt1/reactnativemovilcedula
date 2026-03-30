import ReactNativeBlobUtil from "react-native-blob-util";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { Alert, Platform } from "react-native";
import { Urls } from "../../constants/Urls";


export const downloadExcel = async () => {
  try {

    const token = useAuthStore.getState().token;
    if (!token) {
      Alert.alert("Error", "Debes estar autenticado");
      return;
    }

    const { dirs } = ReactNativeBlobUtil.fs;

    const fileName = `Historial_${Date.now()}.xlsx`;
    const path = `${Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir}/${fileName}`;
    const res = await ReactNativeBlobUtil.config({
      fileCache: true,
      path: path,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: 'Historial de Cédulas',
        mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        description: 'Generando reporte Excel...'
      }
    })
    .fetch('GET', `${Urls.development}/exportar`, {
      Authorization: `Bearer ${token}`,
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    if (Platform.OS === 'ios') {
      ReactNativeBlobUtil.ios.previewDocument(res.path());
    } else {
      Alert.alert("Éxito", "El reporte se descargó en tu carpeta de Descargas");
    }

  } catch (error) {
    console.error("Error en descarga:", error);
    Alert.alert("Error", "No se pudo generar el archivo Excel en el servidor.");
  }
}