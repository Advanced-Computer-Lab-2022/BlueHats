import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import AdminCoursesCard from "../components/AdminCourseCard";
import AdminMenu from '../components/AdminMenu';
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
  ClickAwayListener,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
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

const AdminHome = () => {
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
  const [promotionEditedStart, setPromotionStartEdited] = useState("");
  const [promotionEditedEnd, setPromotionEditedEnd] = useState("");
  const [newPromotion, setNewPromotion] = useState(null);

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

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    if (newPromotion !== null) {
      axios.patch(`http://localhost:4000/filterBy/patchAll`, {
        promotionStart: promotionEditedStart,
        promotionEnd: promotionEditedEnd,
        promotion: newPromotion,
      });
      window.location.reload(false);
    }
  };

  const handleClickAway = () => {
    setOpen(true);
  };
  const handleCloseWithoutEditing = () => {
    setOpen(false);
  };

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

  function disableDates() {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  }
  const onKeyDown = (e) => {
    e.preventDefault();
  };

  const clearAllFilters = () => {
    setFilter("");
    setSorting("");
    setSubjectName("");
    setRating("");
    setPriceRange([0, sliderMax]);
    console.log(disableDates());
    navigate(`${location.pathname}`);
  };
  return (
    <>
    <AdminMenu/>
    <Container className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={12} sm={5}>
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
              <Box sx={{ minWidth: 120 }}>
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
            <Button size="small" color="primary" onClick={clearAllFilters}>
              Clear All
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
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
            </FormControl>
          </Grid>
          <Grid item>
            <div>
              Promotions
              <Button onClick={handleOpen}> Set For All</Button>
            </div>
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
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      renderInput={(props) => (
                        <TextField
                          onKeyDown={onKeyDown}
                          {...props}
                          size="small"
                          helperText={null}
                        />
                      )}
                      closeOnSelect={true}
                      margin="dense"
                      id="startDate"
                      value={promotionEditedStart}
                      disablePast={true}
                      onChange={(value) => setPromotionStartEdited(value)}
                    />
                  </LocalizationProvider>
                  <p>Promotion End Date:</p>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      renderInput={(props) => (
                        <TextField
                          onKeyDown={onKeyDown}
                          {...props}
                          size="small"
                          helperText={null}
                        />
                      )}
                      closeOnSelect={true}
                      margin="dense"
                      id="startDate"
                      value={promotionEditedEnd}
                      disablePast={true}
                      onChange={(value) => setPromotionEditedEnd(value)}
                    />
                  </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseWithoutEditing}>Cancel</Button>
                  <Button onClick={handleClose}>Done</Button>
                </DialogActions>
              </Dialog>
            </ClickAwayListener>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2}>
        {loading ? (
          <div className={classes.loader}>
            <CircularProgress size="3rem" thickness={5} />
          </div>
        ) : (
          courses.map((course) => (
            <Grid item key={course._id} xs={12} sm={6} md={7}>
              <AdminCoursesCard course={course} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
    </>
  );
};

export default AdminHome;
