import  { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Session from "./Account/Session";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import ProtectedRoute from "./Account/ProtectedRoute";

import { findMyCourses, createCourse, unenrollFromCourse, enrollInCourse } from "./Account/client";
import * as courseClient from "./Courses/client";

import Lab4Counter from "../Labs/Lab4/Counter"; 

import type { RootState } from "./store";
import "./styles.css";

export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>([]);
  const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);

  useEffect(() => {
    if (!currentUser) {
      setCourses([]);
    } else {
      findMyCourses().then(setCourses).catch(() => setCourses([]));
    }
  }, [currentUser]);

  const handleAddCourse = async (courseData: any) => {
    const created = await createCourse(courseData);
    setCourses(prev => [...prev, created]);
    return created;
  };

  const handleDeleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    setCourses(prev => prev.filter(c => c._id !== courseId));
  };

  const handleUpdateCourse = async (course: any) => {
    await courseClient.updateCourse(course);
    setCourses(prev => prev.map(c => c._id === course._id ? course : c));
  };

  const handleUnenrollCourse = async (courseId: string) => {
    await unenrollFromCourse(courseId);
    setCourses(prev => prev.filter(c => c._id !== courseId));
  };

  const handleEnrollCourse = async (courseId: string) => {
    await enrollInCourse(courseId);
    const updated = await findMyCourses();
    setCourses(updated);
  };

  return (
    <Session>
      <div id="wd-kambaz">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Account" replace />} />
            <Route path="Account/*" element={<Account />} />

            <Route
              path="Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={courses}
                    onAddCourse={handleAddCourse}
                    onDeleteCourse={handleDeleteCourse}
                    onUpdateCourse={handleUpdateCourse}
                    onUnenrollCourse={handleUnenrollCourse}
                    onEnrollCourse={handleEnrollCourse}
                  />
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
            <Route path="Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
