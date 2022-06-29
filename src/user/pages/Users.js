import React from 'react';

import UsersList from '../components/UsersList';

function Users() {
  const USERS = [
    {
      id: 1,
      image:
        'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg',
      name: 'John',
      places: 3,
    },
    {
      id: 2,
      image:
        'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg',
      name: 'Sara',
      places: 4,
    },
  ];

  return <UsersList items={USERS} />;
}

export default Users;
