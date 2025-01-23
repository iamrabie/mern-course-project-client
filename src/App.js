import { Routes , Route } from "react-router-dom";
import Users from "./routes/users/users.route";
import UserPlaces from "./routes/places/places.route";
import NewPlace from "./routes/places/newPlace.route";
import MainNavigation from "./components/MainNavigation/mainNavigation.component";
import Auth from "./routes/auth/auth.component";
import PlaceList from "./components/places/placeList.component";

function App() {
  return (
    <div className="App">
      <main>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="place/new" element={<NewPlace />} />
        <Route path="places/:userId" element={<UserPlaces />} />
        <Route path="auth" element={<Auth />} />
        <Route path="*" element={<Users />} />
      </Routes>
      </main>
    </div>
  );
}

export default App;
