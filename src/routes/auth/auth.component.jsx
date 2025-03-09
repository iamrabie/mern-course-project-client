import Input from '../../components/Input/input.component';
import Button from '../../components/Button/button.component';
import { VALIDATOR_REQUIRE , VALIDATOR_EMAIL , VALIDATOR_MINLENGTH } from '../../utils/validators';
import { AuthContext } from '../../context/context';
import { useForm } from '../../hooks/form-hook';
import {useState , useContext} from 'react';
import './auth-form.css';


const Auth = () => {


    const {login , setLogin} = useContext(AuthContext);
    // console.log('login from auth context' , login);

    const [formState , titleInputHandler , setFormData] = useForm({
        email:{
            value:'',
            isValid:false
        },
        password:{
            value:'',
            isValid:false
        },
        name:{
            value:'',
            isValid:false
        }
    }, false);



    const [isLoggedIn , setIsLoggedIn] = useState(true);

    const handleLogin = (e) => {
       e.preventDefault();
    //    console.log('form state :'  , formState);
    //    setLogin(!login);
    }


    const handleSwitchMode = () => {

        if (isLoggedIn){

            setFormData({
              ...formState.inputs,
              name:{
                value:'',
                isValid:false
              }
            } , false );
        }

        else{

            setFormData({
                ...formState.inputs,
                name:undefined
            } , formState.inputs.email.isValid && formState.inputs.password.isValid);
        }

        setIsLoggedIn(prev => !prev);
        setLogin(!login);
    }



    return(
        <>
        <h1 className="text-white text-center text-3xl">Login Required</h1>
        <br/>
        <form className='auth-form' onSubmit={handleLogin}>
            {!isLoggedIn &&  <Input 
             element="input"
             type="text"
             id="name"
             label="Name"
             name="name"
             validators={[VALIDATOR_REQUIRE()]}
             errorMessage="Please enter your name"
             onInput={titleInputHandler}
             value={formState.inputs.name.value}
             valid={formState.inputs.name.isValid}
            />}

           <Input 
             element="input"
             type="email"
             id="email"
             label="Email"
             name="email"
             validators={[VALIDATOR_REQUIRE() , VALIDATOR_EMAIL()]}
             errorMessage="You entered an invalid email"
             onInput={titleInputHandler}
             value={formState.inputs.email.value}
             valid={formState.inputs.email.isValid}
            />
           <Input 
             element="input"
             type="password"
             id="password"
             label="password"
             name="password"
             validators={[VALIDATOR_REQUIRE() , VALIDATOR_MINLENGTH(6)]}
             errorMessage="Please enter a nvalid password (atleast 6 characters)."
             onInput={titleInputHandler}
             value={formState.inputs.password.value}
             valid={formState.inputs.password.isValid}
            />
            <div className='flex flex-col gap-y-5'>
              <Button type="submit" disabled={!formState.isValid} onClick={handleSwitchMode}>{isLoggedIn ? 'LOGIN' : 'SIGN UP'}</Button>
              <hr/>
              <Button  onClick={handleSwitchMode}>SWITCH TO {isLoggedIn ? 'SIGN UP' : 'LOGIN'}</Button>
            </div>
        </form>
        </>
    );
}

export default Auth;