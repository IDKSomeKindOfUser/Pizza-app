import {configureStore} from "@reduxjs/toolkit";
import UserSlice, {jwt_persistent_state} from "./user.slice.ts";
import {saveState} from "./storage.ts";
import CartSlice, {cart_persistent_state} from "./cart.slice.ts";


export const store = configureStore({
    reducer: {
        user: UserSlice,
        cart: CartSlice,
    }
});

store.subscribe(() =>{
    saveState({jwt: store.getState().user.jwt}, jwt_persistent_state);
    saveState(store.getState().cart, cart_persistent_state);
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
