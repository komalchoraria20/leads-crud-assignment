import React, { useState } from "react";
import { ThreeDotsVertical } from "react-bootstrap-icons";

export default function Action({ onViewLead, onEditLead, onDeleteLead }) {
  const [expandKebabMenu, setExpandKebabMenu] = useState(false);
  return (
    <>
      <ThreeDotsVertical
        className="kebab-menu-icon"
        onClick={() =>
          setExpandKebabMenu((expandKebabMenu) => !expandKebabMenu)
        }
      />

      {expandKebabMenu && (
        <ul className="kebab-menu-content custom-shadow mt-1 ml-n5">
          <li onClick={onEditLead}>Edit</li>
          <li onClick={onViewLead}>View</li>
          <li onClick={onDeleteLead}>Delete</li>
        </ul>
      )}
    </>
  );
}
