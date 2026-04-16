let users=[];
exports.getUsers=(req,res)=>{
    res.json(users);
};
exports.addUser=(req,res)=>{
    const{name,email}=req.body;
    if(!name || !email){
    return res.status(400).json({message: "Name and Email are not filled"});
    }
    const newUser ={
        id:Date.now().toString(),
        name, email,
    };
    users.push(newUser);
    res.json(newUser);
};
exports.updateUser = (req,res)=>{
    console.log("editid:",iditid);
    const{id}=req.params;
    const{ name, email}=req.body;
    users=users.map((user)=>
    user.id===id?{...user,name,email}:user);
    res.json({message:"update done"});
};
exports.deleteUser=(req,res)=>{
    const{id}=req.params;
    console.log("DElete hit :",id);
    users=users.filter((user)=>user.id !== id);
    res.json({message:"Deleted"});
};