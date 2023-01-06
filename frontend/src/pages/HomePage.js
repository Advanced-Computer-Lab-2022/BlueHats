import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import HomeCoursesCard from "../components/HomeCourseCard";
import {
  Container,
  CircularProgress,
  Grid,
  Typography,
  Paper,
  Slider,
  TextField,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Rating,
} from "@mui/material";
import Box from "@mui/material/Box";
import { makeStyles } from "tss-react/mui";
import Loader from "../components/Loader"


const useStyles = makeStyles({
  root: {
    marginTop: 20,
  },
  loader: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    display: "flex",
    marginBottom: "1rem",
    padding: "5px",
    marginTop: 1,
  },
  filters: {
    padding: "0 1rem",
  },
  priceRangeInputs: {
    display: "flex",
    justifyContent: "left",
  },
});

const HomePage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const params = location.search ? location.search : null;
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sliderMax, setSliderMax] = useState(1000);
  const [priceRange, setPriceRange] = useState([25, 75]);
  const [filter, setFilter] = useState("");
  const [priceOrder, setPriceOrder] = useState("descending");
  const [sorting, setSorting] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [rating, setRating] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let cancel;

    const fetchData = async () => {
      setLoading(true);
      try {
        let query;

        if (params && !filter) {
          query = params;
        } else {
          query = filter;
        }

        if (sorting) {
          if (query.length === 0) {
            query = `?sort=${sorting}`;
          } else {
            query = query + "&sort=" + sorting;
          }
        }

        const { data } = await axios({
          method: "GET",
          url: `/api/courses${query}`,
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });

        setCourses(data);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.log(error.response.data);
      }
    };

    fetchData();

    return () => cancel();
  }, [filter, params, sorting, subjectName, rating]);

  const handlePriceInputChange = (e, type) => {
    let newRange;

    if (type === "lower") {
      newRange = [...priceRange];
      newRange[0] = Number(e.target.value);

      setPriceRange(newRange);
    }

    if (type === "upper") {
      newRange = [...priceRange];
      newRange[1] = Number(e.target.value);

      setPriceRange(newRange);
    }
  };

  const onSliderCommitHandler = (e, newValue) => {
    buildRangeFilter(newValue);
  };

  const onTextfieldCommitHandler = () => {
    buildRangeFilter(priceRange);
  };

  const buildRangeFilter = (newValue) => {
    const urlFilter = `?price[gte]=${newValue[0]}&price[lte]=${newValue[1]}`;

    setFilter(urlFilter);
    navigate(`${location.pathname}${urlFilter}`);
  };

  const handleSortChange = (e) => {
    setPriceOrder(e.target.value);

    if (e.target.value === "ascending") {
      setSorting("price");
    } else if (e.target.value === "descending") {
      setSorting("-price");
    } else if (e.target.value === "popularity") {
      setSorting("-enrolled");
    }
  };
  const handleChangeSubject = (event) => {
    setSubjectName(event.target.value);
    const urlFilterSubject = `?subject=${event.target.value}`;
    const urlFilterAppendSubject = `&subject=${event.target.value}`;

    if (location.search) {
      if (
        (filter.includes("price[gte]") ||
          filter.includes("price[lte]") ||
          filter.includes("courseRating")) &&
        !filter.includes("subject")
      ) {
        console.log("Checker1");
        setFilter(filter + urlFilterAppendSubject);
        navigate(`${location.pathname}${filter}${urlFilterAppendSubject}`);
        //-------^^DONE^^-------//
      } else if (
        (filter.includes("price[gte]") ||
          filter.includes("price[lte]") ||
          filter.includes("courseRating")) &&
        filter.includes("subject")
      ) {
        console.log("Checker2");
        setFilter(urlFilterSubject);
        navigate(`${location.pathname}${urlFilterSubject}`);
        //-------^^DONE^^-------//
      }
    } else {
      setFilter(urlFilterSubject);
      navigate(`${location.pathname}${urlFilterSubject}`);
    }
  };
  const handleChangeRating = (event) => {
    setRating(event.target.value);
    const urlFilterRating = `?courseRating=${event.target.value}`;
    const urlFilterAppendRating = `&courseRating=${event.target.value}`;

    if (location.search) {
      if (
        (filter.includes("price[gte]") ||
          filter.includes("price[lte]") ||
          filter.includes("subject")) &&
        !filter.includes("courseRating")
      ) {
        console.log("Checker1");
        setFilter(filter + urlFilterAppendRating);
        navigate(`${location.pathname}${filter}${urlFilterAppendRating}`);
        //-------^^DONE^^-------//
      } else if (
        (filter.includes("price[gte]") ||
          filter.includes("price[lte]") ||
          filter.includes("subject")) &&
        filter.includes("courseRating")
      ) {
        console.log("Checker2");
        setFilter(urlFilterRating);
        navigate(`${location.pathname}${urlFilterRating}`);
        //-------^^DONE^^-------//
      }
    } else setFilter(urlFilterRating);
    navigate(`${location.pathname}${urlFilterRating}`);
  };

  const clearAllFilters = () => {
    setFilter("");
    setSorting("");
    setSubjectName("");
    setRating("");
    setPriceRange([0, sliderMax]);
    navigate(`${location.pathname}`);
  };
  const handleDragStart = (e) => e.preventDefault();

const items = [
  <img src={require('../images/img1.jpg')} onDragStart={handleDragStart} role="presentation" alt="homeIMG" />,
  <img src={require('../images/img2.jpg')}  onDragStart={handleDragStart} role="presentation" alt="homeIMG" />,
  <img src={require('../images/img1.jpg')}  onDragStart={handleDragStart} role="presentation" alt="homeIMG"/>,
];
  return (
    <>
    {loading && <Loader/>}
    <div  className='alice'>
    <AliceCarousel 
      sx={{width: 1000,marginLeft:15}}
      items={items}
      autoPlayInterval={5000}
      autoPlayDirection="ltr"
      autoPlay={true}
      fadeOutAnimation={true}
      mouseTrackingEnabled={true}
      disableAutoPlayOnAction={true}
      disableButtonsControls={true}
    />
  </div>
    <Container className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={5}>
            <FormControl component="fieldset" className={classes.filters}>
              <Typography   sx={{ paddingLeft: 3 }} gutterBottom> Filters </Typography>
              <div className={classes.filters}>
                <Slider
                  min={0}
                  max={sliderMax}
                  value={priceRange}
                  valueLabelDisplay="auto"
                  disabled={loading}
                  onChange={(e, newValue) => setPriceRange(newValue)}
                  onChangeCommitted={onSliderCommitHandler}
                  sx={{ paddingLeft: 3 }}
                />

                <div className={classes.priceRangeInputs}>
                  <TextField
                    size="small"
                    id="lower"
                    label="Min Price"
                    variant="outlined"
                    type="number"
                    disabled={loading}
                    value={priceRange[0]}
                    onChange={(e) => handlePriceInputChange(e, "lower")}
                    onBlur={onTextfieldCommitHandler}
                  />

                  <TextField
                    size="small"
                    id="upper"
                    label="Max Price"
                    variant="outlined"
                    type="number"
                    disabled={loading}
                    value={priceRange[1]}
                    onChange={(e) => handlePriceInputChange(e, "upper")}
                    onBlur={onTextfieldCommitHandler}
                  />
                </div>
              </div>
              <Box sx={{ maxWidth: 200, padding: 3}}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={subjectName}
                    label="Subject"
                    onChange={handleChangeSubject}
                  >
                    <MenuItem value={"math"}>Math</MenuItem>
                    <MenuItem value={"cs"}>CS</MenuItem>
                    <MenuItem value={"Management"}>Management</MenuItem>
                    <MenuItem value={"Web Development"}>
                      Web Development
                    </MenuItem>
                    <MenuItem value={"English"}>English</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ maxWidth: 200, padding: 3 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Rating</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={rating}
                    label="Subject"
                    onChange={handleChangeRating}
                  >
                    <MenuItem value={3}>
                      <Rating value={3} readOnly size="small" precision={0.5} />
                    </MenuItem>
                    <MenuItem value={3.5}>
                      <Rating
                        value={3.5}
                        readOnly
                        size="small"
                        precision={0.5}
                      />
                    </MenuItem>
                    <MenuItem value={4}>
                      <Rating value={4} readOnly size="small" precision={0.5} />
                    </MenuItem>
                    <MenuItem value={4.5}>
                      <Rating
                        value={4.5}
                        readOnly
                        size="small"
                        precision={0.5}
                      />
                    </MenuItem>
                    <MenuItem value={5}>
                      <Rating value={5} readOnly size="small" precision={0.5} />
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </FormControl>
            <Button   sx={{ paddingLeft: 3 }} size="small" color="primary" onClick={clearAllFilters}>
              Clear All
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} spacing={2}>
            <Typography   sx={{ paddingLeft: 3 }} gutterBottom>Sort By</Typography>
            <FormControl component="fieldset" className={classes.filters}>
              <RadioGroup
                aria-label="price-order"
                name="price-order"
                value={priceOrder}
                onChange={handleSortChange}
              >
                <FormControlLabel
                  value="descending"
                  disabled={loading}
                  control={<Radio />}
                  label="Price: Highest - Lowest"
                  sx={{ paddingLeft: 3 }}
                />
                <FormControlLabel
                  value="ascending"
                  disabled={loading}
                  control={<Radio />}
                  label="Price: Lowest - Highest"
                  sx={{ paddingLeft: 3 }}
                />
                <FormControlLabel
                  value="popularity"
                  disabled={loading}
                  control={<Radio />}
                  label="Popularity: Highest - Lowest"
                  sx={{ paddingLeft: 3 }}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2}>
        {(
          courses.map((course) => (
            <Grid item key={course._id} xs={12} sm={6} md={4}>
              <HomeCoursesCard course={course} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
    </>
  );
};

export default HomePage;
