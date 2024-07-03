import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import MetaData from "../layout/MetaData";
import { toast } from "react-toastify";
import Layout from "../layout/Layout";
import { MenuItem, Select, Typography } from "@mui/material";

const Products = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [ratings, setRatings] = useState(0);
  const keyword = window.location.href.split("keyword=")[1];
  const category = window.location.href.split("category=")[1];
  const priceRanges = [
    { label: "Under ₹100", value: [0, 100] },
    { label: "₹100 - ₹300", value: [100, 300] },
    { label: "₹300 - ₹500", value: [300, 500] },
    { label: "₹500 - ₹1000", value: [500, 1000] },
  ];

  const ratingOptions = [
    { label: "0 Stars", value: 0 },
    { label: "2 Stars", value: 2 },
    { label: "4 Stars", value: 4 },
    { label: "4.5 Stars", value: 4.5 },
  ];
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (min, max) => {
    setPrice([min, max]);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Layout>
          <MetaData title="PRODUCTS -- Beaworth" />
          <h2 className="productsHeading">Products</h2>
          <div className="flex w-full justify-end items-center my-4">
            <div className="w-full flex max-[500px]:flex-col gap-4 justify-center items-center">
              <Typography>Price</Typography>
              <Select
                value={price}
                onChange={(e) => priceHandler(e.target.value)}
                label="Price Range"
                variant="outlined"
                className="max-[500px]:w-20 w-32"
                size="small"
              >
                {priceRanges.map((range, index) => (
                  <MenuItem key={index} value={range.value}>
                    {range.label}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className="w-full flex max-[500px]:flex-col gap-4 justify-center items-center">
              <Typography>Ratings</Typography>
              <Select
                value={ratings}
                onChange={(e) => setRatings(e.target.value)}
                label="Ratings"
                variant="outlined"
                className="max-[500px]:w-20 w-32"
                size="small"
              >
                {ratingOptions.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          {resultPerPage < filteredProductsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
                pageRangeDisplayed={1}
              />
            </div>
          )}
        </Layout>
      )}
    </Fragment>
  );
};

export default Products;
