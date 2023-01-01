import { useRequestsContext } from '../hooks/useRequestsContext'
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const RequestDetails = ({ RequestCourse }) => {
  const { dispatch } = useRequestsContext();

  const handleClick1 = async () => {
    const response = await fetch('/api/requestCourse/accept/' + RequestCourse._id, {
      method: 'DELETE'
    })
    const json = await response.json();

    if(response.ok) {
      dispatch({type: 'HANDLE_REQUEST', payload: json});
    }
  }

  const handleClick2 = async () => {
    const response = await fetch('/api/requestCourse/reject/' + RequestCourse._id, {
      method: 'DELETE'
    })
    const json = await response.json();

    if(response.ok) {
      dispatch({type: 'HANDLE_REQUEST', payload: json});
    }
  }



    return (
      <div className="request-details">
        <h4>{RequestCourse.courseName}</h4>
        <p><strong>•username: </strong>{RequestCourse.corporateTraineeName}</p>
        <p><strong>•Highest level of education: </strong>{RequestCourse.highestLevelOfEducation}</p>
        <p><strong>•Employment status: </strong>{RequestCourse.employmentStatus}</p>
        <p><strong>•Reason: </strong>{RequestCourse.reason}</p>
        <p><strong>•{RequestCourse.agreedToPolicy}</strong></p>
        <p>Added {formatDistanceToNow(new Date(RequestCourse.createdAt), {addSuffix: true})}</p>
      
        <button className='accept' onClick={handleClick1}><CheckIcon/></button>
       <button className='reject' onClick={handleClick2}><CloseIcon/></button>
      </div>
    )
  }
  
  export default RequestDetails;