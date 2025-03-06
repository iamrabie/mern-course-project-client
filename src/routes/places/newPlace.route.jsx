import Input from "../../components/Input/input.component";
import Button from "../../components/Button/button.component";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../utils/validators";
import { useForm } from "../../hooks/form-hook";
import "./newPlace.css";


const NewPlace = () => {


    //writing useReducer for overall form validity
    //to handle multiple conditions i.e. complex conditions
    const [formState , titleInputHandler] = useForm(
      {
            title:{
              value:'',
              isValid:false
            },
            description:{
              value:'',
              isValid:false
            },
            address:{
              value:'',
              isValid:false
            } 
      } , false);
    

    // console.log('FORM STATE ::' , formState);

    
    const handleSubmit = (e) => {
      e.preventDefault();
      // console.log('form inputs , '  , formState.inputs);
    }



  return (
    <>
      <form className="place-form" onSubmit={handleSubmit}>
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
          name="description"
          // type="textarea"
          validators={[VALIDATOR_REQUIRE() , VALIDATOR_MINLENGTH(5)]}
          errorMessage="Please enter a valid description (atleast 5 characters)."
          onInput={titleInputHandler}
        />
        <Input
          element="input"
          id="address"
          label="address"
          name="address"
          type="text"
          validators={[VALIDATOR_REQUIRE()]}
          errorMessage="Please enter the address."
          onInput={titleInputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>
     

      </form>
    </>
  );
};

export default NewPlace;
