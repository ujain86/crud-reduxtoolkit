import React, {useState} from 'react'
import { useEffect } from 'react';
import {NavLink, Outlet} from 'react-router-dom'
import { userSearch } from '../store/features/postSlice';
import {useDispatch, useSelector} from 'react-redux';

const Navbar = () => {

  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState("");

  useEffect(()=>{
    dispatch(userSearch(searchInput));
  }, [searchInput])
  
  const {users} = useSelector((state) => state.usersReducer);
  // console.log(searchInput);

  return (
    <>
        <div>
            <h2 >CRUD</h2>
            <NavLink to="/" >CreatePost </NavLink>  
            <NavLink to="/read">All Posts ({users.length}) </NavLink> 
            <input type='search' placeholder='Search...' onChange={(e) => setSearchInput(e.target.value)}/>
        </div>
    <Outlet />
    </>
  )
}

export default Navbar