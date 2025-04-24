import { useState, useEffect } from "react";

import UsersList from "../../components/users/userList/usersList.component";
import LoadingSpinner from "../../components/LoadingSpinner/loadingSpinner";

const Users = () => {
  const [users, setUsers] = useState([]);
  // console.log('users ,' , users);
  const [isLoading , setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/users/")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
        setIsLoading(false);
      })
      .catch((err) => console.log("ERROR MESSAGE :", err));
  }, []);

  return (
    <>
      <div>
        {!isLoading && users && <UsersList users={users} /> }
      </div>
      {isLoading && <LoadingSpinner asOverlay />}
    </>
  );
};

export default Users;

// const users = [
//     {id:'u1' , name:"Max Shawarz" , image:"https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?b=1&s=612x612&w=0&k=20&c=hEPh7-WEAqHTHdQtPrfEN9-yYCiPGKvD32VZ5lcL6SU=" , places:1},
//     {id:'u2' , name:"Usman Asif" , image:"https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?b=1&s=612x612&w=0&k=20&c=hEPh7-WEAqHTHdQtPrfEN9-yYCiPGKvD32VZ5lcL6SU=" , places:1}
// ];
