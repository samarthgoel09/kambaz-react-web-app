import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

export default function PeopleTable() {
  return (
    <div id="wd-people-table">
<Table striped variant="light">
            <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
            
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Tony</span>{" "}
              <span className="wd-last-name">Stark</span>
            </td>
            <td className="wd-login-id">001234561S</td>
            <td className="wd-section">S1</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2020-10-01</td>
            <td className="wd-total-activity">10:21:32</td>
          </tr>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Peter</span>{" "}
              <span className="wd-last-name">Parker</span>
            </td>
            <td className="wd-login-id">001234562S</td>
            <td className="wd-section">S2</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2020-09-25</td>
            <td className="wd-total-activity">08:45:10</td>
          </tr>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Steve</span>{" "}
              <span className="wd-last-name">Rogers</span>
            </td>
            <td className="wd-login-id">001234563S</td>
            <td className="wd-section">S3</td>
            <td className="wd-role">TEACHING ASSISTANT</td>
            <td className="wd-last-activity">2020-10-03</td>
            <td className="wd-total-activity">12:15:00</td>
          </tr>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Natasha</span>{" "}
              <span className="wd-last-name">Romanoff</span>
            </td>
            <td className="wd-login-id">001234564S</td>
            <td className="wd-section">S4</td>
            <td className="wd-role">TEACHER</td>
            <td className="wd-last-activity">2020-10-02</td>
            <td className="wd-total-activity">09:30:45</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
