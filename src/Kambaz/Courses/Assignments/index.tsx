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
        </li>
        <li className="wd-assignment-list-item">
          A2 - CSS Fundamentals
        </li>
        <li className="wd-assignment-list-item">
          A3 - JavaScript Basics
        </li>
        <li className="wd-assignment-list-item">
          A4 - React Components
        </li>
        <li className="wd-assignment-list-item">
          A5 - Node.js Server
        </li>
      </ul>
    </div>
  );
}