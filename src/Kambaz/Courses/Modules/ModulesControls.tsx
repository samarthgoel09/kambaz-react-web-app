// src/Kambaz/Courses/Modules/ModulesControls.tsx
import React from "react";
import { FaPlus, FaChevronDown, FaBan } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";
import { Button, Dropdown } from "react-bootstrap";

export default function ModulesControls() {
  return (
    <div
      id="wd-modules-controls"
      className="text-nowrap bg-white border-bottom py-2 px-3"
    >
      {/* Collapse All */}
      <Button variant="secondary" size="lg" className="me-2">
        Collapse All
      </Button>

      {/* View Progress */}
      <Button variant="secondary" size="lg" className="me-2">
        View Progress
      </Button>

      <Dropdown className="d-inline-block me-2">
       <Dropdown.Toggle
         variant="secondary"      // ← switch to grey background
         size="lg"
         id="wd-publish-all-btn"
         className="d-flex align-items-center no-caret"
       >
         <span className="me-2"><GreenCheckmark /></span>
         <span className="me-2">Publish All</span>
         <FaChevronDown />
       </Dropdown.Toggle>

      



        <Dropdown.Menu>
          <Dropdown.Item id="wd-publish-all-modules-and-items">
            <GreenCheckmark /> Publish all modules and items
          </Dropdown.Item>
          <Dropdown.Item id="wd-publish-modules-only">
            <GreenCheckmark /> Publish modules only
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item id="wd-unpublish-all-modules-and-items">
            <FaBan className="text-secondary me-2" /> Unpublish all modules and items
          </Dropdown.Item>
          <Dropdown.Item id="wd-unpublish-modules-only">
            <FaBan className="text-secondary me-2" /> Unpublish modules only
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* + Module */}
      <Button variant="danger" size="lg">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>
    </div>
  );
}
