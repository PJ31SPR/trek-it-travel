import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity, Modal } from 'react-native';
import { Icon } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';
import { format } from 'date-fns';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { addItinerary } from '../db.api.jsx'
import { auth, db} from '../firebase';


const ItineraryCreateScreen = ({ route }) => {
  const { city, image } = route.params; // Retrieve city and image from route params
  const navigation = useNavigation(); // Use navigation hook

  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [itinerary, setItinerary] = useState([]); // State variable to store the itinerary
  const [userId, setUserId] = useState('')

  // State variable for modal visibility
  const [isModalVisible, setModalVisible] = useState(false);

  const handleDateChange = (date, type) => {
    if (type === 'START_DATE') {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      // User is signed in
      setUserId(user.uid);
      return unsubscribe;
    })
  }, []);

  const handleSave = () => {
    console.log('Itinerary saved:', { name, startDate, endDate, itinerary });
    addItinerary(userId, name, city, startDate, endDate )
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

  // Function to add a card to the itinerary
  const addToItinerary = (item) => {
    console.log('Item:', item); // Log the item object
    if (!itinerary.find(card => card.id === item.id)) {
      setItinerary([...itinerary, item]);
      console.log('Added to itinerary:', item.name);
    }
  };
  

  // Function to remove a card from the itinerary
  const removeFromItinerary = (item) => {
    const updatedItinerary = itinerary.filter(card => card.id !== item.id);
    setItinerary(updatedItinerary);
    console.log('Removed from itinerary:', item.name);
  };

  // Dummy data for attractions, restaurants, and landmarks
  const attractions = [
    { id: 1, name: 'Attraction 1', description: 'Description of attraction 1' },
    { id: 2, name: 'Attraction 2', description: 'Description of attraction 2' },
    { id: 3, name: 'Attraction 3', description: 'Description of attraction 3' },
  ];

  const restaurants = [
    { id: 1, name: 'Restaurant 1', description: 'Description of restaurant 1' },
    { id: 2, name: 'Restaurant 2', description: 'Description of restaurant 2' },
    { id: 3, name: 'Restaurant 3', description: 'Description of restaurant 3' },
  ];

  const landmarks = [
    { id: 1, name: 'Landmark 1', description: 'Description of landmark 1' },
    { id: 2, name: 'Landmark 2', description: 'Description of landmark 2' },
    { id: 3, name: 'Landmark 3', description: 'Description of landmark 3' },
  ];

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

      <ScrollView style={styles.container} vertical showsVerticalScrollIndicator={true}>
        
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


        <View style={styles.categoriesContainer}>

          {/* Attractions container */}
          <View style={[styles.categoryContainer, styles.attractionsContainer]}>
            <Text style={styles.categoryTitle}>Attractions</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {attractions.map(attraction => (
                <View key={attraction.id} style={styles.card}>
                  <View style={styles.cardImageContainer}>
                    <Image source={image} style={styles.cardImage} />
                    <View style={styles.attractionButtonContainer}>
                      <TouchableOpacity onPress={() => addToItinerary(attraction)}>
                        <Icon name="add-circle" type="ionicon" color="#556C2F" size={30} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => removeFromItinerary(attraction)}>
                        <Icon name="remove-circle" type="ionicon" color="#C49F5A" size={30} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.cardTitle}>{attraction.name}</Text>
                  <Text style={styles.cardDescription}>{attraction.description}</Text>
                </View>
              ))}
            </ScrollView>
          </View>


          {/* Restaurants container */}
          <View style={[styles.categoryContainer, styles.restaurantsContainer]}>
            <Text style={styles.categoryTitle}>Restaurants</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {restaurants.map(restaurant => (
                <View key={restaurant.id} style={styles.card}>
                  <View style={styles.cardImageContainer}>
                    <Image source={image} style={styles.cardImage} />
                    <View style={styles.restaurantButtonContainer}>
                      <TouchableOpacity onPress={() => addToItinerary(restaurant)}>
                        <Icon name="add-circle" type="ionicon" color="#556C2F" size={30} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => removeFromItinerary(restaurant)}>
                        <Icon name="remove-circle" type="ionicon" color="#C49F5A" size={30} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.cardTitle}>{restaurant.name}</Text>
                  <Text style={styles.cardDescription}>{restaurant.description}</Text>
                </View>
              ))}
            </ScrollView>
          </View>


          {/* Landmarks container */}
          <View style={[styles.categoryContainer, styles.landmarksContainer]}>
            <Text style={styles.categoryTitle}>Landmarks</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {landmarks.map(landmark => (
                <View key={landmark.id} style={styles.card}>
                  <View style={styles.cardImageContainer}>
                    <Image source={image} style={styles.cardImage} />
                    <View style={styles.landmarkButtonContainer}>
                      <TouchableOpacity onPress={() => addToItinerary(landmark)}>
                        <Icon name="add-circle" type="ionicon" color="#556C2F" size={30} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => removeFromItinerary(landmark)}>
                        <Icon name="remove-circle" type="ionicon" color="#C49F5A" size={30} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.cardTitle}>{landmark.name}</Text>
                  <Text style={styles.cardDescription}>{landmark.description}</Text>
                </View>
              ))}
            </ScrollView>
          </View>


        </View>
      </ScrollView>
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
  },
  getStartedButtonContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop:15,
  },
  getStartedButton: {
    backgroundColor: '#556C2F',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 25,
  },
  getStartedButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  categoriesContainer:{
    marginTop: 25,
  },
  categoryContainer: {
    marginBottom: 20,
    marginHorizontal: 10,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 15,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    width: 200,
  },
  cardImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
  },
  attractionsContainer: {
    marginBottom: 20,
    marginHorizontal: 10,
  },
  restaurantsContainer: {
    marginBottom: 20,
    marginHorizontal: 10,
  },
  landmarksContainer: {
    marginBottom: 20,
    marginHorizontal: 10,
  },
  attractionButtonContainer: {
    flexDirection: 'row', // Arrange buttons horizontally
    justifyContent: 'space-between', // Add space between buttons
    width: '100%', // Ensure buttons take up full width
    paddingHorizontal: 20, // Add horizontal padding
    marginTop: 10, // Add margin at the top
  },
  restaurantButtonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    paddingHorizontal: 20, 
    marginTop: 10, 
  },
  landmarkButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    width: '100%', 
    paddingHorizontal: 20, 
    marginTop: 10, 
  },
  
});

export default ItineraryCreateScreen;