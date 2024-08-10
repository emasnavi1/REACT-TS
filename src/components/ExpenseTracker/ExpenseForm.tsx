import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  categories: string[];
  onSubmit: (data: ExpenseFormData) => void;
}

const schema = (categories: string[]) =>
  z.object({
    description: z
      .string()
      .min(3, { message: "description must be at least 3 charachters" })
      .max(50, { message: "description must be less than 50 charachters" }),
    amount: z
      .number({ invalid_type_error: "Number field is required" })
      .min(0.01, { message: "amount shall be a numebr bigger than 0.01" })
      .max(100_000, {
        message: "amount shall be a numebr smaller than 100000",
      }),
    category: z
      .string()
      .min(1, { message: "Category is required" })
      .refine((val) => categories.includes(val), {
        message: "Invalid Category",
      }),
  });

// By Exporting this type, you allow other modules to use this data type
// This saves time for not re-typing this type, as you needed to use this in
// the ExpenseTrackerApp.tsx which makes use of this modudle
export type ExpenseFormData = z.infer<ReturnType<typeof schema>>;

export default function ExpenseForm({ categories, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }, // this is called nested destructuring, you are taking the errors segment of the formState out
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema(categories)) });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
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
        <select id="category" className="form-select" {...register("category")}>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="text-danger">{errors.category.message}</span>
        )}
      </div>

      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}
