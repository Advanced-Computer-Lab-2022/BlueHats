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
import PaymentsIcon from '@mui/icons-material/Payments';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import ReportMenu from './ReportMenu';

import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import axios from "axios";

export default function AccountMenu() {

  var loggedinUser = JSON.parse(localStorage.getItem('user'));
  const userID = loggedinUser.id;
  const type = loggedinUser.type;
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [open1, setOpen1] = useState(false);

  const { user } = useAuthContext()
  const { logout } = useLogout()

  const [wallet, setWallet] = useState(0); 

  useEffect(() =>  {
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
  },[type, userID])

  const handleClickOpen = () => {
    setOpen1(true);
  };

  const handleCloseD = () => {
    setOpen1(false);
  };

  const handleLog = () => 
  {
      logout()
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
      {( user.type=="instructor") && <MenuItem>
        <ListItemIcon>
          <PaymentsIcon />
        </ListItemIcon>
        Monthly Payments
      </MenuItem>}
        <MenuItem>
          <ListItemIcon>
            <ReportProblemIcon />
          </ListItemIcon>
          Report a Problem
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
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
    </div></>
  );
}
