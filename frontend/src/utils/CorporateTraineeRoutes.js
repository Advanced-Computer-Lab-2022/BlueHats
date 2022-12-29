import { Outlet, Navigate } from 'react-router-dom';

const CorporateTraineeRoutes = () => {
    var loggedinUser = JSON.parse(localStorage.getItem('user'));
    const type = loggedinUser.type;

    return(
        type=="coTrainee"? <Outlet/> : <Navigate to="/"/>
    )
}

export default CorporateTraineeRoutes;