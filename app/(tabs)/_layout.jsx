import React from 'react';
import { Tabs } from 'expo-router';

export default () => {
    return (
      <Tabs>
    
    
        <Tabs.Screen name='Home'  />
        <Tabs.Screen name='Profile'  />


      </Tabs>
    );
  }