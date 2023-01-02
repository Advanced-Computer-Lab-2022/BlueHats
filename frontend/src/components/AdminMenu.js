import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DiscountIcon from '@mui/icons-material/Discount';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import MenuBookIcon from '@mui/icons-material/MenuBook';
 
 
 
 
export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });
 
    const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
 
    setState({ ...state, [anchor]: open });
  };
 
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() =>window.location.href=`/admin/addAdmin`}>
              <ListItemIcon>
                <PersonAddAltIcon />
              </ListItemIcon>
              <ListItemText primary="Add a new admin" />
            </ListItemButton>
          </ListItem>
 
          <ListItem  disablePadding>
            <ListItemButton onClick={() =>window.location.href=`/admin/instructor`}>
              <ListItemIcon>
                <PersonAddAltIcon />
              </ListItemIcon>
              <ListItemText primary="Add a new instructor" />
            </ListItemButton>
          </ListItem>
 
          <ListItem  disablePadding>
            <ListItemButton onClick={() =>window.location.href=`/admin/corporateTrainee`}>
              <ListItemIcon>
               <PersonAddAltIcon />
              </ListItemIcon>
              <ListItemText primary="Add a new corporate trainee" />
            </ListItemButton>
          </ListItem>
 
        </List>
 
      <Divider />
 
      <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() =>window.location.href=`/admin/viewAdmins`}>
              <ListItemIcon>
                <PeopleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Admins" />
            </ListItemButton>
          </ListItem>
 
          <ListItem  disablePadding>
            <ListItemButton onClick={() =>window.location.href=`/admin/viewInstructors`}>
              <ListItemIcon>
                <PeopleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Instructors" />
            </ListItemButton>
          </ListItem>
 
          <ListItem  disablePadding>
            <ListItemButton onClick={() =>window.location.href=`/admin/viewCoTrainees`}>
              <ListItemIcon>
               <PeopleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Corporate Trainees" />
            </ListItemButton>
          </ListItem>
 
          <ListItem  disablePadding>
            <ListItemButton onClick={() =>window.location.href=`/admin/viewIndTrainees`}>
              <ListItemIcon>
               <PeopleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Individual Trainees" />
            </ListItemButton>
          </ListItem>
 
          <ListItem  disablePadding>
            <ListItemButton onClick={() =>window.location.href=`/adminhome/`}>
              <ListItemIcon>
               <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Courses" />
            </ListItemButton>
          </ListItem>
 
        </List>
 
        <Divider />
 
      <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() =>window.location.href=`/adminPage`}>
              <ListItemIcon>
               <ReportProblemIcon />
              </ListItemIcon>
              <ListItemText primary='Reported problems' />
            </ListItemButton>
          </ListItem>
 
          <ListItem disablePadding>
            <ListItemButton onClick={() =>window.location.href=`/requests/admin`}>
              <ListItemIcon>
               <LibraryAddIcon />
              </ListItemIcon>
              <ListItemText primary='Course requests' />
            </ListItemButton>
          </ListItem>
      </List>
 
      <Divider />
 
      <List>
       
          <ListItem disablePadding>
            <ListItemButton onClick={() =>window.location.href=`/AdminHome`}>
              <ListItemIcon>
                <DiscountIcon />
              </ListItemIcon>
              <ListItemText primary="Add a promotion"/>
            </ListItemButton>
          </ListItem>
 
        <ListItem disablePadding>
            <ListItemButton onClick={() =>window.location.href=`/RefundRequests`} >
              <ListItemIcon>
                <LocalOfferIcon />
              </ListItemIcon>
              <ListItemText primary='Refund requests' />
            </ListItemButton>
          </ListItem>
      </List>
 
      <Divider />
    </Box>
  );
 
  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
            <div className='menu'>
           <MenuIcon on onClick={toggleDrawer(anchor, true)}>{anchor}</MenuIcon>
           </div>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
