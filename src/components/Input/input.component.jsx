import "./input.css";
import { useReducer } from "react";

const handleReducer = (state, action) => {
  switch (action.type) {
    case "change":
      return {
        ...state,
        [action.name]: {
          value: action.value,
          isValid: true,
        }    
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(handleReducer, {

  });
  console.log(" inputState use Reducer :", inputState);

  const handleChange = (e) => {
    dispatch({ type: "change", value: e.target.value, name:e.target.name });
  };

  return (
    <>
      <div className="form-control">
        <label htmlFor={props.id}>{props.label}</label>
        {props.element == "input" ? (
          <>
            <input
              id={props.id}
              type={props.type}
              placeholder={props.placeholder}
              value={inputState[props.name]?.value}
              onChange={handleChange}
              name={props.name}
              className={
                inputState.isValid
                  ? ""
                  : "!border-2 !border-red-400"
              }
            />
            <br />
            {!inputState.isValid && (
              <p className="text-red-500 text-sm m-0 p-0">{props.errorMessage}</p>
            )}
          </>
        ) : (
          <textarea
            id={props.id}
            rows={props.rows || 3}
            cols={props.cols || 20}
          />
        )}
        {/* <button onClick={() => { dispatch()}}>click me to increment</button> */}
      </div>
    </>
  );
};

export default Input;
