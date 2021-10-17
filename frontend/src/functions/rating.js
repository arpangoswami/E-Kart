import React from "react";
import StarRatings from "react-star-ratings";

export const showAverage = (product) => {
  if (product && product.ratings) {
    let ratingsArray = product && product.ratings;
    let total = [];
    let length = ratingsArray.length;
    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);
    let result = totalReduced / length;
    return (
      <div className="text-center pb-1">
        <span>
          <StarRatings
            starDimension="20px"
            starSpacing="2px"
            rating={result}
            starRatedColor="red"
            editing={false}
          />
        </span>
        <span className="mt-4">({product.ratings.length})</span>
      </div>
    );
  }
};
