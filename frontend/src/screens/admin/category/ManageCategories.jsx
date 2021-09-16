import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  getAllCategories,
  deleteCategory,
  createCategory,
} from "../../../functions/category";
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
import CategoryForm from "../../../components/forms/CategoryForm";
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
const ManageCategories = ({ history }) => {
  const classes = useStyles();
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [listOfCategories, setListOfCategories] = useState([]);
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getAllCategories().then((c) => setListOfCategories(c.data));

  const handleDelete = async (event, slug) => {
    event.preventDefault();
    if (window.confirm(`Delete ${slug}?`)) {
      setLoading(true);
      deleteCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.info(`${res.data.name} was successfully deleted`);
          loadCategories();
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
    history.push(`/admin/update/category/${slug}`);
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    await createCategory({ name: categoryName }, user.token)
      .then((res) => {
        setLoading(false);
        setCategoryName("");
        toast.success(`"${res.data.name}" has been successfully created`);
        loadCategories();
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
  const allCategories = (
    <div>
      <Divider />
      <List>
        {listOfCategories.map((category) => (
          <>
            <ListItem key={category.name}>
              <ListItemText primary={category.name} />
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="update"
                  onClick={(event) => {
                    redirectUpdate(event, category.slug);
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
                    handleDelete(event, category.slug);
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
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-5">
          <Paper elevation={2} className={classes.paperClass}>
            <Typography
              variant="h6"
              component="h2"
              color="textSecondary"
              align="center"
              gutterBottom
              className={classes.headerField2}
            >
              Manage Categories
            </Typography>
            {allCategories}
          </Paper>
        </div>

        <div className="col">
          {loading ? (
            <div className="container text-center">
              <Spin spinning={loading} size="large" tip="Loading..." />
            </div>
          ) : (
            <CategoryForm
              handleSubmitForm={handleSubmitForm}
              buttonText="Create Category"
              title="Create Category"
              categoryName={categoryName}
              setCategoryName={setCategoryName}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default ManageCategories;
