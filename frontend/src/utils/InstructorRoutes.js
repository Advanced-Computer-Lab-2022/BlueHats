import { Outlet, Navigate } from 'react-router-dom';

const InstructorRoutes = () => {
    var loggedinUser = JSON.parse(localStorage.getItem('user'));
    const type = loggedinUser.type;

    return(
        type=="instructor"? <Outlet/> : <Navigate to="/"/>
    )
}

export default InstructorRoutes;