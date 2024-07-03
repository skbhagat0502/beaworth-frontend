import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { myOrders } from "../../actions/orderAction";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ChatIcon from "@mui/icons-material/Chat";
import { MdShoppingBasket } from "react-icons/md";
import { getShopDetails } from "../../actions/shopAction";
import { MdOutlineVerifiedUser } from "react-icons/md";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [tab, setTab] = useState("description");
  const { orders } = useSelector((state) => state.myOrders);

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const { shop } = useSelector((state) => state.shopDetails);
  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const increaseQuantity = () => {
    if (product.Stock <= quantity) {
      toast.info("Not much stock available");
      return;
    }

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(params.id, quantity));
    toast.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };
  const deliveryStatus = orders?.some(
    (order) =>
      order.orderItems.some((item) => item.product === params.id) &&
      order.orderStatus === "Delivered"
  );
  const handleWishlist = () => {
    toast.success("Item added to wishlist.");
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getShopDetails(params.id));
    dispatch(getProductDetails(params.id));
    dispatch(myOrders());
  }, [dispatch, params.id, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Layout>
          <MetaData title={`${product.name} -- Beaworth`} />
          <div className="flex min-[1076px]:mx-[8vmax] mx-[2vmax] h-96 my-8 gap-8 flex-wrap max-[710px]:h-[max-content]">
            <div className="max-[500px]:h-[600px] grow flex jusitfy-center items-start gap-10 border border-[#DEE2E7] p-4 bg-white rounded-md max-[710px]:flex-col">
              <div className="w-1/2 max-[710px]:w-full h-full flex flex-col justify-between">
                <Carousel>
                  <div className="border border-[#DEE2E7] rounded-md min-[500px]:overflow-hidden w-48 mx-auto">
                    {product.images &&
                      product.images.map((item, i) => (
                        <img
                          key={i}
                          src={item.url}
                          alt={`${i} Slide`}
                          className="w-auto h-full object-cover"
                        />
                      ))}
                  </div>
                </Carousel>
                <div className="w-[5rem] h-[5rem] flex border border-[#DEE2E7] rounded-md overflow-hidden max-[710px]:hidden">
                  {product.images &&
                    product.images.map((item, i) => (
                      <img
                        className="w-full h-full object-cover"
                        key={i}
                        src={item.url}
                        alt={`${i} Slide`}
                      />
                    ))}
                </div>
              </div>

              <div className="flex flex-col p-4 gap-2 relative w-2/3 max-[710px]:w-full h-full">
                <span className="absolute right-0 top-0">
                  <Fab onClick={handleWishlist}>
                    <FavoriteBorderIcon />
                  </Fab>
                </span>
                <p>
                  Status:{" "}
                  <b
                    className={
                      product.Stock < 1 ? "text-red-500" : "text-[#00B517]"
                    }
                  >
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
                <div className="detailsBlock-1">
                  <h2 className="font-bold text-[1.25rem]">{product.name}</h2>
                </div>
                <div className="flex justify-start items-center w-full gap-2 flex-wrap">
                  <Rating {...options} size="small" />
                  <span className="flex justify-center items-center max-[420px]:hidden">
                    <i className="text-gray-500 px-2">
                      <ChatIcon />
                    </i>
                    {product.numOfReviews} Reviews
                  </span>
                  <span className="flex justify-center items-center">
                    <i className="text-gray-500 px-2">
                      <MdShoppingBasket />
                    </i>
                    148 sold
                  </span>
                </div>
                <div>
                  <h1 className="font-bold text-xl">{`₹${product.price}`}</h1>
                  <div className="detailsBlock-3-1">
                    <div className="flex justify-start items-center gap-2">
                      <Fab
                        color="primary"
                        size="small"
                        onClick={decreaseQuantity}
                      >
                        <RemoveIcon />
                      </Fab>
                      <div className="text-center bg-white w-[3rem] my-4">
                        <input
                          disabled
                          type="number"
                          value={quantity}
                          className="text-center text-xl w-full bg-transparent pl-2"
                        />
                      </div>
                      <Fab
                        color="primary"
                        size="small"
                        onClick={increaseQuantity}
                      >
                        <AddIcon />
                      </Fab>
                    </div>
                    <Button
                      disabled={product.Stock < 1 ? true : false}
                      onClick={addToCartHandler}
                      variant="outlined"
                      color="primary"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-80 h-full border border-[#DEE2E7] p-4 bg-white rounded-md max-[450px]:w-full">
              {shop && (
                <div className="h-full w-full">
                  <div className="flex justify-start items-start gap-4 border-b-2 border-[#DEE2E7] pb-4">
                    <button className="text-[3rem] font-bold bg-blue-950 text-white rounded-md w-[5rem] h-[5rem] grid place-items-center">
                      {shop && shop[0]?.shopName?.substring(0, 1).toUpperCase()}
                    </button>
                    <div>
                      <p className="text-xl">{shop && shop[0]?.shopName}</p>
                      <p className="text-xl">
                        {`${shop && shop[0]?.streetAddress}${", "}${
                          shop[0]?.city
                        }`}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-gray-500 mt-4">
                    <p className="text-xl flex justify-start items-center gap-2">
                      <i className="mb-2">
                        <ReviewsOutlinedIcon />
                      </i>
                      <span className="pb-[0.5rem]">
                        <Rating readOnly defaultValue={4.5} precision={0.5} />
                      </span>
                    </p>
                    <p className="text-xl flex justify-start items-center gap-2">
                      <i className="mb-2">
                        <MdOutlineVerifiedUser />
                      </i>
                      <span className="pb-[0.5rem]">Verified seller</span>
                    </p>
                    <Button variant="contained">Visit Shop</Button>
                  </div>
                </div>
              )}
              <button
                onClick={submitReviewToggle}
                className="submitReview"
                style={{
                  display: deliveryStatus ? "block" : "none",
                }}
              >
                Submit Review
              </button>
            </div>
          </div>
          <div className="min-[1076px]:mx-[8vmax] border border-[#DEE2E7] bg-white rounded-md h-96 max-[885px]:mt-[28rem] mb-4 mx-[2vmax] max-[710px]:mt-0">
            <div className="flex gap-8 mb-4 border-b border-[#DEE2E7] px-4 py-2">
              <button
                className={`${
                  tab === "description"
                    ? "text-blue-800 border-b-2 border-blue-800 font-semibold"
                    : "text-gray-500"
                } pb-[0.5rem]`}
                onClick={() => setTab("description")}
              >
                Description
              </button>

              <button
                className={`${
                  tab === "reviews"
                    ? "text-blue-800 border-b-2 border-blue-800 font-semibold"
                    : "text-gray-500"
                } pb-[0.5rem]`}
                onClick={() => setTab("reviews")}
              >
                Reviews
              </button>
            </div>
            {tab === "description" && (
              <div className="px-4 py-2">{product.description}</div>
            )}
            {tab === "reviews" && (
              <div className="px-4 py-2">
                <Dialog
                  aria-labelledby="simple-dialog-title"
                  open={open}
                  onClose={submitReviewToggle}
                >
                  <DialogTitle>Submit Review</DialogTitle>
                  <DialogContent className="submitDialog">
                    <Rating
                      onChange={(e) => setRating(e.target.value)}
                      value={rating}
                      size="large"
                    />

                    <textarea
                      className="submitDialogTextArea"
                      cols="30"
                      rows="5"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={submitReviewToggle} color="secondary">
                      Cancel
                    </Button>
                    <Button onClick={reviewSubmitHandler} color="primary">
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>

                {product.reviews && product.reviews[0] ? (
                  <div className="reviews">
                    {product.reviews &&
                      product.reviews.map((review) => (
                        <ReviewCard key={review._id} review={review} />
                      ))}
                  </div>
                ) : (
                  <p className="noReviews">No Reviews Yet</p>
                )}
              </div>
            )}
          </div>
        </Layout>
      )}
    </Fragment>
  );
};

export default ProductDetails;
