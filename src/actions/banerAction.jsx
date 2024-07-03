import axios from "axios";

import {
  ALL_BANER_REQUEST,
  ALL_BANER_SUCCESS,
  ALL_BANER_FAIL,
  NEW_BANER_REQUEST,
  NEW_BANER_SUCCESS,
  NEW_BANER_FAIL,
  DELETE_BANER_REQUEST,
  DELETE_BANER_SUCCESS,
  DELETE_BANER_FAIL,
  CLEAR_ERRORS,
} from "../constants/banerConstants";
const apiUrl = import.meta.env.VITE_REACT_API_URL;

export const newBaner = (banerData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_BANER_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${apiUrl}/api/v1/admin/baner/new`,
      banerData,
      config
    );
    dispatch({ type: NEW_BANER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: NEW_BANER_FAIL, payload: error.response.data.message });
  }
};

export const getAllBaners = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_BANER_REQUEST });
    const { data } = await axios.get(`${apiUrl}/api/v1/baners`);
    dispatch({ type: ALL_BANER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_BANER_FAIL, payload: error.response.data.message });
  }
};

export const deleteBaner = (banerId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BANER_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      withCredentials: true,
    };
    const { data } = await axios.delete(
      `${apiUrl}/api/v1/admin/baner/${banerId}`,
      config
    );
    dispatch({ type: DELETE_BANER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_BANER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
