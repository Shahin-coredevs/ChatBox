import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
    },
    reducers: {
        showMessage: (state, action) => { state.messages = action.payload },
        addMessage: (state, action) => { state.messages = [...state.messages, action.payload] },
        removeMessage: (state, action) => { state.messages = [] }


    },
})

export const { showMessage, addMessage, removeMessage } = chatSlice.actions

export default chatSlice.reducer