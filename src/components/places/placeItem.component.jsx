import Card from "../Card/card.component";
import Button from "../Button/button.component";
import Modal from '../Modal/modal.component';
import { AuthContext } from "../../context/context";
import { useState , useContext } from 'react';
import "./placeItem.css";

const PlaceItem = (props) => {


  const [showDeleteModal , setShowDeleteModal] = useState(false);
  // console.log('delete Modal :' , showDeleteModal);

  const [showMap , setShowMap] = useState(false);

  const {login} = useContext(AuthContext);

  const handleShowMap = () => { setShowMap(true); }

  const handleCancelMap = () => { setShowMap(false);}

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  }


  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    console.log('place deleted !');
  }

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
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

    <Modal 
       show={showDeleteModal} 
       onCancel={handleCancelDelete}
       header="Delete Place?"
      //  contentClass="place-item_modal-content"
       footerClass="place-item_modal-actions"
       footer={
        <>
        <Button inverse onClick={handleCancelDelete}>CANCEL</Button>
        <Button danger onClick={handleConfirmDelete}>DELETE</Button>
       </>}
    >
      <p>Are you sure you want to delete?</p>
      <p>NOTE : This action can not be reversed.</p>
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
            {login && <>
              <Button to={`/updatePlace/${props.id}`}>EDIT</Button>
              <Button danger onClick={handleShowDeleteModal}>DELETE</Button>
            </>}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
