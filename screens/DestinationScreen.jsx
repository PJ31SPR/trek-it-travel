import React, { useState }from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SearchBar, Card, Button } from 'react-native-elements';
import Header from '../components/Header';

const DestinationScreen = () => {
    const [search, setSearch] = useState('');

    function saveSearchTerm() {
        console.log(search);
        // Logic for saving search term
    }

    // Dummy data for featured destinations
    const featuredDestinations = [
        { id: 1, name: 'Indonesia', image: require('../images/bali.jpg'), currency: 'Indonesian Rupiah' },
        { id: 2, name: 'Thailand', image: require('../images/thailand.jpeg'), currency: 'Thai Baht' },
        { id: 3, name: 'New Zealand', image: require('../images/new-zealand.jpeg'), currency: 'New Zealand Dollar' },
        { id: 4, name: 'Mexico', image: require('../images/mexico.jpeg'), currency: 'Mexican Peso' },
        { id: 5, name: 'United Arab Emirates', image: require('../images/uae.jpeg'), currency: 'United Arab Emirates Dirham' },
        { id: 6, name: 'Switzerland', image: require('../images/switzerland.jpeg'), currency: 'Swiss Franc' },
    ];

    return (
        <View style={styles.container}>
            <Header title="Logo/Name" avatar="path_to_user_avatar" />

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
                            <Text style={styles.cardTitle}>{destination.name}</Text>
                            <Text style={styles.cardCurrency}>Currency: {destination.currency}</Text>
                            <View style={styles.buttonContainer}>
                            <Button
                                    title="Places/Cities"
                                    buttonStyle={styles.button}
                                    onPress={() => console.log('Cities button pressed for ' + destination.name)}
                                />
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
                            </View>
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
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
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
        marginTop:10,
    },
});


export default DestinationScreen;
