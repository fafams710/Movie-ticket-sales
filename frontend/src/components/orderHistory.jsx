import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../redux/slices/orderSlice';

export default function OrderHistory() {
  const dispatch = useDispatch();
  const { orders, status } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="order-list">
      {orders.map(order => (
        <div key={order.id} className="order-card">
          <h3>{order.ticket_type.concert.title}</h3>
          <p>Quantity: {order.quantity}</p>
          <p>Total: ₱{order.total_price}</p>
          {order.qr_code && <img src={order.qr_code} alt="Ticket QR Code" />}
        </div>
      ))}
    </div>
  );
}