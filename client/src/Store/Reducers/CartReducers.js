import { 
    CART_ADD_ITEM, 
    CART_EMPTY, 
    CART_REMOVE_ITEM, 
    CART_SAVE_PAYMENT_METHOD, 
    CART_SAVE_SHIPPING_ADDRESS 
} from "../../Constants/CartConstants";

export const cartReducer = (state = {cartItems: []}, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find( (x) => x.productId === item.productId );
            if(existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.productId === existItem.productId ? item : x
                    )
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                };
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.productId !== action.payload) 
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        case CART_SAVE_PAYMENT_METHOD:
            return{
                ...state,
                paymentMethod: action.payload
            }
        case CART_EMPTY:
            return { ...state, cartItems: [] };
            default: 
            return state;
    }
}