import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../../Components/LoadingBox';
import MessageBox from '../../Components/MessageBox';
import { detailsProduct } from '../../Store/Actions/ProductActions';

export default function ProductDetailsPage(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const {loading, error, product} = productDetails;
    
    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty= ${qty}`)
    }

    return (
        <div>
            { loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant='danger'>{error}</MessageBox>
            ) : (
                <div>
            <div className='row center'>
                <div className='col-2'>
                    <img className='large' src={product.image} alt={product.name} />
                </div>   
                <div className='col-2'>
                    <div className='card card-body'>
                    <ul>
                        <li>
                            <h1>{product.name}</h1>
                        </li>
                        <li>Price: ${product.price}</li>
                        <li>Details:
                        <p>{product.details}</p>
                        </li>
                        <li>Plant Care:
                        <p>{product.plant_care}</p>
                        </li>
                        <li>Status: {product.countInStock > 0 ? (
                                        <span className='success'>In Stock</span>
                                    ) : (
                                        <span className='danger'>Unavailable</span>
                                    )}
                        </li>
                        {
                            product.countInStock > 0 && (
                                <>
                                <li>
                                    <div className='row'>
                                      <div>Qty <select
                                              value={qty}
                                              onChange={(e) => setQty(e.target.value)}
                                               >
                                              {[...Array(product.countInStock).keys()].map(
                                                  (x) => (
                                                      <option key={x+1} value={x+1}>
                                                          {x+1}
                                                      </option>
                                                  )
                                              )}
                                          </select>
                                      </div>
                                    </div>  
                                </li>
                                 <li>
                                <button onClick={addToCartHandler} className="primary block">
                                    Order Now
                                </button>
                                </li>
                                </>
                            )
                        }
                        
                    </ul>
                    </div>
                </div>
            </div>
        </div>
            )}      
        </div>
        
    )
}
