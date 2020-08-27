import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const StudentScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Student Details</Text>
      <Text>Student names and their enrollment course</Text>
  
      <Button title="Go back" onPress={() => navigation.goBack()} />

    </View>
  );
};

export default StudentScreen;

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C0C0C0',
  },
});
