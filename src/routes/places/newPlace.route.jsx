import Input from "../../components/Input/input.component";
import './newPlace.css';

const NewPlace = () => {
    return(
        <>
        <form className="place-form">
            <Input element="input" id={3} label="Name" type="text" placeholder="Hunza , Naran etc" rows="5" cols="30" />
        </form>
        </>
    );
}


export default NewPlace;