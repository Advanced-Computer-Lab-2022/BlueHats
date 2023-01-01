import React, { useState, useEffect } from "react";
import { getParamByParam } from "iso-country-currency";
import { countryValue } from "../components/Navbar";
import Axios from "axios";
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Rating,
  Button,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";

function HomeCourseCard({ course }) {
  const [currency, setCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  // Initializing all the state variables
  const [info, setInfo] = useState([]);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("egp");
  const [output, setOutput] = useState(0);

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

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  const result = course.subtitle.reduce(
    (total, currentValue) => (total = total + currentValue.hours),
    0
  );

  function set() {
    if (toCurrency !== NaN) setTo(toCurrency.toLowerCase());
  }

  function convert() {
    var rate = info[to];
    setOutput(Math.round(course.price * rate));
  }

  function priceAfterDiscount(price, promotion) {
    if (promotion !== isNaN) {
      const priceAfter = price * (1 - promotion / 100);
      return priceAfter;
    } else {
      return price;
    }
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#a256e0" }} variant="rounded">
            <AssignmentIcon />
          </Avatar>
        }
        title={<Typography variant="h6">{course.title}</Typography>}
      />
      <CardContent>
        <Typography variant="caption">{course.summary}</Typography>
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
        <Rating
          value={course.courseRating}
          readOnly
          name={course.title}
          size="medium"
          precision={0.5}
        />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          sx={{ bgcolor: "#a256e0",":hover": { bgcolor: "#810CA8", color: "white" } }}
          onClick={() =>
            (window.location.href = `/course/preview?id=${course._id}`)
          }
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

export default HomeCourseCard;
