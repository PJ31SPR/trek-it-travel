import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import Header from '../components/Header';
import { auth } from "../firebase";
import { readItineraries, deleteItinerary } from '../db.api';
import { useFocusEffect } from '@react-navigation/native'

const MiniCard = ({ data }) => {
    return (
        <View style={styles.miniCard}>
            <Image source={{ uri: data.Photo }} style={styles.miniCardImage} />
            <Text style={styles.miniCardTitle}>{data.Name}</Text>
        </View>
    );
};

const formatTimestamp = (timestamp) => {
    const dateObj = timestamp.toDate();
    return dateObj.toLocaleDateString();
};

const ItineraryScreen = ({ navigation }) => {
    const [userId, setUserId] = useState('');
    const [itineraries, setItineraries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUserId(user.uid);
            }
        });
        return unsubscribe;
    }, []);

    useFocusEffect(React.useCallback(() => {
        const fetchItineraries = async () => {
            try {
                if (userId) {
                    // Read itineraries document from db
                    const itinerariesDoc = await readItineraries(userId);
                    setItineraries(itinerariesDoc);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchItineraries();
    }, [userId]));

    const handleDelete = async (itineraryId) => {
        try {
            await deleteItinerary(userId, itineraryId);
            setItineraries(itineraries.filter(itinerary => itinerary.id !== itineraryId));
            console.log('Itinerary deleted successfully');
        } catch (error) {
            console.error('Error deleting itinerary:', error);
            Alert.alert('Error', 'Failed to delete itinerary. Please try again.');
        }
    };

    const renderMiniCards = (items) => {
        return (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {items.map((item, index) => (
                    <MiniCard key={index} data={item} />
                ))}
            </ScrollView>
        );
    };

    const MiniCardContent = ({ itinerary }) => {
        return (
            <View>
                <Text style={styles.text}>Destination: {itinerary.city}</Text>
                <Text style={styles.text}>Start Date: {formatTimestamp(itinerary.startDate)}</Text>
                <Text style={styles.text}>End Date: {formatTimestamp(itinerary.endDate)}</Text>
                <Text style={styles.listHeading}>Landmarks</Text>
                {renderMiniCards(itinerary.landmarks)}
                <Text style={styles.listHeading}>Attractions</Text>
                {renderMiniCards(itinerary.attractions)}
                <Text style={styles.listHeading}>Restaurants</Text>
                {renderMiniCards(itinerary.restaurants)}
            </View>
        );
    };

    const [expandedCard, setExpandedCard] = useState(null);

    const toggleExpandedCard = (id) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

    

    return (
        <View style={styles.container}>
            <Header title="Logo/Name" />
            {isLoading ? (
                <Text style={styles.loadingText}>Loading...</Text>
            ) : (
                <ScrollView style={styles.scrollView}>
                    {itineraries.length === 0 ? (
                        <Text style={styles.emptyMessage}>Start creating itinerary for your next holiday...</Text>
                    ) : (
                        itineraries.map(itinerary => (
                            <TouchableOpacity key={itinerary.id} onPress={() => toggleExpandedCard(itinerary.id)}>
                                <Card containerStyle={styles.card}>
                                    <Card.Title>{itinerary.itineraryName}</Card.Title>
                                    <Card.Divider />
                                    <View style={styles.cardContent}>
                                        {expandedCard === itinerary.id ? (
                                            <MiniCardContent itinerary={itinerary} />
                                        ) : (
                                            <View>
                                                <Text style={styles.text}>Destination: {itinerary.city}</Text>
                                                <Text style={styles.text}>Start Date: {formatTimestamp(itinerary.startDate)}</Text>
                                            </View>
                                        )}
                                    </View>
                                    <View style={styles.buttonContainer}>
                                    <Button
                                        icon={<Icon name="delete" color="white" />}
                                        title="Delete"
                                        onPress={() => handleDelete(itinerary.id)}
                                        buttonStyle={{ backgroundColor: '#C49F5A' }}
                                    />
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        ))
                    )}
                </ScrollView>
            )}
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
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
    emptyMessage: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        fontStyle: 'italic',
    },
    miniCard: {
        marginRight: 20,
        alignItems: 'center',
    },
    miniCardTitle: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 5,
        width: 100,
    },
    miniCardImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    miniCardText: {
        textAlign: 'center',
        marginTop: 5,
    },
    listHeading: {
        fontSize:16,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 15,
    }
});

export default ItineraryScreen;
