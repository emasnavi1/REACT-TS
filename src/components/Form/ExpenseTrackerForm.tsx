import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import AppTable from "../Table/AppTable";

const initialCategories = ["Utilities", "Groceries", "Entertainment"];
const defaultFilterValue = "All";

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
  const [filterCategories, setFilterCategories] = useState([
    "All",
    ...initialCategories,
  ]);
  const [filterValue, setFilterValue] = useState(defaultFilterValue);
  const [filteredExpenseList, setFilteredExpenseList] = useState<FormData[]>(
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }, // this is called nested destructuring, you are taking the errors segment of the formState out
  } = useForm<FormData>({ resolver: zodResolver(schema(categories)) });

  const onSubmit = (data: FormData) => {
    const expenseExists = expenseList.some(
      (x) => x.description === data.description && x.category === data.category
    );
    if (!expenseExists) {
      const updatedExpenseList = [...expenseList, data];
      setExpenseList(updatedExpenseList);
      updateFilteredExpenseList();
    } else {
      console.log(
        "The expense" + data.description + "is already in the expense list"
      );
    }
  };

  const addCategory = (newCategory: string) => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setFilterCategories([...filterCategories, newCategory]);
      setNewCategory("");
    }
  };

  const removeExpense = (index: number) => {
    const newExpenseList = [...expenseList];
    newExpenseList.splice(index, 1);
    setExpenseList(newExpenseList);
  };

  useEffect(() => {
    updateFilteredExpenseList();
  }, [expenseList, filterValue]);

  const updateFilteredExpenseList = () => {
    if (filterValue === defaultFilterValue) {
      setFilteredExpenseList(expenseList);
    } else {
      setFilteredExpenseList(
        expenseList.filter((expense) => expense.category === filterValue)
      );
    }
  };

  const onFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterValue(event.target.value);
    updateFilteredExpenseList();
    console.log(filteredExpenseList);
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

      <div className="mb-3">
        <label htmlFor="categoryFilter" className="form-label">
          Category Filter:
        </label>
        <select
          id="categoryFilter"
          className="form-select"
          onChange={onFilterChange}
        >
          {filterCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <AppTable data={filteredExpenseList} onButtonClick={removeExpense} />
      </div>
    </div>
  );
}
