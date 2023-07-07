import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { createPost } from '../store/features/postSlice';
import {useNavigate} from 'react-router-dom';
import { showUsers } from '../store/features/postSlice';

const Create = () => {

    const [data, setData] = useState({});

    useEffect(()=>{
        dispatch(showUsers());
    },[]); // done this to get all posts count

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(createPost(data));
        navigate("/read");
    }

    const handleChange = (e) => {
        setData({...data, [e.target.name] : e.target.value});
    }

    console.log(data);

  return (
    <div style={{textAlign: "center"}}>
        <h2 >Fill the data</h2> <br/>
        <form onSubmit={handleSubmit}>
            Name<input type='text' placeholder='enter name' name="name" onChange={handleChange}/> <br/><br/>
            Age<input type='text' placeholder='enter age' name="age" onChange={handleChange} /> <br/><br/>
            <input type='radio' name="gender" onChange={handleChange} value="male" />Male <br/>
            <input type='radio' name="gender" onChange={handleChange} value="female" />Female <br/>
            <button>Create</button>
        </form>
    </div>
  )
}

export default Create