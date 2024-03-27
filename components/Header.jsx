import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Header = ({ title, avatar }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>Trek-it!</Text>
      {avatar && <Image source={{ uri: avatar }} style={styles.avatar} />}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'red',
    backgroundColor: 'yellow'
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Header;