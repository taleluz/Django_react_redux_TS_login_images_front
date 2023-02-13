import React, { useState } from 'react';
import axios from 'axios';
import {setUpd} from './galSlice';
import { access, stat } from 'fs';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { selectAccess } from '../login/loginSlice';
import jwt_decode from "jwt-decode";


const Upl = () => {
    const dispatch = useAppDispatch();
    const access = useAppSelector(selectAccess);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadedFile, setUploadedFile] = useState<any | null>(null);
    const [desc, setdesc] = useState("")
    const [title, setTitle] = useState("")
    const [image, setImage] = useState<File>();
    

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(event.target!.files![0]);
    };

    const handleUpload = async () => {
        console.log("first")
        if (!selectedFile) {
            return;
        }

        const formData = new FormData();
        console.log(access)
        let decoded: any= jwt_decode(access)
        formData.append('image', selectedFile);
        formData.append("title", title);
        formData.append("description", desc);
        formData.append("user", decoded.user_id);
        console.log(formData)
        try {
            const response = await axios.post('http://127.0.0.1:8000/img/', formData, {
                headers: {
                    'Authorization': `Bearer ${access}`,
                    'Content-Type': 'multipart/form-data'
                  }            
            })

            setUploadedFile(response.data.file);
            dispatch(setUpd())
        } catch (error) {
            console.error(error);
        }
    };

    const updUpload = async (id:number) => {
        console.log("first")
        if (!selectedFile) {
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append("title", title);
        formData.append("description", desc);
        console.log(formData)
        try {
            const response = await axios.put('http://127.0.0.1:8000/img/' + id, formData, {
                headers: {
                    'Authorization': `Bearer ${access}`,
                    'Content-Type': 'multipart/form-data'
                  }            
            })

            setUploadedFile(response.data.file);
            dispatch(setUpd())
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <input type="file" onChange={handleFileChange} /><br></br>
            Desc:<input onChange={(e)=>setdesc(e.target.value)} /> <br></br>
            Title:<input  onChange={(e)=>setTitle(e.target.value)} /><br></br>
            <button style={{backgroundColor:"green"}} onClick={handleUpload}>Upload</button><br></br><hr></hr>
            {uploadedFile && <p>Uploaded file: {uploadedFile}</p>}
        </div>
    );
};

export default Upl;