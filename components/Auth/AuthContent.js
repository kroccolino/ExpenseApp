import { View, Text, Button, Alert, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import AuthForm from './AuthForm';
import { createUser } from '../util/Auth';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/Colors';

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsAreValid, setCredemtialsAreValid] = useState({
    email: false,
    confirmEmail: false,
    passowrd: false,
    confirmPassword: false,
  });

  function swithAuthenticationHandler() {
    return navigation.navigate(isLogin ? 'Signup' : 'Login');
  }

  function submitHandler(credentials) {
    const { email, confirmEmail, password, confirmPassword } = credentials;

    emailIsValid = email.includes('@');
    passwordIsValid = password.length >= 7;
    emailsAreEqual = confirmEmail === email;
    passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      return Alert.alert(
        'Something went wrong',
        'Please check your credentials and try again'
      );
    }
    async function authenticate() {
      try {
        console.log('credentials:', email, password);
        const token = await onAuthenticate(email, password);
        console.log('token:', token);
      } catch (e) {
        console.log(e);
      }
    }
    authenticate({ email, password });
    return console.log('credentials are valid');
  }
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>
          {isLogin ? 'Login to your account!' : 'Create a new accont'}
        </Text>
      </View>

      <View style={styles.loginContainer}>
        <AuthForm isLogin={isLogin} onSubmit={submitHandler} />
      </View>

      <View style={styles.changeModeContainer}>
        <Text style={styles.changeModeText}>
          {isLogin ? `Don't have an account` : 'Already have an account?'}
        </Text>

        <Pressable onPress={swithAuthenticationHandler}>
          <Text style={styles.changeModeButton}>
            {' '}
            {isLogin ? 'Sign Up' : 'Log In'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.secBackGround,
    //alignSelf: 'flex-start',
  },
  title: {
    paddingTop: 40,
    alignSelf: 'center',
  },
  titleText: {
    fontSize: 28,
    color: Colors.mainHighlight,
  },
  loginContainer: {
    flex: 1,
    marginTop: 10,
  },
  changeModeContainer: {
    flex: 0.1,
    // position: 'absolute',
    margin: 4,
    alignItems: 'center',
  },
  changeModeText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: Colors.mainTint,
  },
  changeModeButton: {
    fontSize: 20,
    color: Colors.mainHighlight,
  },
});
