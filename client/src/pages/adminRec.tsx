import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminRec() {
  const [fileRecords, setFileRecords] = useState<[] | null>(null);
  const endpoint="http://localhost:8080/filesrecords"

  const fetchRecords=async()=>{
   const response= await axios.get(endpoint)
    setFileRecords(response.data)
    console.log(response.data)
  }
  useEffect(()=>{
    fetchRecords()
},[])
  return (
    <>
    <div>
      <div className="adminNav">
        <Link to="/admin">Home</Link>
      </div>
      <table>
      <tr>
        <th>File Name</th>
        <th>File Title</th>
        <th>File Description</th>
        <th>Number of Downloads</th>
    </tr>
            {fileRecords?.map((val:any)=>(
            <tr>
            <td>{val.file_name}</td>
            <td>{val.file_title}</td>
            <td>{val.file_description}</td>
            <td>{val.downloads}</td> 
             </tr>
            ))}
          
        </table>

    </div>
    </>
  );
}

export default AdminRec;
