import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-community/picker';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DetailsScreen = ({navigation}) => {
  const [data, setData] = React.useState ({course: '0'});

  return (
    <View style={styles.container}>
      <Text style={[
            styles.text_footer,
            {
              color: '#000',
              marginTop: 35,
            },
          ]}>Student</Text>
      <Text>Enroll a new course here!</Text>
      <View style={styles.action}>
        <Picker
          selectedValue={data.course}
          style={{height: 50, width: 300}}
          onValueChange={itemValue =>
            setData ({
              ...data,
              course: itemValue,
            })}
        >
          <Picker.Item label="Select Course" value="0" color="#009387" />
          <Picker.Item label="UI/UX Engineer" value="UI/UX Engineer" />
          <Picker.Item label="Quality Assurance" value="Quality Assurance" />
          <Picker.Item label="Mobile Development" value="Mobile Development" />
          <Picker.Item label="Web Development" value="Web Development" />
          <Picker.Item label="Data Analyst" value="Data Analyst" />
        </Picker>
      </View>
      <TouchableOpacity
        style={styles.commandButton}
        onPress={() => {
          navigation.navigate ('DetailsScreen');
        }}
      >
        <Text style={styles.panelButtonTitle}>Submit</Text>
      </TouchableOpacity>

    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C0C0C0',
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
    commandButton: {
    padding: 15,
    borderRadius: 50,
    backgroundColor: '#009387',
    alignItems: 'center',
    marginTop: 10,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
});
