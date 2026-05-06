import { useEffect, useState } from "react";

function UserOrders() {
  const [orders, setOrders] = useState([]);

  const API = "https://dreagal-backend.onrender.com";

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API}/api/orders/${user._id}`);
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px"
          }}>
            <h4>Order #{index + 1}</h4>

            {order.items.map((item, i) => (
              <p key={i}>
                {item.title} - {item.quantity} x ₹{item.price}
              </p>
            ))}

            <h4>Total: ₹{order.total}</h4>
            <p>Status: {order.status || "Completed"}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default UserOrders;