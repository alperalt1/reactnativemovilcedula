import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeView from "../views/home/HomeView";
import HistoryView from "../views/history/HistoryView";
import PlanesView from "../views/planes/PlanesView";
import ProfileView from "../views/profile/ProfileView";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from "../constants/Colors";
import { Platform, TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors.tabBarActive,
        tabBarInactiveTintColor: Colors.tabBarInactive,
        tabBarButton: (props) => {
          const { style, children, onPress, onLongPress, ...rest } = props;
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onPress}
              style={style}
            >
              {children}
            </TouchableOpacity>
          );
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: string = '';
          if (route.name === 'HomeView') {
            iconName = 'home-filled';
          } else if (route.name === 'HistoryView') {
            iconName = 'access-time-filled';
          } else if (route.name === 'PlanesView') {
            iconName = 'credit-card';
          } else if (route.name === 'ProfileView') {
            iconName = 'person';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeView" component={HomeView} options={{ headerShown: false, title: 'Inicio' }} />
      <Tab.Screen name="HistoryView" component={HistoryView} options={{ headerShown: false, title: 'Historial' }} />
      {/* <Tab.Screen name="PlanesView" component={PlanesView} options={{ headerShown: false, title: 'Planes' }} /> */}
      <Tab.Screen name="ProfileView" component={ProfileView} options={{ headerShown: false, title: 'Perfil' }} />
    </Tab.Navigator>
  )
}