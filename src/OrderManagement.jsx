import { useEffect, useState } from "react";

function OrderManagement() {
  const [orders, setOrders] = useState([]);

 useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(data);
  }, []);
const updateStatus = (index) => {
    const updated = [...orders];
    updated[index].status = "Delivered";
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

const deleteOrder = (index) => {
    const updated = orders.filter((_, i) => i !== index);
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "powderblue", minHeight: "100vh" }}>
      <h2>Order Management</h2>
{orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            style={{
              border: "1px solid black",
              padding: "10px",
              marginBottom: "15px",
              backgroundColor: "white"
            }}
          >
            <h4>Order {index + 1}</h4>

            <p>Name: {order.customer.name}</p>
            <p>City: {order.customer.city}</p>
            <p>Phone: {order.customer.number}</p>

            <p><b>Items:</b></p>
            {order.items.map((item, i) => (
              <p key={i}>
                {item.title} - {item.quantity} × ₹{item.price}
              </p>
            ))}

            <p>Total: ₹{order.total}</p>

            <p>Status: {order.status || "Pending"}</p>

            <button
              onClick={() => updateStatus(index)}
              style={{
                backgroundColor: "blue",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer"
              }}
            >
              Mark Delivered
            </button>

            <button
              onClick={() => deleteOrder(index)}
              style={{
                backgroundColor: "blue",
                color: "white",
                border: "none",
                padding: "5px 10px",
                marginLeft: "10px",
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderManagement;