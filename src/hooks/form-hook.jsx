import { useReducer , useCallback } from "react";

//writing reducer function
const handleReducer = (state , action) => {

    switch (action.type) {
      case 'INPUT_CHANGE':
        let formIsValid = true;
        for (var input in state.inputs){
          if (!state.inputs[input]){
            continue;
          }
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
      case 'SET_DATA':
        return {
          inputs:action.inputs,
          isValid:action.isValid
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
     
    // console.log('useform :' , formState);

    //using callback hook so that this func does not creates on every render
    const titleInputHandler = useCallback((id , value , isValid) => {

        // console.log('id value and isValid from input' , id , value , isValid);
        dispatch({type:'INPUT_CHANGE' , value:value ,  isValid:isValid , inputId:id});

    } , []);


    const handleFormData = useCallback((inputData , formValidity) => {

      dispatch({type:'SET_DATA' , inputs:inputData , isValid:formValidity});

    } , []);


    return [formState , titleInputHandler , handleFormData];

}

