import React, { useState, useLayoutEffect, useEffect } from "react";
import { View } from "react-native";
import Display from "../components/Display";
import NewExpenseModal from "../components/NewExpenseModal";
import ExpenseList from "../components/ExpenseList";
import { useSelector, useDispatch } from "react-redux";
import useHeaderButton from "../customHooks.js/useHeaderButton";

import { showExpenseModal } from "../store/store";

export function AllExpensesScreen({ navigation, route }) {
  const data = useSelector((data) => data.expense.expenses);
  const dispatch = useDispatch();

  const title = "New Expense";

  const expenseTotal = data
    .map((item) => item?.value?.replace(/[^0-9.]/g, ""))
    .reduce((accumulator, currentValue) => {
      return Number(accumulator) + Number(currentValue);
    }, 0);

  const isVisible = useSelector((state) => state.expense.showModal);

  function toggleModalIsVisible() {
    dispatch(showExpenseModal(title));
  }
  useHeaderButton(navigation);

  return (
    <>
      <View>
        <Display marker={"Total"} amount={expenseTotal} />
      </View>
      {isVisible && (
        <NewExpenseModal
          toggleModalIsVisible={toggleModalIsVisible}
          title={title}
        />
      )}
      <ExpenseList data={data} />
    </>
  );
}

export default AllExpensesScreen;
