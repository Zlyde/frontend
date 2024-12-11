import React from "react";
import { Link } from "react-router-dom";

function ServiceSidebar() {
  return (
    <nav className="service-sidebar">
      <ul>
        <li>
          <Link to="/service/planned-maintenance">Planera underhåll</Link>
        </li>
        <li>
          <Link to="/service/manage-stations">Hantering av laddstationer</Link>
        </li>
        <li>
          <Link to="/service/report-issue">Rapportera problem</Link>
        </li>
      </ul>
    </nav>
  );
}

export default ServiceSidebar;
