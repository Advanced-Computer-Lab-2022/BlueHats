import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import axios from 'axios';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import React, { useEffect, useState } from "react";
//import button from '@mui/material/button';
import IconButton from '@mui/material/IconButton';
//import MenuIcon from '@mui/icons-material/Menu';
//import ReportIcon from '@mui/icons-material/Report';
//import ReportIcon from '@mui/icons-material/ReportGmailerrorred';
import ReportIcon from '@mui/icons-material/ErrorOutline';
//import ReportIcon from '@mui/icons-material/ReportOutlined';
// import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
 import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';
// import SelectInput from '@mui/material/Select/SelectInput';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



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



const ReportMenu = () =>  {
    const [title,setTitle] = useState('');

    //other flags
    const [input,setInput] = useState(false);
    const [inputS,setInputS] = useState(false);
    const [inputD,setInputD] = useState(false);
    const [inputR,setInputR] = useState(false);
    
    //submit flag
    const [submit,setSubmit] = useState(false);

    const [open, setOpen] = React.useState(false);
    const [System,setSystem] = React.useState(false);
    const [navigation,setNavigation] = React.useState(false);
    const [financial , setFinancial ] = React.useState(false);
    const [discount,setDiscount] = React.useState(false);
    const [transfer,setTransfer] = React.useState(false);

    const handleClickOpen = () => {
      setSubmit(true);
    };
  
    const handleClose = () => {
      setSubmit(false);
    };
  


    const handleClickOpenTechnical = () => {
      setOpen(true);  
    };
    const handleCloseTechnical = () => {
      setOpen(false);
      setTitle('');
    };

    const handleBackTechnical= () => {
      setSystem(false);
      setNavigation(false);
      setOpen(true);
      setTitle('');
    };

    const handleClickOpenSystem = () => {
      setSystem(true);
      setOpen(false);   
    };

    const handleCloseSystem = () => {
      setSystem(false);
      setInputS(false);
      setTitle('');
    };

    const handleSubmitSystem = () => {
      setSystem(false);
      setInputS(false);
      console.log(title);
      if(title!='')
     { axios({
        method: "POST",
        url : `/api/corporateTrainee/addProblem/63a756e189cc94e7139e239c/${title}`
      })}
      setTitle('');
      setSubmit(true);
    };

    const handleClickOpenNavigation = () => {
      setNavigation(true);
      setOpen(false);
      setInput(false);
    };
    const handleCloseNavigation = () => {
      setNavigation(false);
      setInput(false);
      setTitle('');
    };
    const handleSubmitNavigation = () => {
      setNavigation(false);
      setInput(false);
      console.log(title);
      if(title!='')
      {axios({
        method: "POST",
        url : `/api/corporateTrainee/addProblem/63a756e189cc94e7139e239c/${title}`
      })}
      setTitle('');
      setSubmit(true);
    };


    const handleClickOpenFinancial = () => {
      setFinancial (true);
    };
    const handleCloseFinancial  = () => {
      setFinancial (false);
      setTitle('');
    };

    const handleClickOpenDiscount = () => {
      setDiscount(true);
      setFinancial(false);
    };
    const handleCloseDiscount = () => {
      setDiscount(false);
      setTitle('');
    };

    const handleClickOpenTransfer = () => {
      setTransfer(true);
      setFinancial(false);
      setSubmit(false);
    };
    const handleCloseTransfer = () => {
      setTransfer(false);
      setTitle('');
      setSubmit(false);
    };

    //for the input field of the other
    const handleNavigationT = () => {
      setInput(true);
      setTitle('');
    };
    const handleNavigationF = () => {
      setInput(false);
    };

    const handleSystemT = () => {
      setInputS(true);
      setTitle(''); 
     };
    const handleSystemF = () => {
      setInputS(false); 
     };

     const handleDiscountT = () => {
      setInputD(true);
      setTitle(''); 
     };
    const handleDiscountF = () => {
      setInputD(false); 
     };

     const handleRefundT = () => {
      setInputR(true);
      setTitle(''); 
     };
    const handleRefundF = () => {
      setInputR(false); 
     };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          console.log(title);
        if(title!='')
         {
          const data={
            description: title,
            status: "Pending",
            response:"No Response"};

           axios({
            method: "POST",
            url : `/api/corporateTrainee/addProblem/63a756e189cc94e7139e239c/${title}`
          })
          axios({
            method: 'POST',
            url: '/api/problem/',
            data:data ,
            headers:{'Content-Type':'application/json'}

          })
        }
          setTitle(''); 
          setSubmit(true);
        }
      };

     
    return (


        <div className='reportMenu'>
           <Dialog
        open={submit}
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
            Your Problem Is Reported Successfully. The Admin Will Respond Shortly. 
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Menu menuButton={<IconButton color="primary" aria-label="Menu" component="label">
        <ReportIcon />
        </IconButton>} 
        transition>
       <SubMenu label="Report A Problem">
       <MenuItem variant="outlined" onClick={handleClickOpenTechnical}>
        Technical
       </MenuItem>
        <MenuItem variant="outlined" onClick={handleClickOpenFinancial}>
        Financial</MenuItem>
        <MenuItem variant="outlined">
        Other</MenuItem>
        <input className="report" type="text" placeholder="Explain your problem "
                value={title} onChange={e => setTitle(e.target.value)} onKeyDown={handleKeyDown} /> 
        </SubMenu>


       

      <BootstrapDialog fullWidth={true}
        onClose={handleCloseTechnical}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseTechnical}>
          Report
        </BootstrapDialogTitle>

        <DialogContent dividers>

        <List>
          <ListItem disablePadding>
            <ListItemButton variant="outlined" onClick={handleClickOpenSystem}>
              <ListItemText primary="System" />
            </ListItemButton>
          </ListItem>
        
          <ListItem disablePadding>
            <ListItemButton variant="outlined" onClick={handleClickOpenNavigation}>
              <ListItemText primary="Navigation" />
            </ListItemButton>
          </ListItem>
        </List>
         
        </DialogContent>
      </BootstrapDialog>        
       
       
      <BootstrapDialog fullWidth={true}
        onClose={handleCloseSystem}
        aria-labelledby="customized-dialog-title"
        open={System}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseSystem}>
          Report
        </BootstrapDialogTitle>
        
        <DialogContent>
        <FormControl onChange={e => setTitle(e.target.value)}>
      <FormLabel id="demo-radio-buttons-group-label" >System Problem</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="Cluttered Page" control={<Radio />} label="Cluttered Page" onClick={handleSystemF}/>
        <FormControlLabel value="Low Quality Videos" control={<Radio />} label="Low Quality Videos" onClick={handleSystemF}/>
        <FormControlLabel value="Wrong Exam Grade" control={<Radio />} label="Wrong Exam Grade" onClick={handleSystemF}/>
        <FormControlLabel value="Slow Loading Time" control={<Radio />} label="Slow Loading Time" onClick={handleSystemF}/>
        <FormControlLabel value="Outdated Features" control={<Radio />} label="Outdated Features" onClick={handleSystemF}/>
        <FormControlLabel value= "" control={<Radio />} label="Other" onClick={handleSystemT}/> 
        {inputS? <input className="report" type="text" placeholder="Explain your problem "
                value={title} onChange={e => setTitle(e.target.value)} onKeyDown={handleKeyDown} /> : null
                }
      </RadioGroup>
    </FormControl>
  
          </DialogContent>  
          <DialogActions>
          <Button autoFocus onClick={handleBackTechnical}>
            Back
          </Button>
          <Button autoFocus onClick={handleSubmitSystem}>
            Submit
          </Button>
          
        </DialogActions>
        </BootstrapDialog> 

        <BootstrapDialog fullWidth={true}
        onClose={handleCloseNavigation}
        aria-labelledby="customized-dialog-title"
        open={navigation}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseNavigation}>
          Report
        </BootstrapDialogTitle>
        
        <DialogContent>
        <FormControl onChange={e => setTitle(e.target.value)}>
      <FormLabel id="demo-radio-buttons-group-label">Navigation Problem</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="Confusing User Journey" control={<Radio />} label="Confusing User Journey" onClick={handleNavigationF}/>
        <FormControlLabel value="Directed To Wrong Page" control={<Radio />} label="Directed To Wrong Page" onClick={handleNavigationF}/>
        <FormControlLabel value="Non-Specific Page Titles" control={<Radio />} label="Non-Specific Page Titles" onClick={handleNavigationF} />
        <FormControlLabel value="Link Not Working" control={<Radio />} label="Link Not Working"  onClick={handleNavigationF}/>
        <FormControlLabel value="" control={<Radio />} label="Other" onClick={handleNavigationT}/> 
        {input? <input className="report" type="text" placeholder="Explain your problem "
                value={title} onChange={e => setTitle(e.target.value)} onKeyDown={handleKeyDown} /> : null
                }
        {//pass the value of the input field
        }
      
      </RadioGroup>
    </FormControl>
          </DialogContent>  
          <DialogActions>
          <Button autoFocus onClick={handleBackTechnical}>
            Back
          </Button>
          <Button autoFocus onClick={handleSubmitNavigation}>
            Submit
          </Button>
        </DialogActions>
        </BootstrapDialog> 


        <BootstrapDialog fullWidth={true}
        onClose={handleCloseFinancial}
        aria-labelledby="customized-dialog-title"
        open={financial}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseFinancial}>
          Report
        </BootstrapDialogTitle>

        <DialogContent dividers>

        <List>
          <ListItem disablePadding>
            <ListItemButton variant="outlined" onClick={handleClickOpenDiscount}>
              <ListItemText primary="Discount" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton variant="outlined" onClick={handleClickOpenTransfer}>
              <ListItemText primary="Transfer" />
            </ListItemButton>
          </ListItem>
        </List>
         
        </DialogContent>
      </BootstrapDialog>        
       
       
      <BootstrapDialog fullWidth={true}
        onClose={handleCloseDiscount}
        aria-labelledby="customized-dialog-title"
        open={discount}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseDiscount}>
          Report
        </BootstrapDialogTitle>
        
        <DialogContent>
        <FormControl onChange={e => setTitle(e.target.value)}>
      <FormLabel id="demo-radio-buttons-group-label">Discount Problem</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="Confusing User Journey" control={<Radio />} label="Confusing User Journey" onClick={handleNavigationF}/>
        <FormControlLabel value="Directed To Wrong Page" control={<Radio />} label="Directed To Wrong Page" onClick={handleNavigationF}/>
        <FormControlLabel value="Non-Specific Page Titles" control={<Radio />} label="Non-Specific Page Titles" onClick={handleNavigationF} />
        <FormControlLabel value="Link Not Working" control={<Radio />} label="Link Not Working"  onClick={handleNavigationF}/>
        <FormControlLabel value="" control={<Radio />} label="Other" onClick={handleNavigationT}/> 
        {input? <input className="report" type="text" placeholder="Explain your problem "
                value={title} onChange={e => setTitle(e.target.value)} onKeyDown={handleKeyDown} /> : null
                }
        {//pass the value of the input field
        }
      
      </RadioGroup>
    </FormControl>
          </DialogContent>  
          <DialogActions>
          <Button autoFocus onClick={handleCloseDiscount}>
            Back
          </Button>
          <Button autoFocus onClick={handleCloseDiscount}>
            Submit
          </Button>
        </DialogActions>
        </BootstrapDialog> 

        <BootstrapDialog fullWidth={true}
        onClose={handleCloseTransfer}
        aria-labelledby="customized-dialog-title"
        open={transfer}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseTransfer}>
          Report
        </BootstrapDialogTitle>
        
        <DialogContent>
          BITCH
          </DialogContent>  
          <DialogActions>
          <Button autoFocus onClick={handleCloseTransfer}>
            Save changes
          </Button>
        </DialogActions>
        </BootstrapDialog> 

        <MenuItem onClick={() => window.location.href=`/viewProblem?id=63a756e189cc94e7139e239c`}>View Reported Problems</MenuItem>
      </Menu>

      
      </div>
    );
  }

  export default ReportMenu;