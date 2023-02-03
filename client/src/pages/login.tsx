import React,{useState,useContext} from 'react';
import axios from 'axios';
import {loginContext} from '../App'
import { useNavigate,Link } from 'react-router-dom';



function Login() {
    
    // type logintype={
    //     isauth:Boolean,
    //     userrole:string,

    // }
const [loginData,setLoginData]=useState({});
// const [loginresponse,setloginresponse]=useState<logintype>();
const endpoint='http://localhost:8080/';

const {loginresponse,setloginresponse}=useContext(loginContext) 

const navigate=useNavigate();

const handleFormData=(e: React.ChangeEvent<HTMLInputElement>)=>{

  setLoginData({...loginData,
    [e.target.name]: e.target.value
  })
};

const handleLogin=async(e:React.FormEvent<HTMLFormElement>):Promise<any> =>{
  e.preventDefault();
  try{
  const response:any= await axios.post(endpoint,loginData);
  console.log(response)
  setloginresponse(response.data);
  if(loginresponse){
    if(loginresponse.isauth===true && loginresponse.userrole===null){
        navigate('/user')
      }else if(loginresponse.isauth===true && loginresponse.userrole==='admin'){
        navigate('/admin')
      }else{
        navigate('/');
      }
  }
    
  
 

  }catch(err){
    console.log(err)
  }

}
console.log(loginresponse)
  return (
    <>
    <form onSubmit={handleLogin}>
    <h2>Login</h2>
    <label htmlFor="username">Email:</label>
    <input type="text" id="email" name="email"  required onChange={handleFormData}></input>
    <label htmlFor="password">Password:</label>
    <input type="password" id="password" name="password"  required onChange={handleFormData}></input>
    <input type="submit" value="Login"></input>
    <div> <Link to='/register'>create account</Link></div>
   <p> <Link to='/reset-password'> Forgot password</Link></p> 
  </form>
  
  </>

   
  )
}

export default Login;