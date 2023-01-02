import axios from 'axios';
import Box from '@mui/material/Box';
import React, {useState, useEffect, useRef} from 'react';
import 'react-dropdown/style.css';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogActions from '@mui/material/DialogActions';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const ariaLabel = { 'aria-label': 'description' };



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

 
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

const ProblemList = ({prb}) => {
    const params = new URLSearchParams(window.location.search);
    const [problems, setProblems] = useState([]);
    const [loading,setLoading] = useState(true);
    const [flag,setFlag] = useState(false);
    const [resolve,setResolve] = useState(false);
    const [update,setUpdate] = useState(false);
    const [temp, setTemp] = useState(false);
    const [stat, setStat] = useState(false);
    const [title,setTitle] = useState('');
    const [idT ,setId] = useState();
    const [open, setOpen] = React.useState(false);
    // const [first,setFirst] = useState(true);
    const [click,setClick] = useState(false);
   


   
   
  
      useEffect(() =>  {
       
        setLoading(true)
        setFlag(false)
        if(idT!=null)
       { 
        if(temp){
            axios({
                method: "PUT",
                url : `/api/problem/updateStatus/${idT}`
            }).then(()=>{
              window.location.href=`/adminPage`
            })
            setTemp(false);
        }
        if(stat){
            axios({
                method: "PUT",
                url : `/api/problem/addResponse/${idT}/${title}`
            }).then(()=>{
              window.location.href=`/adminPage`
              
            })
            setStat(false);
        } 
        if(!open && click && idT!=null){
          axios({
            method: "PUT",
            url : `/api/problem/updateSeen/${idT}`
        }).then(()=>{
          window.location.href=`/adminPage`
          
        })
        }
        if(open && click && idT!=null){
          axios({
            method: "PUT",
            url : `/api/problem/updateSeen/${idT}`
        })
        }
      }

     },[temp,stat,open,click])

      const handleClose = () => {
        setResolve(false);
        setUpdate(false);
      };

      const handleClick  = event => {
        setOpen(!open);
        setClick(true);
        setId(event.currentTarget.id);
      };

      const handleUpdate = event =>  {
        setStat(true);
        setUpdate(true);
        setId(event.currentTarget.id)
      };
    
     const handleResolve = event =>  {
        setTemp(true);
        setResolve(true)
        setId(event.currentTarget.id)
      };
     
    return(
      

        <div className="reportView">
        
            <Box sx={{ marginBottom:2 , maxWidth: 360, bgcolor: 'background.paper',border:3, borderRadius: '4px', borderColor: "#a256e0" }}>
 
        <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id= {prb._id}>
         {open? <RemoveRedEyeIcon/>:(prb.unseen? <VisibilityOffIcon/>:<RemoveRedEyeIcon/>)}
        </ListSubheader>
      }
    >
      <ListItemButton id= {prb._id} onClick={handleClick}>
        <ListItemText primary={prb.description} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}} component="div" >
            <ListItem>
            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                }}
                >
                <ListItem disablePadding>
                    <ListItemText primary="Status:" secondary={prb.status} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem disablePadding>
                    <ListItemText primary="Response:" />
                </ListItem>
                
                <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                        <Input onChange={e => setTitle(e.target.value)} defaultValue={prb.response} placeholder="Enter Response" color="secondary" focused  inputProps={ariaLabel}/>
                        </Box>
                        <Button id= {prb._id} onClick={handleUpdate} size="small">Update Response</Button>
                </List>
              
            </ListItem>
        
        </List>
        <Button id= {prb._id} onClick={handleResolve} size="small" style={{ left: 8 }}>Resolve</Button>
      </Collapse>
    </List>
    
    </Box>
  

        </div>
       
    )
}
export default ProblemList; 