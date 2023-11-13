import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import ExpenseItem from "./ExpenseItem";
import { useSelector, useDispatch } from "react-redux";
import { showExpenseModal, showEditModal } from "../store/store";
import EditExpenseModal from "./EditExpenseModal";

export function ExpenseList({ data }) {
  const isVisible = useSelector((state) => state.expense.showModal);
  const showEdit = useSelector((state) => state.expense.showEdit);
  const dispatch = useDispatch();

  function toggleModalIsVisible() {
    dispatch(showExpenseModal());
  }
  function toggleExpenseEditVisible(id) {
    dispatch(showEditModal(id));
  }

  return (
    <View style={styles.container}>
      {showEdit && <EditExpenseModal />}
      {!showEdit && (
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              //onPressIn={() => {}}
              //onPressOut={() => {}}
              onPress={() => toggleExpenseEditVisible(item.id)}
              onLongPress={() => {}}
            >
              <ExpenseItem
                name={item.name}
                date={item.date}
                value={item.value}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()} //data.indexOf(item)}
        >
          {/* <Text> ExpenseList</Text> */}
        </FlatList>
      )}
    </View>
  );
}

export default ExpenseList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },
});
