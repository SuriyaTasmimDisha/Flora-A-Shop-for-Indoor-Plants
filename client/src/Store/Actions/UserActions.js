import axios from "axios";
import { 
    USER_LOGIN_FAIL, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS,
    USER_REGISTER_FAIL, 
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS, 
    USER_LOGOUT,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,  
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_CREATE_FAIL,
    USER_CREATE_REQUEST,
    USER_CREATE_SUCCESS
  } from "../../Constants/UserConstants"

export const login = (email, password) => async(dispatch) => {
    dispatch({ 
        type: USER_LOGIN_REQUEST,
        payload: {email, password}
        });
    try {
        const {data} = await axios.post('/users/login', {email, password});
        dispatch({ 
            type: USER_LOGIN_SUCCESS,
            payload: data
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
};

export const register = (name, email, password) => async(dispatch) => {
    dispatch({ 
        type: USER_REGISTER_REQUEST,
        payload: {name, email, password}
        });
    try {
        const {data} = await axios.post('/users/register', {name, email, password});
        dispatch({ 
            type: USER_REGISTER_SUCCESS,
            payload: data
        });
        dispatch({ 
            type: USER_LOGIN_SUCCESS,
            payload: data
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({type: USER_LOGOUT});
    document.location.href = '/login';
};

export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.patch(`/users/profile`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.patch(`/users/${user._id}`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_FAIL, payload: message });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  dispatch({ type: USER_LIST_REQUEST });
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const { data } = await axios.get('/users', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_LIST_FAIL, payload: message });
  }
};

export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DELETE_REQUEST, payload: userId });
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DELETE_FAIL, payload: message });
  }
};

export const createUser = (name, email, password, role) => async (dispatch, getState) => {
  dispatch({ 
    type: USER_CREATE_REQUEST,
    payload: {name, email, password, role}
  });
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.post(
      '/users/create',
      {name, email, password, role},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: USER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_CREATE_FAIL, payload: message });
  }
};