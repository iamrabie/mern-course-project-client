import "./input.css";
import { validate } from "../../utils/validators";
import { useReducer , useEffect } from "react";

const handleReducer = (state, action) => {
  switch (action.type) {
    case "change":
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value , action.validators),   
      };
    case "touch":
      return {
        ...state,
        isTouched:true,
      };
    default:
      return state;
  }
};

const Input = (props) => {

  const [inputState, dispatch] = useReducer(handleReducer, {
    value: props.value || '',
    isTouched:false,
    isValid:props.valid || false
  });
  // console.log(" inputState use Reducer :", inputState);


  //destrcting the values from  the state and the props.
  const { value , isValid } = inputState;
  const { id , onInput } = props;


  //using destructured values in the useEffect dependencies so that useEffects runs only when these values change rather than the whole state and the props.
  useEffect(() => {
    
    onInput(id , value , isValid);

  } , [id , value , isValid , onInput]);


  const handleChange = (e) => {
    dispatch({ type: "change", value: e.target.value , validators:props.validators });
  };


  const touchHandler = () => {
    dispatch({ type: "touch" });
  }

  return (
    <>
      <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid' }`}>
        <label htmlFor={props.id}>{props.label}<span className="text-red-500">*</span></label>
        
        {props.element === "input" ? (
          <>
            <input
              id={props.id}
              type={props.type}
              placeholder={props.placeholder}
              value={inputState.value}
              onChange={handleChange}
              onBlur={touchHandler}
              name={props.name}
              // className={
              //   inputState.isValid
              //     ? ""
              //     : "!border-2 !border-red-400"
              // }
            />
            {/* <br /> */}
            {/* <p>{props.errorMessage}</p> */}
            {!inputState.isValid && inputState.isTouched && (
              <p className="text-red-400 text-sm">{props.errorMessage}</p>
            )}
          </>
        ) : (
          <>

          <textarea
            id={props.id}
            rows={props.rows || 3}
            cols={props.cols || 20}
            onChange={handleChange}
            onBlur={touchHandler}
            value={inputState.value}
            name={props.name}
          />
          {!inputState.isValid && inputState.isTouched && (
            <p className="text-red-400 text-sm">{props.errorMessage}</p>
          )}
          </>
        )}
        {/* <button onClick={() => { dispatch()}}>click me to increment</button> */}
      </div>
    </>
  );
};

export default Input;
