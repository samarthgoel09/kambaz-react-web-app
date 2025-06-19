import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export default function AccountNavigation() {
  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );

  const links = currentUser
    ? [
        { to: "/Kambaz/Account/Profile", label: "Profile", id: "wd-account-profile-link" },
        ...(currentUser.role === "ADMIN"
          ? [{ to: "/Kambaz/Account/Users", label: "Users", id: "wd-account-users-link" }]
          : []),
      ]
    : [
        {
          to:    "/Kambaz/Account/Signin",
          label: "Signin",
          id:    "wd-account-signin-link",
        },
        {
          to:    "/Kambaz/Account/Signup",
          label: "Signup",
          id:    "wd-account-signup-link",
        },
      ];

  return (
    <ListGroup id="wd-account-nav" className="wd fs-5 rounded-0 bg-white">
      {links.map(({ to, label, id }) => (
        <NavLink key={id} to={to} style={{ textDecoration: "none" }}>
          {({ isActive }: { isActive: boolean }) => (
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
                  : "text-danger",
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
