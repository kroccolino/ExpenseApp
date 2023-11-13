import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import { useDispatch } from 'react-redux';
import { login } from '../components/util/Auth';
import { authenticate } from '../store/auth-slice';

function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  async function signInHandler(email, passowrd) {
    token = await login(email, passowrd);
    dispatch(authenticate(token));
    return token;
  }
  return <AuthContent isLogin={true} onAuthenticate={signInHandler} />;
}

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
