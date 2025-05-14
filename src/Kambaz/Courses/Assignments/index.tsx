// src/Kambaz/Courses/Assignments/index.tsx
export default function Assignments() {
  return (
    <div id="wd-assignments">
      {/* Search and action buttons */}
      <input
        placeholder="Search for Assignments"
        id="wd-search-assignment"
      />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>

      {/* Assignment category header */}
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>

      {/* List of assignments */}
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <a
            href="#/Kambaz/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A1 - ENV + HTML
          </a>
          <p className="wd-assignment-details">
            Multiple modules | Not available until May 06 at 12:00 am | Due May 13 at 11:59 pm | 100 pts
          </p>
        </li>
        <li className="wd-assignment-list-item">
          <a
            href="#/Kambaz/Courses/1234/Assignments/124"
            className="wd-assignment-link"
          >
            A2 - CSS Fundamentals
          </a>
          <p className="wd-assignment-details">
            Multiple modules | Not available until May 13 at 12:00 am | Due May 20 at 11:59 pm | 100 pts
          </p>
        </li>
        <li className="wd-assignment-list-item">
          <a
            href="#/Kambaz/Courses/1234/Assignments/125"
            className="wd-assignment-link"
          >
            A3 - JavaScript Basics
          </a>
          <p className="wd-assignment-details">
            Multiple modules | Not available until May 20 at 12:00 am | Due May 27 at 11:59 pm | 100 pts
          </p>
        </li>
        <li className="wd-assignment-list-item">
          <a
            href="#/Kambaz/Courses/1234/Assignments/126"
            className="wd-assignment-link"
          >
            A4 - React Components
          </a>
          <p className="wd-assignment-details">
            Multiple modules | Not available until May 27 at 12:00 am | Due June 03 at 11:59 pm | 100 pts
          </p>
        </li>
        <li className="wd-assignment-list-item">
          <a
            href="#/Kambaz/Courses/1234/Assignments/127"
            className="wd-assignment-link"
          >
            A5 - Node.js Server
          </a>
          <p className="wd-assignment-details">
            Multiple modules | Not available until June 03 at 12:00 am | Due June 10 at 11:59 pm | 100 pts
          </p>
        </li>
      </ul>
    </div>
  );
}
