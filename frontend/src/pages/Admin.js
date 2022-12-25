import { useEffect } from "react"

// components
import AdminDetails from "../components/AdminDetails"
import AdminForm from "../components/AdminForm"

import { useAdminsContext } from "../hooks/useAdminsContext"

const Admin = () => {
  const { admins, dispatch } = useAdminsContext()
  //const [admins, setAdmins] = useState(null)
  useEffect(() => {
    const fetchAdmins = async () => {
      const response = await fetch('/api/admin')
      const json = await response.json()

      if (response.ok) {
        //setAdmins(json)
        dispatch({type: 'SET_ADMINS', payload: json})
      }
    }

    fetchAdmins()
 // }, [])
}, [dispatch])

  return (
    <div className="admin">
      <div className="admins">
        {admins && admins.map(admin => (
          <AdminDetails admin={admin} key={admin._id} />
        ))}
      </div>
      <AdminForm />
    </div>
  )
}
export default Admin