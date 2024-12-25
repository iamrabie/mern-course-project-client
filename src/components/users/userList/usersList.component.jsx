import UserItem from "../userItem/userItem.component";

const UsersList = (props) => {

    // console.log('props' , props.users);
    if (props.users.length === 0){
        return <h2>Users not found</h2>
    }

    else{
        return (
            <>
            <ul className="user-list">
            {props.users.map((item) => 
              <UserItem id={item.id} name={item.name} image={item.image} placeCount={item.places} />
            )}
            </ul>
            </>
        );
    }
   
}


export default UsersList;