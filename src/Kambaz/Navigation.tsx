
import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { AiOutlineDashboard } from "react-icons/ai";
import { LiaBookSolid } from "react-icons/lia";
import { IoCalendarOutline } from "react-icons/io5";
import { FaInbox, FaFlask } from "react-icons/fa6";

export default function KambazNavigation() {
  const { pathname } = useLocation();

  const navItems = [
    {
      to: "/Kambaz/Account",
      label: "Account",
      Icon: FaRegCircleUser,
      match: (p: string) => p.startsWith("/Kambaz/Account"),
    },
    {
      to: "/Kambaz/Dashboard",
      label: "Dashboard",
      Icon: AiOutlineDashboard,
      match: (p: string) => p === "/Kambaz/Dashboard",
    },
    {
      to: "/Kambaz/Dashboard",
      label: "Courses",
      Icon: LiaBookSolid,
      match: (p: string) => p.startsWith("/Kambaz/Courses"),
    },
    {
      to: "/Kambaz/Calendar",
      label: "Calendar",
      Icon: IoCalendarOutline,
      match: (p: string) => p === "/Kambaz/Calendar",
    },
    {
      to: "/Kambaz/Inbox",
      label: "Inbox",
      Icon: FaInbox,
      match: (p: string) => p === "/Kambaz/Inbox",
    },
    {
      to: "/Labs",
      label: "Labs",
      Icon: FaFlask,
      match: (p: string) => p === "/Labs",
    },
  ];

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 110 }}
      className="position-fixed top-0 bottom-0 bg-black rounded-0 d-none d-md-block"
    >
      <ListGroup.Item
        action
        href="https://www.northeastern.edu/"
        target="_blank"
        rel="noopener"
        className="border-0 bg-black text-center py-3"
      >
        <img src="/images/NEU.png" width={75} alt="NEU" />
      </ListGroup.Item>

      {navItems.map(({ to, label, Icon, match }) => {
        const active = match(pathname);
        const isAccount = label === "Account";

        const themeClass = isAccount
          ? "bg-black text-white"
          : active
          ? "bg-white text-danger"
          : "bg-black text-white";

        return (
          <ListGroup.Item
            as={Link}
            to={to}
            key={label}
            className={[
              "border-0 d-flex flex-column align-items-center py-3",
              themeClass,
            ].join(" ")}
          >
            <Icon
              className={`fs-1 mb-1 ${
                isAccount ? "text-white" : "text-danger"
              }`}
            />
            <small>{label}</small>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
