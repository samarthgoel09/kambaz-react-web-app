import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

import AccountNavigation from "./Navigation";
import Signin    from "./Signin";
import Signup    from "./Signup";
import Profile   from "./Profile";
import Users     from "./Users";
import ProtectedRoute from "./ProtectedRoute"; // ensure you have this

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
          {/* 1) Redirect to relative sub-page */}
          <Route
            path="/"
            element={
              <Navigate
                to={currentUser ? "Profile" : "Signin"}
                replace
              />
            }
          />

          {/* 2) Public auth routes */}
          <Route path="Signin" element={<Signin />} />
          <Route path="Signup" element={<Signup />} />

          {/* 3) Protected Profile */}
          <Route
            path="Profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* 4) Admin‐only Users */}
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
