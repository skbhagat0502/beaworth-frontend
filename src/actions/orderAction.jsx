import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  SELLER_ORDERS_REQUEST,
  SELLER_ORDERS_SUCCESS,
  SELLER_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST_BY_SELLER,
  UPDATE_ORDER_SUCCESS_BY_SELLER,
  UPDATE_ORDER_FAIL_BY_SELLER,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST_BY_SELLER,
  ORDER_DETAILS_SUCCESS_BY_SELLER,
  ORDER_DETAILS_FAIL_BY_SELLER,
  CLEAR_ERRORS,
} from "../constants/orderConstants";

import axios from "axios";
const apiUrl = import.meta.env.VITE_REACT_API_URL;
// Create Order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.post(
      `${apiUrl}/api/v1/order/new`,
      order,
      config
    );

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// My Orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.get(`${apiUrl}/api/v1/orders/me`, config);

    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Orders (admin)
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.get(`${apiUrl}/api/v1/admin/orders`, config);

    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};
//get seller orders
export const getSellerOrders = () => async (dispatch) => {
  try {
    dispatch({ type: SELLER_ORDERS_REQUEST });
    dispatch({ type: ALL_ORDERS_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.get(`${apiUrl}/api/v1/seller/orders`, config);

    dispatch({ type: SELLER_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: SELLER_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Order
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.put(
      `${apiUrl}/api/v1/admin/order/${id}`,
      order,
      config
    );

    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Order--Seller
export const updateOrderSeller = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST_BY_SELLER });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.put(
      `${apiUrl}/api/v1/seller/order/${id}`,
      order,
      config
    );
    dispatch({ type: UPDATE_ORDER_SUCCESS_BY_SELLER, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL_BY_SELLER,
      payload: error.response.data.message,
    });
  }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.delete(
      `${apiUrl}/api/v1/admin/order/${id}`,
      config
    );

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.get(`${apiUrl}/api/v1/order/${id}`, config);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get order details for seller
export const getOrderDetailsForSeller = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST_BY_SELLER });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.get(
      `${apiUrl}/api/v1/seller/order/${id}`,
      config
    );

    dispatch({ type: ORDER_DETAILS_SUCCESS_BY_SELLER, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL_BY_SELLER,
      payload: error.response.data.message,
    });
  }
};
// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
