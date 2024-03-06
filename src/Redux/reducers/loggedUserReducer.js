import { createSlice } from "@reduxjs/toolkit";

const loggerSlice = createSlice({
    name: 'logged user',
    initialState: {
        loggedUser: [],
    },
    reducers: {
        setLoggedUser: (state, action) => { state.loggedUser = action.payload },
        removeLoggedUser: (state, action) => { state.loggedUser = [] }
    }

})
export const { setLoggedUser, removeLoggedUser } = loggerSlice.actions
export default loggerSlice.reducer