import { AnyAction } from '@reduxjs/toolkit';
import { User, createUser } from '../types/user';

const defaultUser = { value: createUser() };

function userReducer(state: {value: User} = defaultUser, action: AnyAction) {
  switch (action.type) {
    case 'user/set': {
      if (action.payload === null) { return state; }
      return { ...state, value: action.payload };
    }
    case 'user/imgs': {
      // console.log(`updating imgs section with ${JSON.stringify(action.payload)}`);
      return { ...state, value: { ...state.value, imgs: action.payload } };
    }
    default: return state;
  }
}

export default userReducer;
