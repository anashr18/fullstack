## JavaScript 
- Static and class methods are same in Javacript
- C++/Java/Python have distinct differences in how they handle static and class methods.
- In JavaScript, static fields cannot be accessed by instances of the class, while in Python and C++, instances can access static fields, though it’s typically not recommended in those languages.
### this in js vs python
- JavaScript: this is determined by the context in which the function is called. When a method is assigned to a different variable, it loses its original this binding. You need to bind it explicitly to retain the context.
- Python: self is just a parameter that explicitly refers to the instance calling the method. This makes self context-independent, avoiding the problem entirely because self does not rely on how the method is called.
### call vs. apply vs. bind
- call: Invokes the function immediately and allows you to pass arguments individually.
- apply: Similar to call, but arguments are passed as an array.
- bind: Returns a new function with a permanently bound this context, allowing you to call it later.
- Use Cases
  - Method Borrowing: Reuse a method from one object for another, as shown in the example.
  - Setting Context: Use call or apply to set this explicitly in scenarios where the context might be unclear.