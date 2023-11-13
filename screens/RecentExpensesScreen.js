import { View } from "react-native";
import Display from "../components/Display";
import NewExpenseModal from "../components/NewExpenseModal";
import ExpenseList from "../components/ExpenseList";
import { useSelector, useDispatch } from "react-redux";
import { showExpenseModal, setExpense } from "../store/store";
import useHeaderButton from "../customHooks.js/useHeaderButton";

import { getExpenses } from "../components/util/http";
import { useEffect, useState } from "react";
import ErrorOverlay from "../components/util/ErrorOverlay";

export function RecentExpensesScreen({ route, navigation }) {
  const dispatch = useDispatch();

  const [error, setError] = useState();

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const savedExpenses = await getExpenses();
        dispatch(setExpense(savedExpenses));
      } catch (error) {
        setError("Error fetching your expenses, please try again!");
      }
    }
    fetchExpenses();
  }, []);

  function errorHandler() {
    setError(null);
  }

  const data = useSelector((data) => data.expense.expenses);

  aWeekAgo = new Date().getTime() - 604800000;

  const recentData = data.filter((ex) => ex.dateI > aWeekAgo);

  const limitedData = [...recentData].slice(-10).reverse();

  const recentExpenseTotal = limitedData
    .map((item) => item?.value?.replace(/[^0-9.]/g, ""))
    .reduce((accumulator, currentValue) => {
      return Number(accumulator) + Number(currentValue);
    }, 0);

  const isVisible = useSelector((state) => state.expense.showModal);
  const title = "Add Expense";

  function toggleModalIsVisible() {
    dispatch(showExpenseModal(title));
  }

  useHeaderButton(navigation);

  if (error) {
    return <ErrorOverlay message={error} onPress={errorHandler} />;
  }

  return (
    <>
      <View>
        <Display marker={"Recent Exp."} amount={recentExpenseTotal} />
      </View>
      {isVisible && (
        <NewExpenseModal
          toggleModalIsVisible={toggleModalIsVisible}
          title={title}
        />
      )}
      <ExpenseList data={limitedData} />
    </>
  );
}

export default RecentExpensesScreen;
