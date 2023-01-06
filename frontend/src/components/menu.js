import * as React from 'react';
import { useState, useEffect } from 'react';
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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



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

import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import CourseMenu from './CourseMenu';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { createSpacing } from '@mui/system';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const ariaLabel = { 'aria-label': 'description' };

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
  const userType = loggedinUser.type;
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
  const [financial , setFinancial] = React.useState(false);
  const [discount,setDiscount] = React.useState(false);
  const [transfer,setTransfer] = React.useState(false);

  
  const [submit,setSubmit] = useState(false);
  const [f,setF] = useState(false);
  const [idT,setId] = useState();
  const [courses,setCourses] = useState();
  const [loading,setLoading] = useState(true);
  const [courseFlag,setCourseFlag] = useState(false);
  const [msg, setMsg] = React.useState(false);
 // const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  useEffect(() => {
      setLoading(true)
         if(idT != null)
        {
          if(userType == "coTrainee")
          {
            axios({
            method: "PUT",
            url : `/api/corporateTrainee/addProblem/${idT}`,
            data: data,
            headers:{'Content-Type':'application/json'}
          }).then(() => 
          {
            setLoading(false)
            console.log("co:" , idT)
            setMessage("Your problem is submitted successfully. The admin will respond shortly.")
            setTitle('')
            setSubmit(false)
        })
      }
      else if (userType == "indTrainee"){
        axios({
          method: "PUT",
          url : `/api/indTrainee/addProblem/${idT}`,
          data: data,
          headers:{'Content-Type':'application/json'}
        }).then(() => 
        {
          setLoading(false)
          console.log("tra:" , idT)
          setMessage("Your problem is submitted successfully. The admin will respond shortly.")
          setTitle('')
          setSubmit(false)
      })
      }
      else if (userType == "instructor"){
        axios({
          method: "PUT",
          url : `/api/instructor/addProblem/${idT}`,
          data: data,
          headers:{'Content-Type':'application/json'}
        }).then(() => 
        {
          setLoading(false)
          console.log("iddddd:" , idT)
          setMessage("Your problem is submitted successfully. The admin will respond shortly.")
          setTitle('')
          setSubmit(false)
      })
      }
      
      }
     
       console.log("iddddd:" , idT)
       console.log("trainee:" , data)
   
  },[f])

  
  
  
  
  // Report a Probelm handles
  const handleOpenM = () => {
      setMenu(true);
    };
    const handleCloseM = () => {
      setMenu(false);
    };
    const handleCloseMenu = () =>{
      setTechnical(false);
      setFinancial(false);
      setMenu(true);
    }
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
   
    const handleCloseCourse = () => {
      setCourseFlag(false);
      setTitle('');
    }
    const handleBackCourse = () => {
      setCourseFlag(false);
      setSystem(true);
    }
    const handleSubmitCourse = () =>{
      setCourseFlag(false);
      if(title!='')
      {
          axios({
            method: 'POST',
            url: '/api/problem/',
            data:{description:title, status:"Pending", response:"No Response", unseen: true} ,
            headers:{'Content-Type':'application/json'}
      
          }).then(
            (res) => {
              const temp = res.data
              setId(temp)  
              setF(false);
            })
          setSubmit(true);
          setF(true);
        
    }
    }
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
        data:{description:title, status:"Pending", response:"No Response", unseen: true} ,
        headers:{'Content-Type':'application/json'}
  
      }).then(
        (res) => {
           const temp = res.data
           setId(temp)  
           setF(false);
        })
      setSubmit(true);
      setF(true);
    }
      
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
      {
        axios({
          method: 'POST',
          url: '/api/problem/',
          data:{description:title, status:"Pending", response:"No Response", unseen: true} ,
          headers:{'Content-Type':'application/json'}
    
        }).then(
          (res) => {
             const temp = res.data
             setId(temp)  
             setF(false);
          })
        setSubmit(true);
        setF(true);
    }
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
      {
        axios({
          method: 'POST',
          url: '/api/problem/',
          data:{description:title, status:"Pending", response:"No Response", unseen: true} ,
          headers:{'Content-Type':'application/json'}
    
        }).then(
          (res) => {
             const temp = res.data
             setId(temp)  
             setF(false);
          })
        setSubmit(true);
        setF(true);
      }
    };
    const handleSubmitTransfer = () => {
      setTransfer(false);
      setInputD(false);
      console.log(title);
      if(title!='')
      {
        axios({
          method: 'POST',
          url: '/api/problem/',
          data:{description:title, status:"Pending", response:"No Response", unseen: true} ,
          headers:{'Content-Type':'application/json'}
    
        }).then(
          (res) => {
             const temp = res.data
             setId(temp)  
             setF(false);
          })
        setSubmit(true);
        setF(true);
      }
      setTitle('');
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
    const handleNavigationFL = () => {
      setInput(false);
      //   if(userType === "coTrainee")
      //   {
      //     console.log("corporate");
      //     axios({
      //     method: 'GET',
      //     url: `/api/corporateTrainee/getCourses/${userID}`
      //   }).then((res) => {
      //     const temp = res.data
      //     console.log(temp);
      //     setCourses(temp);
      //   })
      // }
      
      
      
      
      if (userType === "indTrainee")
      {
        axios({
        method: 'PUT',
        url: `/api/indTrainee/getCourses/${userID}`
      }).then((res) => {
        const temp = res.data
        console.log(temp);
        setCourses(temp);
      })
    }  
      setCourseFlag(true);
      setNavigation(false);
    }
    const handleSystemT = () => {
      setInputS(true);
      setTitle('');
     };
    const handleSystemF = () => {
      setInputS(false);
     };

     
     const handleSystemFL = () => {
      setInputS(false);
      
        axios({
          method: 'GET',
          url: `/api/corporateTrainee/getCourses/${userID}`
        }).then((res) => {
          const temp = res.data
          console.log(temp);
          setCourses(temp);
        })
      
     
      setCourseFlag(true);
      setSystem(false);

     }
     const handleSystemInde = () => {
      setInputS(false);
        axios({
          method: 'PUT',
          url: `/api/indTrainee/getCourses/${userID}`
        }).then((res) => {
          const temp = res.data
          console.log(temp);
          setCourses(temp);
        })
      
      setCourseFlag(true);
      setSystem(false);

     }
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
            data:{description:title, status:"Pending", response:"No Response", unseen: true} ,
            headers:{'Content-Type':'application/json'}
      
          }).then(
            (res) => {
               const temp = res.data
               setId(temp)  
               setF(false);
            })
          setSubmit(true);
          setF(true);
        }
          setMenu(false);  
         
        }
      };

      const handleClickMsg = () => {
        setMsg(true);
      };
    
      const handleCloseMsg = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setMsg(false);
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
       { (user.type!=="admin") && <MenuItem  onClick={() => window.location.href=`/viewProblem?id=${userID}`}>
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
        {userType == "indTrainee"? <ListItem disablePadding>
            <ListItemButton variant="outlined" onClick={handleClickOpenFinancial}>
              <ListItemText primary="Financial" />
            </ListItemButton>
          </ListItem> : null}
          
 
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
      {
//------------------------------------------------------------------------------------------------------------------------------------------------
 }
      <Snackbar open={msg} autoHideDuration={6000} onClose={handleClickMsg}>
        <Alert onClose={handleCloseMsg} severity="success" sx={{ width: '100%' }}>
          Problem Submitted successfully!
        </Alert>
      </Snackbar>
    
      <BootstrapDialog fullWidth={true}
        onClose={handleCloseCourse}
        aria-labelledby="customized-dialog-title"
        open={courseFlag}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseCourse}>
          Courses
        </BootstrapDialogTitle>
        <DialogContent dividers>

        <CourseMenu/>

        <DialogActions>
          <Button autoFocus onClick={handleBackCourse}>
            Back
          </Button>
          <Button autoFocus onClick={handleSubmitCourse}>
            Submit
          </Button>
        </DialogActions>
         
        </DialogContent>
      </BootstrapDialog>        
      {
//------------------------------------------------------------------------------------------------------------------------------------------------
 }
            
 
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

        <DialogActions>
          <Button autoFocus onClick={handleCloseMenu}>
            Back
          </Button>
        </DialogActions>
         
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
       { userType=="indTrainee" && <FormControlLabel value="Low Quality Videos" control={<Radio />} label="Low Quality Videos" onClick={handleSystemInde}/>}
       { userType=="coTrainee" &&<FormControlLabel value="Low Quality Videos" control={<Radio />} label="Low Quality Videos" onClick={handleSystemFL}/>}
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
 
        {userType == "indTrainee"? <BootstrapDialog fullWidth={true}
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
        <FormControlLabel value="Link Not Working" control={<Radio />} label="Link Not Working"  onClick={handleNavigationFL}/>
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
      : null }
 

 {userType == "instructor"? <BootstrapDialog fullWidth={true}
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
        defaultValue=""
        name="radio-buttons-group"
      >
       
        <FormControlLabel value="Promotion not applied" control={<Radio />} label="Promotion not applied" onClick={handleNavigationF}/>
        <FormControlLabel value="Payment of new enrolls in not received" control={<Radio />} label="Payment of new enrolls in not received" onClick={handleNavigationF}/>
        <FormControlLabel value="" control={<Radio />} label="Other" onClick={handleNavigationT}/>
        {input? <input className="report" type="text" placeholder="Explain your problem "
                value={title} onChange={e => setTitle(e.target.value)} onKeyDown={handleKeyDown} /> : null
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
      : null }
         
 
 
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
        <DialogActions>
          <Button autoFocus onClick={handleCloseMenu}>
            Back
          </Button>
        </DialogActions>

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
        <FormControlLabel value="Discount not applied" control={<Radio />} label="Discount not applied" onClick={handleDiscountF}/>
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
        <FormControlLabel value="Refund not accepted" control={<Radio />} label="Refund not accepted" onClick={handleTransferF}/>
        <FormControlLabel value="Refund accepted but not received" control={<Radio />} label="Refund accepted but not received" onClick={handleTransferF}/>
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
        {message && <div className = "msg">{message}</div>}
    </>
  );
}