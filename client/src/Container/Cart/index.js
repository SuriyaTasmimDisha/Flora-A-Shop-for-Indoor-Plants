import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MessageBox from '../../Components/MessageBox';
import { addToCart, removeFromCart } from '../../Store/Actions/CartActions';

export default function CartPage(props) {
    const productId = props.match.params.id;
    const qty = props.location.search 
        ? Number(props.location.search.split('=')[1])
        : 1;
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const dispatch = useDispatch();
     useEffect(() => {
         if(productId) {
            dispatch(addToCart(productId, qty));
         }
     }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    } 
    const checkoutHandler = () => {
        props.history.push('/login?redirect=shipping');
    }
    return (
        <div className='row center'>
             <div className='col-2'>
                 <h1>Shopping Cart</h1>
                 {cartItems.length === 0 ? (
                     <MessageBox>
                         Cart is empty. 
                         <Link to='/catalogue'> Go Shopping</Link>
                     </MessageBox>
                 ) : (
                     <ul>
                         {cartItems.map((item) => (
                            <li key={item.productId}>
                                <div className='row'>
                                    <div>
                                        <img
                                        src={item.image}
                                        alt={item.name}
                                        className='small'
                                        />
                                    </div>
                                    <div className='min-30'>
                                        <Link to={`/catalogue/${item.productId}`}>{item.name}</Link>
                                    </div>
                                    <div>
                                        <select
                                         value={ item.qty }
                                         onChange={(e) =>
                                           dispatch(
                                               addToCart(item.productId, Number(e.target.value))
                                           )                 
                                         }
                                        >
                                         {[...Array(item.countInStock).keys()].map((x) => (
                                                      <option key={ x + 1 } value={ x + 1 }>
                                                          {x + 1}
                                                      </option>
                                            ))}   
                                        </select>
                                    </div>
                                    <div>
                                        ${item.price} X ${item.qty} = ${item.price*item.qty}
                                    </div>
                                    <div>
                                        <button
                                          type='button'
                                          onClick={() => removeFromCartHandler(item.productId)}
                                         >
                                          Delete   
                                         </button>
                                    </div>
                                </div>
                            </li>
                         ))}
                     </ul>
                 )}

                <div className='card card-body'>
                    <ul>
                        <li>
                            <h2>
                                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                            </h2>
                        </li>
                        <li>
                          <button
                           type='button'
                           onClick={checkoutHandler}
                           className='block'
                           disabled={cartItems.length === 0}
                          >
                            Proceed to Checkout
                          </button>   
                        </li>
                    </ul>
                </div>
            </div>  
        </div>
    )
}
