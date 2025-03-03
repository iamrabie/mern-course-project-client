import Input from "../../components/Input/input.component";
import Button from "../../components/Button/button.component";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../utils/validators";
import { useCallback , useReducer} from "react";
import "./newPlace.css";



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


const NewPlace = () => {


    //writing useReducer for overall form validity
    //to handle multiple conditions i.e. complex conditions
    const [formState , dispatch] = useReducer(handleReducer , {
      inputs:{
        title:{
          value:'',
          isValid:false
        },
        description:{
          value:'',
          isValid:false
        }  
      },
      isValid:false
    });

    console.log('FORM STATE ::' , formState);

    //using callback hook so that this func does not creates on every render
    const titleInputHandler = useCallback((id , value , isValid) => {

        // console.log('id value and isValid from input' , id , value , isValid);
        dispatch({type:'INPUT_CHANGE' , value:value ,  isValid:isValid , inputId:id});

    } , []);



    const titleDescriptionHandler = useCallback((id , value , isValid) => {

        dispatch({type:'INPUT_CHANGE' , value:value , isValid:isValid , inputId:id});
        // console.log('id value and isValid from DES' , id , value , isValid);
        
    } , []);


  return (
    <>
      <form className="place-form">
        <Input
          element="input"
          id="title"
          label="Title"
          name="title"
          type="text"
          validators={[VALIDATOR_REQUIRE()]}
          errorMessage="you entered an invalid title."
          onInput={titleInputHandler}
        />
         <Input
          element="description"
          id="description"
          label="Description"
          name="title"
          type="text"
          validators={[VALIDATOR_REQUIRE() , VALIDATOR_MINLENGTH(5)]}
          errorMessage="Please enter a valid description (atleast 5 characters)."
          onInput={titleDescriptionHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>
      </form>
    </>
  );
};

export default NewPlace;
