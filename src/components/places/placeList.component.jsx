import PlaceItem from "./placeItem.component";
import Card from "../Card/card.component";
import "./placeList.css";

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <Card>
      <div>
        <p>no places found.</p>
      </div>
      </Card>
    );
  }

  return (
    <>
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          address={place.address}
          description={place.description}
          creatorId={place.creator}
          coordinates={place.location}
        />
      ))}
    </>
  );
};

export default PlaceList;
