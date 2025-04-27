import { useState , useContext , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from "../Card/card.component";
import Button from "../Button/button.component";
import Modal from '../Modal/modal.component';
import { AuthContext } from "../../context/context";
import { UserContext } from "../../context/user-context";
import LoadingSpinner from '../LoadingSpinner/loadingSpinner';
import ErrorModal from '../ErrorModal/errorModal.component';
import "./placeItem.css";

const PlaceItem = (props) => {


  // console.log('is authorized ?' , props.isAuthorized);
  const [showDeleteModal , setShowDeleteModal] = useState(false);
  // console.log('delete Modal :' , showDeleteModal);

  const [isLoading , setIsLoading] = useState(false);

  const [showMap , setShowMap] = useState(false);

  const {login} = useContext(AuthContext);

  const {user , token} = useContext(UserContext);

  const [deleteSuccess , setDeleteSuccess] = useState(false);
  // console.log('delete success' , deleteSuccess);


  const navigate = useNavigate();

  const handleShowMap = () => { setShowMap(true); }

  const handleCancelMap = () => { setShowMap(false);}

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  }


  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    // console.log('place deleted !');


    fetch(`http://localhost:5000/api/places/delete-place/${props.id}` , {
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
        'Authorization':`Bearer ${token}`
      }
    }).
    then(res => res.json()).
    then(data => {
      // console.log('deletunf place' , data);
      setIsLoading(true);

      if (data?.success){
        // console.log('A');
        setDeleteSuccess(data?.success);
        setTimeout(() => {
          navigate(`/places/${user}`);
          props.onDelete(props.id);
        } , 4000);
      }

    }).
    catch(err => console.log('error :' , err));

    setIsLoading(false);

  }

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  }

  const onDelete = () => {
    setDeleteSuccess(false);
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


    <Modal  
       show={deleteSuccess} 
       onCancel={onDelete}
       header='SUCCESS'
      //  footer={<Button onClick={onDelete}>CLOSE</Button>}
       contentClass="place-item_modal-content" 
      >
      <p>place deleted successfully!</p>
    </Modal>

    {/* <Modal  
        show={!deleteSuccess && confirmDelete} 
        onCancel={errorHandler}
        header='ERROR'
        // footer={<Button onClick={onDelete}>CLOSE</Button>}
        contentClass="place-item_modal-content" 
      >
      <p className='text-red-600 font-semibold'>An unknown error occured , could not delete the place.</p>
    </Modal> */}
    


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
            {props.isAuthorized && <>
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
