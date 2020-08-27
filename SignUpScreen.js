import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {AuthContext} from '../components/context';
import Modal from 'react-native-modal';
import Axios from 'axios';

const SignUpScreen = ({navigation}) => {
  const [isShowEmptyError, setIsShowEmptyError] = useState (false);
  const [isShowPasswordError, setIsShowPasswordError] = useState (false);
  const [data, setData] = React.useState ({
    username: '',
    password: '',
    email: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    course: '0',
    type: '',
    confirm_password: '',
  });
  const {signUp} = React.useContext (AuthContext);

  const textInputChange = val => {
    if (val.length !== 0) {
      setData ({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData ({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = val => {
    setData ({
      ...data,
      password: val,
    });
  };

  const handleConfirmPasswordChange = val => {
    setData ({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData ({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData ({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  const handleEmailChange = val => {
    setData ({...data, email: val});
  };

  const RegisterHandle = async () => {
    console.log (data);
    const {username, email, password, course, type, confirm_password} = data;
    if (
      username.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      course.length === 0 ||
      type.length === 0 ||
      confirm_password.length === 0
    ) {
      setIsShowEmptyError (true);
      return;
    }

    if (password !== confirm_password) {
      setIsShowPasswordError (true);
      return;
    }

    try {
      const res = await Axios.post ('http://e568f02c41fd.ngrok.io/api/Users', {
        username: username,
        password: password,
        type: type,
        email: email,
        coursename: course,
      }).then (res => {
        if (res.Status === 201) {
          console.log ('Hello');
          alert ('Success');
          res.preventDefault ();
        }
      });
    } catch (error) {
      console.log (error);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isShowEmptyError}
        animationIn="zoomIn"
        animationOut="zoomOut"
        animationInTiming={1000}
        animationOutTiming={1000}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: 50,
            borderRadius: 5,
          }}
        >
          <TouchableOpacity
            style={{position: 'absolute', top: 10, right: 10}}
            onPress={() => setIsShowEmptyError (false)}
          >
            <FontAwesome name="times" size={20} color="#ccc" />
          </TouchableOpacity>
          <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>
            Please Fill the information
          </Text>
        </View>
      </Modal>

      <Modal
        isVisible={isShowPasswordError}
        animationIn="zoomIn"
        animationOut="zoomOut"
        animationInTiming={1000}
        animationOutTiming={1000}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: 50,
            borderRadius: 5,
          }}
        >
          <TouchableOpacity
            style={{position: 'absolute', top: 10, right: 10}}
            onPress={() => setIsShowPasswordError (false)}
          >
            <FontAwesome name="times" size={20} color="#ccc" />
          </TouchableOpacity>
          <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>
            Password not match!
          </Text>
        </View>
      </Modal>

      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>
            Username
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Username"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => textInputChange (val)}
            />
            {data.check_textInputChange
              ? <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              : null}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handlePasswordChange (val)}
              get
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry
                ? <Feather name="eye-off" color="grey" size={20} />
                : <Feather name="eye" color="grey" size={20} />}

            </TouchableOpacity>
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Confirm Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Confirm Your Password"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handleConfirmPasswordChange (val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.secureTextEntry
                ? <Feather name="eye-off" color="grey" size={20} />
                : <Feather name="eye" color="grey" size={20} />}
            </TouchableOpacity>
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Email
          </Text>
          <View style={styles.action}>
            <Feather name="mail" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Email Address"
              keyboardType="email-address"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handleEmailChange (val)}
            />
            {data.check_textInputChange
              ? <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              : null}
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Assign a Course
          </Text>
          <View style={styles.action}>
            <Feather name="arrow-right-circle" color="#05375a" size={30} />
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
              <Picker.Item label="Quality Assurance"value="Quality Assurance"/>
              <Picker.Item label="Mobile Development"value="Mobile Development"/>
              <Picker.Item label="Web Development" value="Web Development" />
              <Picker.Item label="Data Analyst" value="Data Analyst" />
            </Picker>
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Select Type
          </Text>
          <View style={styles.action}>
            <Feather name="arrow-right-circle" color="#05375a" size={30} />
            <Picker
              selectedValue={data.type}
              style={{height: 50, width: 300}}
              onValueChange={itemValue =>
                setData ({
                  ...data,
                  type: itemValue,
                })}
            >
              <Picker.Item label="Select User Type" value="0" color="#009387" />
              <Picker.Item label="Student" value="Student" />
              <Picker.Item label="Lecture" value="Lecture" />
            </Picker>
          </View>

          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
              {' '}Terms of service
            </Text>
            <Text style={styles.color_textPrivate}>{' '}and</Text>
            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
              {' '}Privacy policy
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={RegisterHandle}
              style={styles.signIn}
              // onPress={() => {
              //   RegisterHandle (
              //     data.username,
              //     data.password,
              //     data.course,
              //     data.email
              //   );
              // }}
            >
              <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.signIn}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}
                >
                  Sign Up
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack ()}
              style={[
                styles.signIn,
                {
                  borderColor: '#009387',
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#009387',
                  },
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
});
