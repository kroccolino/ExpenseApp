import { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Input from './Input';
import Colors from '../../constants/Colors';

function AuthForm({ isLogin, onSubmit }) {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'confirmEmail':
        setConfirmEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setConfirmPassword(enteredValue);
        break;
    }
  }
  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: confirmEmail,
      password: enteredPassword,
      confirmPassword: confirmPassword,
    });
  }

  return (
    <View style={styles.container}>
      <Input
        label="Type your email"
        onChangeText={updateInputValueHandler.bind(this, 'email')}
      />

      {!isLogin && (
        <View>
          <Input
            label="Repeat your email"
            onChangeText={updateInputValueHandler.bind(this, 'confirmEmail')}
          />
        </View>
      )}

      <Input
        label="Type your password"
        onChangeText={updateInputValueHandler.bind(this, 'password')}
      />
      {!isLogin && (
        <View>
          <Input
            label="Repeat your password"
            onChangeText={updateInputValueHandler.bind(this, 'confirmPassword')}
          />
        </View>
      )}
      <View style={styles.button}>
        <Button
          title={isLogin ? 'Login' : 'Sign Up'}
          onPress={submitHandler}
          color={Colors.mainHighlight}
        />
      </View>
    </View>
  );
}

export default AuthForm;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  button: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
});
