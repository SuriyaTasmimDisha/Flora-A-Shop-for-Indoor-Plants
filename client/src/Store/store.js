import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './Reducers/CartReducers';
import { orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer, orderMineListReducer, orderStatusUpdateReducer } from './Reducers/OrderReducers';
import { productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productUpdateReducer } from './Reducers/ProductReducers';
import { userCreateReducer, userDeleteReducer, userDetailsrReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, userUpdateReducer } from './Reducers/UserReducers';

const initialState = {
    userLogin: {
        userInfo: localStorage.getItem('userInfo')
         ? JSON.parse(localStorage.getItem('userInfo'))
         : null
    },
    cart: {
        cartItems: localStorage.getItem('cartItems') 
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
        shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {},
        paymentMethod: 'Bkash'
    }
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsrReducer,
    userUpdateProfile: userUpdateProfileReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    userCreate: userCreateReducer,
    orderStatusUpdate: orderStatusUpdateReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;