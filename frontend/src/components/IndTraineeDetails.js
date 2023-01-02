import { useIndTraineesContext} from '../hooks/useIndTraineesContext'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import * as React from 'react';

const IndTraineesDetails = ({ indTrainee }) => {
  const { dispatch } = useIndTraineesContext(); 
  const handleClick = async () => {
    const response = await fetch('/api/indTrainee/' + indTrainee._id, {
      method: 'DELETE'
    })
    const json = await response.json();
    if(response.ok) {
     dispatch({type: 'DELETE_INDTRAINEE', payload: json});
    }
  }

    return (
      <div className="indTrainees-details">
        <h4>{indTrainee.firstName} {indTrainee.lastName}</h4> 
        <span>{<PersonRemoveIcon onClick={handleClick} />}</span>
        <p>Added {formatDistanceToNow(new Date(indTrainee.createdAt), {addSuffix: true})}</p>
        <p><strong>Username: </strong>{indTrainee.username}</p>
        <p><strong>Email: </strong>{indTrainee.email}</p>
    </div>
    )
  }
  
  export default IndTraineesDetails 