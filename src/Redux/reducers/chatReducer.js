import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
    name: 'chats',
    initialState: {
        messages: [],
        pagination: {
            page: 0,
            totalPage: 0,
            total: 0
        },
        loading: false,
    },
    reducers: {
        setValue: (state, action) => {
            state[action.payload.target] = action.payload.value;
        },
        create: (state, action) => {
            state.messages = [...state.messages, action.payload]
        },
        update: (state, action) => {
            state.messages = state.messages.map(m => m.id === action.payload.id ? { ...m, ...action.payload } : m)
        },
        remove: (state, action) => {
            state.messages = state.messages.filter(m => m.id !== action.payload.id)
        }
    },
})

export const { setValue, create, update, remove } = chatSlice.actions

export default chatSlice.reducer