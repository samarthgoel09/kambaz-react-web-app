export default function Modules() {
  return (
    <div id="wd-modules-screen">
      <div id="wd-modules-actions">
        <button id="wd-collapse-all">Collapse All</button>
        <button id="wd-view-progress">View Progress</button>
        <button id="wd-publish-all">Publish All</button>
        <button id="wd-add-module">+ Module</button>
      </div>

      <ul id="wd-modules">
        <li className="wd-module">
          <h3 className="wd-module-heading">Week 1: Introduction</h3>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <h4 className="wd-lesson-heading">Lecture 1: Course Overview</h4>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">Learn what is Web Development</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <h4 className="wd-lesson-heading">Lecture 2: Tools & Setup</h4>
              <ul className="wd-content">
                <li className="wd-content-item">Setting up VS Code</li>
                <li className="wd-content-item">Installing Node.js</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Week 2 */}
        <li className="wd-module">
          <h3 className="wd-module-heading">Week 2: HTML & CSS</h3>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <h4 className="wd-lesson-heading">Lecture 1: HTML Basics</h4>
              <ul className="wd-content">
                <li className="wd-content-item">Structure of an HTML document</li>
                <li className="wd-content-item">Common HTML tags</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <h4 className="wd-lesson-heading">Lecture 2: CSS Fundamentals</h4>
              <ul className="wd-content">
                <li className="wd-content-item">Selectors and properties</li>
                <li className="wd-content-item">Box model</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <h3 className="wd-module-heading">Week 3: JavaScript Intro</h3>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <h4 className="wd-lesson-heading">Lecture 1: JS Syntax</h4>
              <ul className="wd-content">
                <li className="wd-content-item">Variables and types</li>
                <li className="wd-content-item">Functions and scope</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <h4 className="wd-lesson-heading">Lecture 2: DOM Manipulation</h4>
              <ul className="wd-content">
                <li className="wd-content-item">Selecting elements</li>
                <li className="wd-content-item">Event listeners</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
