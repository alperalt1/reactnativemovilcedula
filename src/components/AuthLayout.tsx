import { View, Text, TouchableWithoutFeedback,Keyboard} from 'react-native'
import React, { ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../constants/Colors'


interface props {
  children: ReactNode
}

const AuthLayout = ({ children }: props) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ backgroundColor: Colors.background, flex: 1 }}>
        {children}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default AuthLayout