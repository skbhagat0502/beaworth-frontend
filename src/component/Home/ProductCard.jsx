import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import "./productCart.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { IconButton } from "@mui/material";
const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div className="product border border-[#DEE2E7] bg-white rounded-md">
      <Link className="productCard" to={`/product/${product._id}`}>
        <div className="image-box border-b border-gray-400">
          <img
            src={product.images[0].url}
            alt={product.name}
            className="p-2 object-cover w-full h-full"
          />
        </div>
        <div className="product-details p-2 relative">
          <span className="red text-[1.2rem]">
            <i className="text-[1.2rem]">
              <CurrencyRupeeIcon fontSize="1.2rem" />
            </i>
            {`${product.price}`}
          </span>
          <span className="sub-details">
            <Rating size="small" {...options} />
            <span className="productCardSpan">
              ({product.numOfReviews} Reviews)
            </span>
          </span>
          <p className="text-black">{product.name.substring(0, 25)}</p>
          <span className="absolute right-0 top-[-10px]">
            <IconButton>
              <i className="text-blue-500 rounded-md w-[2rem] h-[2rem]">
                <FavoriteBorderIcon />
              </i>
            </IconButton>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
