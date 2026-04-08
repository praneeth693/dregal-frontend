import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditUser() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    mobile: "",
    role: ""
  });

  const fetchUser = async () => {

    const res = await fetch(`http://localhost:5000/api/auth/users/${id}`);
    const data = await res.json();

    setUser(data);

  };

  useEffect(() => {

    fetchUser();

  }, []);

  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  };

  const updateUser = async () => {

    await fetch(`http://localhost:5000/api/auth/users/${id}`, {

      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        mobile: user.mobile,
        role: user.role
      })

    });

    alert("User Updated");

    navigate("/admin/users");

  };

  return (

    <div style={{ padding: "40px", textAlign: "center" }}>

      <h2>Edit User</h2>

      <input
        name="mobile"
        value={user.mobile}
        onChange={handleChange}
        placeholder="Mobile"
        style={{ marginBottom: "10px", padding: "6px" }}
      />

      <br />

      <input
        name="role"
        value={user.role}
        onChange={handleChange}
        placeholder="Role"
        style={{ marginBottom: "10px", padding: "6px" }}
      />

      <br />

      <button
        onClick={updateUser}
        style={{
          backgroundColor: "#2c7be5",
          color: "white",
          border: "none",
          padding: "8px 16px",
          cursor: "pointer"
        }}
      >
        Save Changes
      </button>

    </div>

  );

}

export default EditUser;