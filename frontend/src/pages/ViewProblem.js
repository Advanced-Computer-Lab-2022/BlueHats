import axios from 'axios';
import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import NoBackpackIcon from '@mui/icons-material/NoBackpack';

import Loader from '../components/Loader';

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

function ViewProblem ()  { 
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const [problems, setProblems] = useState([]);
    const [loading,setLoading] = useState(true);
    var loggedinUser = JSON.parse(localStorage.getItem('user'));
    const userType = loggedinUser.type;
    
  
      useEffect(() =>  {
        setLoading(true)
       
        if(id==''){
          return
        }
           if(userType == "coTrainee")
           {
            axios({
            method: "GET",
            url : `/api/corporateTrainee/viewProblem/${id}`
          }).then(
         (res) => { 
            setLoading(false)
            const problems = res.data
            console.log(problems)
            setProblems(problems)  
          
         }
          );    }
          else if (userType == "indTrainee"){
            axios({
              method: "GET",
              url : `/api/indTrainee/viewProblem/${id}`
            }).then(
           (res) => { 
              setLoading(false)
              const problems = res.data
              console.log(problems)
              setProblems(problems)  
            
           }
            );
          }

          else if (userType == "instructor"){
            axios({
              method: "GET",
              url : `/api/instructor/viewProblem/${id}`
            }).then(
           (res) => { 
              setLoading(false)
              const problems = res.data
              console.log(problems)
              setProblems(problems)  
            
           }
            );
          }
  
        
     },[])
     
    return(
      <>
      {loading && <Loader/>}
        <div className="courses">
        {!loading && problems.length==0? 
        <div className="Norefund" >
        <Box sx={{ marginBottom:2 , maxWidth: 360, bgcolor: 'background.paper'}}>
        <Card sx={{ maxWidth: 360, minHeight: 200, position: 'absolute', left: '40%', top: '40%', }}>
        <CardContent>
            <NoBackpackIcon fontSize="large"/>
        <Typography gutterBottom variant="h5" component="div" align='center'>
            Reported Problems
        </Typography>
        <Typography variant="body2" color="text.secondary" align='center'>
            No Reported Problems.
        </Typography>
        </CardContent>
        <CardActions>
            <Button size="medium" color='secondary' onClick={() => window.location.href = `/`}>Go To Home Page</Button>
        </CardActions>
        </Card>
        </Box>
        </div>
         : <h1>Reported Problems:</h1> } 

           {!loading && problems.length!=0 &&(problems.map(prb => 
             
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
                    <ListItemText primary="Response:" secondary={prb.response} />
               
                </ListItem>
                </List>
                </CardContent>
                </Card>
                </Box>
            </div>
       
      ))} 
      
        

        </div>
        </>

    )
}


export default ViewProblem;
