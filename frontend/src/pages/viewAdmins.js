import { useEffect } from "react"

// components
import AdminDetails from "../components/AdminDetails"
//import AdminForm from "../components/AdminForm"

import { useAdminsContext } from "../hooks/useAdminsContext"

const ViewAdmins = () => {
  const { admins, dispatch } = useAdminsContext()
  //const [admins, setAdmins] = useState(null)
  useEffect(() => {
    const fetchAdmins = async () => {
      const response = await fetch('/api/admin')
      const json = await response.json()

      if (response.ok) 
      {
        dispatch({type: 'SET_ADMINS', payload: json})
      }
    }

    fetchAdmins()
 // }, [])
}, [dispatch])

  return (
    <div className="admin">
        {admins && admins.map(admin => (
          <AdminDetails admin={admin} key={admin._id} />
        ))}
    </div>
  )
}
export default ViewAdmins


// import axios from 'axios';
// //import button from '@mui/material/button';
// import Box from '@mui/material/Box';
// import React, {useState, useEffect, useRef} from 'react';
// import 'react-dropdown/style.css';
// import styled from 'styled-components';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogActions from '@mui/material/DialogActions';
// import PropTypes from 'prop-types';
// import CloseIcon from '@mui/icons-material/Close';
// import Slide from '@mui/material/Slide';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import Input from '@mui/material/Input';

// const ariaLabel = { 'aria-label': 'description' };



// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//       padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//       padding: theme.spacing(1),
//     },
//   }));

 
// function BootstrapDialogTitle(props) {
//     const { children, onClose, ...other } = props;
  
//     return (
      
//       <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//         {children}
//         {onClose ? (
//           <IconButton
//             aria-label="close"
//             onClick={onClose}
//             sx={{
//               position: 'absolute',
//               right: 8,
//               top: 8,
//               color: (theme) => theme.palette.grey[500],
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         ) : null}
//       </DialogTitle>
//     );
//   }
  
//   BootstrapDialogTitle.propTypes = {
//     children: PropTypes.node,
//     onClose: PropTypes.func.isRequired,
//   };
  
    
// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
//   });

  
// const bull = (
//     <Box
//       component="span"
//       sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//     >
//       •
//     </Box>
//   );

// const ViewAdmins = () => {
//     const params = new URLSearchParams(window.location.search);
//     const [admins, setAdmins] = useState([]);
//     const [loading,setLoading] = useState(true);
//     const [flag,setFlag] = useState(false);

//     useEffect(() =>  
//     {
//        setLoading(true)
//        setFlag(false)

//        if(admins=='')
//        {
//         return
//        }

//        axios({
//         method: "GET",
//         url : `/api/admin`
//         }).then(
//         (res) => { 
//         setLoading(false)
//         const admins = res.data
//         console.log(admins)
//         setAdmins(admins) 

//         if(admins!=[])
//         {
//         console.log(admins)
//         setFlag(true)
//         }
//         }
//         );    

        
//      },[admins])

     
//     return(
//         <div className="adminView">
//         {admins.length==0? <h1>No Admins.</h1> : <h1>Admins:</h1> } 

//            {!loading && flag==true && admins.length!=0 &&(admins.map(admin => 
             
//             <div admin={admin} key={admin.id}>
//                 <Box sx={{ marginBottom:2 , maxWidth: 360, bgcolor: 'background.paper',border:3, borderRadius: '4px', borderColor: "#a256e0" }}>
//                 <Card sx={{ maxWidth: 360 }}>
//                 <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                 Name: {admin.firstName} {admin.lastName}
//                 </Typography>
//                 <List
//                 sx={{
//                     width: '100%',
//                     maxWidth: 360,
//                     bgcolor: 'background.paper',
//                 }}
//                 >
                    
//                 <ListItem disablePadding>
                    
//                     <ListItemText primary="Status:" secondary={admin.username} />
                   
//                 </ListItem>
//                 <Divider variant="inset" component="li" />
//                 <ListItem disablePadding>
                   
//                     <ListItemText primary="Response:" secondary={admin.email} />
               
//                 </ListItem>
//                 </List>
//                 </CardContent>
//                 {/* <CardActions>
//                     <Button size="small">Share</Button>
//                     <Button size="small">Learn More</Button>
//                 </CardActions> */}
//                 </Card>
//                 </Box>
//             </div>
       
//       ))} 
      
        

//         </div>
//     )
// }
// <Container>
    //   <Grid container spacing={3}>
  //   {admins && admins.map(admin => (
  //     // < Grid item xs={12} md={6} lg={4} 
      
  //         <AdminDetails admin={admin} key={admin._id} />
  //     </Grid>
  //     ))}
  //     </Grid>
  // </Container>
// export default ViewAdmins; 

 {/* <Box sx={{ marginBottom:2 , maxWidth: 360, bgcolor: 'background.paper',border:3, borderRadius: '4px', borderColor: "#a256e0" }}>
      <Card sx={{ maxWidth: 360 }} >
      <CardHeader
          action={
            <IconButton onClick={() => handleClick(admin.id)}>
              <PersonRemoveIcon />
            </IconButton>
          }
          title = {admin.firstName + admin.lastName} 
          subheader = {"Added " + formatDistanceToNow(new Date(admin.createdAt), {addSuffix: true})}
        />
      <CardContent>
        <Typography variant="body2">
          Username: {admin.username}
          <br />
          Email: {admin.email}
        </Typography>
      </CardContent>
      <Divider />
    </Card>
    </Box> */}

    
// const bull = (
//   <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//   >
//     •
//   </Box>
// );