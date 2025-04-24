import Avatar from "../../Avatar/avatar.component";
import Card from "../../Card/card.component";
import { Link } from "react-router-dom";
import "./userItem.css";

const UserItem = ({ id, name, image, placeCount }) => {
  return (
    <>
      <li className="user-item">
        <Card className="user-item__content">
          <Link to={placeCount == 0 ? '/' : `/places/${id}`}>
            <div className="user-item__image">
              <Avatar name={name} alt={name} image={image} />
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
