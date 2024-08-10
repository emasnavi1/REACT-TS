import { useState } from "react";
import AppExpenseTable from "./ExpenseTable";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseForm, { ExpenseFormData } from "./ExpenseForm";

const initialCategories = ["Utilities", "Groceries", "Entertainment"];
const defaultFilterValue = "All Categories";

export default function ExpenseTrackerFrom() {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState("");
  const [expenseList, setExpenseList] = useState<ExpenseFormData[]>([]);
  const [filterValue, setFilterValue] = useState(defaultFilterValue);

  const addCategory = (newCategory: string) => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const onFormSubmit = (data: ExpenseFormData) => {
    const expenseExists = expenseList.some(
      (x) => x.description === data.description && x.category === data.category
    );
    if (!expenseExists) {
      const updatedExpenseList = [...expenseList, data];
      setExpenseList(updatedExpenseList);
    } else {
      console.log(
        "The expense" + data.description + "is already in the expense list"
      );
    }
  };

  // when you filter an array in JavaScript, the resulting array is a new array,
  // but the elements within the new array are references to the same objects as
  // those in the original array.This means that the objects themselves are not
  // copied or cloned; only the array structure is new.
  const removeExpense = (expenseToRemove: ExpenseFormData) => {
    const newExpenseList = expenseList.filter(
      (expense) => expense !== expenseToRemove
    );
    setExpenseList(newExpenseList);
  };

  // The trick here is to not to create a new state variable when you
  // can use the existing one to calculate. in this example, you originally
  // had a state variable to hold the filteredExpeseList, however since
  // it always can be calculated knowing the filterValue and the expenseList,
  // then it can be calculated in real time.
  const updateFilteredExpenseList = (value: string) => {
    if (value === defaultFilterValue) {
      return expenseList;
    } else {
      return expenseList.filter((expense) => expense.category === value);
    }
  };

  return (
    <div className="mt-5">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          id="newCategory"
          placeholder="Insert New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button
          className="btn btn-primary mt-3"
          onClick={() => addCategory(newCategory)}
        >
          Add Category
        </button>
      </div>

      <ExpenseForm categories={categories} onSubmit={onFormSubmit} />

      <ExpenseFilter categories={categories} onSelect={setFilterValue} />

      <div className="mt-5">
        <AppExpenseTable
          data={updateFilteredExpenseList(filterValue)}
          onDelete={removeExpense}
          calculateTotalOn="amount"
        />
      </div>
    </div>
  );
}
