import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminListOrders, updateOrderStatusAdmin } from '../../Store/Actions/OrderActions';
import LoadingBox from '../../Components/LoadingBox';
import MessageBox from '../../Components/MessageBox';
import { ORDER_STATUS_UPDATE_RESET_ADMIN } from '../../Constants/OrderConstants';

export default function AdminOrderList(props) {
  const adminOrderList = useSelector((state) => state.adminOrderList);
  const { loading, error, orders } = adminOrderList;
  const [status, setOrderStatus] = useState('');
  const orderStatusUpdate = useSelector((state) => state.orderStatusUpdate);
  const {
    loading: loadingStatusUpdate,
    error: errorStatusUpdate,
    success: successStatusUpdate,
  } = orderStatusUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ORDER_STATUS_UPDATE_RESET_ADMIN });
    dispatch(adminListOrders());
  }, [dispatch, successStatusUpdate]);

  const orderStatusHandler = (order) => {
    dispatch(updateOrderStatusAdmin({_id: order._id, status}));
  };

  return (
    <div>
      <h1>Orders</h1>
      <button>
        Pending
      </button>
      <button>
        Accepted
      </button>
      <button>
        Delivered
      </button>
      {loadingStatusUpdate && <LoadingBox></LoadingBox>}
      {errorStatusUpdate && <MessageBox variant="danger">{errorStatusUpdate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>ORDER STATUS</th>
              <th>CHANGE ORDER STATUS</th>
              <th>SHOW PRODUCT DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.status}
                </td>
                <td>
                  <select
                    name='changeOrderStatus'
                    id='changeOrderStatus'
                    onChange={(e) => setOrderStatus(e.target.value)}
                  >
                  <option>----</option>
                  <option value='Pending'>Pending</option>  
                  <option value='Accepted'>Accepted</option>  
                  <option value='Delivered'>Delivered</option>
                  </select>
                  <button 
                  type="submit"
                  onClick={() => orderStatusHandler(order)}
                  >
                  Update
                 </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Details
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