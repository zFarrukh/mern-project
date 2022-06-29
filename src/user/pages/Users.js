import React from 'react';

import UsersList from '../components/UsersList';

function Users() {
  const USERS = [
    { id: 1, image: 'url', name: 'John', places: 3 },
    { id: 2, image: 'url', name: 'Sara', places: 4 },
  ];

  return <UsersList items={USERS} />;
}

export default Users;
