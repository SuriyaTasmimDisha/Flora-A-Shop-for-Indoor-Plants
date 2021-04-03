import axios from 'axios';
import { CART_EMPTY } from '../../Constants/CartConstants';
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_MINE_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_STATUS_UPDATE_SUCCESS,
  ORDER_STATUS_UPDATE_REQUEST,
  ORDER_STATUS_UPDATE_FAIL
} from '../../Constants/OrderConstants';

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const { data } = await axios.post('/orders', order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsOrder = (orderId) => async(dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId});
  const { userLogin: {userInfo} } = getState(); 
  try {
    const { data } = await axios.get(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message = 
      error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
    dispatch({type: ORDER_DETAILS_FAIL, payload: message});
  }
}

export const listOrderMine = () => async(dispatch, getState) => {
  dispatch({ type: ORDER_MINE_LIST_REQUEST });
  const { userLogin: {userInfo} } = getState(); 
  try {
    const { data } = await axios.get('/orders/mine', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data })
  } catch (error) {
    const message = 
      error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
    dispatch({type: ORDER_MINE_LIST_FAIL, payload: message});
  }
};

export const listOrders = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_LIST_REQUEST });
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get('/orders', {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    console.log(data);
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_LIST_FAIL, payload: message });
  }
};

export const deleteOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(`/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DELETE_FAIL, payload: message });
  }
};

export const deliverOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELIVER_REQUEST, payload: orderId });
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.patch(
      `/orders/${orderId}/deliver`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DELIVER_FAIL, payload: message });
  }
};

export const updateOrderStatus = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_STATUS_UPDATE_REQUEST, payload: order });
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.patch(
      `/orders/${order._id}`, order,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: ORDER_STATUS_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_STATUS_UPDATE_FAIL, payload: message });
  }
};