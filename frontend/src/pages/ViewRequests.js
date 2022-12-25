//import { useEffect } from "react"
import { useRequestsContext } from "../hooks/useRequestsContext"

// components
import RequestDetails from "../components/RequestDetails"


import { useEffect } from "react"

const ViewRequests = () => {
 const {requests, dispatch} = useRequestsContext()

    // fetch all courses
    useEffect(() => {
      const fetchRequests = async () => {
        const response = await fetch('/api/requestCourse')
        const json = await response.json()
  
        if (response.ok) {
          dispatch({type: 'SET_REQUESTS', payload: json})
        }
      }
  
      fetchRequests()
    }, [dispatch])

  
  return (
      <div >
        <div>
        {requests && requests.map(RequestCourse => (
          <RequestDetails RequestCourse={RequestCourse} key={RequestCourse._id} />
        ))}
      </div>
      </div>
      
  )

}

export default ViewRequests