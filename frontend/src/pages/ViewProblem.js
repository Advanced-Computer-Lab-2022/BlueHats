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
    const [flag,setFlag] = useState(false);
  
      useEffect(() =>  {
        setLoading(true)
        setFlag(false)
        if(id==''){
          return
        }
           axios({
            method: "GET",
            url : `/api/corporateTrainee/viewProblem/${id}`
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
  
        
     },[id])
     
    return(
        
        <div className="reportView">
        {problems.length==0? <h1>No Reported Problems.</h1> : <h1>Reported Problems:</h1> } 

           {!loading && flag==true && problems.length!=0 &&(problems.map(prb => 
             
            <div prb={prb} key={prb.id}>
                <Box sx={{ marginBottom:2 , maxWidth: 360, bgcolor: 'background.paper',border:3, borderRadius: '4px', borderColor: "#a256e0" }}>
                <Card sx={{ maxWidth: 360 }}>
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Problem: {prb.problem}
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
                {/* <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions> */}
                </Card>
                </Box>
            </div>
       
      ))} 
      
        

        </div>

    )
}


export default ViewProblem;
