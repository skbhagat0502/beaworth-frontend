import {
  NEW_SHOP_REQUEST,
  NEW_SHOP_SUCCESS,
  NEW_SHOP_FAIL,
  ALL_SHOPS_REQUEST,
  ALL_SHOPS_SUCCESS,
  ALL_SHOPS_FAIL,
  SHOP_DETAILS_REQUEST,
  SHOP_DETAILS_SUCCESS,
  SHOP_DETAILS_FAIL,
  CLEAR_ERRORS,
  GET_SHOP_PRODUCTS_REQUEST,
  GET_SHOP_PRODUCTS_FAIL,
  GET_SHOP_PRODUCTS_SUCCESS,
} from "../constants/shopConstants";

export const newShopReducer = (state = { shop: {} }, action) => {
  switch (action.type) {
    case NEW_SHOP_REQUEST:
      return {
        loading: true,
        shop: {},
      };
    case NEW_SHOP_SUCCESS:
      return {
        loading: false,
        success: true,
        shop: action.payload,
      };
    case NEW_SHOP_FAIL:
      return {
        loading: false,
        ...state,
        success: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        loading: false,
        ...state,
        success: false,
      };
    default:
      return state;
  }
};

export const allShopsReducer = (state = { shops: [] }, action) => {
  switch (action.type) {
    case ALL_SHOPS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_SHOPS_SUCCESS:
      return {
        loading: false,
        shops: action.payload,
      };

    case ALL_SHOPS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const shopDetailsReducer = (state = { shop: {} }, action) => {
  switch (action.type) {
    case SHOP_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SHOP_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        shop: action.payload.shop,
        products: action.payload.products,
      };
    case SHOP_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
