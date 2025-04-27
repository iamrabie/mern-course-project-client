import {useState , useEffect , useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import Input from "../../components/Input/input.component";
import Button from "../../components/Button/button.component";
import ImageUpload from '../../components/ImageUpload/imageUpload.component';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../utils/validators";
import { UserContext } from '../../context/user-context';
import LoadingSpinner from '../../components/LoadingSpinner/loadingSpinner';
import { useForm } from "../../hooks/form-hook";
import "./newPlace.css";


const NewPlace = () => {


    const { user , token } = useContext(UserContext);
    console.log('TOKEN FROM CREATE PLACE'  , token);
    //writing useReducer for overall form validity

    const [isLoading , setIsLoading] = useState(false);

    const [postSuccess , setPostSuccess] = useState(false);

    const navigate = useNavigate();

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
            },
            image:{
              value:null,
              isValid:false
            }

      } , false);
    

    // console.log('FORM STATE ::' , formState);

    
    const handleSubmit = (e) => {
      e.preventDefault();
      // console.log('form inputs , '  , formState.inputs);
      const formData = new FormData();

      formData.append('title' , formState.inputs.title.value);
      formData.append('description' , formState.inputs.description.value);
      formData.append('address' , formState.inputs.address.value);
      formData.append('image' , formState.inputs.image.value);
      formData.append('creator' , user);

      // JSON.stringify({
      //   title:formState.inputs.title.value,
      //   description:formState.inputs.description.value,
      //   address:formState.inputs.address.value,
      //   image:formState.inputs.image.value,
      //   creator:user
      // })

      fetch("http://localhost:5000/api/places/create-place" , {
        method:"POST",
        headers:{
          // 'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        },
        body:formData
      }).
      then(res => res.json()).
      then(data => {
        console.log('place creation data::::::::' , data);
        setIsLoading(true);
        if (data.success){
          setPostSuccess(data?.success);
          setTimeout(() => {
            navigate(`/places/${user}`);
          } , 4000)
        }
        // if (!data.sucess){
        //   setIsLoading(false);
        // }
      }).
      catch(err => console.log('error creating place , ' , err));

      
      setIsLoading(false);
      
    }



  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
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
        <ImageUpload id="image" center onInput={titleInputHandler} error='Please provide an image.' />
        {/* <Input
          element="input"
          id="image"
          label="image"
          name="image"
          type="text"
          validators={[VALIDATOR_REQUIRE()]}
          errorMessage="Please enter the image url."
          onInput={titleInputHandler}
        /> */}
        <Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>
     

      </form>
    </>
  );
};

export default NewPlace;
