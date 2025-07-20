import Cookies from "js-cookie";

import { logout } from "@/features/auth/auth-slice";
import { AppDispatch } from "@/store/store";

export const handleLogout = (dispatch: AppDispatch) => {
  Cookies.remove("auth-token");
  dispatch(logout());
};
