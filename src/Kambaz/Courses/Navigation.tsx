import { ListGroup } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";

export default function CourseNavigation() {
  const { courseId = "1234" } = useParams<{ courseId: string }>();

  const items = [
    { to: `/Kambaz/Courses/${courseId}/Home`,        label: "Home",        id: "wd-course-home-link",        end: true },
    { to: `/Kambaz/Courses/${courseId}/Modules`,     label: "Modules",     id: "wd-course-modules-link" },
    { to: `/Kambaz/Courses/${courseId}/Piazza`,      label: "Piazza",      id: "wd-course-piazza-link" },
    { to: `/Kambaz/Courses/${courseId}/Zoom`,        label: "Zoom Meetings",id: "wd-course-zoom-link" },
    { to: `/Kambaz/Courses/${courseId}/Assignments`, label: "Assignments", id: "wd-course-assignments-link" },
    { to: `/Kambaz/Courses/${courseId}/Quizzes`,     label: "Quizzes",     id: "wd-course-quizzes-link" },
    { to: `/Kambaz/Courses/${courseId}/Grades`,      label: "Grades",      id: "wd-course-grades-link" },
    { to: `/Kambaz/Courses/${courseId}/People`,      label: "People",      id: "wd-course-people-link" },
  ];

  return (
    <ListGroup
      id="wd-courses-navigation"
      className="wd fs-5 rounded-0 bg-white"
    >
      {items.map(({ to, label, id, end }) => (
        <NavLink key={id} to={to} end={end} style={{ textDecoration: "none" }}>
          {({ isActive }: { isActive: boolean; isPending: boolean }) => (
            <ListGroup.Item
              id={id}
              className={[
                "list-group-item",
                "list-group-item-action",
                "w-100",
                "py-3",
                "border-0",

                "bg-white",

                isActive
                  ? "text-dark border-start border-3 border-dark"
                  : "text-danger"
              ].join(" ")}
            >
              {label}
            </ListGroup.Item>
          )}
        </NavLink>
      ))}
    </ListGroup>
  );
}
