import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemsToCart,
  emptyCart,
  removeItemsFromCart,
} from "../../actions/cartAction";
import { Button, Fab, Typography } from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  const handleRemoveAll = () => {
    dispatch(emptyCart());
  };

  let subTotal = 0;
  cartItems.map((cartItem) => {
    subTotal = subTotal + cartItem.price * cartItem.quantity;
  });
  const shippingCost = 0;
  const discount = 0;
  const total = subTotal + shippingCost - discount;
  return (
    <Layout>
      {cartItems.length === 0 ? (
        <div className="w-full h-48 flex flex-col gap-2 justify-center items-center bg-white">
          <i>
            <RemoveShoppingCartIcon />
          </i>
          <Typography>No Product in Your Cart</Typography>
          <Link
            to="/products"
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            View Products
          </Link>
        </div>
      ) : (
        <Fragment>
          <div className="my-8 min-[1075px]:mx-[8vmax] mx-[2vmax]">
            <h6 className="text-3xl py-2 my-2">My Cart({cartItems.length})</h6>
            <div className="flex gap-4 max-[875px]:flex-col-reverse">
              <div className="grow h-full">
                {cartItems.map((cartItem, index) => (
                  <div
                    key={index}
                    className="flex max-[675px]:flex-col p-4 grow h-32 max-[680px]:h-56 flex justify-start items-center gap-8 bg-white border border-[#DEE2E7]"
                  >
                    <div className="flex justify-start items-center w-full gap-2">
                      <div className="w-32 h-full pr-4">
                        <img
                          src={cartItem.image}
                          alt={cartItem.name}
                          className="w-auto h-28"
                        />
                      </div>
                      <div className="flex flex-col gap-4">
                        <p>{cartItem.name}</p>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => deleteCartItems(cartItem.product)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center w-full gap-2">
                      <div className="flex justify-center items-center">
                        <Fab
                          onClick={() =>
                            decreaseQuantity(
                              cartItem.product,
                              cartItem.quantity
                            )
                          }
                        >
                          <RemoveIcon />
                        </Fab>
                        <div className="w-[3rem]">
                          <input
                            type="number"
                            value={cartItem.quantity}
                            readOnly
                            className="pl-4"
                          />
                        </div>
                        <Fab
                          onClick={() =>
                            increaseQuantity(
                              cartItem.product,
                              cartItem.quantity,
                              cartItem.stock
                            )
                          }
                        >
                          <AddIcon />
                        </Fab>
                      </div>
                      <div className="flex flex-col justify-start w-[max-content] gap-4">
                        <p>
                          <i>
                            <CurrencyRupeeIcon />
                          </i>
                          {cartItem.price * cartItem.quantity}
                        </p>
                        <p className="max-[675px]:hidden border-2 border-[#DEE2E7] p-2 flex justify-center items-center rounded-md">
                          Quantity {cartItem.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="w-full flex justify-between py-4 border border-[#DEE2E7] bg-white px-4">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(-1)}
                  >
                    Go Back
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleRemoveAll}
                  >
                    Remove all
                  </Button>
                </div>
              </div>
              <div className="flex flex-col w-60 gap-4 max-[420px]:w-full">
                <div className="w-full p-4 border border-[#DEE2E7] bg-white flex flex-col gap-2 rounded-md">
                  <p className="text-slate-700">Have a coupon?</p>
                  <div className="flex justify-start items-center border border-[#DEE2E7] w-full rounded-md">
                    <div className="grow">
                      <input
                        type="text"
                        className="p-[3px] px-2 bg-white outline-none w-full rounded-md"
                        placeholder="Add coupon"
                      />
                    </div>
                    <button className="border-l border-[#DEE2E7] h-full py-[3px] px-2 text-blue-500">
                      Apply
                    </button>
                  </div>
                </div>
                <div className="h-full w-full p-4 border border-[#DEE2E7] rounded-md bg-white flex flex-col gap-2">
                  <div className="border-b border-[#DEE2E7] pb-4">
                    <div className="flex justify-between">
                      <p className="text-slate-700">Subtotal:</p>
                      <p className="text-slate-700">
                        <i>
                          <CurrencyRupeeIcon />
                        </i>
                        {subTotal}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-slate-700">Discount:</p>
                      <p className="text-red-700">
                        <i>
                          <CurrencyRupeeIcon />
                        </i>
                        {discount}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-slate-700">Shipping cost:</p>
                      <p className="text-green-700">
                        <i>
                          <CurrencyRupeeIcon />
                        </i>
                        {shippingCost}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <p className="text-slate-700 font-bold">Total</p>
                      <p className="text-slate-700 font-bold">
                        <i>
                          <CurrencyRupeeIcon />
                        </i>
                        {total}
                      </p>
                    </div>
                    <button
                      className="w-full py-2 bg-green-500 text-white rounded-md my-2"
                      onClick={() => navigate("/shipping")}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Layout>
  );
};

export default Cart;
