import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'db.sqlite', createFromLocation: 1 });

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Create the 'users' table if it doesn't exist
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT);'
      );
    });
  }, []);

  const handleSignUp = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (_, result) => {
          const { rows } = result;
          if (rows.length === 0) {
            // Email is not in use, proceed with sign up
            tx.executeSql(
              'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
              [username, email, password],
              (_, result) => {
                setErrorMessage('');
                navigation.navigate('Home'); // Navigate to Home after successful sign up
              },
              (error) => {
                console.error('Error during sign up:', error);
                setErrorMessage('An error occurred during sign up');
              }
            );
          } else {
            setErrorMessage('Email is already in use');
          }
        },
        (error) => {
          console.error('Error during SQL query:', error);
          setErrorMessage('An error occurred during sign up');
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
});

export default SignUpScreen;
