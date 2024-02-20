
// T is a placeholder for a type.
// The identity function takes an argument of type T and returns the same argument. This function can work with any type.
// When you call identity<number>(123), you're specifying that T should be number, so the function returns a number.
// Similarly, when you call identity<string>("hello"), T becomes string, and the function returns a string.

function identity<T>(arg: T): T {
    return arg;
}

// Usage examples:
let output1: number = identity<number>(123); // Output: 123
let output2: string = identity<string>("hello"); // Output: hello








  
  function customStyled<T extends HTMLElement>(Component: string): (styles: Partial<CSSStyleDeclaration>) => T {
    return (styles: Partial<CSSStyleDeclaration>) => {
        const element = document.createElement(Component);
        Object.assign(element.style, styles);
        return element as T;
    };
  }
  
  // Example usage:
  const styledDiv = customStyled<HTMLDivElement>('div');
  const styledButton = customStyled<HTMLButtonElement>('button');
  
  // Creating styled components
  const customDiv = styledDiv({ backgroundColor: 'blue', color: 'white' });
  const customButton = styledButton({ backgroundColor: 'green', color: 'white' });
  
  document.body.appendChild(customDiv);
document.body.appendChild(customButton);
  
/*
n TypeScript, when you see a function signature like this:

(input: Type) => ReturnType
It means that the function returns another function. The first part (input: Type) specifies the parameters of the returned function, and the 
second part ReturnType specifies the return type of the returned function.

In the case of customStyled, it's designed to be a function factory that produces styled component creator functions. Here's what each part means:

function customStyled<T extends HTMLElement>(Component: string): This part is the main function declaration.
It takes a Component string parameter (representing the type of HTML element) and returns another function.

: (styles: Partial<CSSStyleDeclaration>) => T: This part specifies the return type of the main function. It's a function type definition. 
It means that the main function returns a function that accepts styles as a parameter (of type Partial<CSSStyleDeclaration>) and returns an element of type T, where T is an HTML element type.

So, styles is indeed another input, but it's an input for the function that the main function (customStyled) returns, not for customStyled itself.

To address your question about defining styles as an input parameter directly in the customStyled function, you could certainly
 do that if you want styles to be part of the initial configuration of the styled component. However, the design choice in this example separates the creation of the styled component from the application of styles, allowing for more flexibility. You can create a styled component factory with customStyled and then apply styles to it later when you actually use the styled component creator function. This separation of concerns can be useful in certain scenarios.
