import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GetStarted from './Screen/getstarted';
import LoginScreen from './Screen/LoginScreen';
import UserdataScreen from './Screen/UserdataScreen';
import SignUpScreen from './Screen/SignUpScreen';
import ShowtimesScreen from './Screen/ShowtimesScreen';
import SQLite from 'react-native-sqlite-storage';
import Usermanagement from './Database/Usermanagement';
import MovieDetails from './Database/Moviedetails';
import MovieListScreen from './Database/MovieListScreen';
import DrawerNavigator from './assets/DrawerNavigator';
import CinemaHome from './Screen/cinemahome';
import Showtime from './Screen/Showtime';
import SeatScreen from './Screen/SeatScreen';
import Datepick from './Screen/Showtime';
import DatepickerScreen from './Screen/Showtime';
import HomeScreen from './Screen/HomeScreen';

const Stack = createStackNavigator();

const App = () => {
  const [dbInitialized, setDbInitialized] = useState(false);
  const [db, setDb] = useState(null);
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    // Initialize the SQLite database for the User 
    const database = SQLite.openDatabase({ name: 'db.sqlite' });

    database.transaction(
      (tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT);',
          [],
          () => {
            
            setDbInitialized(true);
            setDb(database);
          },
          (error) => {
            console.error('Error creating table:', error);
            setDbInitialized(true);
          }
        );
      },
      null,
      null
    );
  }, []);


  return (
    <NavigationContainer>
      <DrawerNavigator>
        {/* Nested Stack Navigator for screens with header */}
        <Stack.Navigator initialRouteName="Getstarted" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="GetStarted" component={GertStarted} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          
          <Stack.Screen name="CinemaHome" component={CinemaHome} />
          <Stack.Screen name="UserdataScreen" component={UserdataScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="Usermanagement" component={Usermanagement} />
          <Stack.Screen name="MovieDetails" component={MovieDetails} />
          <Stack.Screen name="MovieListScreen" component={MovieListScreen} />
          <Stack.Screen name="Showtime" component={Showtime} />
          <Stack.Screen name="SeatScreen" component={SeatScreen} />
        </Stack.Navigator>
      </DrawerNavigator>
    </NavigationContainer>
  );
};
export default App;
