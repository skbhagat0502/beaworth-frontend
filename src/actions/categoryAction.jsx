import axios from "axios";
import {
  ALL_CATEGORIES_REQUEST,
  ALL_CATEGORIES_SUCCESS,
  ALL_CATEGORIES_FAIL,
  ADMIN_CATEGORIES_REQUEST,
  ADMIN_CATEGORIES_SUCCESS,
  ADMIN_CATEGORIES_FAIL,
  NEW_CATEGORY_REQUEST,
  NEW_CATEGORY_SUCCESS,
  NEW_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/categoryContants";
const apiUrl = import.meta.env.VITE_REACT_API_URL;
export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CATEGORIES_REQUEST });
    const { data } = await axios.get(`${apiUrl}/api/v1/category/all`);
    dispatch({ type: ALL_CATEGORIES_SUCCESS, payload: data.categories });
  } catch (error) {
    dispatch({
      type: ALL_CATEGORIES_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getAdminCategories = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_CATEGORIES_REQUEST });
    const { data } = await axios.get(`${apiUrl}/api/v1/category/all`);
    dispatch({ type: ADMIN_CATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_CATEGORIES_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const newCategory = (categoryData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_CATEGORY_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.post(
      `${apiUrl}/api/v1/admin/category/new`,
      categoryData,
      config
    );

    dispatch({ type: NEW_CATEGORY_SUCCESS, payload: data.newCategory });
  } catch (error) {
    dispatch({ type: NEW_CATEGORY_FAIL, payload: error.response.data.message });
  }
};
export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.delete(
      `${apiUrl}/api/v1/admin/category/${id}`,
      config
    );

    dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_DETAILS_REQUEST });
    const { data } = axios.put(`${apiUrl}/api/v1/category/${id}`);
    dispatch({ type: CATEGORY_DETAILS_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: CATEGORY_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const updateCategory = (id, categoryData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
      Authorization: `${token}`,
    };
    const { data } = await axios.post(
      `${apiUrl}/api/v1/category/${id}`,
      categoryData,
      config
    );
    dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
