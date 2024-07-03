import React, { useEffect, useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import axios from "axios";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { emptyCart } from "../../actions/cartAction";
import { toast } from "react-toastify";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Layout from "../layout/Layout";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";
import { getRazorPayKey } from "../../actions/PaymentAction";
const apiUrl = import.meta.env.VITE_REACT_API_URL;

const Payment = () => {
  const navigate = useNavigate();
  const [Razorpay] = useRazorpay();
  const [paymentMethod, setPaymentMethod] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);
  const { key } = useSelector((state) => state.razorpayKey);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  let subTotal = 0;
  cartItems.map((cartItem) => {
    subTotal = subTotal + cartItem.price * cartItem.quantity;
  });
  const tax = 0;
  const shippingCost = 0;
  const discount = 0;
  const totalPrice = subTotal + shippingCost - discount;
  const paymentData = {
    amount: Math.round(totalPrice * 100),
  };
  const handleOnlinePayment = async () => {
    const {
      data: { order },
    } = await axios.post(`${apiUrl}/api/v1/payment/process`, {
      amount: paymentData.amount,
    });
    const options = {
      key: key,
      amount: order.amount,
      currency: "INR",
      name: "Beaworth",
      description: "Beaworth payment",
      image:
        "https://www.beaworth.com/static/media/logo.eea53f39805a05937552.png",
      order_id: order.id,
      callback_url: `${apiUrl}/api/v1/paymentverification`,
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone,
      },
      notes: {
        address: "Beaworth",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    rzp1.open();
  };

  const handleCodPayment = async () => {
    try {
      const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: subTotal,
        taxPrice: tax,
        shippingPrice: shippingCost,
        totalPrice: totalPrice,
        paymentInfo: {
          id: "COD_PAYMENT_ID",
          status: "Cash On Delivery",
        },
      };

      dispatch(createOrder(order));
      dispatch(emptyCart());
      if (order) toast.success("Order Placed Successfully!");
      else toast.error("Error in placing order!");
      navigate("/");
    } catch (error) {
      toast.error("An error occurred while processing orders.");
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getRazorPayKey());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  return (
    <Layout>
      <div className="mt-[2vmax]">
        <MetaData title="Payment" />
        <CheckoutSteps activeStep={2} />
        <div className="min-[1075px]:mx-[8vmax] max-[420px]:w-full my-[2vmax] flex gap-4 flex-col bg-white border border-[#DEE2E7]">
          <h2 className="py-4 px-4 text-white bg-blue-600">PAYMENT</h2>
          <>
            <div className="flex flex-col px-4 px-[2vmax]">
              <div>
                <label
                  htmlFor="online"
                  className="gap-2 flex text-xl cursor-pointer"
                >
                  <input
                    type="radio"
                    id="online"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                    className="scale-125"
                  />
                  Pay Online -
                  <i>
                    <CurrencyRupeeIcon />
                  </i>
                  {cartItems && totalPrice}
                </label>
              </div>
              <div>
                <label
                  htmlFor="cod"
                  className="flex gap-2 text-xl cursor-pointer"
                >
                  <input
                    type="radio"
                    id="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="scale-125"
                  />
                  Cash on Delivery -
                  <i>
                    <CurrencyRupeeIcon />
                  </i>
                  {cartItems && totalPrice}
                </label>
              </div>
              <button
                disabled={!paymentMethod}
                className={`${
                  paymentMethod ? "bg-blue-600" : "bg-gray-300"
                } py-2 text-white w-[max-content] px-4 my-4`}
                onClick={
                  paymentMethod === "cod"
                    ? handleCodPayment
                    : handleOnlinePayment
                }
              >
                Place Order
              </button>
            </div>
          </>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
