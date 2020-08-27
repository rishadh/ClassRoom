import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';

const HomeScreen = () => {

  const { colors } = useTheme();

  
    return (
      <View style={styles.container}>
        <StatusBar barStyle= "light-content"/>
        <Text style={{color: colors.text}}>Home</Text>
      </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#C0C0C0'
  },
});
