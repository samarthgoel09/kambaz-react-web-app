import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function AccountNavigation() {
  const items = [
    { to: "/Kambaz/Account/Signin",  label: "Signin",  id: "wd-account-signin-link"  },
    { to: "/Kambaz/Account/Signup",  label: "Signup",  id: "wd-account-signup-link"  },
    { to: "/Kambaz/Account/Profile", label: "Profile", id: "wd-account-profile-link" },
  ];

  return (
    <ListGroup id="wd-account-nav" className="wd fs-5 rounded-0 bg-white">
      {items.map(({ to, label, id }) => (
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
