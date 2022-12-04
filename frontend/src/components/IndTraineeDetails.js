import { useIndTraineesContext } from '../hooks/useIndTraineesContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useState } from 'react'

const IndTraineeDetails = ({ indTrainee }) => {
  const [id, setID] = useState(null)
  const { dispatch } = useIndTraineesContext(); 
  // const handleClick = async () => {
  //   const response = await fetch('/api/indTrainee/' + indTrainee._id, {
  //     method: 'DELETE'
  //   })
  //   const json = await response.json();
  //   if(response.ok) {
  //    dispatch({type: 'DELETE_INDTRAINEE', payload: json}); 
  //   }


  // const handleUpdate = async () => {
  //   const response = await fetch('/api/indTrainee/' + indTrainee._id, {
  //     method: 'Update'
  //   })
  //   const json = await response.json();
  //   if(response.ok) {
  //    dispatch({type: 'UPDATE_INDTRAINEE', payload: json}); 
  //   }
  // }

//   const handleUpdate = async () => {
//       const response = await fetch('/api/indTrainee/' + indTrainee._id, {
//         method: ' GET'
//       })
//       const json = await response.json();
//       if(response.ok) {
//        dispatch({type: 'SET_INDTRAINEE', payload: json}); 
//       }
//     }

    return (
      <div className="indTrainee-details">
        <h4>{indTrainee.firstName}</h4>
        <h4>{indTrainee.secondName}</h4>
        <p><strong>Email: </strong>{indTrainee.email}</p>
        {/* <p><strong>Password: </strong>{indTrainee.password}</p> */}
        <p>{indTrainee.createdAt}</p>
        <p>Added {formatDistanceToNow(new Date(indTrainee.createdAt), {addSuffix: true})}</p>
        {/* <span className = "material-symbols-outlined" onClick={handleClick}>delete</span>  */}
        {/* <span className = "material-symbols-outlined" onClick={handleUpdate}>update</span> */}
        <a className = "Change Password" href = "/indTrainee/changePassword">
                    Change password
        </a>
      </div>
    )
  }
  
  export default IndTraineeDetails 