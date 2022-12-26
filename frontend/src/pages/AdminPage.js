import axios from 'axios';
//import button from '@mui/material/button';
import Box from '@mui/material/Box';
import React, {useState, useEffect, useRef} from 'react';
import 'react-dropdown/style.css';
import styled from 'styled-components';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';

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

const AdminPage = () => {
    const params = new URLSearchParams(window.location.search);
    const [problems, setProblems] = useState([]);
    const [loading,setLoading] = useState(true);
    const [flag,setFlag] = useState(false);
    const [resolve,setResolve] = useState(false);
    const [update,setUpdate] = useState(false);
    const [temp, setTemp] = useState(false);
    const [stat, setStat] = useState(false);
    const [title,setTitle] = useState('');
    const [id ,setId] = useState();
    
  
      useEffect(() =>  {
        console.log(title)
        setLoading(true)
        setFlag(false)
        if(temp){
            axios({
                method: "PUT",
                url : `/api/problem/updateStatus/${id}`
            })
            setTemp(false);
        }
        if(stat){
            axios({
                method: "PUT",
                url : `/api/problem/addResponse/${id}/${title}`
            })
            setStat(false);
        }
        axios({
        method: "GET",
        url : '/api/problem/'
        }).then(
        (res) => { 
        setLoading(false)
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
  
     },[temp,stat])

      const handleClose = () => {
        setResolve(false);
        setUpdate(false);
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
        <Dialog
        open={resolve}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
         <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Report
        </BootstrapDialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
             Problem Resolved. 
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Dialog
        open={update}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
         <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Report
        </BootstrapDialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
             Response Updated Successfully! 
          </DialogContentText>
        </DialogContent>
      </Dialog>

        {problems.length==0? <h1>No Reported Problems.</h1> : <h1>Reported Problems:</h1> } 

           {!loading && flag==true && problems.length!=0 &&(problems.map(prb => 
             
            <div prb={prb} key={prb.id}>
                <Box sx={{ marginBottom:2 , maxWidth: 360, bgcolor: 'background.paper',border:3, borderRadius: '4px', borderColor: "#a256e0" }}>
                <Card sx={{ maxWidth: 360 }}>
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Problem: {prb.description}
                </Typography>
             
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
                </CardContent>
                <CardActions>
                    <Button id= {prb._id} onClick={handleResolve} size="small">Resolve</Button>
                </CardActions>
                </Card>
                </Box>
            </div>
       
      ))} 
        </div>
    )
}
export default AdminPage; 