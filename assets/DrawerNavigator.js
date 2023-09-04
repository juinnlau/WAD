import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, Image, StyleSheet, ScrollView, Animated, TouchableOpacity, BackHandler, Alert, TextInput } from 'react-native';
import SideBars from '../assets/SideBars';
import UserdataScreen from '../Screen/UserdataScreen';
import CinemaHome from '../Screen/cinemahome'; // Import the 'CinemaHome' screen
import Usermanagement from '../Database/Usermanagement';
import MovieListScreen from '../Database/MovieListScreen';
import SeatScreen from '../Screen/SeatScreen';
import Showtime from '../Screen/Showtime';
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <SideBars {...props} />
      )}
    >
      <Drawer.Screen name="Home" component={CinemaHome} />
      <Drawer.Screen name="Profile" component={UserdataScreen} />
      <Drawer.Screen name="MovieList" component={SeatScreen} />
      <Drawer.Screen name="TestScreen Database for User" component={Usermanagement} />
      
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
