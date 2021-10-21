import React from "react";
import Masonry from "react-masonry-css";
import CheckIcon from "@material-ui/icons/Check";
import createProd from "../../assets/createProduct.svg";
import FileUpload from "./FileUpload";
import {
  Typography,
  Button,
  makeStyles,
  TextField,
  Grid,
  CardMedia,
  FormControl,
  OutlinedInput,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  paperClass: {
    maxWidth: 800,
    maxHeight: 1600,
    [theme.breakpoints.down("md")]: {
      maxWidth: 450,
      maxheight: 1800,
    },
    alignContent: "center",
    marginTop: theme.spacing(4),
    margin: "auto",
    flexDirection: "column",
    padding: theme.spacing(4),
    backgroundColor: "#d0dfea",
  },
  media: {
    width: 400,
    height: 400,
    [theme.breakpoints.down("sm")]: {
      width: 200,
      height: 200,
      marginLeft: 40,
    },
    alignContent: "center",
    margin: theme.spacing(2),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2),
  },
  headerField: {
    margin: theme.spacing(2),
    display: "block",
  },
  writeField: {
    alignContent: "center",
    margin: theme.spacing(3),
    marginTop: theme.spacing(5),
  },
  attrField: {
    width: "100%",
    margin: theme.spacing(2),
    paddingRight: theme.spacing(6),
  },
  numField: {
    margin: theme.spacing(2),
    paddingRight: theme.spacing(6),
  },
  selectField: {
    width: "90%",
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  selectField2: {
    width: "90%",
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(2),
  },
  btn: {
    marginTop: theme.spacing(3),
  },
}));

const ProductUpdateForm = ({
  heading,
  handleSubmit,
  handleChange,
  listOfCategories,
  listOfSubCategories,
  enumColors,
  enumBrands,
  values,
  setValues,
  loading,
  setLoading,
  handleCategoryChange,
  arrayOfSubIDs,
  setArrayOfSubIDs,
  cateId,
  setCateId,
}) => {
  const {
    title,
    description,
    price,
    category,
    subCategories,
    shipping,
    quantity,
    color,
    brand,
  } = values;
  const breakpointColumnsObj = {
    default: 2,
    900: 2,
    500: 1,
  };

  const breakpointColumnsObj2 = {
    default: 3,
    900: 3,
    700: 2,
    350: 1,
  };
  const classes = useStyles();

  return (
    <Paper className={classes.paperClass}>
      <Typography
        variant="h4"
        component="h2"
        color="textSecondary"
        align="center"
        gutterBottom
        className={classes.headerField}
      >
        {heading}
      </Typography>

      <Grid container justifyContent="center" alignContent="center">
        <form onSubmit={handleSubmit}>
          <FormControl noValidate autoComplete="off">
            <CardMedia
              className={classes.media}
              image={createProd}
              title={heading}
            />
            <TextField
              name="title"
              placeholder="For eg:- HP all in one PC"
              label="Title of product"
              className={classes.attrField}
              onChange={handleChange}
              variant="outlined"
              helperText="Enter title of the product"
              required
              value={title}
            />
            <TextField
              name="description"
              onChange={handleChange}
              className={classes.attrField}
              label="Describe the product"
              helperText="Enter description of the product"
              variant="outlined"
              required
              fullWidth
              multiline
              value={description}
              rows={4}
            />
            <Masonry
              breakpointCols={breakpointColumnsObj2}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              <FormControl>
                <OutlinedInput
                  name="price"
                  value={price}
                  type="number"
                  onChange={handleChange}
                  className={classes.numField}
                  startAdornment={<i class="fa fa-inr mr-2 pt-1" />}
                  required
                  placeholder="Price"
                />
                <FormHelperText className="ml-4">
                  Enter the price of the product
                </FormHelperText>
              </FormControl>
              <FormControl>
                <OutlinedInput
                  name="quantity"
                  value={quantity}
                  type="number"
                  onChange={handleChange}
                  className={classes.numField}
                  required
                  placeholder="Quantity"
                />
                <FormHelperText className="ml-4">
                  Quantity of the product
                </FormHelperText>
              </FormControl>
              <FormControl
                variant="outlined"
                sx={{ m: 1, minWidth: 100 }}
                className={classes.selectField}
                required
              >
                <InputLabel id="demo-simple-select-required-label">
                  Shipping
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={shipping}
                  defaultValue=""
                  name="shipping"
                  label="Shipping"
                  onChange={handleChange}
                >
                  <MenuItem value="" disabled>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
                <FormHelperText>
                  Is the product available for customers?
                </FormHelperText>
              </FormControl>
            </Masonry>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              <FormControl
                variant="outlined"
                sx={{ m: 1, minWidth: 100 }}
                className={classes.selectField2}
                required
              >
                <InputLabel id="demo-simple-select-required-label">
                  Product category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  defaultValue={null}
                  value={cateId}
                  name="category"
                  label="Parent Category"
                  onChange={(e) => {
                    e.preventDefault();
                    setCateId(e.target.value);
                    handleCategoryChange(e.target.value);
                  }}
                >
                  {listOfCategories.length > 0 &&
                    listOfCategories.map((c) => (
                      <MenuItem key={c._id} value={c._id}>
                        {c.name}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText>
                  The product will belong to this parent category
                </FormHelperText>
              </FormControl>
              {listOfSubCategories.length > 0 ? (
                <FormControl
                  variant="outlined"
                  sx={{ m: 1, minWidth: 100 }}
                  className={classes.selectField2}
                  required
                >
                  <InputLabel id="demo-simple-select-required-label">
                    Product Subcategories
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    label="Parent Subs"
                    id="demo-multiple-name"
                    multiple
                    name="subCategories"
                    value={arrayOfSubIDs}
                    onChange={(e) => {
                      e.preventDefault();
                      setValues({ ...values, subCategories: e.target.value });
                      setArrayOfSubIDs(e.target.value);
                    }}
                    input={<OutlinedInput label="subCategories" />}
                  >
                    <MenuItem value="" disabled>
                      <em>None</em>
                    </MenuItem>
                    {listOfSubCategories.map((sub) => (
                      <MenuItem key={sub._id} value={sub._id}>
                        {sub.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    The product will belong to these sub-categories
                  </FormHelperText>
                </FormControl>
              ) : (
                <Typography
                  variant="subtitle1"
                  color="primary"
                  className={classes.writeField}
                >
                  No sub categories belong to this category
                </Typography>
              )}
            </Masonry>
          </FormControl>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            <FormControl
              variant="outlined"
              sx={{ m: 1, minWidth: 100 }}
              className={classes.selectField2}
              required
            >
              <InputLabel id="demo-simple-select-required-label">
                Product color
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={color}
                name="color"
                label="Color"
                onChange={handleChange}
              >
                {enumColors.length > 0 &&
                  enumColors.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText>Color of the product</FormHelperText>
            </FormControl>
            <FormControl
              variant="outlined"
              sx={{ m: 1, minWidth: 100 }}
              className={classes.selectField2}
              required
            >
              <InputLabel id="demo-simple-select-required-label">
                Product brand
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={brand}
                name="brand"
                label="Brand"
                onChange={handleChange}
              >
                {enumBrands.length > 0 &&
                  enumBrands.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText>Brand of the product</FormHelperText>
            </FormControl>
          </Masonry>
          <Grid container justifyContent="center" alignContent="center">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </Grid>

          <Grid container justifyContent="center" alignContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className={classes.btn}
              endIcon={<CheckIcon />}
              disabled={
                loading ||
                !title ||
                !description ||
                !category ||
                !subCategories ||
                !shipping ||
                !quantity ||
                !price ||
                !color ||
                !brand
              }
            >
              Submit
            </Button>
          </Grid>
        </form>
      </Grid>
    </Paper>
  );
};

export default ProductUpdateForm;
