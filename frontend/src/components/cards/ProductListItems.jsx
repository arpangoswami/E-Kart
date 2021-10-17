import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
const ProductListItems = ({ product }) => {
  const {
    price,
    category,
    subCategories,
    shipping,
    color,
    brand,
    quantity,
    sold,
  } = product;
  return (
    <div className="row">
      <div className="col-md-5">
        <ul className="list-group m-2">
          <li className="list-group-item">
            <Typography
              display="inline"
              variant="body1"
              style={{ fontFamily: "Quicksand" }}
            >
              Price
            </Typography>
            <span className="float-right">
              <Typography display="inline" style={{ fontFamily: "Quicksand" }}>
                <del>&#2352;</del> {price}
              </Typography>
            </span>
          </li>
        </ul>
        <ul className="list-group m-2">
          <li className="list-group-item">
            <Typography
              display="inline"
              variant="body1"
              style={{ fontFamily: "Quicksand" }}
            >
              Shipping
            </Typography>
            <span className="float-right">
              <Typography display="inline" style={{ fontFamily: "Quicksand" }}>
                {shipping}
              </Typography>
            </span>
          </li>
        </ul>
        <ul className="list-group m-2">
          <li className="list-group-item">
            <Typography
              display="inline"
              variant="body1"
              style={{ fontFamily: "Quicksand" }}
            >
              Color
            </Typography>
            <span className="float-right">
              <Typography display="inline" style={{ fontFamily: "Quicksand" }}>
                {color}
              </Typography>
            </span>
          </li>
        </ul>
        <ul className="list-group m-2">
          <li className="list-group-item">
            <Typography
              display="inline"
              variant="body1"
              style={{ fontFamily: "Quicksand" }}
            >
              Brand
            </Typography>
            <span className="float-right">
              <Typography display="inline" style={{ fontFamily: "Quicksand" }}>
                {brand}
              </Typography>
            </span>
          </li>
        </ul>
      </div>

      <div className="col-md-7">
        {category && (
          <ul className="list-group m-2">
            <li className="list-group-item">
              <Typography
                display="inline"
                variant="body1"
                style={{ fontFamily: "Quicksand" }}
              >
                Category
              </Typography>
              <span className="float-right">
                <Typography
                  display="inline"
                  style={{ fontFamily: "Quicksand" }}
                >
                  <Link
                    to={`/category/${category.slug}`}
                    className="float-right"
                  >
                    {category.name}
                  </Link>
                </Typography>
              </span>
            </li>
          </ul>
        )}
        {subCategories && subCategories.length > 0 && (
          <ul className="list-group m-2">
            <li className="list-group-item">
              <Typography
                display="inline"
                variant="body1"
                style={{ fontFamily: "Quicksand" }}
              >
                Sub-categories
              </Typography>
              {subCategories.map((s) => (
                <Typography
                  display="inline"
                  style={{ fontFamily: "Quicksand" }}
                  variant="body2"
                >
                  <Link
                    key={s._id}
                    to={`/sub-category/${s.slug}`}
                    className="float-right mr-1"
                  >
                    {s.name}
                  </Link>
                </Typography>
              ))}
            </li>
          </ul>
        )}
        <ul className="list-group m-2">
          <li className="list-group-item">
            <Typography
              display="inline"
              variant="body1"
              style={{ fontFamily: "Quicksand" }}
            >
              Available
            </Typography>
            <span className="float-right">
              <Typography display="inline" style={{ fontFamily: "Quicksand" }}>
                {quantity}
              </Typography>
            </span>
          </li>
        </ul>
        <ul className="list-group m-2">
          <li className="list-group-item">
            <Typography
              display="inline"
              variant="body1"
              style={{ fontFamily: "Quicksand" }}
            >
              Sold
            </Typography>
            <span className="float-right">
              <Typography display="inline" style={{ fontFamily: "Quicksand" }}>
                {sold}
              </Typography>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductListItems;
