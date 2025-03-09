import UsersList from '../../components/users/userList/usersList.component';

const Users = () => {

    const users = [
        {id:'u1' , name:"Max Shawarz" , image:"https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?b=1&s=612x612&w=0&k=20&c=hEPh7-WEAqHTHdQtPrfEN9-yYCiPGKvD32VZ5lcL6SU=" , places:1},
        {id:'u2' , name:"Usman Asif" , image:"https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?b=1&s=612x612&w=0&k=20&c=hEPh7-WEAqHTHdQtPrfEN9-yYCiPGKvD32VZ5lcL6SU=" , places:1}
    ];

    return(
        <>
        <div>
         <UsersList users={users} />
        </div>
        </>
       
    );
}


export default Users;