import { useReducer , useCallback } from "react";

//writing reducer function
const handleReducer = (state , action) => {

    switch (action.type) {
      case 'INPUT_CHANGE':
        let formIsValid = true;
        for (var input in state.inputs){
          if (input === action.inputId){
            formIsValid = formIsValid && action.isValid;
          }
          else{
            formIsValid = formIsValid && state.inputs[input].isValid;
          }
        }
        return {
          //  ...state, ??
           inputs:{
            ...state.inputs,
            [action.inputId]: {value:action.value , isValid:action.isValid}
           },
           isValid:formIsValid
        };
      default:
        return state;
    }
  }
  


export const useForm = (initialInputs , initialFormValidity) => {
    
    const [formState , dispatch] = useReducer(handleReducer , {
       inputs:initialInputs,
       isValid:initialFormValidity
     });

    //using callback hook so that this func does not creates on every render
    const titleInputHandler = useCallback((id , value , isValid) => {

        // console.log('id value and isValid from input' , id , value , isValid);
        dispatch({type:'INPUT_CHANGE' , value:value ,  isValid:isValid , inputId:id});

    } , []);


    return [formState , titleInputHandler];

}

