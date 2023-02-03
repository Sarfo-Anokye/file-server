import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import FormData from 'form-data';

function Admin() {
    //setting various inputs
  const [File, setFile] = React.useState<File>();
  const [fileTitle, setFileTitle] = useState("");
  const [fileDescription, setfileDescription] = useState("");
  // const [fda,setfda]=useState({})
  const endpoint = "http://localhost:8080/upload"; //api end point for uploading file

  const postFile = async (        //fuction for uploading file data to the server
    e: React.FormEvent<HTMLFormElement>
  ): Promise<any> => {
    e.preventDefault();
    const data = new FormData();
    if (File) {
      data.append("filename", File);
      data.append("title", fileTitle);
      data.append("description", fileDescription);
    }

    try {
      const response = await axios.post(endpoint, data);
      console.log(response);
      // console.log(data.values)
    } catch (err) {
      console.log(err);
    }
  };

  //functions for handling form data
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    setFile(fileList[0]);
  };
  const handleTitledata = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFileTitle(e.target.value);
  };
  const handleDescriptionedata = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setfileDescription(e.target.value);
  };

//   console.log(fileTitle);
//   console.log(fileDescription);
//   console.log(File);
  return (
    <div>
      <div className='adminNav'><Link to='/admin/records'>Records</Link></div>
      <form onSubmit={postFile}>
        <input type="file" onChange={handleFileChange} />
        <br></br>
        <br></br>
        <label>Title</label>
        <input type="text" name="title" onChange={handleTitledata} />
        <label>Description</label>
        <input
          type="text"
          name="decription"
          onChange={handleDescriptionedata}
        />
        <button
          type="submit"
          className="btn btn-sm btn-primary"
          id="js-upload-submit"
        >
          Upload files
        </button>
      </form>
    </div>
  );
}

export default Admin;
