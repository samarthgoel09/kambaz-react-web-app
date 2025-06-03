
import type { AnyAction } from "redux";
import * as db from "./Database";

export interface Enrollment {
  user: string;
  course: string;
}

const initialState: Enrollment[] = [...db.enrollments];

const ENROLL_COURSE   = "enrollment/ENROLL_COURSE";
const UNENROLL_COURSE = "enrollment/UNENROLL_COURSE";

export const enrollCourse = (user: string, course: string) => ({
  type: ENROLL_COURSE,
  payload: { user, course },
});
export const unenrollCourse = (user: string, course: string) => ({
  type: UNENROLL_COURSE,
  payload: { user, course },
});

export default function enrollmentReducer(
  state = initialState,
  action: AnyAction
): Enrollment[] {
  switch (action.type) {
    case ENROLL_COURSE: {
      const { user, course } = action.payload;
      const already = state.some(
        (en) => en.user === user && en.course === course
      );
      if (already) return state;

      return [...state, { user, course }];
    }

    case UNENROLL_COURSE: {
      const { user, course } = action.payload;
      return state.filter(
        (en) => !(en.user === user && en.course === course)
      );
    }

    default:
      return state;
  }
}
