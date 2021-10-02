import React from "react";
import {
  Paper,
  makeStyles,
  TextField,
  Grid,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
const useStyles = makeStyles((theme) => ({
  paperClass: {
    maxWidth: 600,
    maxHeight: 800,
    [theme.breakpoints.down("md")]: {
      maxWidth: 400,
      maxheight: 533,
    },
    alignContent: "center",
    marginTop: theme.spacing(4),
    margin: "auto",
    flexDirection: "column",
    backgroundColor: "#d0dfea",
  },
  attrField: {
    width: "45%",
    marginBottom: theme.spacing(4),
  },
  headerField2: {
    paddingTop: theme.spacing(4),
    margin: theme.spacing(4),
    display: "block",
  },
}));
const LocalSearch = ({ keyword, setKeyword, loading, title, searchText }) => {
  const classes = useStyles();
  const handleSearch = (event) => {
    event.preventDefault();
    setKeyword(event.target.value.toLowerCase());
  };
  return (
    <Paper elevation={2} className={classes.paperClass}>
      <Typography
        variant="h6"
        component="h2"
        color="textSecondary"
        align="center"
        gutterBottom
        className={classes.headerField2}
      >
        {title}
      </Typography>
      <Grid item xs={15} style={{ textAlign: "center" }}>
        <TextField
          name="Search for category"
          placeholder="Eg:- Microsoft"
          label={searchText}
          className={classes.attrField}
          onChange={handleSearch}
          value={keyword}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          disabled={loading}
        />
      </Grid>
    </Paper>
  );
};

export default LocalSearch;
