import { useRequestsContext } from '../hooks/useRequestsContext'
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

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
        <p><strong>User: </strong>{RequestCourse.corporateTraineeName}</p>
        <p><strong>Highest level of education: </strong>{RequestCourse.highestLevelOfEducation}</p>
        <p><strong>Employment status: </strong>{RequestCourse.employmentStatus}</p>
        <p><strong>Reason: </strong>{RequestCourse.reason}</p>
        <p>Added {formatDistanceToNow(new Date(RequestCourse.createdAt), {addSuffix: true})}</p>
        <div><span className='accept' onClick={handleClick1}>accept</span></div>
       <div><span className='reject' onClick={handleClick2}>reject</span></div>
      </div>
    )
  }
  
  export default RequestDetails;