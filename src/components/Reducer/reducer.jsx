import { useReducer } from "react";

const handleReducer = (state, action) => {
  if (action.type == "increment-age") {
    // alert('event on dispatch triggered');
    console.log("age incremented :", state.age + 1);
    return { age: state.age + 1 };
  }

  if (action.type == "decrement-age") {
    console.log("age decrremented :", state.age - 1);
    return { age: state.age - 1 };
  } else {
    return { age: state.age * 2 };
  }
};

const Reducer = () => {
  const [state, dispatch] = useReducer(
    handleReducer,
    { age: 43 },
    (initialArg) => {
      return { age: 20 };
    }
  );
  // console.log("reducer state :", state);

  const handleIncrementAge = () => {
    dispatch({ type: "increment-age" });
  };

  const handleDecreaseAge = () => {
    dispatch({ type: "decrement-age" });
  };

  const handleMultiplyAge = () => {
    dispatch({ type: "multiply-age" });
  };

  return (
    <>
      <p>handle reducer</p>
      <p className="text-white">age : {state.age} </p>
      <button onClick={handleIncrementAge}>Click me</button>
      <br />
      <button onClick={handleDecreaseAge}>Decrement Age</button>
      <br />
      <button onClick={handleMultiplyAge}>Multiply Age</button>
    </>
  );
};

export default Reducer;
