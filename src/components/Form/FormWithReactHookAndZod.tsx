import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(5, { message: "Name must be at least 5 charachters" }),
  age: z
    .number({ invalid_type_error: "Age field is required" })
    .min(18, { message: "Age shall be a numebr bigger than 18" }),
});

type FormData = z.infer<typeof schema>;

export default function FormWithReactHookAndZod() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }, // this is called nested destructuring, you are taking the errors segment of the formState out
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  console.log(errors);
  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          id="name"
          {...register("name")}
          type="text"
          className="form-control"
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          id="age"
          {...register("age", { valueAsNumber: true })}
          type="number"
          className="form-control"
        />
        {errors.age && <p className="text-danger">{errors.age.message}</p>}
      </div>

      <button className="btn btn-primary" type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
