import { Routes, Route, Navigate } from "react-router-dom";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css"
export default function Kambaz() {
  return (
    <div id="wd-kambaz">
            <KambazNavigation />
<div className="wd-main-content-offset p-3">
      <Routes>
         <Route index           element={<Navigate to="Account" replace />} />
         <Route path="Account/*"   element={<Account />} />
         <Route path="Dashboard"   element={<Dashboard />} />
         <Route path="Courses/:cid/*" element={<Courses />} />
         <Route path="Calendar"    element={<h1>Calendar</h1>} />
         <Route path="Inbox"       element={<h1>Inbox</h1>} />
      </Routes>
  </div>
    </div>
);}
