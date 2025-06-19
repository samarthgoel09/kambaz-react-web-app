import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "./client";
import { setCurrentUser } from "./reducer";
import type { RootState } from "../store";

export default function Session({ children }: { children: React.ReactNode }) {
  const dispatch    = useDispatch();
  const currentUser = useSelector((s: RootState) => s.accountReducer.currentUser);

  useEffect(() => {
    profile()
      .then((u) => dispatch(setCurrentUser(u)))
      .catch(() => dispatch(setCurrentUser(null)));
  }, [dispatch]);

  if (currentUser === undefined) {
    return <div className="text-center p-4">Loading session…</div>;
  }

  return <>{children}</>;
}
