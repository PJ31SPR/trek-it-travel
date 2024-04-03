import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SearchBar, Card, Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const DestinationScreen = () => {
    const [search, setSearch] = useState('');
    const navigation = useNavigation();


    // Dummy data for featured destinations
    const featuredDestinations = [
        { id: 1, name: 'Rome', image: require('../images/rome.jpeg'), currency: '' },
        { id: 2, name: 'Phuket', image: require('../images/thailand.jpeg'), currency: 'Thai Baht' },
        { id: 3, name: 'Auckland', image: require('../images/new-zealand.jpeg'), currency: 'New Zealand Dollar' },
        { id: 4, name: 'Mexico City', image: require('../images/mexico.jpeg'), currency: 'Mexican Peso' },
        { id: 5, name: 'Dubai', image: require('../images/uae.jpeg'), currency: 'United Arab Emirates Dirham' },
        { id: 6, name: 'Barcelona', image: require('../images/barcelona.jpeg'), currency: '' },
        { id: 7, name: 'Zurich', image: require('../images/switzerland.jpeg'), currency: 'Swiss Franc' },
        { id: 8, name: 'Sydney', image: require('../images/sydney.jpeg'), currency: '' },
    ];

    return (
        <View style={styles.container}>
            <Header title="Logo/Name" />

            {/* Search Bar */}
            <SearchBar
                placeholder="Search Destinations..."
                onChangeText={() => {}}
                value={''}
                containerStyle={styles.searchContainer}
                inputContainerStyle={styles.searchInputContainer}
                inputStyle={styles.searchInput}
            />

            {/* Featured Destinations */}
            <ScrollView style={styles.cardContainer}>
                {featuredDestinations.map(destination => (
                    <Card key={destination.id} containerStyle={styles.card}>
                        <Image source={destination.image} style={styles.cardImage} />
                        <View style={styles.cardContent}>
                            <View style={styles.destinationHeader}>
                                <Text style={styles.cardTitle}>{destination.name}</Text>
                                {/* Create Itinerary Button */}
                                <TouchableOpacity
                                style={styles.createItineraryButton}
                                onPress={() => navigation.navigate('CreateItinerary', { city: destination.name, image: destination.image })}
                            >
                                <Icon
                                    name='calendar-plus'
                                    type='material-community'
                                    color='#C49F5A'
                                    size={24}
                                />
                                 </TouchableOpacity>

                            </View>
                            <Text style={styles.cardCurrency}>Currency: {destination.currency}</Text>
                            {/* <View style={styles.buttonContainer}>
                                <Button
                                    title="Attractions"
                                    buttonStyle={styles.button}
                                    onPress={() => console.log('Attractions button pressed for ' + destination.name)}
                                />
                                <Button
                                    title="Restaurants"
                                    buttonStyle={styles.button}
                                    onPress={() => console.log('Restaurants button pressed for ' + destination.name)}
                                />
                                <Button
                                    title="Landmarks"
                                    buttonStyle={styles.button}
                                    onPress={() => console.log('Landmarks button pressed for ' + destination.name)}
                                />
                            </View> */}
                        </View>
                    </Card>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4E5C2',
    },
    searchContainer: {
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
    },
    searchInputContainer: {
        backgroundColor: 'white',
    },
    searchInput: {
        color: '#272343',
        fontFamily: 'Poppins',
    },
    cardContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    card: {
        borderRadius: 10,
        marginBottom: 20,
    },
    cardImage: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardContent: {
        padding: 10,
    },
    destinationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#272343',
        fontFamily: 'Poppins',
    },
    cardCurrency: {
        color: '#556C2F',
        marginBottom: 5,
        fontFamily: 'Poppins',
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: '#C49F5A',
        borderRadius: 10,
        marginTop: 10,
    },
    createItineraryButton: {
        padding: 5,
    },
});

export default DestinationScreen;
