import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import Colors from '../constants/Colors';
import { addExpense } from '../store/store';
import { useDispatch } from 'react-redux';
import { uploadExpense } from './util/http';
import ErrorOverlay from './util/ErrorOverlay';

export function NewExpenseModal({ toggleModalIsVisible, title }) {
  const [expenseName, onChangeExpenseName] = React.useState(undefined);
  const [expenseValue, onChangeValue] = React.useState(undefined);

  const [expenseItem, onChangeExpenseItem] = React.useState({
    name: undefined,
    value: undefined,
    date: undefined,
  });

  function handleOnChangeExpenseItem(inputIdentifier, enteredValue) {
    onChangeExpenseItem((currentInputValues) => {
      if (inputIdentifier === 'value') {
        return {
          ...currentInputValues,
          [inputIdentifier]: enteredValue,
        };
      }
      return {
        ...currentInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }
  const [error, setError] = useState();

  const dispatch = useDispatch();

  // function handleOnChangeName(value) {
  //   onChangeExpenseName(value);
  // }
  // function handleOnChangeValue(value) {
  //   const numericValue = value.replace(/[^0-9.]/g, '');

  //   onChangeValue('$' + numericValue);
  // }
  async function handleOnSubmit() {
    try {
      if (expenseItem.name && expenseItem.value) {
        // const expenseData = {
        //   name: expenseName,
        //   value: expenseValue,
        //   date: new Date().toDateString(),
        //   dateI: new Date().getTime(),
        // };
        const expenseData = {
          name: expenseItem.name,
          value: `$ ${expenseItem.value}`,
          date: new Date().toDateString(),
          dateI: new Date().getTime(),
        };
        expenseData.id = await uploadExpense(expenseData);

        dispatch(addExpense({ expense: expenseData }));
        toggleModalIsVisible();
      } else {
        Alert.alert('invalid expense name or value');
      }
    } catch (error) {
      setError('Error saving your expense, please try again!');
    }
  }

  function errorHandler() {
    handleOnSubmit();
    setError(null);
  }

  if (error) {
    return <ErrorOverlay message={error} onPress={errorHandler} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>{title}</Text>
      </View>
      <View style={styles.expense}>
        <TextInput
          style={styles.textInput}
          onChangeText={handleOnChangeExpenseItem.bind(this, 'name')}
          value={expenseItem.name}
          placeholder="Expense name here"
          keyboardType="default"
        />
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={styles.textInput}
            onChangeText={handleOnChangeExpenseItem.bind(this, 'value')}
            value={expenseItem.value}
            placeholder="Value"
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.textInput, { textAlign: 'center' }]}
            onChangeText={handleOnChangeExpenseItem.bind(this, 'date')}
            value={expenseItem.date}
            placeholder={new Date().toISOString().slice(0, 10)}
            placeholderTextColor={Colors.mainTint}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
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
    shadowColor: 'black',
    borderRadius: 8,
    borderColor: 'black',
    backgroundColor: Colors.mainHighlight,
  },
  expense: {
    height: 110,
  },
  title: {
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
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
    flexDirection: 'row',
    padding: 8,
  },
  button: {
    margin: 6,
  },
});
