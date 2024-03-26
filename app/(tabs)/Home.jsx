import React, { useState } from 'react';
import { View, Text } from 'react-native'
import { Button, SearchBar } from 'react-native-elements';

const Home = () => {
    const [search, setSearch] = useState('')
    function createNewItinerary() {

    }
    
    function saveSearchTerm() {
        console.log(search)
    }

    return (
       <View>
        
        <SearchBar
            placeholder="Type Here..."
            onChangeText={setSearch}
            value={search}
        />
        <Button
          onPress={saveSearchTerm}
          title="Search"
          color="#841584"
          accessibilityLabel="Search for this destination"
        />
        <View id="deals">
            <Text>
                Featured Destinations/Deals
            </Text>
            <Text>
                Destination Card 1
            </Text>
            <Text>
                Destination Card 2
            </Text>
            <Text>
                Destination Card 3
            </Text>
        </View>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <Button
          onPress={createNewItinerary}
          title="Create New Itinerary"
          color="#841584"
          accessibilityLabel="Create new trip itinerary"
        />
       </View>
    );
};

export default Home;