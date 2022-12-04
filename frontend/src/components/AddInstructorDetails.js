import { useInstructorsContext } from '../hooks/useInstructorsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

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
        <h4>{instructor.name}</h4>
        <p><strong>Username: </strong>{instructor.username}</p>
        <p><strong>Email: </strong>{instructor.email}</p>
        {/* <p><strong>Password: </strong>{instructor.password}</p> */}
        <p><strong>Biography: </strong>{instructor.biography}</p>
        <p>{instructor.createdAt}</p>
        <p>Added {formatDistanceToNow(new Date(instructor.createdAt), {addSuffix: true})}</p>
        <a className = "Edit email" href = "/instructor/changeEmail">
                    Edit my email
        </a>
        <br/>
        <a className = "Edit biography" href = "/instructor/editBiography">
                    Edit my biography
        </a>
        <br/>
        <a className = "Change Password" href = "/instructor/changePassword">
                    Change password
        </a>
      </div>
    )
  }
  
  export default AddInstructorDetails 