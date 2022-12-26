import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import NoBackpackIcon from '@mui/icons-material/NoBackpack';

import Typography from '@mui/material/Typography';

function NoCoursesCard ()  { 
     
    return(
        
        <div className="Norefund">
            <div>
                <Box sx={{ marginBottom:2 , maxWidth: 360, bgcolor: 'background.paper'}}>
                <Card sx={{ maxWidth: 360, minHeight: 200 }}>
                <CardContent>
                    <NoBackpackIcon fontSize="large"/>
                <Typography gutterBottom variant="h5" component="div" align='center'>
                   Courses
                </Typography>
                <Typography variant="body2" color="text.secondary" align='center'>
                    You are not enrolled in any courses at the moment.
                </Typography>
                </CardContent>
                <CardActions>
                    <Button size="medium" color='secondary' onClick={() => window.location.href = `/`}>Check Out Available Courses</Button>
                </CardActions>
                </Card>
                </Box>
            </div>
        </div>

    )
}


export default NoCoursesCard;