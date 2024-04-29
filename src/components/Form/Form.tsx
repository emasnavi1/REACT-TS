import { FormEvent, useRef } from "react";

interface Person {
  name: String;
  age: Number;
}

export default function Form() {
  // This is what you typed in orer to create the contents of the first form: "div>mb-3>label.form-label+input.form-control"
  // after typing the above and pressig the tab, the markup will create a div, with its contents as is available below. This is
  // a quick way of implrnting code
  // similarly, for creating the submit button, you did this: "button.btn.btn-primary" this means I want to place a button here
  // with the class of btn and btn-primary

  // Please also note the margin areound the forms, that is beceuse you added a global margin of 220 padding un er the index.css, and
  // imported index.css in the App.tsx

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);

  // The preventDefault is here to prevent the from resetting the page and reloading the page
  const handleSubmitEvent = (event: FormEvent) => {
    event.preventDefault();
    const person: Person = {
      name: nameRef.current ? nameRef.current.value : "Name Field is null!",
      age: ageRef.current ? parseInt(ageRef.current.value) : 0,
    };
    console.log(person);
  };

  return (
    <form onSubmit={handleSubmitEvent}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input id="name" ref={nameRef} type="text" className="form-control" />
      </div>

      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input id="age" ref={ageRef} type="number" className="form-control" />
      </div>

      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}
