import { createReducer, on } from "@ngrx/store";
import { AppInitialState } from "../AppInitialState";
import { RegisterState } from "./RegisterState";
import { register } from "./register.actions";
import { registerSuccess } from "./register.actions";
import { registerFail } from "./register.actions";

const initialState = AppInitialState.register;
const reducer = createReducer(initialState,
    on(register, (state) => {
        return { 
            ...state, 
            isRegistering: true, 
            isRegistered: false, 
            error: null 
        }
    }),
    on(registerSuccess, (state) => {
        return { 
            ...state, 
            isRegistering: false, 
            isRegistered: true, 
   
        }
    }),
    on(registerFail, (state, action) => {
        return { 
            ...state, 
            isRegistering: false, 
            isRegistered: false, 
            error: action.error
        }
    })
);

export function registerReducer(state: RegisterState, action: any) {
    return reducer(state, action);

}