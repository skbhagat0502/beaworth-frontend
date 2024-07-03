import {
  GET_RAZORPAY_KEY_REQUEST,
  GET_RAZORPAY_KEY_SUCCESS,
  GET_RAZORPAY_KEY_FAIL,
  CLEAR_ERRORS,
} from "../constants/PaymentConstants";

export const razorpayKeyReducer = (state = { key: {} }, action) => {
  switch (action.type) {
    case GET_RAZORPAY_KEY_REQUEST:
      return {
        loading: true,
        key: {},
      };
    case GET_RAZORPAY_KEY_SUCCESS:
      return {
        loading: false,
        key: action.payload,
      };
    case GET_RAZORPAY_KEY_FAIL:
      return {
        loading: false,
        key: {},
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
