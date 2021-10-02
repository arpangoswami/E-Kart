import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getAllCategories } from "../../../functions/category";
import {
  getAllSubCategories,
  deleteSubCategory,
  createSubCategory,
} from "../../../functions/subCategory.js";
import {
  Typography,
  makeStyles,
  Paper,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Divider,
} from "@material-ui/core";
import BuildIcon from "@material-ui/icons/Build";
import DeleteIcon from "@material-ui/icons/Delete";
import { Spin } from "antd";
import LocalSearch from "../../../components/forms/LocalSearch";
import SubCategoryForm from "../../../components/forms/SubCategoryForm";
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
  headerField2: {
    paddingTop: theme.spacing(4),
    margin: theme.spacing(4),
    display: "block",
  },
  leftButton: {
    marginLeft: theme.spacing(4),
  },
}));
const ManageSubCategory = ({ history, match }) => {
  const classes = useStyles();
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [listOfCategories, setListOfCategories] = useState([]);
  const [listOfSubCategories, setListOfSubCategories] = useState([]);
  const [parentCategoryID, setParentCategoryID] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, []);

  const loadCategories = () =>
    getAllCategories().then((c) => setListOfCategories(c.data));

  const loadSubCategories = () =>
    getAllSubCategories().then((c) => setListOfSubCategories(c.data));

  const handleDelete = async (event, slug) => {
    event.preventDefault();
    if (window.confirm(`Delete ${slug}?`)) {
      setLoading(true);
      deleteSubCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.info(`${res.data.name} was successfully deleted`);
          loadSubCategories();
        })
        .catch((err) => {
          setLoading(false);
          toast.error(
            `${slug} wasn't deleted because of ${err}. Please login again`
          );
        });
    }
  };

  const redirectUpdate = async (event, slug) => {
    event.preventDefault();
    history.push(`/admin/update/sub-category/${slug}`);
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  const allSubCategories = (
    <div>
      <Divider />
      <List>
        {listOfSubCategories.filter(searched(keyword)).map((subCategory) => (
          <>
            <ListItem key={subCategory.name}>
              <ListItemText primary={subCategory.name} />
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="update"
                  onClick={(event) => {
                    redirectUpdate(event, subCategory.slug);
                  }}
                  className={classes.leftButton}
                >
                  <Typography color="secondary" variant="subtitle1">
                    Update
                  </Typography>
                  <BuildIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={(event) => {
                    handleDelete(event, subCategory.slug);
                  }}
                >
                  <Typography color="secondary" variant="subtitle1">
                    Delete
                  </Typography>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </div>
  );
  const subCategoriesList = (
    <Paper elevation={2} className={classes.paperClass}>
      <Typography
        variant="h6"
        component="h2"
        color="textSecondary"
        align="center"
        gutterBottom
        className={classes.headerField2}
      >
        Manage Sub-Categories
      </Typography>
      {allSubCategories}
    </Paper>
  );

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    await createSubCategory(
      { name: subCategoryName, parent: parentCategoryID },
      user.token
    )
      .then((res) => {
        setLoading(false);
        setSubCategoryName("");
        toast.success(`"${res.data.name}" has been successfully created`);
        loadSubCategories();
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
        if (err.response.status === 400) {
          toast.error(`THERE ${err.response.data}`);
        } else {
          toast.error(`HERE ${err}`);
        }
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-5">
          {/* {searchForm} */}
          <LocalSearch
            keyword={keyword}
            loading={loading}
            setKeyword={setKeyword}
            title="Search for Sub-Category"
            searchText="Search for Sub-Category"
          />
          {subCategoriesList}
        </div>
        <div className="col">
          {loading ? (
            <div className="container text-center">
              <Spin spinning={loading} size="large" tip="Loading..." />
            </div>
          ) : (
            <SubCategoryForm
              handleSubmitForm={handleSubmitForm}
              buttonText="Create SubCategory"
              title="Create SubCategory"
              subCategoryName={subCategoryName}
              setSubCategoryName={setSubCategoryName}
              loading={loading}
              categoryList={listOfCategories}
              parentCategoryID={parentCategoryID}
              setParentCategoryID={setParentCategoryID}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default ManageSubCategory;
