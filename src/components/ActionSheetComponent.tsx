import React, { useRef, useEffect } from 'react';
import {
  Modal, StyleSheet, Text, TouchableOpacity,
  View, Dimensions, Animated, PanResponder,
  ScrollView
} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../constants/Colors';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Props {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const ActionSheetComponent = ({ visible, onClose, title, children }: Props) => {
  const panY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Solo capturamos el movimiento si es hacia abajo
        return gestureState.dy > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 120 || gestureState.vy > 0.5) {
          closeSheet();
        } else {
          Animated.spring(panY, { toValue: 0, useNativeDriver: true }).start();
        }
      },
    })
  ).current;

  // 3. Efectos de apertura
  useEffect(() => {
    if (visible) {
      Animated.spring(panY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const closeSheet = () => {
    Animated.timing(panY, {
      toValue: SCREEN_HEIGHT,
      duration: 200,
      useNativeDriver: true,
    }).start(onClose);
  };

  return (
    <Modal animationType="none" transparent visible={visible} onRequestClose={closeSheet}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={closeSheet} />

        <Animated.View
          style={[styles.sheetContainer, { transform: [{ translateY: panY }] }]}
        >
          {/* 1. ÁREA DE ARRASTRE (Solo esta parte activa el cierre) */}
          <View {...panResponder.panHandlers} style={styles.dragHandle}>
            <View style={styles.indicator} />
            {title && <Text style={styles.title}>{title}</Text>}
          </View>

          {/* 2. ÁREA DE CONTENIDO (Scroll libre) */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            bounces={false}
          >
            {children}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ActionSheetComponent;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  backdrop: { flex: 1 },
  indicator: {
    width: scale(40),
    height: verticalScale(5),
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: verticalScale(20),
  },
  title: { fontSize: scale(18), fontWeight: 'bold', color: '#000', marginBottom: 15 },
  content: { marginBottom: 20 },
  sheetContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: moderateScale(25),
    borderTopRightRadius: moderateScale(25),
    maxHeight: SCREEN_HEIGHT * 0.85, // Limita la altura para que el scroll se active
    minHeight: SCREEN_HEIGHT * 0.5,
  },
  dragHandle: {
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(5),
    alignItems: 'center',
    width: '100%',
  },
  scrollContent: {
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(40), // Espacio extra al final
  },
});