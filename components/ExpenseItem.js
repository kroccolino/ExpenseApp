import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

function ExpenseItem({ name, date, value }) {
  return (
    <View
      style={{ margin: 4, backgroundColor: Colors.mainTint, borderRadius: 10 }}
    >
      <View style={styles.container}>
        <View style={styles.expenseName}>
          <Text style={{ fontSize: 24 }}>{name}</Text>
          <Text>{date?.slice(0, 10)}</Text>
        </View>
        <View style={styles.expenseValue}>
          <Text style={{ fontSize: 24 }}>{value}</Text>
        </View>
      </View>
    </View>
  );
}

export default ExpenseItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.mainBackGround,
    height: 64,
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.mainTint,
    margin: 2,
    elevation: 16,
    shadowColor: Colors.mainHighlight,
  },
  expenseName: {
    flex: 3 / 4,
  },

  expenseValue: {
    alignItems: "flex-end",
    marginRight: 12,
    flex: 1 / 4,
    alignSelf: "center",
  },
});
