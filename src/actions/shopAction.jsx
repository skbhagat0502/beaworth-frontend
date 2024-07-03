import {
  ALL_SHOPS_REQUEST,
  ALL_SHOPS_SUCCESS,
  ALL_SHOPS_FAIL,
  SHOP_DETAILS_REQUEST,
  SHOP_DETAILS_SUCCESS,
  SHOP_DETAILS_FAIL,
  NEW_SHOP_REQUEST,
  NEW_SHOP_SUCCESS,
  NEW_SHOP_FAIL,
  CLEAR_ERRORS,
  GET_SHOP_PRODUCTS_REQUEST,
  GET_SHOP_PRODUCTS_FAIL,
} from "../constants/shopConstants";
import axios from "axios";
const apiUrl = import.meta.env.VITE_REACT_API_URL;

//Get all shops (anyone)
export const getAllShops = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_SHOPS_REQUEST });
    const { data } = await axios.get(`${apiUrl}/api/v1/shops`);
    dispatch({ type: ALL_SHOPS_SUCCESS, payload: data.shops });
  } catch (error) {
    dispatch({ type: ALL_SHOPS_FAIL, payload: error.response.data.message });
  }
};

export const getShopDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SHOP_DETAILS_REQUEST });
    const { data } = await axios.get(`${apiUrl}/api/v1/shop/${id}`);
    dispatch({ type: SHOP_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SHOP_DETAILS_FAIL, payload: error.response.data.message });
  }
};

export const newShop = (shopData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_SHOP_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.post(
      `${apiUrl}/api/v1/seller/application`,
      shopData,
      config
    );
    dispatch({ type: NEW_SHOP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: NEW_SHOP_FAIL, payload: error.response.data.message });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
