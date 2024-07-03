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
  NEW_CATEGORY_RESET,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_RESET,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_RESET,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/categoryContants";

export const allCategoryReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case ALL_CATEGORIES_REQUEST:
    case ADMIN_CATEGORIES_REQUEST:
      return {
        loading: true,
        categories: [],
      };
    case ALL_CATEGORIES_SUCCESS:
    case ADMIN_CATEGORIES_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      };
    case ALL_CATEGORIES_FAIL:
    case ADMIN_CATEGORIES_FAIL:
      return {
        error: action.payload,
        loading: false,
      };
    case CLEAR_ERRORS:
      return {
        error: null,
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const newCategoryReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case NEW_CATEGORY_REQUEST:
      return {
        loading: true,
        category: {},
      };
    case NEW_CATEGORY_SUCCESS:
      return {
        loading: false,
        category: action.payload,
      };
    case NEW_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case NEW_CATEGORY_RESET:
      return {
        ...state,
      };
    case CLEAR_ERRORS:
      return {
        loading: false,
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const categoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CATEGORY_REQUEST:
    case UPDATE_CATEGORY_REQUEST:
      return {
        loading: true,
        ...state,
        success: false,
      };
    case DELETE_CATEGORY_SUCCESS:
    case UPDATE_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case DELETE_CATEGORY_FAIL:
    case UPDATE_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
        ...state,
        success: false,
      };
    case DELETE_CATEGORY_RESET:
    case UPDATE_CATEGORY_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        error: null,
        ...state,
      };
    default:
      return state;
  }
};

export const categoryDetailsReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_DETAILS_REQUEST:
      return {
        loading: true,
        category: {},
      };
    case CATEGORY_DETAILS_SUCCESS:
      return {
        loading: false,
        category: action.payload,
      };
    case CATEGORY_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
        ...state,
      };
    case CLEAR_ERRORS:
      return {
        error: null,
        ...state,
      };
    default:
      return state;
  }
};
