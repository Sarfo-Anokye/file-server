import React, { useState, useContext, useEffect } from "react";
// import {loginContext} from '../App.js'
import axios from "axios";
import FileDownload from "js-file-download";
function User() {
  const endpoint = "http://localhost:8080/users"; //for gettin all files from the server
  const downloadendpoint = "http://localhost:8080/download"; //for downloading files from the server

  // const {loginresponse,setloginresponse}=useContext(loginContext)

  const [searchTerm, setSearchTerm] = useState("");
  const [listFiles, setListFiles] = useState([]); //holding all the files from the server

  const getSeachTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  //function for downloading a file from the server
  const fileDownload = async (fname: string) => {
    const data = { filename: fname };
    try {
      const res = await axios.post(downloadendpoint, data);
      FileDownload(res.data, fname);
    } catch (error) {
      console.log(error);
    }
  };

  //getiing all files from the server
  const getFiles = async () => {
    try {
      const response = await axios.get(endpoint);
      // console.log(response.data);
      setListFiles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFiles();
  }, [listFiles]);

  return (
    <div className="users">
      <input type="text" placeholder="Search..." onChange={getSeachTerm} />
      {listFiles
        .filter((value: string) => {
          if (searchTerm === "") {
            return value;
          } else if (value.toLowerCase().includes(searchTerm.toLowerCase())) {
            return value;
          }
        })
        .map((file) => (
          <li className="user">
            {file}
            <button onClick={() => fileDownload(file)}>download</button>
          </li>
        ))}
    </div>
  );
}

export default User;
