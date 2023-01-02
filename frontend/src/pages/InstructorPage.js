import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import InstructorCoursesCard from "../components/InstructorCourseCard";
import { acceptedX } from "../components/ContractForm";
import { Link } from "react-router-dom";
import Popover from "@mui/material/Popover";
import AddCircleIcon from "@mui/icons-material/AddCircle";

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

const InstructorPage = () => {
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
  const [open, setOpen] = useState(false);
  const [accepted, setAccepted] = useState([]);
  const [valid, setValid] = useState(false);


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
    }
    ;

    fetchData();

    return () => cancel();
  }, [filter, params, sorting, subjectName, rating, open]);

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
    const urlFilterSubject = `subject=${event.target.value}`;
    const urlFilterAppendSubject = `&subject=${event.target.value}`;

    if (location.search) {
      if (
        (searchParams.has("price[gte]") ||
          searchParams.has("price[lte]") ||
          searchParams.has("courseRating")) &&
        !searchParams.has("subject")
      ) {
        console.log("Checker1");
        setFilter(`${location.search}${urlFilterAppendSubject}`);
        setSearchParams(`${location.search}${urlFilterAppendSubject}`);

        navigate(`${location}${urlFilterAppendSubject}`);
        console.log(filter);
        //-------^^DONE^^-------//
      } else if (filter.includes("&subject")) {
        console.log("Checker2");
        console.log(filter);
        // searchParams.delete("subject");
        // setSearchParams(urlFilterSubject);
        // // navigate(`${location.pathname}?${urlFilterSubject}`);
        setFilter(filter + urlFilterSubject);
        // setFilter(searchParams);

        navigate(`${location.pathname}${filter}`);
      } else if (filter.includes("?subject")) {
        setFilter(`?urlFilterSubject`)
        navigate(`${location.pathname}?${urlFilterSubject}`);
      }
    } else setFilter(`?subject=${event.target.value}`);
    navigate(`${location.pathname}?subject=${event.target.value}`);
  };
  const handleChangeRating = (event) => {
    setSubjectName(event.target.value);
    const urlFilterRating = `courseRating=${event.target.value}`;
    const urlFilterAppendRating = `&courseRating=${event.target.value}`;

    if (location.search) {
      if (
        (searchParams.has("price[gte]") ||
          searchParams.has("price[lte]") ||
          searchParams.has("subject")) &&
        !searchParams.has("courseRating")
      ) {
        console.log("Checker1");
        setFilter(location.search + urlFilterAppendRating);
        setSearchParams(location.search + urlFilterAppendRating);

        navigate(`${location}${urlFilterAppendRating}`);
        console.log(filter);
        //-------^^DONE^^-------//
      } else if (
        // (searchParams.has("price[gte]") ||
        // searchParams.has("price[lte]") ||
        // searchParams.has("courseRating")) &&
        searchParams.has("subject") ||
        filter.includes("courseRatinng")
      ) {
        console.log("Checker2");
        console.log(filter);
        console.log(searchParams.toString());
        // searchParams.delete("subject");
        // setSearchParams(urlFilterSubject);
        // // navigate(`${location.pathname}?${urlFilterSubject}`);
        setFilter(filter + urlFilterRating);
        // setFilter(searchParams);

        navigate(`${location.pathname}${filter}`);
      }
    } else setFilter(`?courseRating=${event.target.value}`);
    navigate(`${location.pathname}?courseRating=${event.target.value}`);
  };

  const clearAllFilters = () => {
    setFilter("");
    setSorting("");
    setSubjectName("");
    setRating("");
    setPriceRange([0, sliderMax]);
    navigate(`${location.pathname}`);
  };

  const navigateAddCourse = () => {
    navigate("/instructor/addCourse");
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  // const open = Boolean(anchorEl);

  return (
    <Container className={classes.root}>
      <Grid container spacing={2}>
        <Grid xs={6} md={8}>
          <Paper className={classes.paper}>
            <Grid container>
              <Grid item xs={6} sm={5}>
                <FormControl component="fieldset" className={classes.filters}>
                  <Typography gutterBottom> Filters </Typography>
                  <div className={classes.filters}>
                    <Slider
                      min={0}
                      max={sliderMax}
                      value={priceRange}
                      valueLabelDisplay="auto"
                      disabled={loading}
                      onChange={(e, newValue) => setPriceRange(newValue)}
                      onChangeCommitted={onSliderCommitHandler}
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
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Subject
                      </InputLabel>
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
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Rating
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={rating}
                        label="Subject"
                        onChange={handleChangeRating}
                      >
                        <MenuItem value={3}>
                          <Rating
                            value={3}
                            readOnly
                            size="small"
                            precision={0.5}
                          />
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
                          <Rating
                            value={4}
                            readOnly
                            size="small"
                            precision={0.5}
                          />
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
                          <Rating
                            value={5}
                            readOnly
                            size="small"
                            precision={0.5}
                          />
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Typography gutterBottom>Sort By</Typography>
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
                    />
                    <FormControlLabel
                      value="ascending"
                      disabled={loading}
                      control={<Radio />}
                      label="Price: Lowest - Highest"
                    />
                    <FormControlLabel
                      value="popularity"
                      disabled={loading}
                      control={<Radio />}
                      label="Popularity: Highest - Lowest"
                    />
                  </RadioGroup>
                  <Button
                    size="medium"
                    color="primary"
                    onClick={clearAllFilters}
                  >
                    Clear All
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid xs={6} md={4}>
        <div className="add-course-button">
          <Typography
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            {valid === true && (
              <AddCircleIcon
                fontSize="large"
                sx={{ color: "#a256e0", cursor: "pointer" }}
                onClick={navigateAddCourse}
              />
            )}
          </Typography>
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: "none",
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1 }}>Add Course</Typography>
          </Popover>
        </div>
          <Link to="/contract" state={accepted}>
            Contract
          </Link>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {loading ? (
          <div className={classes.loader}>
            <CircularProgress size="3rem" thickness={5} />
          </div>
        ) : (
          courses.map((course) => (
            <Grid item key={course._id} xs={12} sm={6} md={7}>
              <InstructorCoursesCard course={course} openProp={open} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default InstructorPage;
