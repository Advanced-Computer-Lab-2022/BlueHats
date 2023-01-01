//import { useEffect } from "react"
import { useRequestsStatusContext } from "../hooks/useRequestsStatusContext"

// components
import MyRequestsStatus from "../components/MyRequestsStatus"


import { useEffect } from "react"

const ViewMyRequestsStatus = () => {
 const {requestsstatus, dispatch} = useRequestsStatusContext()

    // fetch all courses
    useEffect(() => {
      const fetchMyRequests = async () => {
        
        //  var loggedinUser = JSON.parse(localStorage.getItem('user'));
        //  const savedID = loggedinUser.id
        //  const response = await fetch(`/api/requeststatus/viewrequests/${savedID}`)

        const response = await fetch('/api/requeststatus/viewrequests/63a756e189cc94e7139e239c')
        const json = await response.json()
        if (response.ok) {
          dispatch({type: 'SET_REQUESTS', payload: json})
        }
      }
  
      fetchMyRequests()
    }, [dispatch])

  
  return (
      <div >
           <div >
        {requestsstatus && requestsstatus.map(requeststatus => (
          <MyRequestsStatus MyRequests={requeststatus} key={requeststatus._id} />
        ))}
      </div>
      </div>
      
  )

}

export default ViewMyRequestsStatus