import { Outlet, Navigate } from 'react-router-dom';

const AdminRoutes = () => {
    var loggedinUser = JSON.parse(localStorage.getItem('user'));
    const type = loggedinUser.type;

    return(
        type=="admin"? <Outlet/> : <Navigate to="/"/>
    )
}

export default AdminRoutes;