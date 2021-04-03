import axios from 'axios';
import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,  
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS
} from '../../Constants/ProductConstants';

export const listProducts = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });
    try {
       const { data } = await axios.get('/products');
       dispatch({
           type: PRODUCT_LIST_SUCCESS,
           payload: data
       }); 
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.message
        });
    };
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST,
              payload: productId});
  try {
    const {data} = await axios.get(`/products/${productId}`);
    dispatch({type: PRODUCT_DETAILS_SUCCESS,
              payload: data}); 
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL,
    payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        });
  }
};

export const createProduct = (name, category, image, price, countInStock, details, plantCare) => async (dispatch, getState) => {
  dispatch({ 
    type: PRODUCT_CREATE_REQUEST,
    payload: {name, category, image, price, countInStock, details, plantCare}
  });
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.post(
      '/products',
      {name, category, image, price, countInStock, details, plantCare},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.patch(`/products/${product._id}`, product, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_UPDATE_FAIL, error: message });
  }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const { data } = axios.delete(`/products/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
     } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
  }
};