import Input from "../../components/Input/input.component";
import './newPlace.css';

const NewPlace = () => {
    return(
        <>
        <form className="place-form">
            <Input element="input" id={1} label="Place Name" name="Place Name" type="text" validators={[]} errorMessage="" />
            <Input element="input" id={2} label="Description" name="Description" type="text" validators={[]} errorMessage="" />
            <Input element="input" id={3} label="Address" name="Address" type="text" validators={[]} errorMessage="" />

            {/* <Input element="inputss" id={3} label="Description" type="text" placeholder="Hunza , Naran etc" rows="5" cols="30" /> */}
        </form>
        </>
    );
}


export default NewPlace;