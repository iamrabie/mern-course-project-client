import Card from "../Card/card.component";
import Button from "../Button/button.component";
import Modal from '../Modal/modal.component';
import {useState} from 'react';
import ReactDOM from "react-dom";
import "./placeItem.css";

const PlaceItem = (props) => {

  const [showMap , setShowMap] = useState(false);

  const handleShowMap = () => {

    setShowMap(true);
  }

  const handleCancelMap = () => {

    setShowMap(false);
  }

  return (
    <>
    <Modal 
       show={showMap} 
       onCancel={handleCancelMap}
       header={props.address}
       contentClass="place-item_modal-content"
       footerClass="place-item_modal-actions"
       footer={<Button onClick={handleCancelMap}>CLOSE</Button>}
    >
      <div className="map-container">
         <h2>THE MAP!</h2>
      </div>
    </Modal>
      <li className="place-item" style={{listStyleType:'none'}}>
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={handleShowMap}>VIEW ON MAP</Button>
            <Button to={`/places/${props.id}`}>EDIT</Button>
            <Button danger>DELETE</Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
