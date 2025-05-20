import { Card }      from "react-bootstrap";
import { Link }      from "react-router-dom";

interface Course {
  id:       string;
  title:    string;
  subtitle: string;
  color:    "success" | "primary" | "info" | "warning";
}

const courses: Course[] = [
  { id: "1234", title: "CS1234 React JS",       subtitle: "Full Stack software developer.",    color: "success" },
  { id: "2345", title: "CS2345 Java Basics",    subtitle: "Introduction to Java programming.", color: "info"    },
  { id: "3456", title: "CS3456 Data Structures",subtitle: "Arrays, Lists, Trees, Graphs.",     color: "warning" },
  { id: "4567", title: "CS4567 Algorithms",      subtitle: "Sorting, Searching, Complexity.",   color: "primary" },
  { id: "5678", title: "CS5678 Databases",       subtitle: "SQL, NoSQL, Transactions.",          color: "success" },
  { id: "6789", title: "CS6789 Web Dev",         subtitle: "HTML, CSS, JavaScript.",             color: "info"    },
  { id: "7890", title: "CS7890 Cloud Computing",subtitle: "AWS, Azure, GCP fundamentals.",      color: "warning" },
];

export default function KambazDashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published" className="h5 text-secondary">
        Published Courses ({courses.length})
      </h2>
      <div
        id="wd-dashboard-courses"
        className="d-flex flex-wrap mt-4"
        style={{
          columnGap: "30px",   
          rowGap:    "40px",   
        }}
      >
        {courses.map(({ id, title, subtitle, color }) => (
          <div
            key={id}
            style={{
              flex:  "0 0 auto",
              width: "270px",   
            }}
          >
            <Card className="h-100">
              <div
                className={`bg-${color}`}
                style={{ height: "140px", borderTopLeftRadius: "0.25rem", borderTopRightRadius: "0.25rem" }}
              />
              <Card.Body>
                <Card.Title className="text-truncate">{title}</Card.Title>
                <Card.Text className="text-truncate text-muted" style={{ height: "3rem" }}>
                  {subtitle}
                </Card.Text>
                <Link to={`/Kambaz/Courses/${id}/Home`} className="stretched-link" />
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
