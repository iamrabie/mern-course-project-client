import PlaceItem from "./placeItem.component";
import Card from "../Card/card.component";
import Button from "../Button/button.component";
import "./placeList.css";

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <Card>
      <div className="center flex flex-col gap-y-3">
        <p className="font-bold text-2xl">no places found</p>
        <Button to="/place/new">Share Place</Button>
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
