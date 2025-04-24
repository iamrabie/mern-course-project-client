import { Outlet, useParams , useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";

import PlaceList from "../../components/places/placeList.component";
import LoadingSpinner from "../../components/LoadingSpinner/loadingSpinner";
import ErrorModal from "../../components/ErrorModal/errorModal.component";

const UserPlaces = () => {

  const { userId } = useParams();
  // console.log('user id from params :' , userId);
  const [places, setPlaces] = useState([]);
  const [isLoading , setIsLoading] = useState(true);
  const [error, setError] = useState('');
  // console.log('errrrr:::::::::::' , error);
  const navigate = useNavigate();

  useEffect(() => {
    getPlacesByUserId();
  }, []);


  const getPlacesByUserId = () => {
    fetch(`http://localhost:5000/api/places/user/${userId}`)
    .then((res) => res.json())
    .then((data) => {
      setPlaces(data.data);
      // console.log(data);
      setIsLoading(false);
      if (!data.success) {
        setError(data.message);
        setTimeout(() => {
           navigate('/');
        },3000);
      }
    });
    // .catch((err) => console.log("errr:", err));
  }

  const errorHandler = () => {
    setError(null);
  }


  const handleDeletedPlace = (deletedPlaceId) => {

    const filterPlaces = places.filter(p => p.id != deletedPlaceId);
    // console.log('filter deleted place' , filterPlaces);
    setPlaces(filterPlaces);
    // setPlaces(prev => prev.filter(places.id != deletedPlaceId));
    
  }


  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <div style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}>
        <PlaceList items={places}  onDelete={handleDeletedPlace} /* items={filteredPlaces} */ />
      </div>
      {/* <ErrorModal error={error} onClear={errorHandler} /> */}
      <Outlet />
    </>
  );
};

export default UserPlaces;

// const DUMMY_PLACES = [
//     {
//         id:'p1',
//         title:'Empire State Building11',
//         description:'One of the famous sky scrappers in the world!',
//         imageUrl:'https://thechatwalny.agencydominion.net/uploads/2024/06/Empire-State-Building-1200x630.jpg',
//         address:'24 W 34th St, New York , NY 10001',
//         location:{
//             lat:40.7484405,
//             lng:-73.9878584
//         },
//         creator:'67dd448337e2fdbd1e46c907'
//     },
//     {
//         id:'p2',
//         title:'United Arab Emirates',
//         description:'One of the famous sky scrappers in the world ..!',
//         imageUrl:'https://thechatwalny.agencydominion.net/uploads/2024/06/Empire-State-Building-1200x630.jpg',
//         address:'24 W 34th St, New York , NY 10001',
//         location:{
//             lat:40.7484405,
//             lng:-73.9878584
//         },
//         creator:'u2'
//     },
//     {
//         id:'p3',
//         title:'United Kingdom',
//         description:'One of the famous sky scrappers in the world ..!',
//         imageUrl:'https://thechatwalny.agencydominion.net/uploads/2024/06/Empire-State-Building-1200x630.jpg',
//         address:'24 W 34th St, New York , NY 10001',
//         location:{
//             lat:40.7484405,
//             lng:-73.9878584
//         },
//         creator:'u2'
//     },

// ];

// let filteredPlaces = DUMMY_PLACES.filter(item => item.creator === userId);
