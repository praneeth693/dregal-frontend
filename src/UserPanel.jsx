import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserPanel() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
      return;
    }

    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const userOrders = allOrders.filter(
      (order) => order.customer.number === user.mobile
    );

    setOrders(userOrders);
  }, []);

  const downloadBill = (order) => {
    localStorage.setItem("lastOrder", JSON.stringify(order));
    navigate("/order-success");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>User Dashboard</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "5px",
            }}
          >
            <h3>Order #{index + 1}</h3>

            <p><b>Date:</b> {order.date}</p>
            <p><b>Status:</b> {order.status}</p>
            <p><b>Total:</b> ₹{order.total}</p>

            <h4>Items:</h4>

            {order.items.map((item, i) => (
              <div key={i}>
                <p>
                  {item.title} × {item.quantity} = ₹
                  {item.price * item.quantity}
                </p>
              </div>
            ))}

            <button
              onClick={() => downloadBill(order)}
              style={{
                marginTop: "10px",
                padding: "8px 15px",
                background: "green",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Download Bill
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default UserPanel;