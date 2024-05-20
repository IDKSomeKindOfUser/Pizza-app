import {configureStore} from "@reduxjs/toolkit";
import UserSlice, {jwt_persistent_state} from "./user.slice.ts";
import {saveState} from "./storage.ts";


export const store = configureStore({
    reducer: {
        user: UserSlice,
    }
});

store.subscribe(() =>{
    saveState({jwt: store.getState().user.jwt}, jwt_persistent_state)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
