import React, {useState,useContext} from 'react'
import {loginContext} from '../App';
import axios from 'axios';

function Register() {
  const [formData,setformData]=useState({}); 
  const [resopnsedata,setResponse]=useState<any>([])
  const endpoint='http://localhost:8080/register';

  const {isloggedin,setisloggedin}=useContext(loginContext)

  const handleInput=(e:React.ChangeEvent<HTMLInputElement>)=>{ //fuction for assigning all forms data to formDAta object
    setformData({
      ...formData,
      [e.target.name]: e.target.value
  })
  }
// console.log(formData)

  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{  //function for submiting forma data to the server
    e.preventDefault();
    try{
    const response= await axios.post(endpoint,formData);
    console.log(response);
    console.log(response.data);
    setResponse([response.data])
    

    }catch(err){
      console.log(err)
    }
   
    console.log(isloggedin);
  }
 
  // console.log(resopnsedata)
  return (
    <>
     <form onSubmit={handleSubmit}>
    <h2>REGISTER</h2>
    <label htmlFor="name">Name:</label>
    <input onChange={handleInput} type="text" id="name" name="fname"></input>
    <label htmlFor="email">Email:</label>
    <input onChange={handleInput} type="text" id="email" name="email"></input>
    <label htmlFor="password">Password:</label>
    <input onChange={handleInput} type="password" id="password" name="password"></input>
    <label htmlFor="c_password">Confirm Password:</label>
    <input onChange={handleInput} type="password" id="c_password" name="c_password"></input>
    <input type="submit" value="Register"></input>
  </form>
  <ol>
 {resopnsedata.map((value:string)=>(
<ul>{value}</ul>
 ))}
 </ol>


</>
  )
}

export default Register;