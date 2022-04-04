//ejercicio3
import React from "react";

//importamos lista de usuarios.
import UserList from '../components/UsersList/UsersList.js';

const Users = () => {
    const USERS = [
        {
            id: 'u1',
            name: 'Elden Ring',
            image: 'https://c.opencritic.com/cdn-cgi/image/h=625,w=1110,fit=cover,q=85,f=auto/images/games/12090/UOYZdhZnhnGBEunRxdizZVYa9tJZlcVOumyer6craKx3ESOA.jpg',
            info: 'Elden Ring is FromSoftware´s best work yet and one of the highest rated games of all time. With refined, accessible, and satisfying combat in a vast, beautiful, and intriguing open world, players will find a lot to love'
        }

    ]

    return(
        <UserList items={USERS} />
    );
}

export default Users;