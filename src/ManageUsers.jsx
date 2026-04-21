import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

function ManageUsers(){
    
const navigate = useNavigate();
    const [users,setUsers]=useState([]);
    const fetchUsers=async()=>{
        const res=await fetch("https://dreagal-backend.onrender.com/api/auth/users");
        const data = await res.json();

  setUsers(data);
    };
    useEffect(()=>{
        fetchUsers();
    },[]);
    const deleteUser=async(id)=>{
        await fetch(`http://dreagal-backend.onrender.com/api/auth/users/${id}`,{
            method:"DELETE"

        });
        fetchUsers();
    };
const updateUser=async (id)=>{
    const newRole=prompt("Enter the role(user/admin)");
    if(!newRole) return;
    await fetch(`http://dreagal-backend.onrender.com/api/auth/users/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            role:newRole
        })
    });
    fetchUsers();
}
    return(
        <div style={{padding:"30px"}}>
            <h2>Manage Users</h2>
            <table border="1" width="100%">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Mobile</th>
                        <th>ROle</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u)=>(
                        <tr key={u._id}>
                            <td>{u._id}</td>
                            <td>{u.mobile}</td>
                            <td>{u.role}</td>

                            <td>

  <button
    onClick={() => navigate(`/admin/edit-user/${u._id}`)}
    style={{
      backgroundColor: "#2c7be5",
      color: "white",
      border: "none",
      padding: "6px 14px",
      marginRight: "8px",
      cursor: "pointer",
      borderRadius: "4px"
    }}
  >
    Edit
  </button>

  <button
    onClick={() => deleteUser(u._id)}
    style={{
      backgroundColor: "#2c7be5",
      color: "white",
      border: "none",
      padding: "6px 14px",
      cursor: "pointer",
      borderRadius: "4px"
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
export default ManageUsers;