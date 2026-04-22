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

  const cgst = subtotal * 0.09;
  const sgst = subtotal * 0.09;
  const total = subtotal + cgst + sgst;

  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("DREAGAL STORE", 20, 20);

  doc.setFontSize(10);
  doc.text("GSTIN: 29ABCDE1234F1Z5", 20, 28);
  doc.text("Bangalore, India", 20, 34);

  doc.text(`Customer: ${order.customer.name}`, 20, 45);
  doc.text(`Email: ${order.customer.email}`, 20, 52);
  doc.text(`Date: ${order.date}`, 20, 59);

  let y = 75;

  doc.text("Item", 20, y);
  doc.text("Qty", 100, y);
  doc.text("Price", 120, y);
  doc.text("Total", 150, y);

  y += 10;

  order.items.forEach((item) => {
    doc.text(item.title, 20, y);
    doc.text(String(item.quantity), 100, y);
    doc.text(String(item.price), 120, y);
    doc.text(String(item.price * item.quantity), 150, y);
    y += 10;
  });

  y += 10;

  doc.text(`Subtotal: ₹${subtotal.toFixed(2)}`, 20, y);
  doc.text(`CGST (9%): ₹${cgst.toFixed(2)}`, 20, y + 10);
  doc.text(`SGST (9%): ₹${sgst.toFixed(2)}`, 20, y + 20);
  doc.text(`Total: ₹${total.toFixed(2)}`, 20, y + 30);

  doc.save("GST_Bill.pdf");
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