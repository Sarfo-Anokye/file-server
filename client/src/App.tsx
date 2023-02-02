import "./App.css";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import Login from "./pages/login";
import Register from './pages/register';
import ResetPassword from './pages/resetPassword';
import NewPassword from './pages/newPassword';
import User from "./component/user";
import Admin from "./component/admin";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";

export const loginContext = createContext<any>(null);

// interface contex{
//   login:object,
//   setlogin:()=>void
// };
// type logintype={
//   isauth:Boolean,
//   userrole:string,

// }

function App() {
  const [loginresponse, setloginresponse] = useState()
  // console.log(isloggedin)
  const help = true;
  const contextValue={
    loginresponse,
    setloginresponse
  }
  return (
    <>
      <loginContext.Provider value={{contextValue}}>
        <BrowserRouter>
          <Routes>
            <Route path="/user" element={<User />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/" element={<Login />} />
            <Route path='/register' element={<Register/>} /> 
            <Route path='/reset-password/:id/:token' element={<NewPassword/>} /> 
            <Route path='/reset-password' element={<ResetPassword/>} /> 
          </Routes>
        </BrowserRouter>
      </loginContext.Provider>
    </>
  );
}

export default App;
