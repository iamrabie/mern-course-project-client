import { Routes , Route } from "react-router-dom";
import Users from "./routes/users/users.route";
import Places from "./routes/places/places.route";
import NewPlace from "./routes/places/newPlace.route";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/places" element={<Places />}>
          <Route path="new" element={<NewPlace />} /> 
        </Route>
        <Route path="*" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
