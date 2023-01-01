import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import ClickAwayListener from "@mui/base/ClickAwayListener";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SendCertificate({ course }) {
  //   const [open, setOpen] = useState(false);
  const [openSB, setOpenSB] = useState(false);
  //   const [email, setEmail] = useState("");

  // without email form

  var loggedinUser = JSON.parse(localStorage.getItem("user"));
  const savedEmail = loggedinUser.email;
  console.log(savedEmail);

  const handleClickSB = async () => {
    setOpenSB(true);
    await axios.post("http://localhost:4000/api/indTrainee/getCertificate", {
      DynammicEmail: savedEmail,
      DynammicSubject: course.title,
    });
  };
  const handleCloseSB = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSB(false);
  };

  //   //with email form
  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = async () => {
  //     setOpen(false);
  //     if (email.length !== 0) {
  //       await axios.post("http://localhost:4000/api/indTrainee/getCertificate", {
  //         DynammicEmail: email,
  //         DynammicSubject: course.title,
  //       });
  //     }
  //   };
  //   const handleClickAway = () => {
  //     setOpen(true);
  //   };

  return (
    <div>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <div>
          <button
            className="note-form"
            onClick={handleClickSB}
            sx={{
              ":hover": {
                bgcolor: "primary.main",
                color: "white",
              },
            }}
          >
            Done
          </button>
        </div>
        <Snackbar open={openSB} autoHideDuration={4500} onClose={handleCloseSB}>
          <Alert
            onClose={handleCloseSB}
            severity="success"
            sx={{ width: "100%" }}
          >
            Congratulations! You have completed {course.title} course
            successfully. Check Your Email Now!
          </Alert>
        </Snackbar>
      </Stack>
    </div>
    // <div>
    //   <div className="note-form">
    //     <Button variant="outlined" onClick={handleClickOpen}>
    //       Certificate{}{" "}
    //     </Button>
    //   </div>
    //   <ClickAwayListener onClickAway={handleClickAway}>
    //     <Dialog
    //       open={open}
    //       onClose={handleClose}
    //       onSubmit={handleSubmit(onSubmit)}
    //     >
    //       <DialogTitle>
    //         Congratulations!
    //         <div></div>
    //       </DialogTitle>
    //       <DialogContent>
    //         <DialogContentText>
    //           You have successfully completed {course.title}. <br></br>
    //           To receive your certificate via email, please enter your email
    //           address here.
    //         </DialogContentText>
    //         <TextField
    //           autoFocus
    //           margin="dense"
    //           id="name"
    //           label="Email Address"
    //           type="email"
    //           fullWidth
    //           variant="standard"
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //       </DialogContent>
    //       <DialogActions>
    //         <div className="note-form">
    //           <Button onClick={handleClose}>Maybe Later!</Button>
    //         </div>
    //         <div className="note-form">
    //           <Button onClick={handleClose}>Send</Button>
    //         </div>
    //         <Button onClick={clickHandler}>Download Certificate</Button>
    //       </DialogActions>
    //     </Dialog>
    //   </ClickAwayListener>
    // </div>
  );
}

export default SendCertificate;

//Certificate SVG

/* <svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 2 2"
strokeWidth="1.5"
stroke="currentColor"
className="w-6 h-6"
>
<path
  strokeLinecap="round"
  strokeLinejoin="round"
  d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
/>
</svg> */

//get current Email

//   var loggedinUser = JSON.parse(localStorage.getItem('user'));
//   const savedEmail = loggedinUser.email;
