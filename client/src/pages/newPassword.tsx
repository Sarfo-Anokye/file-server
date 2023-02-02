import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"

type passwordtype={
    password:string,
    confirm_password:string
}
function NewPassword() {
  const [passwordData, setPassword] = useState<passwordtype>({}as passwordtype);
  const {id}=useParams() //getting the id from url
  const {token}=useParams() //getting token from url
  const endpoint = `http://localhost:8080/reset-password/${id}/${token}`;

  const handlePasswordData = (e:React.ChangeEvent<HTMLInputElement>) => { //function for assigning the forms data
    setPassword({ ...passwordData, [e.target.name]: e.target.value });
  };

  const createPassword = async(e: React.FormEvent<HTMLFormElement>) => { //sending password data to the server
    e.preventDefault();
    if(passwordData.password===passwordData.confirm_password){
        const response=await axios.post(endpoint,passwordData)
    }else{
        console.log('password does not match')
    }
    
  };
  
  // console.log(id)
  return (
    <div>
      <form onSubmit={createPassword}>
        <h2>RESET PASSWORD</h2>
        <label htmlFor="password">New Paasword:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={handlePasswordData}
        ></input>
        <label htmlFor="confirm_password">confirm Paasword:</label>
        <input
          type="password"
          id="confirm-password"
          name="confirm_password"
          required
          onChange={handlePasswordData}
        ></input>
        <input type="submit" value="create"></input>
      </form>
    </div>
  );
}

export default NewPassword;
