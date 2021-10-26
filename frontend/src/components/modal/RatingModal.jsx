import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Modal } from "antd";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import StarBorderIcon from "@material-ui/icons/StarBorder";
const RatingModal = ({ children, onOkFunction }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);
  const { slug } = useParams();
  const handleModal = () => {
    setModalVisible(true);
  };
  return (
    <>
      {user && user.token ? (
        <Button
          className="col-md-4"
          style={{
            color: blue[300],
          }}
          endIcon={<StarBorderIcon />}
          onClick={handleModal}
        >
          Give rating
        </Button>
      ) : (
        <Button
          className="col-md-4"
          style={{
            color: blue[300],
          }}
          endIcon={<StarBorderIcon />}
        >
          <Link
            to={{ pathname: "/login", state: { from: `/product/${slug}` } }}
          >
            Login to give rating
          </Link>
        </Button>
      )}
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
