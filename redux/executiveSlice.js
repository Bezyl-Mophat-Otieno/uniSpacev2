import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user:null,
    loading:false,
    error:false

}

const executiveSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        addingStart:(state)=>{
            state.loading = true
        },
        addingSuccess:(state,action)=>{
            state.loading=false,
            state.user = action.payload
        },
        addingFailure:(state)=>{
            state.loading=false

        },

    }
});

export const { addingStart, addingSuccess, addingFailure } = executiveSlice.actions;
export default executiveSlice.reducer;