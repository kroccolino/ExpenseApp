import axios from "axios";

const DATABASE = "https://kroccoexpense-default-rtdb.firebaseio.com/";

async function uploadExpense(expenseData) {
  const result = await axios.post(DATABASE + "expenses.json", expenseData);

  const id = result.data.name;
  return id;
}

async function getExpenses() {
  const result = await axios.get(DATABASE + "expenses.json");

  const formatedResult = result.data;
  const formattedExpenses = [];

  // Iterate through the keys in formatedResult and add id to each object
  for (const key in formatedResult) {
    const expenseObject = formatedResult[key];
    // Add the id property with the key value to each object
    const formattedExpense = { ...expenseObject, id: key };
    formattedExpenses.push(formattedExpense);
  }

  return formattedExpenses;
}

async function deleteExpense(id) {
  await axios.delete(DATABASE + `expenses/${id}.json`);
}

async function updateExpense(expenseData, id) {
  await axios.put(DATABASE + `expenses/${id}.json`, expenseData);
}

export { uploadExpense, getExpenses, deleteExpense, updateExpense };
