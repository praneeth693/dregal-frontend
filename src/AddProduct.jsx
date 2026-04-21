import { useState } from "react";


function AddProduct() {

  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: null,
    category: ""
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProduct({
      ...product,
      image: e.target.files[0]
    });
  };

  const handleAddProduct = async () => {

    if (!product.title || !product.price || !product.category || !product.image) {
      alert("All fields required");
      return;
    }

    try {

      const formData = new FormData();

      formData.append("title", product.title);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("image", product.image);

      const res = await fetch("https://dreagal-backend.onrender.com", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      console.log(data);

      alert("Product Added Successfully");

      setProduct({
        title: "",
        price: "",
        image: null,
        category: ""
      });

      document.getElementById("imageInput").value = "";

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      <div
        style={{
          background: "white",
          padding: "30px",
          width: "350px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}
      >

        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Add Product
        </h2>

        <input
          name="title"
          placeholder="Product Title"
          value={product.title}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          id="imageInput"
          type="file"
          name="image"
          onChange={handleImageChange}
          style={{ marginBottom: "12px" }}
        />

        {/* <input
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          style=<select>
          </select>        /> */}

         <select 
  name="category"
  value={product.category}
  onChange={handleChange} 
  style={inputStyle}
>
  <option value="">Select Category</option>
  <option value="Polo Shop">Polo Shop</option>
  <option value="GenZ Store">GenZ Store</option>
  <option value="Women">Women</option>
  <option value="Men">Men</option>
  <option value="Kids">Kids</option>
  <option value="Max Sport">Max Sport</option>
</select>

        <button
          onClick={handleAddProduct}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#2c7be5",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          Add Product
        </button>

      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginBottom: "12px",
  borderRadius: "4px",
  border: "1px solid #ccc"
};

export default AddProduct;