import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { deleteUser, showUsers } from '../store/features/postSlice';
import {useNavigate} from 'react-router-dom'

const Read = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [gender, setGender] = useState("");

  useEffect(()=>{
    dispatch(showUsers());
  },[]);

  const {users, loading, searchInput} = useSelector((state) => state.usersReducer);

  const handleDelete = (id) => {
    // console.log(id);
    dispatch(deleteUser(id));
  }

  // console.log("posts", posts);

  if(loading){
    return <h1>Loading...</h1>
  }


  return (
    <>    
    <h1>All data</h1>
    <input  type='radio' name='gender' value="" onChange={() => setGender("")} checked= {gender===""} />All
    <input  type='radio' name='gender' value="male" onChange={() => setGender("male")} />Male
    <input  type='radio' name='gender' value="female" onChange={() => setGender("female")} />Female
      <div>
        {
        users.filter((user) => {
          if(searchInput == ""){
            return user;
          }
          else{
            // if(user.name.toLowerCase().includes(searchInput.toLowerCase()) || user.age.includes(searchInput)){
            //   return user;
            // }

            return (user.name.toLowerCase().includes(searchInput.toLowerCase()) || user.age.includes(searchInput));
            
          }
        })
        .filter((user) =>  {
          if(gender == ""){
            return user;
          }
          else{
            return gender === user.gender;
          }
        })
        .map((user, i) => {
          return <div key={i} style={{border: "1px solid black"}}>
            <p>{user.name}</p>
            <p>{user.age}</p>
            <p>{user.gender}</p>
            <button onClick={() => navigate("/update/" + user.id)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </div>
        })}
      </div>
    </>

  )
}

export default Read