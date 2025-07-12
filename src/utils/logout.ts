import { logout } from "@/features/auth/authSlice";
import { AppDispatch } from "@/store/store";
import Cookies from "js-cookie";

export const handleLogout = (dispatch: AppDispatch) => {
  Cookies.remove("auth-token"); 
  dispatch(logout());           
};
