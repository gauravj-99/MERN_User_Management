import { useEffect, useState } from "react";
import axios from "axios";
const API ="http://localhost:5000/users";

function App(){
  const[users,setUsers]=useState([]);
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");

  const fetchUsers=async()=>{
    const res=await axios.get(API);
    setUsers(res.data);
  };

  useEffect(()=>{
    fetchUsers(); 
  },[]);

  const addUser=async()=>{
    if(!name || !email){
      alert("Please Fill Detail");
      return;
    }
    await axios.post(API, {name, email});
    setName("");
    setEmail("");
    fetchUsers();
  };

  const deleteUser= async(id)=>{
    console.log("delete clicked:", id)
    await axios.delete(`${API}/${id}`);
    await fetchUsers();
  };
  return (
    <div style={{padding: "20px"}}>
      <h1>USER MANAGEMENT LIST</h1>

      <input 
      placeholder="Name"
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />

      <input 
      placeholder="Email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      />

      <button onClick={addUser}>Add User</button>

      <hr></hr>
      {users.map((user)=>{
        console.log("user:",user);
        return(
        <div key={user.id}>
          {user.name}-{user.email}
          <button onClick={()=>deleteUser(user.id || user._id)}>Delete</button>
        </div>
        );
      })}
    </div>
  );
}
export default App;