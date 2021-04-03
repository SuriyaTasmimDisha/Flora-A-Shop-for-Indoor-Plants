import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, deleteProduct } from '../../Store/Actions/ProductActions';
import LoadingBox from '../../Components/LoadingBox';
import MessageBox from '../../Components/MessageBox';
import { PRODUCT_DELETE_RESET } from '../../Constants/ProductConstants';

export default function ProductListScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }  
    dispatch(listProducts());
  }, [dispatch, props.history, successDelete]);
  
  const deleteHandler = (product) => {
   if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product._id));
    }
  };

  return (
    <div>
      <div className="row">
        <h1>Products</h1>
        <button type="button"  onClick={() => props.history.push(`/product/create`)}> 
          Create Product
        </button>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>PRICE</th>
              <th>Count in Stock</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.countInStock}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/catalogue/${product._id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}