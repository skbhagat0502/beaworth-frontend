import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../layout/MetaData";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { State } from "country-state-city";
import CheckoutSteps from "./CheckoutSteps";
import { toast } from "react-toastify";
import Layout from "../layout/Layout";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { addItemsToCart } from "../../actions/cartAction";
import EditIcon from "@mui/icons-material/Edit";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [editShippingDetails, setShippingDetails] = useState(false);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      toast.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(saveShippingInfo({ address, city, state, pinCode, phoneNo }));
    setShippingDetails(false);
  };
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
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

  const handleEdit = () => {
    setShippingDetails(true);
  };

  return (
    <Layout>
      <MetaData title="Shipping Details" />
      <div className="mt-[2vmax]">
        <CheckoutSteps activeStep={1} />
        <div className="min-[1075px]:mx-[8vmax] mx-[2vmax] my-[2vmax] flex max-[1020px]:flex-col gap-8">
          <div className="bg-white grow border max-[1020px]:w-full border-[#DEE2E7] h-[max-content]">
            <h2 className="bg-blue-600 py-4 px-4 text-white flex justify-between flex justify-center items-center">
              SHIPPING DETAILS
              <button onClick={handleEdit}>
                <i>
                  <EditIcon sx={{ fontSize: "1.125rem" }} />
                </i>
                EDIT
              </button>
            </h2>
            {!editShippingDetails && (
              <div className="grid grid-cols-2 max-[520px]:grid-cols-1">
                <div>
                  <table className="table-auto border-r border-[#DEE2E7] w-full h-full">
                    <tbody>
                      <tr>
                        <td className="font-bold border-b p-2">Deliver to:</td>
                        <td className="border p-2">
                          {user.name}
                          <br />
                          Ph- {shippingInfo.phoneNo}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-bold border-b p-2">Add:</td>
                        <td className="border p-2">{shippingInfo.address}</td>
                      </tr>
                      <tr>
                        <td className="font-bold border-b p-2">Pin code:</td>
                        <td className="border p-2">{shippingInfo.pinCode}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <table className="table-auto w-full">
                    <tbody>
                      <tr>
                        <td className="font-bold border-b p-2">City:</td>
                        <td className="border p-2">{shippingInfo.city}</td>
                      </tr>
                      <tr>
                        <td className="font-bold border-b p-2">State:</td>
                        <td className="border p-2">{shippingInfo.state}</td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="text-center p-4">
                          <button
                            className="bg-blue-600 py-2 px-4 text-white my-2 cursor-pointer w-full"
                            onClick={() => navigate("/process/payment")}
                          >
                            Proceed to payment
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {editShippingDetails && (
              <form
                className="p-4 grid grid-rows-1 grid-cols-2 gap-4"
                encType="multipart/form-data"
                onSubmit={shippingSubmit}
              >
                <div className="flex justify-start items-center">
                  <HomeIcon />
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border-b border-[#DEE2E7] w-full px-4 py-2 outline-none"
                  />
                </div>

                <div className="flex justify-start items-center">
                  <LocationCityIcon />
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="border-b border-[#DEE2E7] w-full px-4 py-2 outline-none"
                  />
                </div>

                <div className="flex justify-start items-center">
                  <PinDropIcon />
                  <input
                    type="number"
                    placeholder="Pin Code"
                    required
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    className="border-b border-[#DEE2E7] w-full px-4 py-2 outline-none"
                  />
                </div>

                <div className="flex justify-start items-center">
                  <PhoneIcon />
                  <input
                    type="number"
                    placeholder="10 digit Phone Number"
                    required
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    size="10"
                    className="border-b border-[#DEE2E7] w-full px-4 py-2 outline-none"
                  />
                </div>
                <div className="flex justify-start items-center">
                  <TransferWithinAStationIcon />

                  <select
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="border-b border-[#DEE2E7] w-full px-4 py-2 outline-none"
                  >
                    <option value="">State</option>
                    {State &&
                      State.getStatesOfCountry("IN").map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <input
                  type="submit"
                  value="Continue"
                  className="bg-blue-600 py-2 px-4 text-white my-2 cursor-pointer"
                  disabled={state ? false : true}
                />
              </form>
            )}
          </div>
          <div className="w-[45%] max-[1020px]:w-full">
            <h6 className="bg-blue-600 p-4 text-white">Order Summary</h6>
            <div className="flex flex-col">
              {cartItems.map((cartItem, index) => (
                <div
                  key={index}
                  className="flex max-[1450px]:flex-col grow h-32 max-[1450px]:h-48 px-4 flex justify-start max-[1450px]:justify-center items-center gap-4 bg-white border border-[#DEE2E7]"
                >
                  <div className="flex justify-start items-center w-full gap-2">
                    <div className="w-32 h-full pr-4">
                      <img
                        src={cartItem.image}
                        alt={cartItem.name}
                        className="w-auto h-28 object-cover"
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
                          decreaseQuantity(cartItem.product, cartItem.quantity)
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
                    <div className="flex flex-col justify-start items-end gap-4">
                      <p>
                        <i>
                          <CurrencyRupeeIcon />
                        </i>
                        {cartItem.price * cartItem.quantity}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shipping;
