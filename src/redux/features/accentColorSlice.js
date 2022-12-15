import { createSlice } from '@reduxjs/toolkit';
const initialState = {
value:'000'
  };
const accentColorSlice=createSlice({
    name: 'player',
    initialState,
    reducers:{
        setAccentColor:(state,action)=>{state.value=action.payload}
    }
})

export const {setAccentColor}=accentColorSlice.actions;
export default accentColorSlice.reducer