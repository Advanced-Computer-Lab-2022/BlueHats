import { useRequestsStatusContext } from '../hooks/useRequestsStatusContext'
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const MyRequestsStatus = ({ MyRequests }) => {
  const { dispatch } = useRequestsStatusContext();



    return (
      <div className="request-details">
          <h4>{MyRequests.courseName}</h4>
          <p><strong>Status: </strong>{MyRequests.status}</p>
      </div>
    )
  }
  
  export default MyRequestsStatus;