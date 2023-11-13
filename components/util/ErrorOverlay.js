import { View, Text, StyleSheet, Button } from "react-native";
import IconButton from "../IconButton";
import Colors from "../../constants/Colors";

function ErrorOverlay({ message, onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Something went wrong!</Text>
      <Text style={styles.text}>{message}</Text>
      <View style={styles.button}>
        <Button title=" Okey " color="black" onPress={onPress} />
      </View>
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignSelf: "center",
    padding: 24,
    marginTop: 120,
    backgroundColor: Colors.errorBG,
    borderColor: Colors.mainTint,
    borderWidth: 3,
  },
  title: {
    fontSize: 20,
    color: Colors.mainTint,
  },
  text: {
    fontSize: 16,
    color: "#190505",
  },
  button: {
    alignSelf: "flex-end",
    marginTop: 16,
  },
});
