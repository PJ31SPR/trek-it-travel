import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import Header from '../components/Header';

// Sample data for itineraries
const sampleItineraries = [
    { id: 1, name: 'Trip to Bali', destination: 'Bali', dates: 'May 10 - May 15, 2024' },
    { id: 2, name: 'Europe Backpacking', destination: 'Europe', dates: 'June 1 - June 30, 2024'},
 
];

const ItineraryScreen = ({ navigation }) => {
 
    const navigateToDetail = (itinerary) => {
        navigation.navigate('ItineraryDetail', { itinerary });
    };

    return (
        <View style={styles.container}>
            <Header title="Logo/Name" avatar="path_to_user_avatar" />

            <ScrollView style={styles.scrollView}>
                {sampleItineraries.map(itinerary => (
                    <TouchableOpacity key={itinerary.id} onPress={() => navigateToDetail(itinerary)}>
                        <Card containerStyle={styles.card}>
                            <Card.Title>{itinerary.name}</Card.Title>
                            <Card.Divider />
                            <View style={styles.cardContent}>
                                <Text style={styles.text}>Destination: {itinerary.destination}</Text>
                                <Text style={styles.text}>Dates: {itinerary.dates}</Text>
                            </View>
                        </Card>
                    </TouchableOpacity>
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
    scrollView: {
        flex: 1,
        padding: 10,
    },
    card: {
        borderRadius: 10,
        marginBottom: 20,
    },
    cardContent: {
        padding: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default ItineraryScreen;
