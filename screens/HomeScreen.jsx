import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
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
                placeholder="Type Here..."
                onChangeText={setSearch}
                value={search}
            />

            {/* Search Button */}
            <Button
                onPress={saveSearchTerm}
                title="Search"
                color="#841584"
                accessibilityLabel="Search for this destination"
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
            <Button
                onPress={createNewItinerary}
                title="Create New Itinerary"
                color="#841584"
                accessibilityLabel="Create new trip itinerary"
            />
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    cardContent: {
        padding: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardDetails: {
        fontSize: 14,
    },
});

export default HomeScreen;
