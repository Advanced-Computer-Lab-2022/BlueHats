import { useCorporateTraineesContext } from '../hooks/useCorporateTraineesContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

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
      <div className="corporateTrainee-profile">
        <h4>{corporateTrainee.name} </h4>
        <p><strong>Username: </strong>{corporateTrainee.username}</p>
        <p><strong>Password: </strong>{corporateTrainee.password}</p>
        <p>{corporateTrainee.createdAt}</p>
        <p>Added {formatDistanceToNow(new Date(corporateTrainee.createdAt), {addSuffix: true})}</p>
        <span className = "material-symbols-outlined" onClick={handleClick}>delete</span>
        <a className = "change password" href = "/corporateTrainee/changePassword">
                    change password
        </a>
      </div>
    )
  }
  
  export default CorporateTraineeDetails 