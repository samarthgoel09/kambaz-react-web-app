
export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      {/* Assignment Name */}
      <label htmlFor="wd-name">Assignment Name</label><br />
      <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />

      {/* Description */}
      <label htmlFor="wd-description">Description</label><br />
      <textarea id="wd-description" rows={4}>
        The assignment is available online. Submit a link to the landing page of...
      </textarea><br /><br />

      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" type="number" defaultValue={100} />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Group</label>
            </td>
            <td>
              <select id="wd-group">
                <option value="none">None</option>
                <option value="group1">Group 1</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade As</label>
            </td>
            <td>
              <select id="wd-display-grade-as">
                <option value="points">Points</option>
                <option value="percent">Percent</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <input type="checkbox" id="wd-text-entry" />
              <label htmlFor="wd-text-entry">Text Entry</label><br />
              <input type="checkbox" id="wd-website-url" />
              <label htmlFor="wd-website-url">Website URL</label><br />
              <input type="checkbox" id="wd-media-recordings" />
              <label htmlFor="wd-media-recordings">Media Recordings</label><br />
              <input type="checkbox" id="wd-student-annotation" />
              <label htmlFor="wd-student-annotation">Student Annotation</label><br />
              <input type="checkbox" id="wd-file-upload" />
              <label htmlFor="wd-file-upload">File Upload</label>
            </td>
          </tr>
          <tr>
            <td align="right">
              <label htmlFor="wd-assign-to">Assign To</label>
            </td>
            <td>
              <select id="wd-assign-to">
                <option value="everyone">Everyone</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right">
              <label htmlFor="wd-due-date">Due Date</label>
            </td>
            <td>
              <input id="wd-due-date" type="date" defaultValue="2025-05-20" />
            </td>
          </tr>
          <tr>
            <td align="right">
              <label htmlFor="wd-available-from">Available From</label>
            </td>
            <td>
              <input id="wd-available-from" type="date" defaultValue="2025-05-01" />
            </td>
          </tr>
          <tr>
            <td align="right">
              <label htmlFor="wd-available-until">Available Until</label>
            </td>
            <td>
              <input id="wd-available-until" type="date" defaultValue="2025-06-01" />
            </td>
          </tr>
        </tbody>
      </table>
            <div id="wd-editor-actions">
        <button id="wd-cancel-btn">Cancel</button>
        <button id="wd-save-btn">Save</button>
      </div>


    </div>
  );
}
