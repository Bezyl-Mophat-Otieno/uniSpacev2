import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user:null,
    bookedVenue:null,
    loading:false,
    error:false

}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        loginStart:(state)=>{
            state.loading = true
        },
        loginSuccess:(state,action)=>{
            state.loading=false,
            state.user = action.payload
        },
        loginFailure:(state)=>{
            state.loading=false

        },
        logout:(state)=>{
            state.user = null
        },
        updateUser:(state,action)=>{
            state.user = action.payload
        },

        assignVenue:(state,action)=>{
            state.bookedVenue = action.payload
        }
    }
});

export const { loginStart, loginSuccess, loginFailure, logout , updateUser , assignVenue } = userSlice.actions;
export default userSlice.reducer;