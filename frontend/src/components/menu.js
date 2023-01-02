import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import WalletIcon from '@mui/icons-material/Wallet';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import Logout from '@mui/icons-material/Logout';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import axios from "axios";

// report imports 
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

//Report Stuff
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
 
 


export default function AccountMenu() {
  var loggedinUser = JSON.parse(localStorage.getItem('user'));
  const userID = loggedinUser.id;
  const data={id:userID}

  //Report a Probelm 
  const [title,setTitle] = useState('');
  const [message, setMessage] = useState(null)
  const [menu,setMenu] = useState(false);

  const [input,setInput] = useState(false);
  const [inputS,setInputS] = useState(false);
  const [inputD,setInputD] = useState(false);
  const [inputT,setInputT] = useState(false);
  

  const [Technical, setTechnical] = React.useState(false);
  const [System,setSystem] = React.useState(false);
  const [navigation,setNavigation] = React.useState(false);
  const [financial , setFinancial ] = React.useState(false);
  const [discount,setDiscount] = React.useState(false);
  const [transfer,setTransfer] = React.useState(false);

  const [idT,setId] = useState();

  // Report a Probelm handles
  const handleOpenM = () => {
      setMenu(true);
    };
 
    const handleCloseM = () => {
      setMenu(false);
    };
    const handleClickOpenTechnical = () => {
      setTechnical(true);  
      setMessage(null);
      setMenu(false);
    };
    const handleCloseTechnical = () => {
      setTechnical(false);
      setTitle('');
    };
    const handleClickOpenFinancial = () => {
      setFinancial (true);
      setMessage(null);
      setMenu(false);
    };
    const handleCloseFinancial  = () => {
      setFinancial (false);
      setTitle('');
    };
  const handleBackTechnical= () => {
      setSystem(false);
      setNavigation(false);
      setTechnical(true);
      setTitle('');
    };
    const handleBackFinancial= () => {
      setDiscount(false);
      setTransfer(false);
      setFinancial(true);
      setTitle('');
    };
//----------------------------------------------------------------------------------------
     const handleClickOpenSystem = () => {
      setSystem(true);
      setTechnical(false);  
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
     {
      axios({
        method: 'POST',
        url: '/api/problem/',
        data:{description:title, status:"Pending", response:"No Response"} ,
        headers:{'Content-Type':'application/json'}
 
      }).then(
        (res) => {
           const temp = res.data
           console.log(temp)
           setId(temp)  
        }
         );    
      axios({
        method: "POST",
        url : `/api/corporateTrainee/addProblem/${idT}`,
        data: data
      })}
      setTitle('');
      setMessage("Your Problem Is Reported Successfully. The Admin Will Respond Shortly.");
    };
    const handleClickOpenNavigation = () => {
      setNavigation(true);
      setTechnical(false);
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
        method: 'POST',
        url: '/api/problem/',
        data:{description:title, status:"Pending", response:"No Response"} ,
        headers:{'Content-Type':'application/json'}
 
      }).then(
        (res) => {
           const temp = res.data
           console.log(temp)
           setId(temp)  
        }
         );    
      axios({
        method: "POST",
        url : `/api/corporateTrainee/addProblem/${idT}`,
        data: data
      })}
      setTitle('');
      setMessage("Your Problem Is Reported Successfully. The Admin Will Respond Shortly.");
    };
    const handleClickOpenDiscount = () => {
      setDiscount(true);
      setFinancial(false);
    };
    const handleCloseDiscount = () => {
      setDiscount(false);
      setInputD(false);
      setTitle('');
    };
    const handleClickOpenTransfer = () => {
      setTransfer(true);
      setFinancial(false);
    };
    const handleCloseTransfer = () => {
      setTransfer(false);
      setInputT(false);
      setTitle('');
    };
    const handleSubmitDiscount = () => {
      setDiscount(false);
      setInputD(false);
      console.log(title);
      if(title!='')
      {axios({
        method: 'POST',
        url: '/api/problem/',
        data:{description:title, status:"Pending", response:"No Response"} ,
        headers:{'Content-Type':'application/json'}
 
      }).then(
        (res) => {
           const temp = res.data
           console.log(temp)
           setId(temp)  
        }
         );    
      axios({
        method: "POST",
        url : `/api/corporateTrainee/addProblem/${idT}`,
        data: data
      })}
      setTitle('');
      setMessage("Your Problem Is Reported Successfully. The Admin Will Respond Shortly.");
    };
    const handleSubmitTransfer = () => {
      setDiscount(false);
      setInputD(false);
      console.log(title);
      if(title!='')
      {axios({
        method: 'POST',
        url: '/api/problem/',
        data:{description:title, status:"Pending", response:"No Response"} ,
        headers:{'Content-Type':'application/json'}
 
      }).then(
        (res) => {
           const temp = res.data
           console.log(temp)
           setId(temp)  
        }
         );    
      axios({
        method: "POST",
        url : `/api/corporateTrainee/addProblem/${idT}`,
        data: data
      })}
      setTitle('');
      setMessage("Your Problem Is Reported Successfully. The Admin Will Respond Shortly.");
    };
     //----------------------------------------------------------------------------------------
 
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
     const handleTransferT = () => {
      setInputT(true);
      setTitle('');
     };
    const handleTransferF = () => {
      setInputT(false);
     };
 
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          console.log(title);
        if(title!='')
         {
          axios({
            method: 'POST',
            url: '/api/problem/',
            data:{description:title, status:"Pending", response:"No Response"} ,
            headers:{'Content-Type':'application/json'}
   
          }).then(
            (res) => {
               const temp = res.data
               console.log(temp)
               setId(temp)  
            }
             );    
          axios({
            method: "POST",
            url : `/api/corporateTrainee/addProblem/${idT}`,
            data: data
          })
        }
          setTitle('');
          setMessage("Your Problem Is Reported Successfully. The Admin Will Respond Shortly.");
        }
      };


  // Mine 
 
  const type = loggedinUser.type;
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [open1, setOpen1] = useState(false);

  const { user } = useAuthContext()
  const { logout } = useLogout()

  const [wallet, setWallet] = useState(0); 

  const handleClickOpen = () => {
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
    setTimeout(()=>{
      setOpen1(true);
    }, 900)
   
  };

  const handleCloseD = () => {
    setOpen1(false);
  };

  const handleLog = () => 
  {
      logout();
      window.location.href = `/`;
  }

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log("wallet"+wallet)
  return (
    <><React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ minWidth: 100 }}>{user.username}</Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>{user.username.charAt(0).toUpperCase()}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        {user.type=="coTrainee" && <MenuItem onClick={() => window.location.href = `/courses`}>
        <ListItemIcon>
          <LibraryBooksIcon />
        </ListItemIcon>
        My Courses
      </MenuItem>}
      {user.type=="indTrainee" && <MenuItem onClick={() => window.location.href = `/MyEnrolledCourses`}>
        <ListItemIcon>
          <LibraryBooksIcon />
        </ListItemIcon>
        My Courses
      </MenuItem>}
      {user.type=="instructor" && <MenuItem onClick={() => window.location.href = `/instructor`}>
        <ListItemIcon>
          <LibraryBooksIcon />
        </ListItemIcon>
        My Courses
      </MenuItem>}
      {(user.type=="indTrainee" || user.type=="instructor") && <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
          <WalletIcon />
        </ListItemIcon>
         Wallet
      </MenuItem>}
      <Divider />
       { (user.type!=="admin") && <MenuItem onClick={handleOpenM}>
          <ListItemIcon>
            <ReportProblemIcon />
          </ListItemIcon>
          Report a Problem
        </MenuItem>}
       { (user.type!=="admin") && <MenuItem  onClick={() => window.location.href=`/viewProblem?id=${data}`}>
          <ListItemIcon>
            <ReportGmailerrorredIcon />
          </ListItemIcon>
          My Reported Problems
        </MenuItem>}
        <Divider />
        <MenuItem onClick={handleLog}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
    <div float='left'>
        <Dialog open={open1} onClose={handleCloseD}>
          <DialogTitle>Wallet Balance</DialogTitle>
          <DialogContent>
            <p>${wallet}</p>  
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseD}>OK</Button>
          </DialogActions>
        </Dialog>
    </div>
         <BootstrapDialog fullWidth={true}
        onClose={handleCloseM}
        aria-labelledby="customized-dialog-title"
        open={menu}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseM}>
          Report
        </BootstrapDialogTitle>
 
        <DialogContent dividers>
 
        <List>
          <ListItem disablePadding>
            <ListItemButton variant="outlined" onClick={handleClickOpenTechnical}>
              <ListItemText primary="Technical" />
            </ListItemButton>
          </ListItem>
       
          <ListItem disablePadding>
            <ListItemButton variant="outlined" onClick={handleClickOpenFinancial}>
              <ListItemText primary="Financial" />
            </ListItemButton>
          </ListItem>
 
          <ListItem >
              <ListItemText primary="Other: [Mention Below]" />  
          </ListItem>
          <ListItem >
              <input className="report" type="text" placeholder="Explain your problem "
                value={title} onChange={e => setTitle(e.target.value)} onKeyDown={handleKeyDown} />
          </ListItem>
        </List>
         
        </DialogContent>
      </BootstrapDialog>
 
       
 
      <BootstrapDialog fullWidth={true}
        onClose={handleCloseTechnical}
        aria-labelledby="customized-dialog-title"
        open={Technical}
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
      <FormLabel id="demo-radio-buttons-group-label" >Discount Problem</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="Cluttered Page" control={<Radio />} label="Cluttered Page" onClick={handleDiscountF}/>
        <FormControlLabel value="Low Quality Videos" control={<Radio />} label="Low Quality Videos" onClick={handleDiscountF}/>
        <FormControlLabel value="Wrong Exam Grade" control={<Radio />} label="Wrong Exam Grade" onClick={handleDiscountF}/>
        <FormControlLabel value="Slow Loading Time" control={<Radio />} label="Slow Loading Time" onClick={handleDiscountF}/>
        <FormControlLabel value="Outdated Features" control={<Radio />} label="Outdated Features" onClick={handleDiscountF}/>
        <FormControlLabel value= "" control={<Radio />} label="Other" onClick={handleDiscountT}/>
        {inputD? <input className="report" type="text" placeholder="Explain your problem "
                value={title} onChange={e => setTitle(e.target.value)} onKeyDown={handleKeyDown} /> : null
                }
      </RadioGroup>
    </FormControl>
 
          </DialogContent>  
          <DialogActions>
          <Button autoFocus onClick={handleBackFinancial}>
            Back
          </Button>
          <Button autoFocus onClick={handleSubmitDiscount}>
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
        <FormControl onChange={e => setTitle(e.target.value)}>
      <FormLabel id="demo-radio-buttons-group-label" >Discount Problem</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="Cluttered Page" control={<Radio />} label="Cluttered Page" onClick={handleTransferF}/>
        <FormControlLabel value="Low Quality Videos" control={<Radio />} label="Low Quality Videos" onClick={handleTransferF}/>
        <FormControlLabel value="Wrong Exam Grade" control={<Radio />} label="Wrong Exam Grade" onClick={handleTransferF}/>
        <FormControlLabel value="Slow Loading Time" control={<Radio />} label="Slow Loading Time" onClick={handleTransferF}/>
        <FormControlLabel value="Outdated Features" control={<Radio />} label="Outdated Features" onClick={handleTransferF}/>
        <FormControlLabel value= "" control={<Radio />} label="Other" onClick={handleTransferT}/>
        {inputT? <input className="report" type="text" placeholder="Explain your problem "
                value={title} onChange={e => setTitle(e.target.value)} onKeyDown={handleKeyDown} /> : null
                }
      </RadioGroup>
    </FormControl>
 
          </DialogContent>  
          <DialogActions>
          <Button autoFocus onClick={handleBackFinancial}>
            Back
          </Button>
          <Button autoFocus onClick={handleSubmitTransfer}>
            Submit
          </Button>
         
        </DialogActions>
        </BootstrapDialog>
    </>
  );
}
