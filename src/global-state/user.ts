import { AnyAction } from "@reduxjs/toolkit";
import { User, createUser } from "../types/user";
const defaultUser = {value: createUser()}

function userReducer(state: {value: User} = defaultUser, action: AnyAction)
{
    if (action.type !== "user/set")
        return state;
    if (action.payload === null)
        return state;
    return {...state, value: action.payload}
}

export{userReducer}