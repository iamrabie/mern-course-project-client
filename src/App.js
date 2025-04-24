import { Routes , Route } from "react-router-dom";
import { useState } from "react";
import Users from "./routes/users/users.route";
import UserPlaces from "./routes/places/places.route";
import NewPlace from "./routes/places/newPlace.route";
import MainNavigation from "./components/MainNavigation/mainNavigation.component";
import UpdatePlace from "./routes/places/updatePlace.route";
import Auth from "./routes/auth/auth.component";
import { useContext } from "react";
import { AuthContext } from "./context/context";


// import PlaceList from "./components/places/placeList.component";
// import Reducer from "./components/Reducer/reducer";

function App() {

  const { login } = useContext(AuthContext);

  const [userImage , setUserImage] = useState(null);
  
  let routes;

  if (login) {
     routes = (
      <>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="place/new" element={<NewPlace />} />
        <Route path="places/:userId" element={<UserPlaces />} />
        <Route path="updatePlace/:placeId"  element={<UpdatePlace />} />
        <Route path="*" element={<Users />} />
      </Routes>
      </>
     );
  }

  else{
    routes = (
      <>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="auth" element={<Auth />} />
        <Route path="places/:userId" element={<UserPlaces />} />
        <Route path="*" element={<Auth />} />
      </Routes>
      </>
    );
  }

  return (
    <div className="App">
      <main>
      <MainNavigation />
      {routes}
      </main>
    </div>
  );
}

export default App;
