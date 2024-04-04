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
        { id: 1, name: 'Rome', image: require('../images/rome.jpeg'), description: "Explore ancient wonders amidst modern charm in Rome, where every cobblestone street whispers tales of emperors and artists." },
        { id: 2, name: 'Phuket', image: require('../images/thailand.jpeg'), description: "Discover paradise on earth in Phuket, where turquoise waters, pristine beaches, and vibrant nightlife create an unforgettable tropical escape."},
        { id: 3, name: 'Auckland', image: require('../images/new-zealand.jpeg'), description: "Experience the vibrant pulse of New Zealand's largest city, where stunning landscapes, world-class dining, and captivating culture converge."},
        { id: 4, name: 'Mexico City', image: require('../images/mexico.jpeg'), description: "Dive into the heart of Mexico's vibrant capital, where ancient pyramids, colorful markets, and a thriving arts scene await in this dynamic metropolis."},
        { id: 5, name: 'Dubai', image: require('../images/uae.jpeg'), description: "Journey to the future in Dubai, a dazzling oasis in the desert where towering skyscrapers, luxury shopping, and desert adventures redefine extravagance."},
        { id: 6, name: 'Barcelona', image: require('../images/barcelona.jpeg'), description:"Embrace the rhythm of Barcelona, where ancient history meets modern flair, inviting you to explore its architectural wonders, artistic treasures, and lively tapas scene."},
        { id: 7, name: 'Zurich', image: require('../images/switzerland.jpeg'), description:"Discover the elegance of Zurich, a picturesque city nestled by pristine lakes and snow-capped mountains, offering a harmonious blend of natural beauty and urban sophistication." },
        { id: 8, name: 'Sydney', image: require('../images/sydney.jpeg'),description:"Experience the best of city living and beach vibes in Sydney, where golden sands, world-class dining, and a thriving arts scene await beneath the Southern Hemisphere sun."},
    ];
    // Filter destinations based on search term
    const filteredDestinations = featuredDestinations.filter(destination =>
        destination.name.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <View style={styles.container}>
            <Header title="Logo/Name" />
            {/* Search Bar */}
            <SearchBar
                placeholder="Search Destinations..."
                onChangeText={setSearch}
                value={search}
                containerStyle={styles.searchContainer}
                inputContainerStyle={styles.searchInputContainer}
                inputStyle={styles.searchInput}
            />
            {/* Featured Destinations */}
            <ScrollView style={styles.cardContainer}>
                {filteredDestinations.map(destination => (
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
                            <Text style={styles.cardDescription}>{destination.description}</Text>
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
        cardDescription: {
            color: '#556C2F',
            marginBottom: 5,
            fontFamily: 'Poppins',
            textAlign: 'justify'
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