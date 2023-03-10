import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import moment, { MomentInput } from "moment";
import startCase from "lodash/startCase";

export default function TableRow({
  lead,
  onViewLead,
  onEditLead,
  onDeleteLead,
}) {
  const [expandKebabMenu, setExpandKebabMenu] = useState(false);
  return (
    <Row className="custom-shadow p-2 rounded mt-3">
      <Col
        xs={5}
        className="d-md-none"
      >
        <strong>Lead Date:</strong>
      </Col>
      <Col
        xs={7}
        md={2}
        className="mb-3"
      >
        <Row>
          <Col>
            {moment(lead.attributes.createdAt as MomentInput).format(
              "MMM D, YYYY"
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <small>
              {moment(lead.attributes.createdAt as MomentInput).format(
                "h:mm A"
              )}
            </small>
          </Col>
        </Row>
      </Col>
      <Col
        xs={5}
        className="d-md-none"
      >
        <strong>Name:</strong>
      </Col>
      <Col
        xs={7}
        md={2}
        className="mb-3"
      >
        {lead.attributes.Name}
      </Col>
      <Col
        xs={5}
        className="d-md-none"
      >
        <strong>Email:</strong>
      </Col>
      <Col
        xs={7}
        md={3}
        className="mb-3"
      >
        {lead.attributes.email}
      </Col>
      <Col
        xs={5}
        className="d-md-none"
      >
        <strong>Source:</strong>
      </Col>
      <Col
        xs={7}
        md={1}
        className="mb-3"
      >
        {startCase(lead.attributes.Source)}
      </Col>
      <Col
        xs={5}
        className="d-md-none"
      >
        <strong>Lead Updated:</strong>
      </Col>
      <Col
        xs={7}
        md={2}
        className="mb-3"
      >
        {moment(lead.attributes.updatedAt as MomentInput).format("D MMMM YYYY")}
      </Col>
      <Col
        xs={5}
        className="d-md-none"
      >
        <strong>Status:</strong>
      </Col>
      <Col
        xs={7}
        md={1}
        className="mb-3"
      >
        {startCase(lead.attributes.Status)}
      </Col>
      <Col
        xs={12}
        md={1}
      >
        <ThreeDotsVertical
          className="kebab-menu-icon d-none d-md-block"
          onClick={() =>
            setExpandKebabMenu((expandKebabMenu) => !expandKebabMenu)
          }
        />

        <Button
          className="custom-shadow d-md-none w-100"
          variant="outline-none"
          onClick={() =>
            setExpandKebabMenu((expandKebabMenu) => !expandKebabMenu)
          }
        >
          Actions
        </Button>

        {expandKebabMenu && (
          <ul className="kebab-menu-content custom-shadow">
            <li onClick={onEditLead}>Edit</li>
            <li onClick={onViewLead}>View</li>
            <li onClick={onDeleteLead}>Delete</li>
          </ul>
        )}
      </Col>
    </Row>
  );
}
