import { Routes, Route, Navigate } from "react-router-dom";

import Session          from "./Account/Session";
import Account          from "./Account";
import Dashboard        from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses          from "./Courses";
import ProtectedRoute   from "./Account/ProtectedRoute";
import Lab4Counter      from "../Labs/Lab4/Counter";

import "./styles.css";

export default function Kambaz() {

  return (
    <Session>
      <div id="wd-kambaz">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route index element={<Navigate to="Account" replace />} />
            <Route path="Account/*" element={<Account />} />

            <Route
              path="Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="Lab4"
              element={
                <ProtectedRoute>
                  <Lab4Counter />
                </ProtectedRoute>
              }
            />

            <Route
              path="Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <Courses />
                </ProtectedRoute>
              }
            />

            <Route path="Calendar" element={<h1>Calendar</h1>} />
            <Route path="Inbox"    element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
