import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../utils/validators";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/Input/input.component";
import Button from "../../components/Button/button.component";
import LoadingSpinner from "../../components/LoadingSpinner/loadingSpinner";
import ErrorModal from "../../components/ErrorModal/errorModal.component";
import ImageUpload from "../../components/ImageUpload/imageUpload.component";
import { UserContext } from "../../context/user-context";
import { AuthContext } from "../../context/context";
import { useForm } from "../../hooks/form-hook";
import "./auth-form.css";


const Auth = () => {  
  const { login, setLogin } = useContext(AuthContext);
  // console.log('login from auth context' , login);
  const { user , setUser , setToken } = useContext(UserContext);

  const navigate = useNavigate();

  const [formState, titleInputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      name: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid:false
      }
    },
    false
  );

  // console.log('form state :' , formState);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // console.log('is logged in :' , isLoggedIn);

  const [isLoading, setIsLoading] = useState(false);

  const [userSignup , setUserSignup] = useState();
  // console.log('sign up' , userSignup);

  const [error, setError] = useState("");
  // console.log('error' , error);

  const handleLogin = (e) => {
    e.preventDefault();
      //  console.log('form state :'  , formState);

    if (isLoggedIn) {
      fetch(`${process.env.REACT_APP_BACKEND}/users/login`, {
        // mode:'no-cors',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // name:formState.inputs.name.value,
          // lastName:'Ali',
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
      })
        .then((res) => {
          // console.log('response :' , res);
          if (!res.ok) {
            throw new Error(
              "user credentials seems to be invalid, please try again."
            );
          }
          return res.json();
        })
        .then((data) => {
          console.log("DATA on login :", data);
          setToken(data.token);
          const tokenExpirationDate = new Date( new Date().getTime() + 1000 * 60 * 60 );
          localStorage.setItem('token' , JSON.stringify({expiryDate:tokenExpirationDate.toISOString(), token:data.token}));
          if (data.success) {
            setIsLoading(true);
            setUser(data.data._id);
            // setTimeout(() => {
            //     setIsLoading(false);
            // } , 2500)
          }
          setLogin(data?.success);
          localStorage.setItem('login' , data?.success);
        })
        .catch((err) => {
          setError(err.message || "Something went wrong , please try again.");
        });
    } else {

      const formData = new FormData();
      formData.append('email' , formState.inputs.email.value);
      formData.append('name' , formState.inputs.name.value);
      formData.append('password', formState.inputs.password.value);
      formData.append('image' , formState.inputs.image.value);

      // console.log("📸 Image Selected:", formState.inputs.image.value);
// console.log("📦 FormData:", [...formData.entries()]);
      // Log FormData contents
      // for (let pair of formData.entries()) {
      //   console.log(pair[0], pair[1]); // Ensure image is properly appended
      // }
      
      
      fetch(`${process.env.REACT_APP_BACKEND}/users/sign-up`, {
        // mode:'no-cors',
        method: "POST",
        // headers: { 'Content-Type': 'multipart/form-data' }

        // headers: {
        //   "Content-Type": "application/json",
        // },
        body:formData,
      })
        .then((res) => {
          // console.log("response :" , res);
          // if (!res.ok) {
          //   console.log('ERRRR');
          // }
          return res.json();
        })
        .then((data) => {
          console.log("data SIGN UP :", data);
          setToken(data.token);
          if (data.success) {
            setUserSignup(data);
            setIsLoading(true);
            setTimeout(() => {
              navigate("/");
              setIsLoading(false);
            }, 2500);
          }
        })
        .catch((err) => {
          setError(err.message || "Something went wrong , please try again.");
        });
    }
  };


  useEffect(() => {
    const storedTokenInfo = JSON.parse(localStorage.getItem('token'));
    // console.log('stored token info AUTH' , storedTokenInfo);

    // if (storedTokenInfo && storedTokenInfo.token && new Date(storedTokenInfo.expiryDate) > new Date()) {

    // }
    
} , []);

  const handleSwitchMode = (e) => {
    e.preventDefault();
    // console.log("switch mode :");
    if (isLoggedIn) {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: true,
          },
          image:{
            value:null,
            isValid:false
          }
        },
        true
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image:undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    }

    setIsLoggedIn((prev) => !prev);
    setLogin(login);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />

      <h1 className="text-white text-center text-3xl">Login Required</h1>
      <br />
      {isLoading && <LoadingSpinner asOverlay />}
      <form className="auth-form" onSubmit={handleLogin}>
        {!isLoggedIn && (
          <Input
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
          />
        )}

        <Input
          element="input"
          type="email"
          id="email"
          label="Email"
          name="email"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          errorMessage="You entered an invalid email"
          onInput={titleInputHandler}
          value={formState.inputs.email.value}
          valid={formState.inputs.email.isValid}
        />
        {!isLoggedIn && <ImageUpload id="image" center onInput={titleInputHandler} />}
        <Input
          element="input"
          type="password"
          id="password"
          label="password"
          name="password"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
          errorMessage="Please enter a valid password (atleast 6 characters)."
          onInput={titleInputHandler}
          value={formState.inputs.password.value}
          valid={formState.inputs.password.isValid}
        />
        <div className="flex flex-col gap-y-5">
          <Button type="submit" disabled={!formState.isValid}>
            {isLoggedIn ? "LOGIN" : "SIGN UP"}
          </Button>
          <hr />
          <Button inverse onClick={handleSwitchMode}>
            SWITCH TO {isLoggedIn ? "SIGN UP" : "LOGIN"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default Auth;
