import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Modal } from "react-native";
import Colors from "../constants/Colors";
import { addExpense } from "../store/store";
import { useDispatch } from "react-redux";

export function NewExpenseModal({ toggleModalIsVisible, title }) {
  const [expenseName, onChangeExpenseName] = React.useState(undefined);
  const [expenseValue, onChangeValue] = React.useState(undefined);

  const dispatch = useDispatch();

  function handleOnChangeName(value) {
    onChangeExpenseName(value);
  }
  function handleOnChangeValue(value) {
    const numericValue = value.replace(/[^0-9.]/g, "");

    onChangeValue("$" + numericValue);
  }
  function handleOnSubmit() {
    if (expenseName && expenseValue) {
      dispatch(
        addExpense({
          expense: {
            id: Math.floor(Math.random() * 10000),
            name: expenseName,
            value: expenseValue,
            date: new Date().toString(),
            dateI: new Date().getTime(),
          },
        })
      );
      toggleModalIsVisible();
    } else {
      alert("invalid expense name or value");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>{title}</Text>
      </View>
      <View style={styles.expenseName}>
        <TextInput
          style={styles.textInput}
          onChangeText={handleOnChangeName}
          value={expenseName}
          placeholder="Expense name here"
          placeholderTextColor={Colors.mainTint}
          keyboardType="default"
          // onSubmitEditing={({ nativeEvent: { text, eventCount, target } }) => {
          //   handleOnSubmit(text);
          // }}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={handleOnChangeValue}
          value={expenseValue}
          placeholder="Value of the expense"
          keyboardType="numeric"
        />
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="cancel"
              onPress={toggleModalIsVisible}
              color={Colors.buttonColor}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="accept"
              onPress={handleOnSubmit}
              color={Colors.buttonColor}
            />
          </View>
        </View>
      </View>
    </View>

    // </Modal>
  );
}

export default NewExpenseModal;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginLeft: 32,
    marginRight: 32,
    padding: 8,
    borderWidth: 3,
    elevation: 20, //shadow for android
    shadowColor: "black",
    borderRadius: 8,
    borderColor: "black",
    backgroundColor: Colors.mainHighlight,
  },
  title: {
    alignItems: "center",
  },
  textInput: {
    marginTop: 8,
    height: 40,
    borderWidth: 1,
    color: Colors.mainTint, //price numberColor

    borderColor: Colors.secBackGround,
    padding: 10,
    borderRadius: 2,
    fontSize: 18,
  },
  numberInput: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 8,
  },
  button: {
    margin: 6,
  },
});
