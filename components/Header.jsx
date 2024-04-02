import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';


const Header = ({ title, avatar }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>Trek-it!</Text>
      {/* {avatar && <Image source={{ uri: avatar }} style={styles.avatar} />} */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5, 
    borderBottomWidth: 1,
    borderBottomColor: '#556C2F', 
    backgroundColor: '#556C2F', 
    width: '100%',
  },
  logo: {
    fontSize: 24, 
    fontWeight: '900', 
    fontFamily: 'Poppins',
    color: '#ffff',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Header;