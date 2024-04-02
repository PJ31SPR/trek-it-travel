import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import { Button, Card } from 'react-native-elements';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native'; 


const HomeScreen = () => {
    const [search, setSearch] = useState('');
    const navigation = useNavigation();


    // Dummy data for featured destinations
    const featuredDestinations = [
        { id: 1, name: 'Japan', details: 'Japan holidays offer up gold-capped temples, some of the world’s most modern cities and an ample supply of cherry blossom trees.', image: require('../images/japan.jpeg') },
        { id: 2, name: 'Italy', details: 'Feast your eyes on Italy, ancient ruins, gorgeous beaches, glistening Italian lakes & fantastic food, Italy is the perfect destination for your next holiday', image: require('../images/italy.jpg') },
        { id: 3, name: 'Cuba', details: 'Holidays to Cuba are adventurous unlike anywhere else. Classic 1950s American cars, pin-drop-peaceful beaches and friendly-beyond-belief locals are just a few of the things that make the country’s back-to-basics charm so special.', image: require('../images/cuba.jpeg') },
        { id: 4, name: 'Tanzania', details: 'Holidays to Tanzania are scenery-blessed. Stare up at Africa’s highest mountain, stalk wildlife through sweeping plains or dive down to shipwrecks on the island of Zanzibar.', image: require('../images/tanzania.jpeg') },
        { id: 5, name: 'Turkey', details: 'From spice-laden bazaars and ancient temples to chic boutiques and bar-backed beaches, holidays to Turkey showcase the best of East and West.', image: require('../images/turkey.jpeg') },
    ];

    return (
        <ScrollView style={styles.container} vertical showsVerticalScrollIndicator={true}>
            {/* Custom Header */}
            <Header title="Logo/Name" avatar="path_to_user_avatar" />
            <Text style={styles.sectionTitle}>Our Top Picks</Text>
            {/* Featured Destinations */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardContainer}>
                {featuredDestinations.map(destination => (
                    <Card key={destination.id} containerStyle={styles.card}>
                        <Image source={destination.image} style={styles.cardImage} />
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{destination.name}</Text>
                            <Text style={styles.cardDetails}>{destination.details}</Text>
                            <View style={styles.buttonContainer}>
                                {/* <Button
                                    title="Places/Cities"
                                    buttonStyle={styles.button}
                                    onPress={() => console.log('Cities button pressed for ' + destination.name)}
                                /> */}
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

         
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4E5C2',
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
        maxHeight: Dimensions.get('window').height * 0.9, // Maximum height of the card container
    },
    card: {
        borderRadius: 10,
        overflow: 'hidden', // Ensure the image doesn't overflow the card
        marginHorizontal: 10,
        width: Dimensions.get('window').width * 0.9, // Adjusted card width to fit the screen width
        marginVertical: 10,
        
    },
    cardImage: {
        width: '100%',
        height: 200, // Adjusted height for the image
        resizeMode: 'cover',
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
        textAlign: 'center',
        marginBottom:15,
    },
    cardDetails: {
        fontSize: 14,
        marginBottom: 10,
        color: '#272343',
        fontFamily: 'Poppins',
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 10, 
    },
    button: {
        backgroundColor: '#C49F5A',
        borderRadius: 10,
        marginHorizontal: 5,
        marginBottom:15,
    },
    buttonText: {
        fontSize: 16,
        fontFamily: 'Poppins',
        fontWeight: '800',
        textAlign: 'center',
    },
});

export default HomeScreen;
