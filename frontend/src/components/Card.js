import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';

import Typography from '@mui/material/Typography';

function NoRefundCard ()  { 
     
    return(
        
        <div className="Norefund">
            <div>
                <Box sx={{ marginBottom:2 , maxWidth: 360, bgcolor: 'background.paper'}}>
                <Card sx={{ maxWidth: 360, minHeight: 200 }}>
                <CardContent>
                    <MoneyOffIcon fontSize="large"/>
                <Typography gutterBottom variant="h5" component="div" align='center'>
                    Refund Requests 
                </Typography>
                <Typography variant="body2" color="text.secondary" align='center'>
                    No Refund Requests At The Moment
                </Typography>
                </CardContent>
                </Card>
                </Box>
            </div>
        </div>

    )
}


export default NoRefundCard;