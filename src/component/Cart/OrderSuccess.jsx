import React, { useEffect } from "react";
import "./orderSuccess.css";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import orderplaced from "../../images/animation_lmm4aopq_small.gif";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { emptyCart } from "../../actions/cartAction";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const referenceNumber = window.location.href.split("reference=")[1];
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  let subTotal = 0;
  cartItems.map((cartItem) => {
    subTotal = subTotal + cartItem.price * cartItem.quantity;
  });
  const tax = 0;
  const shippingCost = 0;
  const discount = 0;
  const totalPrice = subTotal + shippingCost - discount;
  useEffect(() => {
    const disableBackNavigation = () => {
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = function () {
        window.history.go(1);
      };
    };
    disableBackNavigation();
    return () => {
      window.onpopstate = null;
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const placeOrder = () => {
    if (referenceNumber) {
      try {
        const order = {
          shippingInfo,
          orderItems: cartItems,
          itemsPrice: subTotal,
          taxPrice: tax,
          shippingPrice: shippingCost,
          totalPrice: totalPrice,
          paymentInfo: {
            id: referenceNumber,
            status: "succeeded",
          },
        };

        dispatch(createOrder(order));
        dispatch(emptyCart());
      } catch (error) {
        toast.error("There's some issue while processing payment");
        console.error(error);
      }
    } else {
      toast.error("Payment Unsuccessfull!");
      navigate("/");
    }
  };

  useEffect(() => {
    placeOrder();
  }, []);

  return (
    <div className="orderSuccess">
      <img src={orderplaced} />
      <Typography>Your Order has been Placed successfully </Typography>
      <Typography>Reference No:- ${referenceNumber} </Typography>
      <Link to="/">Continue Shopping</Link>
    </div>
  );
};

export default OrderSuccess;
