import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

import AccountNavigation from "./Navigation";
import Signin    from "./Signin";
import Signup    from "./Signup";
import Profile   from "./Profile";
import Users     from "./Users";
import ProtectedRoute from "./ProtectedRoute"; 

export default function Account() {
  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );

  return (
    <div className="d-flex">
      <div className="d-none d-md-block">
        <AccountNavigation />
      </div>
      <div className="flex-fill">
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={currentUser ? "Profile" : "Signin"}
                replace
              />
            }
          />

          <Route path="Signin" element={<Signin />} />
          <Route path="Signup" element={<Signup />} />

          <Route
            path="Profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {currentUser?.role === "ADMIN" && (
            <Route
              path="Users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
          )}
        </Routes>
      </div>
    </div>
  );
}
