import "./input.css";

import { useReducer } from "react";

const Input = (props) => {

    
    useReducer(inputReducer);
//   const handleInput = (e) => {
//     const { name, value } = e.target;

//     setData({
//       ...data,
//       [name]: value,
//     });
//   };

  return (
    <>
      <div className="form-control">
        <label htmlFor={props.id}>{props.label}</label>
        {props.element == "input" ? (
          <input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
          />
        ) : (
          <textarea
            id={props.id}
            rows={props.rows || 3}
            cols={props.cols || 20}
          />
        )}
      </div>
    </>
  );
};

export default Input;
