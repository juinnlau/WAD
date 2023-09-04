import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const BottomTab = ({ navigation }) => {
  const route = useRoute();
  return (
    <View style={styles.taskBar}>
      <TouchableOpacity
        style={styles.taskBarButton}
        onPress={() => navigation.navigate('CinemaHome')}
      >
        <Text style={styles.taskBarButtonText}>Movies</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.taskBarButton}
        onPress={() => navigation.navigate('UserdataScreen')}
      >
        <Text style={styles.taskBarButtonText}>Me</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    height: 60,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  taskBarButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskBarButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BottomTab;
