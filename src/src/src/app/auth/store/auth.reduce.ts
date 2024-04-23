import { createReducer, on } from "@ngrx/store";
import { login, logout } from "./auth.actions";

export interface AuthState{
  token:string|null;

}
export const initialState: AuthState = {
  token: null
};

const _authReducer = createReducer(
  initialState,
  on(login, (state, { token }) => ({ ...state, token })),
  on(logout, state => ({ ...state, token: null }))
);


export function authReducer(state:any,action:any){
  return _authReducer(state,action);
}
