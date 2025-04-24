import { useRef, useState, useEffect } from "react";

import Button from "../Button/button.component";
import "./imageUpload.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState(null);
  console.log("picked file :", file);
  const [isValid, setIsValid] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  // console.log('previewed url' , previewUrl);
  const fileUploadRef = useRef();
  // console.log('props from image upload comp' , props);

  useEffect(() => {

    if (!file) {
       console.log('no file chosen');
      return;
    }

    //reads file from binary to readable form
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      // console.log('img' , event.target.result);
      setPreviewUrl(event.target.result);
    };

    //reading the file into url form
    fileReader.readAsDataURL(file);
    // console.log('read file ' , readFile);

  }, [file]);


  const handleImagePicker = () => {
    fileUploadRef.current.click();
  };

  const handleImage = (event) => {

    let fileIsValid = isValid;
    let chosenFile;
    if (event.target.files && event.target.files.length === 1) {
      console.log("true");
      chosenFile = event.target.files[0];
      console.log("chosen file :", file);
      setFile(chosenFile);
      setIsValid(true);
      fileIsValid = true;

    } else {
      console.log('false');
      setIsValid(false);
      fileIsValid = false;

    }
    props.onInput(props.id , chosenFile , fileIsValid);


    // props.image(event.target.files[0]);

  };

  return (
    <>
      <div className="form-control">
        <input
          id={props.id}
          type="file"
          style={{ display: "none" }}
          accept=".jpg , .png, .jpeg"
          ref={fileUploadRef}
          onChange={handleImage}
        />
        <div className={`image-upload ${props.center && "center"}`}>
          <div className="image-upload_preview">
            {previewUrl && <img src={previewUrl} alt="Preview" />}
            {!previewUrl && <p>Please pick an image</p>}
          </div>
          <Button type="button" onClick={handleImagePicker}>
            PICK IMAGE
          </Button>
        </div>

        {/* {!isValid && <p className="text-red-400 text-sm">{props.error}</p>} */}
      </div>
    </>
  );
};

export default ImageUpload;
