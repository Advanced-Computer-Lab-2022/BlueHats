import React, { useState, useEffect } from "react";
import { useCoursesContext } from "../hooks/useCoursesContext";
import { getParamByParam } from "iso-country-currency";
import { countryValue } from "../components/Navbar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import Rating from "@mui/material/Rating";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import Axios from "axios";
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";

function InstructorCourseCard({ course }) {
  const { dispatch } = useCoursesContext();
  const [open, setOpen] = useState(false);
  const [promotionEditedStart, setPromotionStartEdited] = useState("");
  const [promotionEditedEnd, setPromotionEditedEnd] = useState("");
  const [newPromotion, setNewPromotion] = useState(null);
  const [currency, setCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  // Initializing all the state variables
  const [info, setInfo] = useState([]);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("egp");
  const [output, setOutput] = useState(0);

  // Calling the api whenever the dependency changes
  useEffect(() => {
    Axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
    ).then((res) => {
      setInfo(res.data[from]);
    });
    convert();
    setCurrency(getParamByParam("countryName", countryValue, "symbol"));
    setToCurrency(getParamByParam("countryName", countryValue, "currency"));
    set();
  }, [from, info]);

  const handleDelete = async () => {
    const response = await fetch("/api/courses/" + course._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_COURSE", payload: json });
    }
  };
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
  const handleClick = async () => {
    const response = await fetch("/api/courses/" + course._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_COURSE", payload: json });
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    if (newPromotion !== null) {
      Axios.patch(`http://localhost:4000/api/courses/${course._id}`, {
        promotionEnd: promotionEditedEnd,
        promotion: newPromotion,
      });
      //   window.location.reload(false);
    }
  };

  const handleClickAway = () => {
    setOpen(true);
  };
  const handleCloseWithoutEditing = () => {
    setOpen(false);
  };

  const result = course.subtitle.reduce(
    (total, currentValue) => (total = total + currentValue.hours),
    0
  );
  function CheckNumber() {
    if (result > 1) {
      return "hours";
    }
    if (result === 1) {
      return "hour";
    }
  }
  function priceAfterDiscount(price, promotion) {
    if (promotion !== isNaN) {
      const priceAfter = price * (1 - promotion / 100);
      return priceAfter;
    } else {
      return price;
    }
  }

  function disableDates() {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  }
  function set() {
    if (toCurrency !== isNaN) setTo(toCurrency.toLowerCase());
  }

  function convert() {
    var rate = info[to];
    setOutput(Math.round(course.price * rate));
  }

  return (
    <Card>
      <CardHeader
        avatar={<Avatar />}
        title={<Typography variant="h6">{course.title}</Typography>}
      />
      <CardContent>
        <Typography variant="body" paragraph>
          Subject: {course.subject}
        </Typography>
        <Typography variant="overline" paragraph="true">
          {course.summary}
        </Typography>
        {course.enrolled > 0 ? (
          <Typography variant="body2">
            Enrolled Trainees: {course.enrolled}
          </Typography>
        ) : (
          <Typography variant="body2">Enrolled Trainees: 0</Typography>
        )}
        <Typography variant="h6" gutterBottom>
          {formatter.format(priceAfterDiscount(course.price, course.promotion))}
        </Typography>
        {course.promotion > 0 && (
          <Typography
            variant="body2"
            style={{ textDecoration: "line-through" }}
          >
            {formatter.format(course.price)}
          </Typography>
        )}
        {course.promotion > 0 ? (
          <Typography variant="body2">
            Promotion: {course.promotion}%{" "}
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={handleOpen}
            >
              Edit
            </Button>
          </Typography>
        ) : (
          <Typography variant="body2">
            Promotion: {""}
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={handleOpen}
            >
              Add
            </Button>
          </Typography>
        )}
        <div float="left">
          <ClickAwayListener onClickAway={handleClickAway}>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Edit/Add a Promotion</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Discount Percentage"
                  value={newPromotion}
                  type="number"
                  onChange={(e) => setNewPromotion(e.target.value)}
                  variant="outlined"
                />
                <p>Promotion Start Date:</p>
                <input
                  autoFocus
                  margin="dense"
                  id="startDate"
                  value={promotionEditedStart}
                  type="date"
                  min={disableDates()}
                  onKeyDown={(e) => e.preventDefault()}
                  onChange={(e) => setPromotionStartEdited(e.target.value)}
                  variant="outlined"
                />
                <p>Promotion End Date:</p>
                <input
                  autoFocus
                  margin="dense"
                  id="endDate"
                  type="date"
                  value={promotionEditedEnd}
                  min={disableDates()}
                  onKeyDown={(e) => e.preventDefault()}
                  onChange={(e) => setPromotionEditedEnd(e.target.value)}
                  variant="outlined"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseWithoutEditing}>Cancel</Button>
                <Button onClick={handleClose}>Done</Button>
              </DialogActions>
            </Dialog>
          </ClickAwayListener>
        </div>
        <Rating
          value={course.courseRating}
          readOnly
          name={course.title}
          size="small"
          precision={0.5}
        />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() =>
            (window.location.href = `/course/view?id=${course._id}`)
          }
        >
          Learn More
        </Button>
        <Button
          variant="contained"
          size="small"
          color="error"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default InstructorCourseCard;
