import {useParams} from 'react-router-dom';
import Input from '../../components/Input/input.component';
import Button from '../../components/Button/button.component';
import Card from '../../components/Card/card.component';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../utils/validators';
import { useForm } from '../../hooks/form-hook';
import { useEffect , useState } from 'react';
import "./newPlace.css";

const UpdatePlace = () => {

    const { placeId } = useParams();

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
            title:'United Arab Emirates',
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
            id:'p3',
            title:'United Kingdom',
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

    const [ isLoading , setIsLoading ] = useState(true);


    const [formState , titleInputHandler , handleFormData] = useForm({
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


    //find gives the first thing that matches.
    const identifiedPlace = DUMMY_PLACES.find( i => i.id === placeId);


    useEffect(() => {

        if (identifiedPlace){
            handleFormData({
                title: {
                    value: identifiedPlace.title,
                    isValid: true
                  },
                  description: {
                    value: identifiedPlace.description,
                    isValid: true
                  }
            } , true);
        }
 

        setIsLoading(false);

    } , []);


    
    if (!identifiedPlace){
        return <div className='center'>
            <Card>
             <p>Could not found place!</p>
            </Card>
        </div>
    }

    if (isLoading){
        return <div>
            <Card>
              <p>LOADING ...</p>
            </Card>
        </div>
    }


    const handleUpdatePlace = (e) => {

        e.preventDefault();
        console.log(formState);
    }


    return(
        <>
         <form className='place-form' onSubmit={handleUpdatePlace}>
            <Input   
                element="input"
                id="title"
                label="Title"
                name="title"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                errorMessage="you entered an invalid title."
                onInput={titleInputHandler}
                value={formState.inputs.title.value}
                valid={formState.inputs.title.isValid}
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
                value={formState.inputs.description.value}
                valid={formState.inputs.description.isValid}
            />
          
            <Button disabled={!formState.isValid}>UPDATE PLACE</Button>

         </form>
        </>
    );
}


export default UpdatePlace;