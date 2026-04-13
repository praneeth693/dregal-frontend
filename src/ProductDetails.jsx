import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const API =
    import.meta.env.DEV
      ? "http://localhost:5000"
      : "https://dreagal-backend.onrender.com";

  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const fetchProduct = async () => {
    try {
      const res = await fetch(`${API}/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = () => {
    const existing = cart.find(
      (item) => item.productId === product._id
    );

    if (existing) {
      const updatedCart = cart.map((item) =>
        item.productId === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          productId: product._id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ]);
    }
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.productId !== id));
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (!product) return <h2>Loading...</h2>;

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 3, padding: "40px" }}>
        <img
          src={`${API}/uploads/${product.image}`}
          alt={product.title}
          style={{ width: "300px" }}
        />
        <h2>{product.title}</h2>
        <h3>{product.category}</h3>
        <p>{product.description}</p>

        <h3 style={{ color: "#2c7be5" }}>₹ {product.price}</h3>

        <button
          onClick={addToCart}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2c7be5",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Add to Cart
        </button>
      </div>

      <div
        style={{
          flex: 1,
          borderLeft: "1px solid #ccc",
          padding: "20px",
          background: "#f9f9f9",
        }}
      >
        <h3>Cart</h3>

        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.productId}
                style={{
                  borderBottom: "1px solid #ddd",
                  marginBottom: "10px",
                  paddingBottom: "10px",
                }}
              >
                <img
                  src={`${API}/uploads/${item.image}`}
                  width="60"
                  alt={item.title}
                />
                <p>{item.title}</p>
                <p>
                  ₹ {item.price} × {item.quantity}
                </p>

                <button
                  onClick={() => removeItem(item.productId)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}

            <h4>Total: ₹ {totalAmount}</h4>

            <button
              onClick={() => navigate("/checkout")}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Buy Now
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
