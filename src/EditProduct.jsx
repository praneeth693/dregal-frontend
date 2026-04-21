import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    image:null
  });

     const fetchProduct = async () => {



    fetch(`https://dreagal-backend.onrender.com/api/products/${id}`);

    const data = await res.json();

    setProduct(data);

};

  useEffect(() => {

    fetchProduct();

  }, []);

  const handleChange = (e) => {

    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });

  };

   const handleImageChange=(e)=>{
    setProduct({
      ...product,
      image:e.target.files[0]
    });
   };
  const updateProduct=async()=>{
    const formData=new FormData();
    formData.append("title",product.title);
    formData.append("price",product.price);
    formData.append("category",product.category);

     if(product.image){
      formData.append("image",product.image);
     }
      const res = await fetch(`https://dreagal-backend.onrender.com/api/products/${product._id}`,{
      method:"PUT",
      body:formData
     });
     const data=await res.json();
     console.log(data);
     alert("Product Updated");
     navigate("/admin/view");
  };


  return (

    <div 
    style={{
      minHeight:"100vh",
      backgroundColor:"lightgray",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    }}
    >
    <div
    style={{
      background:"white",
      padding:"30px",
      width:"350px",
      borderRadius:"8px",
      boxShadow:"0 2px 10px rgba(0,0,0,0.1)"
    }}
    >

      <h2 style={{ textAlign:"center",marginBottom:"20px"}}>Edit Product</h2>

      <input
        name="title"
        value={product.title}
        onChange={handleChange}
        placeholder="Title"
        style={inputStyle}
      />

      

      <input
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Price"
        style={inputStyle}
      />

      

      <select
        name="category"
        value={product.category}
        onChange={handleChange}
        placeholder="category"
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

      
      <input type="file"
      onChange={handleImageChange}
      style={{marginBottom:"12px"}} />
<button
  onClick={updateProduct}
  style={{
    width:"100%",
    backgroundColor: "#2c7be5",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer"
  }}
>
  Save Changes
</button>
</div>
    </div>

  );

}
const inputStyle={
  width:"100%",
  padding:"8px",
  marginBottom:"12px",
  borderRadius:"4px",
  border:"1px solid black"
};

export default EditProduct;