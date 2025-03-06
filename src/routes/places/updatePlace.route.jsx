import {useParams} from 'react-router-dom';
import Input from '../../components/Input/input.component';
import Button from '../../components/Button/button.component';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../utils/validators';
import { useForm } from '../../hooks/form-hook';
import "./newPlace.css";

const UpdatePlace = () => {

    const { placeId } = useParams();

    const [formState , titleInputHandler] = useForm({
        title: {
            value: '',
            isValid: false
          },
          description: {
            value: '',
            isValid: false
          }
    } , false);

    // console.log('update place useForm hook :' , formState);
    

    const DUMMY_PLACES = [
        {
            id:'p1',
            title:'Empire State Building',
            description:'One of the famous sky scrappers in the world!',
            imageUrl:'https://thechatwalny.agencydominion.net/uploads/2024/06/Empire-State-Building-1200x630.jpg',
            address:'24 W 34th St, New York , NY 10001',
            location:{
                lat:40.7484405,
                lng:-73.9878584
            },
            creator:'u1'
        },
        {
            id:'p2',
            title:'Empire State Buildingsss',
            description:'One of the famous sky scrappers in the world ..!',
            imageUrl:'https://thechatwalny.agencydominion.net/uploads/2024/06/Empire-State-Building-1200x630.jpg',
            address:'24 W 34th St, New York , NY 10001',
            location:{
                lat:40.7484405,
                lng:-73.9878584
            },
            creator:'u2'
        },
        {
            id:'p2',
            title:'Empire State Building',
            description:'One of the famous sky scrappers in the world ..!',
            imageUrl:'https://thechatwalny.agencydominion.net/uploads/2024/06/Empire-State-Building-1200x630.jpg',
            address:'24 W 34th St, New York , NY 10001',
            location:{
                lat:40.7484405,
                lng:-73.9878584
            },
            creator:'u2'
        },

    ];


    //find gives the first thing that matches.
    const identifiedPlace = DUMMY_PLACES.find( i => i.id === placeId);

    
    if (!identifiedPlace){
        return <div className='center bg-white w-1/2 py-3 px-5 rounded-lg mx-auto'>
        <p>no place exists</p>
        </div>
    }


    return(
        <>
         <form className='place-form'>
            <Input   
                element="input"
                id="title"
                label="Title"
                name="title"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                errorMessage="you entered an invalid title."
                onInput={titleInputHandler}
                value={identifiedPlace.title}
                valid={true}
            />
            <Input   
                element="textarea"
                id="description"
                label="Description"
                name="description"
                // type="textarea"
                validators={[VALIDATOR_REQUIRE() , VALIDATOR_MINLENGTH(5)]}
                errorMessage="Please enter a valid description (atleast 5 characters)."
                onInput={titleInputHandler}
                value={identifiedPlace.description}
                valid={true}
            />
          
            <Button disabled={!formState.isValid}>UPDATE PLACE</Button>

         </form>
        </>
    );
}


export default UpdatePlace;