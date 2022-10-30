import { useInstructorsContext } from '../hooks/useInstContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const InstructorDetails = ({ Instructor }) => {
  const { dispatch } = useInstructorsContext();

  const handleClick = async () => {
    const response = await fetch('/api/instructors/' + Instructor._id, {
      method: 'DELETE'
    })
    const json = await response.json();

    if(response.ok) {
      dispatch({type: 'DELETE_INSTRUCTOR', payload: json});
    }
  }

  
  



    return (
      <div className="instructor-details">
        <h4>{Instructor.name}</h4>
        <p><strong>Email: </strong>{Instructor.email}</p>
        <p><strong>Telephone Number: </strong>{Instructor.telephoneNumber}</p>
        <p>Added {formatDistanceToNow(new Date(Instructor.createdAt), {addSuffix: true})}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
      </div>
    )
  }
  
  export default InstructorDetails;