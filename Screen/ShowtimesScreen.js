import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ShowtimesScreen = () => {
  // List of showtimes
  const showtimes = [
    { movie: 'Timeslot 1', time: '12:00 PM' },
    { movie: 'Timeslot 2', time: '3:00 PM' },
    { movie: 'Timeslot 3', time: '6:00 PM' },
    { movie: 'Timeslot 4', time: '9:00 PM' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Showtimes</Text>
      <View style={styles.showtimesContainer}>
        {showtimes.map((showtime, index) => (
          <View key={index} style={styles.showtime}>
            <Text style={styles.movie}>{showtime.movie}</Text>
            <Text>{showtime.time}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  showtimesContainer: {
    alignItems: 'center',
  },
  showtime: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    margin: 10,
    width: 200,
    alignItems: 'center',
  },
  movie: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default ShowtimesScreen;
