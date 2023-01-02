import { useAdminsContext } from '../hooks/useAdminsContext'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import * as React from 'react';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

const AdminDetails = ({ admin }) => 
{
  const { dispatch } = useAdminsContext();

  const handleClick = async () => 
  {
    const response = await fetch('/api/admin/' + admin._id, {
      method: 'DELETE'
    })
    const json = await response.json();

    if(response.ok) 
    {
     dispatch({type: 'DELETE_ADMIN', payload: json});
    }
  }

  return (
    <div className="admin-details">
        <h4>{admin.firstName} {admin.lastName}</h4>
        <span>{<PersonRemoveIcon onClick={handleClick} />}</span>
        <p>Added {formatDistanceToNow(new Date(admin.createdAt), {addSuffix: true})}</p>
        <p><strong>Username: </strong>{admin.username}</p>
        <p><strong>Email: </strong>{admin.email}</p>
    </div>
  )
  }
  
  export default AdminDetails 
