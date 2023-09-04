import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, ImageBackground } from 'react-native'; // Import ImageBackground
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';
import CinemaHome from './cinemahome';
let SQLITE = require('react-native-sqlite-storage');

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSignUpButton, setShowSignUpButton] = useState(false);
  const [db, setDb] = useState(null);

  useEffect(() => {
    // Initialize the SQLite database
    const db = SQLite.openDatabase({ name: 'db.sqlite', createFromLocation: '~db.sqlite' });
    setDb(db);
  }, []);

  const handleLogin = () => {
    if (db) {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM users WHERE email = ? AND password = ?',
          [email, password],
          (_, result) => {
            const { rows } = result;
            if (rows.length > 0) {
              // User data found, store it and navigate to HomeScreen
              const userData = {
                email: rows.item(0).email, // Replace with the correct column names
                // Add other user-related data here
              };

              AsyncStorage.setItem('userData', JSON.stringify(userData))
                .then(() => {
                  // Set a timer to clear user data after 10 minutes
                  setTimeout(() => {
                    AsyncStorage.removeItem('userData')
                      .then(() => {
                        console.log('User data cleared after 10 minutes');
                      })
                      .catch(error => {
                        console.error('Error clearing user data:', error);
                      });
                  }, 100 * 60 * 1000); // 100 minutes in milliseconds

                  // Redirect to the HomeScreen on successful login
                  navigation.replace('CinemaHome');
                })
                .catch(error => {
                  console.error('Error storing user data:', error);
                });
            } else {
              setErrorMessage('Invalid email or password');
              setShowSignUpButton(true);
            }
          },
          error => {
            console.error('Error during SQL query:', error);
          }
        );
      });
    } else {
      console.log('Database not initialized');
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUpScreen');
  };

  return (
    <ImageBackground source={require('../images/wallpaper.jpg')} style={styles.wallpaper}>
      <View style={styles.container}>
        <Text style={styles.title}>Login to Continue</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="white"
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="white"
          placeholder="Password"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <Button title="Login" onPress={handleLogin} />

        <View style={styles.buttonSeparator} />

        {showSignUpButton && <Button title="Sign Up" onPress={handleSignUp} />}

        <Text style={styles.errorMessage}>{errorMessage}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  wallpaper: {
    flex: 1,
    resizeMode: 'cover', // Cover the entire screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Add a semi-transparent background
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: 'white',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    color: 'white',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
  buttonSeparator: {
    height: 10,
  },
});

export default LoginScreen;
