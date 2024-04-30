import { useForm } from "react-hook-form";

interface FormData {
  name: string;
  age: number;
}

export default function FormWithReactHookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }, // this is called nested destructuring, you are taking the errors segment of the formState out
  } = useForm<FormData>();

  console.log(errors);
  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  // For your infromation only:
  // When you spread ...register("age") onto the <input> element in your form, you're integrating several properties into that input element.
  // These properties are provided by the register function of react - hook - form and are essential for managing the form state and validation.Here are the properties integrated into the input element:
  // ref: The ref property is a reference to the input element. It allows react-hook-form to access and interact with the input element, such as retrieving its current value or setting focus.
  // onChange: The onChange property is a function that updates the form state when the value of the input field changes. It ensures that the form state stays synchronized with the user's input.
  // name: The name property is the name of the input field. It identifies the input field within the form and is used to associate the input's value with the corresponding field in the form data.
  // value: The value property is the current value of the input field. It represents the user's input in the input element.
  // By spreading ...register("age") onto the <input> element, you're effectively integrating these properties into the input element, allowing react-hook-form to manage the state and behavior of that input field. This integration simplifies form handling and validation, as react-hook-form handles most of the boilerplate code for you.
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          id="name"
          {...register("name", { required: true, minLength: 5 })}
          type="text"
          className="form-control"
        />
        {/* 'errors.name?.type' this is called optional chaining, this means check the 'type === "required" only if the 'errors' has a property called 'name' */}
        {errors.name?.type === "required" && (
          <p className="text-danger">The Name field is require</p>
        )}
        {errors.name?.type === "minLength" && (
          <p className="text-danger">
            Minimum 5 Charachters required as the Name
          </p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          id="age"
          {...register("age")}
          type="number"
          className="form-control"
        />
      </div>

      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}
