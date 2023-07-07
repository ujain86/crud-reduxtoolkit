import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';


export const createPost = createAsyncThunk(
    "createPost",
    async (data, {rejectWithValue}) =>  {
        const response = await fetch("https://64a5422400c3559aa9bf6148.mockapi.io/crud",  {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        try{
            const result = await response.json();
            // console.log("result", result);
            return result;
        }catch(error){
            return rejectWithValue(error);
        }
    }
);


export const showUsers = createAsyncThunk(
    "showUsers",
    async(data, {rejectWithValue}) => {
        const response = await fetch("https://64a5422400c3559aa9bf6148.mockapi.io/crud");

        try{
            const result = await response.json();
            return result;
        }catch(error){
            return rejectWithValue(error);
        }
    }
)

export const deleteUser = createAsyncThunk(
    "deleteUser",
    async(data, {rejectWithValue}) => {
        const response = await fetch("https://64a5422400c3559aa9bf6148.mockapi.io/crud/" + data, {
            method: "DELETE",
        });

        try{
            const result = await response.json();
            return result;
        }catch(error){
            return rejectWithValue(error);
        }
    }
);

export const updateUser = createAsyncThunk(
    "updateUser",
    async(data, {rejectWithValue}) => {
        const response = await fetch("https://64a5422400c3559aa9bf6148.mockapi.io/crud/" + data.id, 
        {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        try{
            const result = await response.json();
            return result;
        }catch(error){
            return rejectWithValue(error);
        }
    }
);

const usersSlice = createSlice({
    name: "usersSlice",
    initialState:  {
        users: [],
        loading: false,
        error: null,
        searchInput: ""
    },
    reducers: {
        userSearch: (state, action) => {
            state.searchInput = action.payload;
        }
    },
    extraReducers: {
        [createPost.pending]: (state, action) => {
            state.loading = true;
        },
        [createPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.users.push(action.payload);
        },
        [createPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [showUsers.pending]: (state, action) => {
            state.loading = true;
        },
        [showUsers.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },
        [showUsers.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [deleteUser.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = state.users.filter((user) => user.id !== action.payload.id);
            console.log("result", action.payload);
        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [updateUser.pending]: (state, action) => {
            state.loading = true;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log("updated user data:", action.payload);
            state.users = state.users.map((user) => {
                if(user.id === action.payload.id){
                    return action.payload;
                }
                else{
                    return user;
                }
            })
        },
        [updateUser.rejected]: (state, action) => {
            state.loading = false;
        }
    }
});

export const {userSearch} = usersSlice.actions;
export default usersSlice.reducer;