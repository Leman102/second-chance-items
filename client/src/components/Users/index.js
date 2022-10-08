import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import spinner from '../../assets/spinner.gif';
import { QUERY_ALL_USERS, QUERY_USER } from '../../utils/queries';

function UserList() {
  

  const { loading, data } = useQuery(QUERY_ALL_USERS);
  const users = data?.users || [];
  console.log(users, "userData" );
  if(!users.length) {
    return <h3>No Users Yet</h3>;
  }

  return (
    <div className="my-2">
      <h2>Our Users:</h2>
      { users && users.map( user => (
        <div key={user._id} className="card mb-3">
          <h4>{user.email}</h4>
          <h5>{user.username}</h5>
        </div>
      ))}
        <div>
          <>
          </>
        </div>
      
      <div>{loading ? <img src={spinner} alt="loading" 
      /> : null} </div>
    </div>
  );
}

export default UserList;