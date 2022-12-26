import { useCoTraineesContext } from '../hooks/useCoTraineesContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Button,Box } from '@mui/material';

const CoTraineeDetails = ({ corporateTrainee }) => {
  const { dispatch } = useCoTraineesContext(); 
  
  const handleClick = async () => {
    const response = await fetch('/api/Cusers/' + corporateTrainee._id, {
      method: 'DELETE'
    })
    const json = await response.json();
    if(response.ok) {
     dispatch({type: 'DELETE_CORPORATETRAINEE', payload: json});
    }
  }

    return (
      <div className="course-details">
        <h4>{corporateTrainee.name}</h4>
        <p><strong>name: </strong>{corporateTrainee.fullName}</p>
        <p><strong>email: </strong>{corporateTrainee.email}</p>
        <p>{corporateTrainee.createdAt}</p>
        <p>Added {formatDistanceToNow(new Date(corporateTrainee.createdAt), {addSuffix: true})}</p>

        <Box sx={{marginBottom:2}}>
         <Button variant= "contained"
         onClick={() => window.location.href=`/availableCourses?corporateTraineeId=${corporateTrainee._id}`}
         margin="normal"
         padding="normal">
            Login
         </Button>
       </Box>
        
        
      </div>
     
  
    )
  }
  
  export default CoTraineeDetails 