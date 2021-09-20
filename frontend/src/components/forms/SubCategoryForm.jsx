import React from "react";
import {
  Card,
  Typography,
  Button,
  makeStyles,
  TextField,
  Grid,
  CardActions,
  CardMedia,
  CardActionArea,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import createCategoryImg from "../../assets/sub-category.svg";
import CheckIcon from "@material-ui/icons/Check";
const useStyles = makeStyles((theme) => ({
  cardClass: {
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
  },
  media: {
    width: 252,
    height: 252,
    [theme.breakpoints.down("sm")]: {
      width: 168,
      height: 168,
      marginLeft: 40,
    },
    margin: theme.spacing(2),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2),
  },
  headerField: {
    margin: theme.spacing(2),
    display: "block",
  },
  attrField: {
    width: "115%",
    paddingRight: theme.spacing(6),
    marginBottom: theme.spacing(3),
  },
  btn: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const SubCategoryForm = ({
  handleSubmitForm,
  buttonText,
  title,
  subCategoryName,
  setSubCategoryName,
  loading,
  categoryList,
  parentCategoryID,
  setParentCategoryID,
}) => {
  const classes = useStyles();
  return (
    <Card
      variant="elevation"
      style={{ backgroundColor: "#d0dfea" }}
      className={classes.cardClass}
    >
      <CardActionArea>
        <Typography
          variant="h6"
          component="h2"
          color="textSecondary"
          align="center"
          gutterBottom
          className={classes.headerField}
        >
          {title}
        </Typography>
        <Grid container justifyContent="center" alignContent="center">
          <FormControl noValidate autoComplete="off">
            <CardMedia
              className={classes.media}
              image={createCategoryImg}
              title="Create a new sub-category"
            />
            <TextField
              name="Sub-Category"
              placeholder="Eg:- Laptops"
              label="Create a new sub category"
              className={classes.attrField}
              onChange={(event) => setSubCategoryName(event.target.value)}
              value={subCategoryName}
              variant="outlined"
              helperText="At least 2 characters"
              required
              disabled={loading}
            />
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 100 }}>
              <InputLabel id="demo-simple-select-required-label">
                Choose Parent Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={parentCategoryID}
                label="Parent Category"
                required
                onChange={(e) => setParentCategoryID(e.target.value)}
              >
                <MenuItem value="" disabled>
                  <em>None</em>
                </MenuItem>
                {categoryList.length > 0 &&
                  categoryList.map((c) => (
                    <MenuItem key={c._id} value={c._id}>
                      {c.name}
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText>
                The sub-category will belong to this parent category
              </FormHelperText>
            </FormControl>
            <br />
            <CardActions>
              <div className="container pl-5">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitForm}
                  className={classes.btn}
                  endIcon={<CheckIcon />}
                  disabled={
                    loading || subCategoryName.length < 2 || !parentCategoryID
                  }
                >
                  {buttonText}
                </Button>
              </div>
            </CardActions>
            <br />
          </FormControl>
        </Grid>
      </CardActionArea>
    </Card>
  );
};
export default SubCategoryForm;
