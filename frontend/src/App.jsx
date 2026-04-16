
import './index.css';
import { useEffect, useState } from "react";
import axios from "axios";
const API ="http://localhost:5000/users";

function App(){
  const[users,setUsers]=useState([]);
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[editid,setEditid]=useState(null);

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
    try{
      if(editid!==null){
      await axios.put(`${API}/${editid}`, {name, email});
      setEditid(null);
    }
    else{
      await axios.post(API, {name, email});

    }
    setName("");
    setEmail("");
    fetchUsers();
  }catch(error){
    console.log(error);
    }
  };
    

  const deleteUser= async(id)=>{
    console.log("delete clicked:", id)
    await axios.delete(`${API}/${id}`);
    await fetchUsers();
  };
  return (
    <div className="container">
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

      <button className="add-btn" onClick={addUser}>{editid ? "Update User" : "Add User"}</button>

      <hr></hr>
      {users.map((user)=>{
        console.log("user:",user);
        return(
        <div key={user._id || user.id}>
          {user.name}-{user.email}
          <button className="delete-btn" onClick={()=>deleteUser(user._id || user.id)}>Delete</button>

          <button className="edit-btn" onClick={()=>{
            console.log("editing user: ",user);
            setName(user.name);
            setEmail(user.email);
            setEditid(user._id || user.id);
          }}>Edit</button>
        </div>
        );
      })}
    </div>
  );
}
export default App;