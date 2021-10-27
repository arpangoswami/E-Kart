import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getSingleCoupon, updateCoupon } from "../../../functions/coupon";
import CouponForm from "../../../components/forms/CouponForm";
import { Spin } from "antd";

const UpdateCoupon = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [couponName, setCouponName] = useState("");
  const [expiryDate, setExpiryDate] = useState(new Date("2022-12-31T23:59:59"));
  const [discountPercent, setDiscountPercent] = useState(1);
  useEffect(() => {
    loadSingleCoupon();
  }, []);
  const loadSingleCoupon = () => {
    getSingleCoupon(match.params.couponId, user.token)
      .then((res) => {
        setCouponName(res.data.name);
        setExpiryDate(res.data.expiry);
        setDiscountPercent(res.data.discount);
      })
      .catch((err) =>
        toast.error(`${err} happened while prepopulating the coupon details`)
      );
  };
  const handleSubmitForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    await updateCoupon(
      match.params.couponId,
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
        setDiscountPercent(1);
        setExpiryDate(new Date("2022-12-31T23:59:59"));
        toast.info(`"${res.data.name}" has been successfully updated`);
        history.push("/admin/coupon");
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
        <div className="col">
          {loading ? (
            <div className="container text-center">
              <Spin spinning={loading} size="large" tip="Loading..." />
            </div>
          ) : (
            <CouponForm
              handleSubmitForm={handleSubmitForm}
              buttonText="Update Coupon"
              title="Update Coupon"
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

export default UpdateCoupon;
