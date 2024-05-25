import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loadState} from "./storage.ts";


export const cart_persistent_state = 'cartData'


export interface CartItems {
    id: number,
    count: number,
}

export interface CartState {
    items: CartItems[];
}

export const initialState: CartState = loadState<CartState>(cart_persistent_state) ?? {
    items: []
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        add: (state, action: PayloadAction<number>) => {
            const existed = state.items.find(i => i.id === action.payload);
            if (!existed) {
                state.items.push({id: action.payload, count: 1});
                return;
            }
            state.items.map(i => {
                if (i.id === action.payload) {
                    i.count += 1;
                }
                return i;
            });
            return;
        },
        decrease: (state, action: PayloadAction<number>) => {
            const existed = state.items.find(i => i.id === action.payload);
            if (!existed) {
                return;
            }
            if (existed.count === 1) {
                state.items = state.items.filter(i => i.id !== action.payload);
            } else {
                state.items.map(i => {
                    if (i.id === action.payload) {
                        i.count -= 1;
                    }
                    return i;
                });
                return;
            }
        },
        remove: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(i => i.id !== action.payload);
        },
        clean: (state) => {
            state.items = [];
        }
    }
})


export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
