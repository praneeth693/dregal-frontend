import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
function Products() {

  const [products, setProducts] = useState([]);
const navigate=useNavigate();
 
  const fetchProducts = async () => {
    try {

  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);

      const data = await res.json();
setProducts(data);

    } catch (error) {
      console.log(error);
    }
  };

 
  useEffect(() => {
    fetchProducts();
  }, []);

  return (

    <div style={{ padding: "30px" }}>

      <h2 style={{ marginBottom: "20px" }}>
        All Products
      </h2>

 
      {products.length === 0 ? (

        <p>No products available</p>

      ) : (

   <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px"
          }}
        >

          {products.map((p) => (

       <div
              key={p._id}
              onClick={()=>
                navigate(`/product/${p._id}`)
                }
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "12px",
                textAlign: "center",
                backgroundColor: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
              }}
       >

              <img
                src={`http://localhost:5000/uploads/${p.image}`}
                alt={p.title}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "6px"
                }}
              />

              <h4 style={{ marginTop: "10px" }}>
                {p.title}
              </h4>

              <p style={{ color: "#555" }}>
                ₹ {p.price}
              </p>

              <p style={{ fontSize: "13px", color: "gray" }}>
                {p.category}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default Products;