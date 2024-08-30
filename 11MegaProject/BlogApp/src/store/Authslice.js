import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    //our thask is to check user is authenticated or not so we make it false initially
    status: false,
    userdata: null,    //there is no data about user initially
    users: [],
}

// const initialstatepost = {
//     allpost: "null",
//     userpost: "null",
//     userdata: 'null'
// }

const Authslice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login(state, action){
            state.status = true;
            state.userdata = action.payload;
            
        },
        
        logout(state, action){
            state.status = false;
            state.userdata = 'null';
            state.users = []
        },

        setUsers(state, action) {
            state.users = action.payload;    // Set the list of users
        }

    }
})

// const Postslice = createSlice({
//     name: 'posts',
//     initialstatepost,
//     reducers: {

//     }
// })

export const {login, logout, setUsers} = Authslice.actions;

export default Authslice.reducer;