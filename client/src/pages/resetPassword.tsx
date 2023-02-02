import React, { useState } from "react";
import axios from "axios";

function ResetPassword() {
  const [emaildata, setEmailData] = useState({});
  const [resetResponse, setResetResponse] = useState<any>({});
  const endpoint = "http://localhost:8080/reset-password";

  const getEmailDAta = (e:React.ChangeEvent<HTMLInputElement>):void => {
    
    setEmailData({[e.target.name]:e.target.value})
  };
  const emailSubmithandler = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response=await axios.post(endpoint,emaildata);
    console.log(response)
    setResetResponse(response.data)
  };
  console.log(resetResponse)
  return (
    <div>
      <form onSubmit={emailSubmithandler}>
        <h2>RESET PASSWORD</h2>
        <label htmlFor="username">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          onChange={getEmailDAta}
        ></input>
        <input type="submit" value="Submit"></input>
      </form>
      <li>{resetResponse.message}</li>
    </div>
  );
}

export default ResetPassword;
