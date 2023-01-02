import axios from 'axios';
import Box from '@mui/material/Box';
import React, {useState, useEffect, useRef} from 'react';
import 'react-dropdown/style.css';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import Loader from '../components/Loader';
import ProblemList from '../components/ProblemList'
import AdminMenu from '../components/AdminMenu';


 
function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
  
    return (
      
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  
    
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  
const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

const AdminPage = () => {
    const params = new URLSearchParams(window.location.search);
    const [problems, setProblems] = useState([]);
    const [loading,setLoading] = useState(true);
    const [flag,setFlag] = useState(false);

      useEffect(() =>  {
        //console.log(title)
        setLoading(true)
        setFlag(false)
        axios({
        method: "GET",
        url : '/api/problem/'
        }).then(
        (res) => { 
          setTimeout(()=>{
            setLoading(false)
          }, 1000)
        const problems = res.data
        console.log(problems)
        setProblems(problems)  
        if(problems!=[])
            {
            console.log(problems)
            setFlag(true)
            }
        
        }
        );    
  
     },[])

    return(
      <>
      {loading && <Loader/>}
{ !loading && <AdminMenu/>}
        <div className="reportView">
        {!loading && flag==true && problems.length!=0 &&(problems.map(prb => 
         
           <ProblemList prb={prb} key={prb._id}/>
      ))}
        </div>
        </>
    )
}
export default AdminPage; 