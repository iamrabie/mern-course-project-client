const UserItem = ({id , name , image , placeCount}) => {

    console.log('id :' ,  id , "name : " , name , "image : " , image , "placesCount : " ,  placeCount);
    
    return(
        <>
        <li className="user-item">
            <div className="user-item__content">
                <div className="user-item__image">
                  <img src={image} alt={name} />
                </div>
                <div className="user-item__info">
                   <h2>{name}</h2>
                   <h3>{placeCount}{placeCount > 1 ? ' places' : ' place'}</h3>
                </div>
            </div>
        </li>
        </>
    );
}


export default UserItem;