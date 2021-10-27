import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  getAllCoupons,
  deleteCoupon,
  createCoupon,
} from "../../../functions/coupon";
import {
  Typography,
  makeStyles,
  Paper,
  IconButton,
  TableHead,
  Table,
  TableContainer,
  TableRow,
  TableCell,
} from "@material-ui/core";
import BuildIcon from "@material-ui/icons/Build";
import DeleteIcon from "@material-ui/icons/Delete";
import { Spin } from "antd";
import CouponForm from "../../../components/forms/CouponForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import moment from "moment";
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

const CreateCoupon = ({ history }) => {
  const classes = useStyles();
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [couponName, setCouponName] = useState("");
  const [expiryDate, setExpiryDate] = useState(new Date("2022-12-31T23:59:59"));
  const [discountPercent, setDiscountPercent] = useState(1);
  const [listOfCoupons, setListOfCoupons] = useState([]);

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = () =>
    getAllCoupons(user.token).then((c) => setListOfCoupons(c.data));

  const handleDelete = async (event, couponId) => {
    event.preventDefault();
    if (window.confirm(`Delete?`)) {
      setLoading(true);
      deleteCoupon(couponId, user.token)
        .then((res) => {
          setLoading(false);
          toast.info(`${res.data.name} was successfully deleted`);
          loadCoupons();
        })
        .catch((err) => {
          setLoading(false);
          toast.error(
            `Coupon deletion failed due to ${err}. Please login again`
          );
        });
    }
  };

  const redirectUpdate = async (event, couponId) => {
    event.preventDefault();
    history.push(`/admin/update/coupon/${couponId}`);
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    await createCoupon(
      {
        name: couponName.toUpperCase(),
        expiry: expiryDate,
        discount: discountPercent,
      },
      user.token
    )
      .then((res) => {
        setLoading(false);
        setCouponName("");
        setExpiryDate(new Date("2022-12-31T23:59:59"));
        setDiscountPercent(1);
        toast.success(`"${res.data.name}" has been successfully created`);
        loadCoupons();
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
  const allCoupons = (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Expiry Date</TableCell>
            <TableCell align="right">Discount(%)</TableCell>
            <TableCell style={{ width: "15%" }} align="right">
              Update
            </TableCell>
            <TableCell style={{ width: "15%" }} align="right">
              Delete
            </TableCell>
          </TableRow>
        </TableHead>

        {listOfCoupons.filter(searched(keyword)).map((coupon) => (
          <TableRow key={coupon._id}>
            <TableCell align="right">
              <Typography variant="body1">{coupon.name}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="body1">
                {moment(coupon.expiry).format("DD MMM, YYYY")}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="body1">{coupon.discount}</Typography>
            </TableCell>
            <TableCell style={{ width: "15%" }} align="right">
              <IconButton
                aria-label="update"
                onClick={(event) => {
                  redirectUpdate(event, coupon._id);
                }}
                className={classes.leftButton}
                className="text-info"
              >
                <BuildIcon />
              </IconButton>
            </TableCell>
            <TableCell style={{ width: "15%" }} align="right">
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={(event) => {
                  handleDelete(event, coupon._id);
                }}
                className="text-danger"
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  );
  const couponList = (
    <TableContainer component={Paper} className={classes.paperClass}>
      <Typography
        variant="h6"
        component="h2"
        color="textSecondary"
        align="center"
        gutterBottom
        className={classes.headerField2}
      >
        Manage Coupons
      </Typography>
      {allCoupons}
    </TableContainer>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-5">
          {/* {searchForm} */}
          <LocalSearch
            keyword={keyword}
            loading={loading}
            setKeyword={setKeyword}
            title="Search for Coupon"
            searchText="Search for Coupon"
          />
          {couponList}
        </div>
        <div className="col">
          {loading ? (
            <div className="container text-center">
              <Spin spinning={loading} size="large" tip="Loading..." />
            </div>
          ) : (
            <CouponForm
              handleSubmitForm={handleSubmitForm}
              buttonText="Create Coupon"
              title="Create Coupon"
              couponName={couponName}
              setCouponName={setCouponName}
              expiryDate={expiryDate}
              setExpiryDate={setExpiryDate}
              discountPercent={discountPercent}
              setDiscountPercent={setDiscountPercent}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default CreateCoupon;
