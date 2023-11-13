import { configureStore, createSlice } from '@reduxjs/toolkit';

export const expenseSlice = createSlice({
  name: 'expenses',
  initialState: {
    expenses: [],
    showModal: false,
    showEdit: false,
    modalTitle: '',
    editedExpenseId: '',
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses = [...state.expenses, action.payload.expense];
    },
    setExpense: (state, action) => {
      state.expenses = action.payload;
    },
    editExpense: (state, action) => {
      i = action.payload.expenseIndex;
      expName = action.payload.name;
      value = action.payload.value;
      state.expenses[i].value = value;
      state.expenses[i].name = expName;
    },
    removeExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (ex) => ex.id !== state.editedExpenseId
      );
    },
    showExpenseModal: (state, action) => {
      state.showModal = !state.showModal;
      modalTitle = action.payload;
    },
    showEditModal: (state, action) => {
      state.editedExpenseId = action?.payload;
      state.showEdit = !state.showEdit;
    },
  },
});

// export const store = configureStore({
//   reducer: {
//     expense: expenseSlice.reducer,
//   },
// });

export const {
  addExpense,
  setExpense,
  editExpense,
  removeExpense,
  showExpenseModal,
  showEditModal,
} = expenseSlice.actions;

//export default store;
