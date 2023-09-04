import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SeatScreen = ({ navigation }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeatSelection = (row, col) => {
    const seatID = `${row}-${col}`;
    if (selectedSeats.includes(seatID)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatID));
    } else {
      setSelectedSeats([...selectedSeats, seatID]);
    }
  };

  const generateRow = (row, numberOfSeats) => {
    const seats = [];
    for (let col = 1; col <= numberOfSeats; col++) {
      const seatID = `${row}-${col}`;
      const isSelected = selectedSeats.includes(seatID);
      seats.push(
        <TouchableOpacity
          key={seatID}
          onPress={() => toggleSeatSelection(row, col)}
          style={[
            styles.seat,
            isSelected ? styles.selectedSeat : styles.availableSeat,
          ]}
        >
          <Text style={styles.seatText}>{col}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <View key={row} style={styles.seatRow}>
        <Text style={styles.rowText}>{String.fromCharCode(row + 64)}</Text>
        {seats}
      </View>
    );
  };

  const numberOfSeats = 8;
  const numberOfRows = 5;

  const rows = [];
  for (let row = 1; row <= numberOfRows; row++) {
    rows.push(generateRow(row, numberOfSeats));
  }

  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        <Text style={styles.screenText}>Screen</Text>
      </View>
      <View>{rows}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen: {
    width: '100%',
    height: 40,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  screenText: {
    color: 'white',
    fontSize: 18,
  },
  seatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  seat: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  availableSeat: {
    backgroundColor: 'green',
  },
  selectedSeat: {
    backgroundColor: 'red',
  },
  seatText: {
    color: 'white',
    fontSize: 14,
  },
  rowText: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
    width: 20,
  },
});

export default SeatScreen;
