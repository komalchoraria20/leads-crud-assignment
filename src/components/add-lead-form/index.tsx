import React from "react";
import { Form, Modal, Button, CloseButton } from "react-bootstrap";
import startCase from "lodash/startCase";

const LEAD_STATUS = ["New", "Interested", "Follow_up", "Negative", "Enrolled"];

const LEAD_SOURCE = ["website", "google", "my_app", "word_of_mouth"];

export default function AddLeadForm({
  show,
  onHide,
  viewMode,
  selectedLead,
  setSelectedLead,
  onSave,
}) {
  const handleChange = (field) => {
    setSelectedLead((selectedLead) => ({
      ...selectedLead,
      attributes: {
        ...selectedLead?.attributes,
        ...field,
      },
    }));
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
    >
      <Modal.Header className="bg-dark text-light">
        <Modal.Title className="d-flex justify-content-between w-100">
          <strong>Lead</strong>
          <CloseButton
            className="text-white-50 lg"
            onClick={onHide}
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>
              <strong>Status</strong>
            </Form.Label>
            <Form.Control
              as="select"
              className="col-sm-4 col-md-3 col-12 custom-shadow"
              value={selectedLead?.attributes?.Status}
              disabled={viewMode}
              onChange={(e) => handleChange({ Status: e.target.value })}
            >
              <option>Select Status</option>
              {LEAD_STATUS.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {startCase(status)}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Label>
            <strong>Source</strong>
          </Form.Label>
          <Form.Control
            as="select"
            className="col-sm-4 col-md-3 col-12 custom-shadow"
            value={selectedLead?.attributes?.Source}
            disabled={viewMode}
            onChange={(e) => handleChange({ Source: e.target.value })}
          >
            <option>Select Status</option>
            {LEAD_SOURCE.map((source) => (
              <option
                key={source}
                value={source}
              >
                {startCase(source)}
              </option>
            ))}
          </Form.Control>
          <Modal.Title className="py-2 my-2 border-bottom">
            <strong>Lead Details</strong>
          </Modal.Title>
          <Form.Group className="mb-3">
            <Form.Label>
              <strong>Name</strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              className="custom-shadow"
              disabled={viewMode}
              value={selectedLead?.attributes?.Name}
              onChange={(e) => handleChange({ Name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <strong>Email</strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              className="custom-shadow"
              disabled={viewMode}
              value={selectedLead?.attributes?.email}
              onChange={(e) => handleChange({ email: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <strong>Notes</strong>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              className="custom-shadow"
              disabled={viewMode}
              value={selectedLead?.attributes?.Notes}
              onChange={(e) => handleChange({ Notes: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      {!viewMode && (
        <Modal.Footer className="justify-content-center">
          <Button
            variant="success"
            onClick={onSave}
            className="w-50 rounded-pill"
          >
            Save
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
}
