import { Text, TextInput, View, StyleSheet } from 'react-native';
import { Colors } from './../../constants/Colors';

function Input({ label, onChangeText }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} onChangeText={onChangeText} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 8,
  },
  label: {
    color: Colors.mainTint,
    marginBottom: 4,
  },
  input: {
    borderRadius: 8,
    fontSize: 20,
    height: 28,
    backgroundColor: Colors.mainBackGround,
  },
});
