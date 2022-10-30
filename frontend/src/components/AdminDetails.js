import { useAdminsContext } from '../hooks/useAdminsContext'
const AdminDetails = ({ admin }) => {
const { dispatch } = useAdminsContext(); /*commented*/
  const handleClick = async () => {
    const response = await fetch('/api/admin/' + admin._id, {
      method: 'DELETE'
    })
    const json = await response.json();

    if(response.ok) {
     dispatch({type: 'DELETE_ADMIN', payload: json});
    }
  }
  // 
    return (
      <div className="admin-details">
        <h4>{admin.name}</h4>
        <p><strong>Username: </strong>{admin.username}</p>
        <p><strong>Password: </strong>{admin.password}</p>
        <p>{admin.createdAt}</p>
        <span onClick={handleClick}>delete</span>
      </div>
    )
  }
  
  export default AdminDetails 