import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    var loggedinUser = JSON.parse(localStorage.getItem('user'));

    return(
        loggedinUser? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes;