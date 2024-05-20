import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loadState} from "./storage.ts";


export const jwt_persistent_state = 'userData'

export interface UserPersistentState{
    jwt: string | null;
}

export interface UserState{
    jwt: string | null;
}

export const initialState: UserState = {
    jwt: loadState<UserPersistentState>(jwt_persistent_state)?.jwt ?? null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        addJwt: (state, action: PayloadAction<string>) => {
            state.jwt = action.payload;
        },
        logout: (state) => {
            state.jwt = null;
        }
    }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;