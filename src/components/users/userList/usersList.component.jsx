import { Link } from "react-router-dom";

import UserItem from "../userItem/userItem.component";
import Card from "../../Card/card.component";
import Button from "../../Button/button.component";
import "./userList.css";


const UsersList = (props) => {
  // console.log('props' , props.users);
  if (props?.users?.length == 0) {
    return (
      <Card>
        <div className="center flex flex-col gap-y-3">
          <p className="font-bold text-2xl">Users not found</p>
          <Button to="/place/new">Share Place</Button>
        </div>
      </Card>
    );
  }

  return (
    <>
      <ul className="users-list">
        {props.users.map(
          (item, i) => (
            // <Link to={`places/${item.creator}`}>
            <UserItem
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              placeCount={item.places.length}
              email={item.email}
            />
          )
          // </Link>
        )}
      </ul>
    </>
  );
};

export default UsersList;
