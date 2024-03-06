import { createSlice } from "@reduxjs/toolkit";

const Userslice = createSlice({
    name: 'users',
    initialState: {
        users: [],
    },
    reducers: {
        showUser: (state, action) => { state.users = action.payload },
        addUser: (state, action) => { state.users = [...state.users, action.payload] },
        removeUser: (state, action) => { state.users = [] }
    }

})
export const { addUser, showUser, removeUser } = Userslice.actions
export default Userslice.reducer