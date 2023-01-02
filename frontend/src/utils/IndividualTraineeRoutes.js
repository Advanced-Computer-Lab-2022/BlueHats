import { Outlet, Navigate } from 'react-router-dom';

const IndividualTraineeRoutes = () => {
    var loggedinUser = JSON.parse(localStorage.getItem('user'));
    const type = loggedinUser.type;

    return(
        type==="indTrainee"? <Outlet/> : <Navigate to="/"/>
    )
}

export default IndividualTraineeRoutes;