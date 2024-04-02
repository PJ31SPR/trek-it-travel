import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';
import { format } from 'date-fns';
import Header from '../components/Header'; 

const ItineraryCreateScreen = ({ route, navigation }) => {
  const { city, image } = route.params; // Retrieve city and image from route params

  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleDateChange = (date, type) => {
    if (type === 'START_DATE') {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const handleSave = () => {
    console.log('Itinerary saved:', { name, startDate, endDate });
  };

  return (
    <View style={styles.container}>
      <Header title="Trek-it!" /> 
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
        <Icon
          name='arrow-left'
          type='font-awesome'
          color='#C49F5A'
          size={26}
        />
        {/* <Text style={styles.goBackButtonText}>Go Back</Text> */}
      </TouchableOpacity>

      <Text style={styles.title}>Create Itinerary for {city}</Text> 
      <View style={styles.cardContainer}> 
        <Image source={image} style={styles.cityImage} /> {/* Display city image */}
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter itinerary name"
        />

        <Button title="Select Dates" onPress={() => setDatePickerVisible(true)} />
        {(startDate || endDate) && (
          <View style={styles.dateContainer}>
            <Text>Selected Dates:</Text>
            {startDate && <Text>{format(startDate, 'MMMM d, yyyy')}</Text>}
            {endDate && <Text>{format(endDate, 'MMMM d, yyyy')}</Text>}
          </View>
        )}
        
        {isDatePickerVisible && (
          <View style={styles.calendarContainer}>
            <CalendarPicker
              width={Dimensions.get('window').width * 0.8} // Adjust width to 80% of window width
              height={Dimensions.get('window').height * 0.5} // Adjust height to 50% of window height
              startFromMonday={true}
              allowRangeSelection={true}
              todayBackgroundColor="#f2e6ff"
              selectedDayColor="#800080"
              selectedDayTextColor="#FFFFFF"
              onDateChange={handleDateChange}
            />
            <Button title="Confirm" onPress={() => setDatePickerVisible(false)} />
          </View>
        )}
        <Button title="Save" onPress={handleSave} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4E5C2',
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#272343',
    fontFamily: 'Poppins',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
    width: '80%',
    backgroundColor: '#fff',
    color: '#272343',
    fontFamily: 'Poppins',
  },
  dateContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  calendarContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1, // Ensure it's above other components
  },
  // goBackButtonText: {
  //   color: '#C49F5A',
  //   fontFamily: 'Poppins',
  // },
  cityImage: {
    width: 200,
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
  },
});

export default ItineraryCreateScreen;
