import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, Image, TouchableOpacity, Modal } from 'react-native';
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

  // State variable for modal visibility
  const [isModalVisible, setModalVisible] = useState(false);

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

  // Function to toggle modal visibility
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Function to handle exit from the calendar
  const handleExitCalendar = () => {
    toggleModal(); // Close the calendar modal
    setStartDate(null); // Reset the selected start date
    setEndDate(null); // Reset the selected end date
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
      </TouchableOpacity>

      <View style={styles.containerItinerary}>
        <Text style={styles.title}>Create Itinerary for {city}</Text> 

        <View style={styles.cardContainer}> 
          <View style={styles.imageContainer}>
            <Image source={image} style={styles.cityImage} /> {/* Display city image */}
          </View>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter itinerary name"
            />
            <View style={{ marginVertical: 5 }} /> {/* Add space */}
            {/* Button container for Select Dates and Save */}
            <View style={styles.buttonContainer}>
              <Button title="Select Dates" onPress={toggleModal} color='#556C2F' />
              <View style={{ marginVertical: 10 }} /> {/* Added spacing */}
              <Button title="Save" onPress={handleSave} color='#C49F5A' />
            </View>

            {(startDate || endDate) && (
              <View style={styles.dateContainer}>
                <Text style={styles.selectedDates}>
                  {startDate && format(startDate, 'MMMM d, yyyy')}
                </Text>
                <Text style={styles.selectedDates}>
                  {endDate && format(endDate, 'MMMM d, yyyy')}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Modal for CalendarPicker */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={handleExitCalendar}>
                <Icon
                  name='close'
                  type='material'
                  color='#000'
                  size={26}
                />
              </TouchableOpacity>
            </View>
            <CalendarPicker
              width={Dimensions.get('window').width * 0.8}
              height={Dimensions.get('window').height * 0.5}
              startFromMonday={true}
              allowRangeSelection={true}
              todayBackgroundColor="#ffffff"
              selectedDayColor="#800080"
              selectedDayTextColor="#ffffff"
              textStyle={{ color: '#000000' }}
              onDateChange={handleDateChange}
            />
            <Button title="Confirm" onPress={toggleModal} color='#556C2F' />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4E5C2',
    marginBottom: 5,
  },
  containerItinerary:{
    marginTop: 15,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: 'white', // Border color
    borderRadius: 10, // Border radius
    padding: 10, // Padding inside the container
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#272343',
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row', // Arrange children horizontally
    justifyContent: 'center',
    alignItems: 'flex-start', // Align items to the top
    marginTop: 15,
   
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, // Add margin to separate image from form
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start', // Align items to the top
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
    marginHorizontal: 20,
  },
  dateContainer: {
    marginTop: 5,
    marginHorizontal: 20,
  },
  selectedDates: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    
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
  cityImage: {
    width: '100%', // Make the image take up 100% of container width
    height: 170,
    marginBottom: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'column', // Change to column layout
    width: '80%', // Adjust width to fit buttons
    marginBottom: 20, // Add margin at the bottom
    marginHorizontal:20
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalHeader: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 10
  }
});

export default ItineraryCreateScreen;