import React, { Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
// import Users from "./routes/users/users.route";
// import UserPlaces from "./routes/places/places.route";
// import NewPlace from "./routes/places/newPlace.route";
import MainNavigation from "./components/MainNavigation/mainNavigation.component";
// import UpdatePlace from "./routes/places/updatePlace.route";
// import Auth from "./routes/auth/auth.component";
import { AuthContext } from "./context/context";
import { UserContext } from "./context/user-context";
import LoadingSpinner from "./components/LoadingSpinner/loadingSpinner";

// import PlaceList from "./components/places/placeList.component";
// import Reducer from "./components/Reducer/reducer";

const Users = React.lazy(() => import("./routes/users/users.route"));
const UserPlaces = React.lazy(() => import("./routes/places/places.route"));
const NewPlace = React.lazy(() => import("./routes/places/newPlace.route"));
const UpdatePlace = React.lazy(() =>
  import("./routes/places/updatePlace.route")
);
const Auth = React.lazy(() => import("./routes/auth/auth.component"));

function App() {
  const { login, setLogin } = useContext(AuthContext);

  const [userImage, setUserImage] = useState(null);

  const navigate = useNavigate();

  const { token, setToken } = useContext(UserContext);

  const [expirationDate, setExpirationDate] = useState(null);
  console.log('expiration Date ::' , expirationDate);


  useEffect(() => {
    console.log(
      "APP JS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::"
    );
    const storedTokenInfo = JSON.parse(localStorage.getItem("token"));

    console.log('stored time :::' , storedTokenInfo?.expiryDate);
    console.log('stored time :::' , new Date(storedTokenInfo?.expiryDate));

    if (
      storedTokenInfo &&
      storedTokenInfo.token &&
      new Date(storedTokenInfo?.expiryDate) > new Date()
    ) {
      console.log("ahshs");
      setToken(storedTokenInfo.token);
      setExpirationDate(new Date(storedTokenInfo.expiryDate)); // ✅ This was missing before — now added
    } else {
      console.log("falseee");
      navigate("/auth");
      setToken(null);
      setLogin(false);
      localStorage.removeItem('token');
      localStorage.removeItem('login');
      localStorage.removeItem('username');
    }
  }, []);

  const handleExpirationDate = (val) => {
    console.log("val", val);
    setExpirationDate(val);
  };

  let logoutTimer;

  useEffect(() => {
    if (token && expirationDate) {
      const remainingTime = expirationDate.getTime() - new Date().getTime();
      console.log("remaining time :", remainingTime);

      logoutTimer = setTimeout(() => {
        console.log("Snjd");
        setLogin(false);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("login");
        localStorage.removeItem("username");
      }, remainingTime);

      console.log("la la la");
      
    } else {
      clearTimeout(logoutTimer);
    }
  }, [expirationDate]);

  let routes;

  if (login && token) {
    routes = (
      <>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="place/new" element={<NewPlace />} />
          <Route path="places/:userId" element={<UserPlaces />} />
          <Route path="updatePlace/:placeId" element={<UpdatePlace />} />
          <Route path="*" element={<Users />} />
        </Routes>
      </>
    );
  } else {
    routes = (
      <>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route
            path="auth"
            element={<Auth getExpirationDate={handleExpirationDate} />}
          />
          <Route path="places/:userId" element={<UserPlaces />} />
          <Route
            path="*"
            element={<Auth getExpirationDate={handleExpirationDate} />}
          />
        </Routes>
      </>
    );
  }

  return (
    <div className="App">
      <MainNavigation />
      <main>
        <Suspense
          fallback={
            <div className="center">
              <LoadingSpinner />
            </div>
          }
        >
          {routes}
        </Suspense>
      </main>
    </div>
  );
}

export default App;
