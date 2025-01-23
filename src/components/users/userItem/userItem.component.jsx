import Avatar from "../../Avatar/avatar.component";
import Card from "../../Card/card.component";
import { Link } from "react-router-dom";
import "./userItem.css";

const UserItem = ({ id, name, image, placeCount }) => {
//   console.log(
//     "id :",
//     id,
//     "name : ",
//     name,
//     "image : ",
//     image,
//     "placesCount : ",
//     placeCount
//   );

  return (
    <>
      <li className="user-item">
          <Card className="user-item__content">
            <Link to={`/places/${id}`}>
              <div className="user-item__image">
                <Avatar name={name} alt={name} />
              </div>
              <div className="user-item__info">
                <h2>{name}</h2>
                <h3>
                  {placeCount}
                  {placeCount > 1 ? " places" : " place"}
                </h3>
              </div>
            </Link>
          </Card>
      </li>
    </>
  );
};

export default UserItem;
