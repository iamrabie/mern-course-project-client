import React from 'react';
import Modal from 'react-modal';

import Button from '../Button/button.component';
import '../places/placeItem.css';


const ErrorModal = props => {
  return (
    <Modal
      onRequestClose={props.onClear}
      header="An Error Occurred!"
      isOpen={!!props.error}
      footerClass="place-item_modal-actions"
      footer={<Button onClick={props.onClear}>Okay</Button>}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)", // Dark overlay
        },
        content: {
          width: "28%",
          margin: "auto",
          height:"20%",
          padding: "20px",
          borderRadius: "8px",
          backgroundColor:"#ffe6e6",
        },
      }}
    >
      <p className='text-lg font-semibold text-red-600'>{props.error}</p>
    </Modal>

  );
};

export default ErrorModal;
