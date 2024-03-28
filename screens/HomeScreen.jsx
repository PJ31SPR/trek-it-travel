import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Keyboard } from 'react-native';
import { Button, SearchBar, Card } from 'react-native-elements';
import Header from '../components/Header';

const HomeScreen = () => {
    const [search, setSearch] = useState('');

    function createNewItinerary() {
        // Logic for creating a new itinerary
    }
    
    function saveSearchTerm() {
        console.log(search);
        // Logic for saving search term
    }

    // Dummy data for featured destinations
    const featuredDestinations = [
        { id: 1, name: 'Destination 1', details: 'Details about Destination 1' },
        { id: 2, name: 'Destination 2', details: 'Details about Destination 2' },
        { id: 3, name: 'Destination 3', details: 'Details about Destination 3' },
    ];

    return (
        <View style={styles.container}>
            {/* Custom Header */}
            <Header title="Logo/Name" avatar="path_to_user_avatar" />
            
            {/* Search Bar */}
            <SearchBar
                placeholder="Enter Destination..."
                onChangeText={setSearch}
                value={search}
                containerStyle={styles.searchContainer}
                inputContainerStyle={styles.searchInputContainer}
                inputStyle={styles.searchInput}
                onSubmitEditing={Keyboard.dismiss}
            />

            {/* Featured Destinations/Deals */}
            <Text style={styles.sectionTitle}>Featured Destinations/Deals</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardContainer}>
                {/* Destination Cards */}
                {featuredDestinations.map(destination => (
                <Card key={destination.id}>
                    <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>{destination.name}</Text>
                        <Text style={styles.cardDetails}>{destination.details}</Text>
                    </View>
                </Card>
            ))}
            </ScrollView>

            {/* Create New Itinerary Button */}
            <View style={styles.buttonContainer}>
                <Button
                    onPress={createNewItinerary}
                    title="Create New Itinerary"
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonText}
                />
            </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#F4E5C2',
       
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
    sectionTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#272343',
        fontFamily: 'Poppins',
        textAlign:'center'
    },
    cardContainer: {
        marginBottom: 30,
        
    },
    cardContent: {
        padding: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#272343',
        fontFamily: 'Poppins',
    },
    cardDetails: {
        fontSize: 14,
        color: '#272343',
        fontFamily: 'Poppins',
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: 30,
    },
    button: {
        width: '100%',
        backgroundColor: '#556C2F',
        borderColor: '#556C2F',
        borderWidth: 2,
        borderRadius: 10,
        paddingTop:30,
        paddingBottom:30,
        paddingHorizontal:30,
    },
    buttonText: {
        fontSize: 25,
        fontFamily: 'Poppins',
        color: '#ffff',
        fontWeight:'800',
        alignItems:'center'
    },
});

export default HomeScreen;
