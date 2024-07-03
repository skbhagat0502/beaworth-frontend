import {
  GET_RAZORPAY_KEY_REQUEST,
  GET_RAZORPAY_KEY_SUCCESS,
  GET_RAZORPAY_KEY_FAIL,
  CLEAR_ERRORS,
} from "../constants/PaymentConstants";
import axios from "axios";
const apiUrl = import.meta.env.VITE_REACT_API_URL;

export const getRazorPayKey = () => async (dispatch) => {
  try {
    dispatch({ type: GET_RAZORPAY_KEY_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.get(`${apiUrl}/api/v1/getKey`, config);
    dispatch({ type: GET_RAZORPAY_KEY_SUCCESS, payload: data.key });
  } catch (error) {
    dispatch({
      type: GET_RAZORPAY_KEY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
