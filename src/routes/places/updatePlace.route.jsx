import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import Input from "../../components/Input/input.component";
import Button from "../../components/Button/button.component";
import LoadingSpinner from "../../components/LoadingSpinner/loadingSpinner";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../utils/validators";
import { UserContext } from "../../context/user-context";
import { useForm } from "../../hooks/form-hook";
import "./newPlace.css";


const UpdatePlace = () => {

  const { placeId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState({});
  // console.log('update success' , updateSuccess);
  const navigate = useNavigate();
  const { user , token} = useContext(UserContext);
  const [place, setPlace] = useState();
  // console.log("place info :" , place);

  const [formState, titleInputHandler, handleFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  // console.log('update place useForm hook :' , formState);

  
  //fetching places by place id
  useEffect(() => {
    fetch(`${process.env.BACKEND}/places/${placeId}`)
      .then((res) => res.json())
      .then((data) => {
        setPlace(data.data);
        handleFormData(
          {
            title: {
              value: data.data.title,
              isValid: true,
            },
            description: {
              value: data.data.description,
              isValid: true,
            },
          },
          true
        );
      })
      .catch((err) => console.log("error :", err));
  }, [placeId, handleFormData]);



  //updating place
  const handleUpdatePlace = (e) => {
    e.preventDefault();
    // console.log(formState);

    fetch(`${process.env.REACT_APP_BACKEND}/places/update-place/${placeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization':`Bearer ${token}`
      },
      body: JSON.stringify({
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("data ob updating" , data);
        setUpdateSuccess(data);
        setIsLoading(true);
        setTimeout(() => {
          navigate(`/places/${user}`);
        }, 1000);
      })
      .catch((err) => console.log("error :", err));

    setIsLoading(false);
  };


  // const onUpdate = () => {
  //   return false;
  // };
  

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && place && (
        <form className="place-form" onSubmit={handleUpdatePlace}>
          <Input
            element="input"
            id="title"
            label="Title"
            name="title"
            type="text"
            validators={[VALIDATOR_REQUIRE()]}
            errorMessage="you entered an invalid title."
            onInput={titleInputHandler}
            value={place.title}
            valid={true}
          />
          <Input
            element="textarea"
            id="description"
            label="Description"
            name="description"
            // type="textarea"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
            errorMessage="Please enter a valid description (atleast 5 characters)."
            onInput={titleInputHandler}
            value={place.description}
            valid={true}
          />

          <Button disabled={!formState.isValid}>UPDATE PLACE</Button>
        </form>
      )}

      {/* <Modal
        show={updateSuccess.success}
        onCancel={onUpdate}
        header={updateSuccess ? "Place deleted successfully" : "ERROR"}
        footer={<Button onClick={onUpdate}>CLOSE</Button>}
        //  contentClass="place-item_modal-content"
      >
        <p>place deleted successfully!</p>
      </Modal> */}
    </>
  );
};

export default UpdatePlace;

// if (!identifiedPlace){
//     return <div className='center'>
//         <Card>
//          <p>Could not found place!</p>
//         </Card>
//     </div>
// }

// if (isLoading){
//     return <div>
//         <Card>
//           <p>LOADING ...</p>
//         </Card>
//     </div>
// }

//find gives the first thing that matches.
// const identifiedPlace = DUMMY_PLACES.find( i => i.id === placeId);
// const DUMMY_PLACES = [
//     {
//         id:'p1',
//         title:'Empire State Building',
//         description:'One of the famous sky scrappers in the world!',
//         imageUrl:'https://thechatwalny.agencydominion.net/uploads/2024/06/Empire-State-Building-1200x630.jpg',
//         address:'24 W 34th St, New York , NY 10001',
//         location:{
//             lat:40.7484405,
//             lng:-73.9878584
//         },
//         creator:'u1'
//     },
//     {
//         id:'p2',
//         title:'United Arab Emirates',
//         description:'One of the famous sky scrappers in the world ..!',
//         imageUrl:'https://thechatwalny.agencydominion.net/uploads/2024/06/Empire-State-Building-1200x630.jpg',
//         address:'24 W 34th St, New York , NY 10001',
//         location:{
//             lat:40.7484405,
//             lng:-73.9878584
//         },
//         creator:'u2'
//     },
//     {
//         id:'p3',
//         title:'United Kingdom',
//         description:'One of the famous sky scrappers in the world ..!',
//         imageUrl:'https://thechatwalny.agencydominion.net/uploads/2024/06/Empire-State-Building-1200x630.jpg',
//         address:'24 W 34th St, New York , NY 10001',
//         location:{
//             lat:40.7484405,
//             lng:-73.9878584
//         },
//         creator:'u2'
//     },

// ];
