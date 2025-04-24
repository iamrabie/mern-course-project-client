import { useContext , useEffect } from "react";

import { AuthContext } from "../../context/context";
import PlaceItem from "./placeItem.component";
import Card from "../Card/card.component";
import Button from "../Button/button.component";
import { UserContext } from "../../context/user-context";
import "./placeList.css";


const PlaceList = (props) => {

  const {user} = useContext(UserContext);

  const {login} = useContext(AuthContext);


  // if (props?.items?.length == 0 || props?.items == undefined) {
  //   return (
  //     <Card>
  //     <div className="center flex flex-col gap-y-3">
  //       <p className="font-bold text-2xl"> no place found</p>
  //       <Button to="/place/new">Share Place</Button>
  //     </div>
  //     </Card>
  //   );
  // }


  return (
    <>
      {props?.items?.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          address={place.address}
          description={place.description}
          creatorId={place.creator}
          coordinates={place.location}
          isAuthorized={place.creator == user}
          onDelete={props.onDelete}
        />
      ))}
    </>
  );
};

export default PlaceList;
