import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../components/util/Auth';
import { authenticate } from '../store/auth-slice';
import { useDispatch } from 'react-redux';

function SignupScreen() {
  const dispatch = useDispatch();

  async function signupHandler(email, password) {
    const token = await createUser(email, password);
    console.log('token:', token);
    dispatch(authenticate(token));
    return token;
  }
  return <AuthContent isLogin={false} onAuthenticate={signupHandler} />;
}

export default SignupScreen;
