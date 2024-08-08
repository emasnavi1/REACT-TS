import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import AppExpenseTable from "./ExpenseTable";
import ExpenseFilter from "./ExpenseFilter";

const initialCategories = ["Utilities", "Groceries", "Entertainment"];
const defaultFilterValue = "All Categories";

const schema = (categories: string[]) =>
  z.object({
    description: z
      .string()
      .min(3, { message: "description must be at least 3 charachters" }),
    amount: z
      .number({ invalid_type_error: "Number field is required" })
      .min(0.01, { message: "amount shall be a numebr bigger than 0.01" }),
    category: z.string().refine((val) => categories.includes(val), {
      message: "Invalid Category",
    }),
  });

const defaultSchema = schema(initialCategories);
type FormData = z.infer<typeof defaultSchema>;

export default function ExpenseTrackerFrom() {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState("");
  const [expenseList, setExpenseList] = useState<FormData[]>([]);
  const [filterValue, setFilterValue] = useState(defaultFilterValue);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }, // this is called nested destructuring, you are taking the errors segment of the formState out
  } = useForm<FormData>({ resolver: zodResolver(schema(categories)) });

  const onSubmit = (data: FormData) => {
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

    reset();
  };

  const addCategory = (newCategory: string) => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  // when you filter an array in JavaScript, the resulting array is a new array,
  // but the elements within the new array are references to the same objects as
  // those in the original array.This means that the objects themselves are not
  // copied or cloned; only the array structure is new.
  const removeExpense = (expenseToRemove: FormData) => {
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <input
            id="description"
            type="text"
            className="form-control"
            {...register("description")}
          />
          {errors.description && (
            <span className="text-danger">{errors.description.message}</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount:
          </label>
          <input
            id="amount"
            step="0.01"
            type="number"
            className="form-control"
            {...register("amount", { valueAsNumber: true })}
          />
          {errors.amount && (
            <span className="text-danger">{errors.amount.message}</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category:
          </label>
          <select
            id="category"
            className="form-select"
            {...register("category")}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>

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
