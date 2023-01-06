import React, { useState, useEffect } from "react";
import { getParamByParam } from 'iso-country-currency'
import { countryValue } from '../components/Navbar'
import YoutubeEmbed from "./YoutubeEmbed";
import { useAuthContext } from '../hooks/useAuthContext'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Axios from "axios";
import axios from "axios";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CoursePreview = ({course}) => {
  
  const [expanded, setExpanded] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

    const { user } = useAuthContext();


    function CheckNumber() {
        if(result>1) {
          return 'hours';
        }
        if(result===1) {
          return 'hour';
        }
      }

      const [currency, setCurrency] = useState('');
      const [toCurrency, setToCurrency] = useState('');

      const result = (course.subtitle).reduce((total, currentValue) => total = total + currentValue.hours,0);
  
  
      // Initializing all the state variables
      const [info, setInfo] = useState([]);
      const [from, setFrom] = useState("usd");
      const [to, setTo] = useState("egp");
      const [output, setOutput] = useState(0);
  
  
      // Calling the api whenever the dependency changes
      useEffect(() => {
        Axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
      .then((res) => {
        setInfo(res.data[from]);
        })
      convert();
      if(countryValue != undefined)
      {
        setCurrency(getParamByParam('countryName', countryValue, 'symbol'));
        setToCurrency(getParamByParam('countryName', countryValue, 'currency'));
      }
      set();
      }, [from, info]);
  
  
      function set() {
        if(toCurrency !== NaN)
          setTo((toCurrency.toLowerCase()));
      }
        
      function convert() {
        var rate = info[to];
        setOutput(Math.round(course.price * rate));
      }

      const mylink = (course.previewLink);
      const myembed = mylink.split('=');
      const myembedID = myembed[1];
      
      const [wallet, setWallet] = useState(0); 
      if(user )
      {
        if(user.type=="indTrainee")
        {

          var loggedinUser = JSON.parse(localStorage.getItem('user'));
          const userID = loggedinUser.id;
          const type = loggedinUser.type;
    
          // useEffect(() =>  {
            const data={type: type, userID: userID};
            axios({
              method: "PUT",
              url : `/api/courses/wallet`,
              data:data,
              headers:{'Content-Type':'application/json'}
            })
            .then( (res) => { 
              const wallet = res.data
             
              setWallet(wallet)  
            });
          // },[type, userID])
        }
      }

      const [open1, setOpen1] = useState(false);

      const handleClickOpen = () => {
        setOpen1(true);
      };

      const handleCloseD = () => {
        setOpen1(false);
      };

      const Pay = () => {
        var loggedinUser = JSON.parse(localStorage.getItem('user'));
        const userID = loggedinUser.id;
        
        const data={price: course.price, userID: userID, courseID: course._id};
        axios({
          method: "PUT",
          url : `/api/indTrainee/payWithWallet`,
          data:data,
          headers:{'Content-Type':'application/json'}
        })
        // window.location.href=`/MyEnrolledCourses`
      }


    return (
        <div className="course-preview">
           <Card sx={{ minWidth: 380 }}>
            
           {user && user.type=="indTrainee" &&  wallet<course.price && <CardHeader
            action={<Button onClick={() => window.location.href=`/payment?id=${course._id}`} size="large" color="secondary">Enroll Now</Button>}
            title={course.title.toUpperCase()}
            subheader= {"Subject: "+course.subject.toUpperCase()}
          />}
           {user && user.type=="indTrainee"  &&  wallet>=course.price &&<CardHeader
            action={<Button onClick={handleClickOpen} size="large" color="secondary">Enroll Now</Button>}
            title={course.title.toUpperCase()}
            subheader= {"Subject: "+course.subject.toUpperCase()}
          />}
          {!user && <CardHeader
            action={<Button onClick={() => window.location.href=`/login`} size="large" color="secondary">Enroll Now</Button>}
            title={course.title.toUpperCase()}
            subheader= {"Subject: "+course.subject.toUpperCase()}
          />}
          <CardHeader
            title= {currency + output}
            subheader= {"Added " + formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary"> {course.summary}</Typography>
          </CardContent>
          <CardActions disableSpacing>
          <CardContent>
            <Typography color="text.primary"> Course Context Preview</Typography>
          </CardContent>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography>
              <ol>{(course.subtitle).map((mycourse)=> <li mycourse={mycourse} key={course._id}>  {mycourse.name} is {mycourse.hours} hours </li>)}</ol>
              </Typography>
              <Typography> Total Hours: {result} <CheckNumber/> </Typography>
            </CardContent>
          </Collapse>
          </Card>
          {/* <div>
            <h1>{course.title.toUpperCase()}</h1>
            <p><strong></strong>{course.summary}</p>
            <p><strong>Subject: </strong>{course.subject}</p>
            <p><strong>Price: </strong> {currency} {output}</p>
            { user &&  wallet<course.price && <button onClick={() => window.location.href=`/payment?id=${course._id}`}>Enroll Now</button>}
            { user &&  wallet>=course.price && <button onClick={handleClickOpen}>Enroll Now</button>}
            { !user &&  <button onClick={() => window.location.href=`/login`}>Enroll Now</button>}
            <p><strong>Total Hours: </strong> {result} <CheckNumber/> </p> 
            <p>Added {formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>
            <h4>Course Content</h4>
            <ol>{(course.subtitle).map((mycourse)=> <li mycourse={mycourse} key={course._id}>  {mycourse.name} is {mycourse.hours} hours </li>)}</ol>
          </div> */}
          <div className="course-preview-video"> <YoutubeEmbed embedId={myembedID} /></div>
          <div float='left'>
          <Dialog open={open1} onClose={handleCloseD}>
            <DialogTitle>Current Wallet Balance: ${wallet}</DialogTitle>
            <DialogContent>
              <p>Your current balance allows you to pay using your wallet.</p>  
            </DialogContent>
            <DialogActions>
              <Button onClick={Pay}>Pay with Wallet</Button>
              <Button  onClick={() => window.location.href=`/payment?id=${course._id}`}>Proceed to pay with Credit Card</Button>
            </DialogActions>
          </Dialog>
          </div>
        </div>
        
    )
}
export default CoursePreview