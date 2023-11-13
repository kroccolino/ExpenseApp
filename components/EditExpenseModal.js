import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Button,
} from "react-native";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { showEditModal } from "../store/store";
import { useDispatch } from "react-redux";
import { removeExpense, editExpense } from "../store/store";
import { deleteExpense, updateExpense } from "./util/http";
import ErrorOverlay from "./util/ErrorOverlay";

function EditExpenseModal() {
  const dispatch = useDispatch();
  const expenseId = useSelector((state) => state.expense.editedExpenseId);
  const data = useSelector((data) => data.expense.expenses) || dummyData;
  const expense = data.find((ex) => ex.id === expenseId);
  const expenseIndex = data.findIndex((ex) => ex.id === expenseId);

  const [name, setName] = useState(data[expenseIndex]?.name);
  const [value, setValue] = useState(data[expenseIndex]?.value);
  const [error, setError] = useState();

  function handleRemoveExpense() {
    dispatch(removeExpense());

    deleteExpense(expenseId);
    toggleExpenseEditVisible();
  }

  function toggleExpenseEditVisible() {
    dispatch(showEditModal());
  }

  function handleOnSubmit() {
    try {
      dispatch(editExpense({ expenseIndex, name, value }));

      updateExpense({ name, value }, expenseId);
      //PROBLEM - LOSE THE TIME IN THE DATABASE
      dispatch(showEditModal());
    } catch (error) {
      setError(`we couldn't edit your expense`);
    }
  }
  function handleOnChangeName(value) {
    setName(value);
  }
  function handleOnChangeValue(value) {
    setValue("$" + value);
  }

  if (error) {
    return <ErrorOverlay message={error} onPress={() => {}} />;
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.title}>
            <Text style={styles.TitleText}>Edit expense</Text>
          </View>
          <View style={styles.trash}>
            <Pressable onPress={handleRemoveExpense}>
              <Ionicons name={"trash"} size={24} color={Colors.secBackGround} />
            </Pressable>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.expenseName}>
            <TextInput
              placeholder={expense?.name}
              onChangeText={handleOnChangeName}
            />
          </View>
          <View style={styles.expenseValue}>
            <TextInput
              placeholder={expense?.value}
              keyboardType="numeric"
              onChangeText={handleOnChangeValue}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={"cancel"}
            color={"black"}
            onPress={toggleExpenseEditVisible}
          />
          <View style={{ marginRight: 8, marginLeft: 16 }}>
            <Button title={"ok"} color={"black"} onPress={handleOnSubmit} />
          </View>
        </View>
      </View>
    </>
  );
}

export default EditExpenseModal;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: Colors.secondComplement,
    padding: 8,
  },
  header: {
    flexDirection: "row",
  },
  title: {
    flex: 2 / 3,
    alignItems: "space-between",
  },
  TitleText: {
    fontSize: 22,
    color: Colors.mainTint,
  },
  trash: {
    flex: 1 / 3,
    alignItems: "flex-end",
    paddingRight: 12,
  },
  contentContainer: {
    flexDirection: "row",
    borderRadius: 5,
    padding: 16,
    backgroundColor: Colors.mainBackGround,
  },
  expenseName: {
    flex: 3 / 4,
    backgroundColor: Colors.secBackGround,
    borderRadius: 8,
    padding: 4,
  },
  expenseValue: {
    flex: 1 / 4,
    backgroundColor: Colors.secBackGround,
    borderRadius: 8,
    padding: 4,
    marginLeft: 8,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    paddingTop: 8,
  },
});
