import React, { useState } from "react";
import { toast } from "react-toastify";
import { DropzoneDialog } from "material-ui-dropzone";
import { Button, Grid } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar, Badge } from "antd";
import { useSelector } from "react-redux";
const FileUpload = ({ values, setValues, setLoading }) => {
  const [open, setOpen] = useState(false);
  let allUploadedFiles = values.images;
  const { user } = useSelector((state) => ({ ...state }));
  const handleSave = (files) => {
    setOpen(false);
    if (files.length > 0) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/upload-images`,
                { image: uri },
                {
                  headers: {
                    authToken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                toast.info("Images uploaded successfully");
                setLoading(false);
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                toast.error(err);
              });
          },
          "base64"
        );
      }
    }
  };
  const handleRemoveImage = (public_id) => {
    axios
      .post(
        `${process.env.REACT_APP_API}/remove-image`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        setLoading(false);
      });
  };
  return (
    <Grid container justifyContent="center" alignContent="center">
      <Grid container justifyContent="center" alignContent="center">
        <Button
          onClick={() => setOpen(true)}
          color="secondary"
          variant="contained"
          endIcon={<CloudUploadIcon />}
          className="mt-3"
        >
          Upload Images
        </Button>
        <DropzoneDialog
          open={open}
          filesLimit={5}
          acceptedFiles={["image/*"]}
          cancelButtonText={"cancel"}
          submitButtonText={"submit"}
          showPreviews={true}
          showFileNamesInPreview={true}
          maxFileSize={50000000}
          onClose={() => setOpen(false)}
          onSave={(files) => {
            handleSave(files);
          }}
        />
      </Grid>
      <div className="row">
        {values.images &&
          values.images.map((image) => (
            <Badge
              count="X"
              key={image.public_id}
              onClick={() => handleRemoveImage(image.public_id)}
              style={{ cursor: "pointer" }}
              className="mt-4 mr-3"
            >
              <Avatar
                src={image.url}
                size={100}
                shape="square"
                className="ml-3 mr-2"
              />
            </Badge>
          ))}
      </div>
    </Grid>
  );
};

export default FileUpload;
