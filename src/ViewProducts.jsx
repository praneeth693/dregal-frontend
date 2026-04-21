import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewProducts() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

 const fetchProducts = async () => {

  const res = await fetch("http://dreagal-backend.onrender.com/api/products", {
    cache: "no-store"
  });

  const data = await res.json();

  setProducts(data);

};

  useEffect(() => {

    fetchProducts();

  }, []);

  const deleteProduct = async (id) => {

    await fetch(`http://dreagal-backend.onrender.com/api/products/${id}`, {
      method: "DELETE"
    });

    fetchProducts();

  };

  return (

    <div style={{ padding: "30px" }}>

      <h2>Products</h2>

      <table border="1" width="100%">

        <thead>

          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

  {products.map((p) => (

    <tr key={p._id}>

      <td>
        <img
          src={`http://dreagal-backend.onrender.com/uploads/${p.image}`}
          width="70"
        />
      </td>

      <td>{p.title}</td>
      <td>{p.price}</td>
      <td>{p.category}</td>

      <td>

        <button
          onClick={() => navigate(`/admin/edit/${p._id}`)}
          style={{
            backgroundColor: "#2c7be5",
            color: "white",
            border: "none",
            padding: "6px 14px",
            cursor: "pointer",
            marginRight: "8px",
            borderRadius: "4px",
            width: "70px"
          }}
        >
          Edit
        </button>

        <button
          onClick={() => deleteProduct(p._id)}
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "6px 14px",
            cursor: "pointer",
            borderRadius: "4px",
            width: "70px"
          }}
        >
          Delete
        </button>

      </td>

    </tr>

  ))}

</tbody>

      </table>

    </div>

  );

}

export default ViewProducts;