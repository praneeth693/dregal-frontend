import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  const downloadBill = () => {
    const order = JSON.parse(localStorage.getItem("lastOrder")); 

    if (!order) {
      alert("No order found");
      return;
    }

    let subtotal = 0;

    order.items.forEach((item) => {
      subtotal += item.price * item.quantity;
    });

    const gst = subtotal * 0.18;
    const total = subtotal + gst;

    const doc = new jsPDF();

    doc.text("Dregal Store", 20, 20); 
    doc.text("GST Bill", 20, 30);     

    doc.text(`Name: ${order.customer.name}`, 20, 40);
    doc.text(`Email: ${order.customer.email}`, 20, 50);

    let y = 70;

    order.items.forEach((item) => {
      doc.text(
        `${item.title} - ${item.quantity} x ${item.price}`, 
        20,
        y
      );
      y += 10;
    });

    doc.text(`Subtotal: ₹${subtotal}`, 20, y + 10);
    doc.text(`GST (18%): ₹${gst}`, 20, y + 20);
    doc.text(`Total: ₹${total}`, 20, y + 30);

    doc.save("bill.pdf");
  };

  return (
    <div className="container">
      <h2 className="title">Order Placed Successfully!</h2>

      <button
        onClick={downloadBill}
        className="btn download-btn"
      >
        Download Bill
      </button>

      <br /><br />

      <button
        onClick={() => navigate("/")}
        className="btn home-btn"
      >
        Go Home
      </button>
    </div>
  );
}

export default OrderSuccess;