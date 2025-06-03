import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );
  if (currentUser) {
    return <>{children}</>;
  } else {
    return <Navigate to="/Kambaz/Account/Signin" replace />;
  }
}
