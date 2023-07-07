import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { updateUser } from '../store/features/postSlice';
import {useParams, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

const Update = () => {

    const {users} = useSelector((state) => state.usersReducer);

    const navigate = useNavigate();

    const {id} = useParams();
    // console.log(id);    

    // const currentUser = users.filter((user) => user.id === id)
    
    // const {name, age, gender} = currentUser[0]; will give error on reload

    const [data, setData] = useState({name: "", age: ""}); // did this initialization because of warning changing an uncontrolled input to controlled

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    useEffect(()=> {
        if (id) {
            const currentUser = users.filter((user) => user.id === id);
            setData(currentUser[0]);
          }
    },[])

    // console.log(name);

    const dispatch = useDispatch();

    

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(data));
        navigate("/read");
    }

    

  return (
    <div>
        <h2 >Edit the data</h2> <br/>
        <form onSubmit={handleSubmit}>
            Name<input type='text' placeholder='enter name' name="name" value={data && data.name} onChange={handleChange}/> <br/><br/>
            Age<input type='text' placeholder='enter age' name="age" value={data &&  data.age} onChange={handleChange} /> <br/><br/>
            <input type='radio' name="gender" onChange={handleChange} value="male" checked={data && data.gender === "male"} />Male <br/>
            <input type='radio' name="gender" onChange={handleChange} value="female" checked={data && data.gender === "female"}/>Female <br/>
            <button>Edit</button>
        </form>
    </div>
  )
}

export default Update