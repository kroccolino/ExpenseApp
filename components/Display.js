import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { useEffect } from "react";

function Display({ marker, amount }) {
  return (
    <View style={styles.container}>
      <View style={styles.markerContainer}>
        <Text style={styles.text}> {marker}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.text}>$ {amount}</Text>
      </View>
    </View>
  );
}

export default Display;

const styles = StyleSheet.create({
  container: {
    margin: 36,
    padding: 6,
    flexDirection: "row",
    borderColor: Colors.mainTint,
    borderWidth: 2,
    backgroundColor: Colors.mainHighlight,
    elevation: 8,
  },
  markerContainer: {
    flex: 1 / 2,
  },
  amountContainer: {
    alignItems: "flex-end",
    flex: 1 / 2,
  },
  text: {
    color: Colors.mainTint,
    fontSize: 18,
    fontWeight: "600",
  },
});
