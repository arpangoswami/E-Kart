import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import StarBorderIcon from "@material-ui/icons/StarBorder";
const RatingModal = ({ children, onOkFunction }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);
  const { slug } = useParams();
  const history = useHistory();
  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      history.push({
        pathname: "/login",
        state: { from: `/product/${slug}` },
      });
    }
  };
  return (
    <>
      <Button
        className="col-md-4"
        style={{
          color: blue[300],
        }}
        endIcon={<StarBorderIcon />}
        onClick={handleModal}
      >
        {user && user.token ? "Give rating" : "Login to give rating"}
      </Button>
      <Modal
        title="Leave your rating"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          onOkFunction();
          //toast.success("Thanks for your review. It will appear soon");
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
