import { View } from "react-native";
import Display from "../components/Display";
import NewExpenseModal from "../components/NewExpenseModal";
import ExpenseList from "../components/ExpenseList";
import { useSelector, useDispatch } from "react-redux";
import { showExpenseModal } from "../store/store";
import useHeaderButton from "../customHooks.js/useHeaderButton";

export function RecentExpensesScreen({ route, navigation }) {
  const data = useSelector((data) => data.expense.expenses);
  const dispatch = useDispatch();

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
