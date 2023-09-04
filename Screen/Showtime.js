import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Showtime = ({ route }) => {
  const { selectedMovie } = route.params;

  return (
    <View style={styles.container}>
      {/* Display the movie poster */}
      <Image
        source={{ uri: selectedMovie.i?.imageUrl }}
        style={styles.movieImage}
      />
      
      {/* Display the movie title */}
      <Text style={styles.movieTitle}>{selectedMovie.l}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  movieImage: {
    width: 200,
    height: 300,
    resizeMode: 'cover',
  },
  movieTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default Showtime;
