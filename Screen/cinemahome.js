import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Showtime from './Showtime';



const CinemaHome = ({ navigation }) => {
  const [movieIMDbIDs, setMovieIMDbIDs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movieList, setMovieList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to save movie details to AsyncStorage
  const saveMovieDetailsToStorage = async (imdbID, movieDetails) => {
    try {
      // Serialize the movieDetails object to JSON
      const movieDetailsJSON = JSON.stringify(movieDetails);
      // Use imdbID as the key to save the data
      await AsyncStorage.setItem(imdbID, movieDetailsJSON);
      console.log('Movie details saved to AsyncStorage:', imdbID);
    } catch (error) {
      console.error('Error saving movie details to AsyncStorage:', error);
    }
  };

  // Function to fetch movie details by IMDb ID and store them in AsyncStorage
  const fetchAndStoreMovieDetails = async (imdbID) => {
    const apiKey = 'eba2d940ddmsh10b0064c1d95a5ep171117jsn7c65f3ef45d8';

    const url = `https://online-movie-database.p.rapidapi.com/title/get-details?tconst=${imdbID}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const movieDetails = await response.json();

      if (movieDetails) {
        // Save movie details to AsyncStorage
        saveMovieDetailsToStorage(imdbID, movieDetails);
      }
    } catch (error) {
      console.error('Error fetching and storing movie details for IMDb ID:', imdbID, error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://imdb8.p.rapidapi.com/title/v2/get-popular-movies-by-genre?genre=action&limit=1';
      const apiKey = 'eba2d940ddmsh10b0064c1d95a5ep171117jsn7c65f3ef45d8';
  
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
        },
      };
  
      try {
        const response = await fetch(url, options);
  
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (!Array.isArray(data)) {
          console.error('API response is not an array:', data);
          return;
        }
  
        // Extract IMDb IDs from the response
        const imdbIDs = data.map((item) => {
          const matches = item.match(/\/title\/(tt\d+)\//);
          return matches ? matches[1] : null;
        }).filter(Boolean);
  
        setMovieIMDbIDs(imdbIDs);
        setLoading(false);
        console.log('Movie IMDb IDs:', imdbIDs);
  
        // Save the fetched data to AsyncStorage
        await AsyncStorage.setItem('movieData', JSON.stringify(data));
        console.log('Fetched data saved to AsyncStorage');
        
        // Fetch and store movie details for each IMDb ID
        imdbIDs.forEach(fetchAndStoreMovieDetails);
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchMovieList = async (imdbIDs) => {
      const apiKey = 'eba2d940ddmsh10b0064c1d95a5ep171117jsn7c65f3ef45d8';

      const detailsPromises = imdbIDs.map(async (imdbID) => {
        const url = `https://imdb8.p.rapidapi.com/auto-complete?q=${imdbID}`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
          },
        };

        try {
          const response = await fetch(url, options);
          const data = await response.json();

          if (Array.isArray(data.d)) {
            const movieDetails = data.d.find(item => item.i?.imageUrl);
            if (movieDetails) {
              // Save movie details to AsyncStorage
              saveMovieDetailsToStorage(imdbID, movieDetails);
              return movieDetails;
            }
          } else {
            console.error('No movies found in the response for IMDb ID:', imdbID);
            return null;
          }
        } catch (error) {
          console.error('Error fetching movie details for IMDb ID:', imdbID, error);
          return null;
        }
      });

      const movieDetailsData = await Promise.all(detailsPromises);
      const filteredMovieList = movieDetailsData.filter(item => item !== null);
      setMovieList(filteredMovieList);
    };

    fetchMovieList(movieIMDbIDs);
  }, [movieIMDbIDs]);


  const getStoredData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('movieData');
      
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData);
        console.log('Data stored in AsyncStorage:', parsedData);
      } else {
        console.log('No data found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error getting data from AsyncStorage:', error);
    }
  };
  // Check the Data Stored.
  getStoredData();
  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      if (movieIMDbIDs.length === 0) {
        return;
      }

      setMovieList([]);
    } else {
      const filteredMovies = movieList.filter((movie) => {
        const title = movie.l.toLowerCase();
        return title.includes(searchQuery.toLowerCase());
      });

      setMovieList(filteredMovies);
    }
  };

  const handleMoviePress = (selectedMovie) => {
    navigation.navigate('Showtime', { selectedMovie });
  };
  
 
  const renderItem = ({ item }) => {
    return (
      
      <TouchableOpacity
        style={styles.movieItem}
        onPress={() => handleMoviePress(item.id)}
      >
        <Image
          source={{ uri: item.i?.imageUrl }}
          style={styles.movieImage}
        />
        <View style={styles.movieInfo}>
          <Text style={styles.movieTitle}>{item.l}</Text>
          <Text style={styles.movieIMDbID}>IMDb ID: {item.id}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for movies..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={movieList}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  movieImage: {
    width: 80,
    height: 100,
    resizeMode: 'cover',
  },
  movieInfo: {
    marginLeft: 10,
  },
  movieTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieIMDbID: {
    fontSize: 14,
    color: 'gray',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: 'white',
    marginRight: 8,
    paddingHorizontal: 8,
  },
  searchButton: {
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CinemaHome;
