import { useCorporateTraineesContext } from '../hooks/useCorporateTraineesContext'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import * as React from 'react';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

const CorporateTraineeDetails = ({ corporateTrainee }) => {
  const { dispatch } = useCorporateTraineesContext(); 
  const handleClick = async () => {
    const response = await fetch('/api/corporateTrainee/' + corporateTrainee._id, {
      method: 'DELETE'
    })
    const json = await response.json();
    if(response.ok) {
     dispatch({type: 'DELETE_CORPORATETRAINEE', payload: json});
    }
  }

    return (
      <div className="corporateTrainee-details">
       <h4>{corporateTrainee.firstName} {corporateTrainee.lastName}</h4>
        <span>{<PersonRemoveIcon onClick={handleClick} />}</span>
        <p>Added {formatDistanceToNow(new Date(corporateTrainee.createdAt), {addSuffix: true})}</p>
        <p><strong>Username: </strong>{corporateTrainee.username}</p>
        <p><strong>Email: </strong>{corporateTrainee.email}</p>
        <p><strong>Corporate: </strong>{corporateTrainee.corporate}</p>
      </div>
    )
  }
  
  export default CorporateTraineeDetails 