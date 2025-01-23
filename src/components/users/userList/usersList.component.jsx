import UserItem from "../userItem/userItem.component";
import { Link } from "react-router-dom";
import './userList.css';


const UsersList = (props) => {

    console.log('props' , props.users);
    if (props.users.length === 0){
        return <h2>Users not found</h2>
    }

    else{
        return (
            <>
            <ul className="users-list">
            {props.users.map((item , i) => 
            // <Link to={`places/${item.creator}`}>
              <UserItem key={i} id={item.id} name={item.name} image={item.image} placeCount={item.places} />
            // </Link>
            )}
            </ul>
            </>
        );
    }
   
}


export default UsersList;