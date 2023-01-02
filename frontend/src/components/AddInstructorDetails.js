import { useInstructorsContext } from '../hooks/useInstructorsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import * as React from 'react';

const AddInstructorDetails = ({ instructor }) => {
  const { dispatch } = useInstructorsContext(); 
  const handleClick = async () => {
    const response = await fetch('/api/instructor/' + instructor._id, {
      method: 'DELETE'
    })
    const json = await response.json();
    if(response.ok) {
     dispatch({type: 'DELETE_INSTRUCTOR', payload: json});
    }
  }

    return (
      <div className="addInstructor-details">
        <h4>{instructor.firstName} {instructor.lastName}</h4> 
        <span>{<PersonRemoveIcon onClick={handleClick} />}</span>
        {/* <p>Added {formatDistanceToNow(new Date(instructor.createdAt), {addSuffix: true})}</p> */}
        <p><strong>Username: </strong>{instructor.username}</p>
        <p><strong>Email: </strong>{instructor.email}</p>
        <p><strong>Biography: </strong>{instructor.biography}</p>
    </div>
    )
  }
  
  export default AddInstructorDetails 