//import { useEffect } from "react"
import { useRequestsStatusContext } from "../hooks/useRequestsStatusContext"

// components
import MyRequestsStatus from "../components/MyRequestsStatus"


import { useEffect, useState} from "react"
import axios from "axios"

const ViewMyRequestsStatus = () => {
 const {requestsstatus, dispatch} = useRequestsStatusContext()
 const params = new URLSearchParams(window.location.search);
 const corporateTraineeId = params.get('corporateTraineeId');
    // fetch all courses
    useEffect(() => {
      const fetchMyRequests = async () => {
        
        const response = await fetch(`/api/requeststatus/viewrequests/${corporateTraineeId}`)
        const json = await response.json()
        if (response.ok) {
          dispatch({type: 'SET_REQUESTS', payload: json})
        }
      }
  
      fetchMyRequests()
    }, [dispatch])

// var loggedinUser = JSON.parse(localStorage.getItem('user'));
// const savedID = loggedinUser.id
// const [requestsstatus, setRequestsstatus] = useState([]);

// useEffect(() => {
//   const data = {userID: savedID};
//   axios({
//     method: "PUT",
//     url: `/api/requeststatus/viewrequests`,
//     data: data,
//     headers: {'Content-Type': 'application/json'}
//   }).then(
//     (res) => {
//       const requests = res.data
//       setRequestsstatus(requests)
//     }
//   )
// },[savedID])
// console.log(requestsstatus)

  
  return (
      <div >
        <h2>My Requests</h2>
           <div >
        {requestsstatus && requestsstatus.map(requeststatus => (
          <MyRequestsStatus MyRequests={requeststatus} key={requeststatus._id} />
        ))}
      </div>
      </div>
      
  )

}

export default ViewMyRequestsStatus