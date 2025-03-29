import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../redux/slices/orderSlice';

const OrdersPage = () => {
    const dispatch = useDispatch();
    const { orders, status, error } = useSelector(state => state.orders);

    // Fetch orders when the component mounts
    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    // Loading state
    if (status === 'loading') {
        return <div>Loading orders...</div>;
    }

    // Error state
    if (status === 'failed') {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold text-center">Your Orders</h2>
            <div className="mt-6">
                {orders.length === 0 ? (
                    <p className="text-center">You have no orders.</p>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-lg shadow-lg p-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold">{order.ticket_type?.concert?.title}</h3>
                                    <span className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className="mt-2">
                                    <p>Quantity: {order.quantity}</p>
                                    <p>Total Price: ₱{order.total_price}</p>
                                    <p>Status: 
                                        <span className={`text-${order.status === 'paid' ? 'green' : order.status === 'cancelled' ? 'red' : 'yellow'}-500`}>
                                            {order.status}
                                        </span>
                                    </p>
                                </div>

                                {/* Show QR code if available */}
                                {order.qr_code && (
                                    <div className="mt-4">
                                        <img src={order.qr_code} alt={`QR Code for Order #${order.id}`} className="w-32 h-32" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;
