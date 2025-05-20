
import { ListGroup } from "react-bootstrap";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaFlask, FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";
import { NavLink } from "react-router-dom";

export default function KambazNavigation() {
  const links = [
    { to: "/Kambaz",          Icon: FaRegCircleUser,    label: "Account",   end: true  },
    { to: "/Kambaz/Dashboard", Icon: AiOutlineDashboard, label: "Dashboard"            },
    { to: "/Kambaz/Courses",   Icon: LiaBookSolid,       label: "Courses"              },
    { to: "/Kambaz/Calendar",  Icon: IoCalendarOutline,  label: "Calendar"             },
    { to: "/Kambaz/Inbox",     Icon: FaInbox,            label: "Inbox"                },
    { to: "/Labs",             Icon: FaFlask,            label: "Labs"                 },
  ];

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: "110px" }}
      className="position-fixed top-0 bottom-0 d-none d-md-block bg-black z-2 rounded-0"
    >
      <ListGroup.Item
        as="a"
        href="https://www.northeastern.edu/"
        target="_blank"
        rel="noopener"
        className="border-0 bg-black text-center py-3"
      >
        <img src="/images/NEU.png" alt="NEU" width={75} />
      </ListGroup.Item>

      {links.map(({ to, Icon, label, end }) => (
        <NavLink key={to} to={to} end={end} style={{ textDecoration: "none" }}>
          {({ isActive }: { isActive: boolean }) => {
            const isDashboard = label === "Dashboard";
    const activeNav   = isDashboard || isActive;

     const bgClass = activeNav ? "bg-white" : "bg-black";

     const iconCls = label === "Account"
       ? activeNav ? "text-dark" : "text-white"
       : "text-danger";

     const textCls = isDashboard
       ? "text-danger"
       : isActive
         ? "text-danger"
         : "text-white";

            return (
              <ListGroup.Item
                className={[
                  "border-0",
                  "d-flex flex-column align-items-center",
                  "py-3",
                  bgClass,
                ].join(" ")}
              >
                <Icon className={`fs-1 mb-1 ${iconCls}`} />
                <small className={textCls}>
                  {label}
                </small>
              </ListGroup.Item>
            );
          }}
        </NavLink>
      ))}
    </ListGroup>
  );
}
