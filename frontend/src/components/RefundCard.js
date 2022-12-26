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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


function RefundCard ({refund})  { 

  const [ name, setName ] = useState('');
  const [ tName, setTname ] = useState('');
  const [ price, setPrice ] = useState(0);

  useEffect(() => {
    const data = {refundID: refund._id};
    axios({
      method: "PUT",
      url: `/api/courses/getCourseName`,
      data: data,
      headers:{'Content-Type':'application/json'}
    })
    .then( (res) => {
        const name = res.data;
        setName(name);
      }
    )

    axios({
      method: "PUT",
      url: `/api/courses/getTraineeName`,
      data: data,
      headers:{'Content-Type':'application/json'}
    })
    .then( (res) => {
        const tName = res.data;
        setTname(tName);
      }
    )

    axios({
      method: "PUT",
      url: `/api/courses/getCoursePrice`,
      data: data,
      headers:{'Content-Type':'application/json'}
    })
    .then( (res) => {
        const price = res.data;
        setPrice(price);
      }
    )

  },[refund._id])

  const [open1, setOpen1] = useState(false);

  const handleCloseD = () => {
    setOpen1(false);
};

  const handleClick = () => {
    const data = {courseID: refund.course, indTraineeID: refund.indTrainee, refundID: refund._id};
    axios({
        method: "PUT",
        url: `/api/admin/refund`,
        data: data,
        headers:{'Content-Type':'application/json'}
      })
  }
    
     
    return(
        
        <div className="refund">
            <div>
                <Box sx={{ marginBottom:2 , maxWidth: 360, bgcolor: 'background.paper'}}>
                <Card sx={{ maxWidth: 360 }}>
                <CardContent>
                <Typography gutterBottom variant="h5" component="div" align='center'>
                    Refund Request
                </Typography>
                <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                }}
                >
                <ListItem >
                    
                    <ListItemText primary="Course:" secondary={name} />
                   
                </ListItem>
                <ListItem >
                   
                    <ListItemText primary="Indiviual Trainee:" secondary={tName} />
               
                </ListItem>
                     
                <ListItem >
                    
                    <ListItemText primary="Refund Amount:" secondary={price}/>
                   
                </ListItem>
                  <Divider  />
                </List>
                </CardContent>
                <CardActions>
                    <Button size="medium" color='secondary' onClick={handleClick}>Accept Refund</Button>
                </CardActions>
                </Card>
                </Box>
                <div float='left'>
              <Dialog open={open1} onClose={handleCloseD}>
                <DialogTitle>Refund Request</DialogTitle>
                <DialogContent>
                <p> Refund accepted successfully! </p>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseD}>OK</Button>
                </DialogActions>
              </Dialog>
              </div>
            </div>
        </div>

    )
}


export default RefundCard;