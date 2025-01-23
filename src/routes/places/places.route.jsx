import { Outlet , useParams} from "react-router-dom";
import PlaceList from "../../components/places/placeList.component";

const UserPlaces = () => {

    const {userId} = useParams();
    console.log('user id from params :' , userId);

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
            title:'Empire State Building',
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
            id:'p2',
            title:'Empire State Building',
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


    let filteredPlaces = DUMMY_PLACES.filter(item => item.creator === userId);

    return(
        <>
        <h1>Places</h1>
        <div style={{width:"50%" , marginLeft:'auto' , marginRight:'auto'}}>
        <PlaceList items={filteredPlaces} />
        </div>
        <Outlet />
        </>
    );
}


export default UserPlaces;