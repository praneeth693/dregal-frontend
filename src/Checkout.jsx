import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Chekout() {
  const navigate = useNavigate();

  const API =
    import.meta.env.DEV
      ? "http://localhost:5000"
      : "https://dregal-backend.onrender.com";

  const [form, setForm] = useState({
    name: "",
    city: "",
    number: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const order = {
      customer: form,
      items: cart,
      total: cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      date: new Date().toLocaleString(),
      status: "Pending",
    };

    await fetch(`${API}/place-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, order])
    );

    localStorage.removeItem("cart");

    alert("order placed successfully!");
    navigate("/");
  };

  const handlePayment = async () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const res = await fetch(`${API}/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: total }),
    });

    const data = await res.json();

    const options = {
      key: "rzp_test_SYDb9gIxkE4TDc",
      amount: data.amount,
      currency: "INR",
      name: "My Store",
      description: "Test Payment",
      order_id: data.id,

      handler: function () {
        placeOrder();
      },

      prefill: {
        name: form.name,
        email: form.email,
        contact: form.number,
      },

      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Checkout</h1>

      <input name="name" placeholder="Enter Name" onChange={handleChange} />
      <br /><br />

      <input name="city" placeholder="Enter city" onChange={handleChange} />
      <br /><br />

      <input name="number" placeholder="Enter Number" onChange={handleChange} />
      <br /><br />

      <input name="email" placeholder="Enter email" onChange={handleChange} />
      <br /><br />

      <input name="address" placeholder="Enter Address" onChange={handleChange} />
      <br /><br />

      <button
        onClick={handlePayment}
        style={{
          padding: "10px 20px",
          background: "blue",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        pay with razorpay
      </button>
    </div>
  );
}

export default Chekout;