import React, { Key, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { Search, PlusCircle } from "react-bootstrap-icons";

import { GET_LEADS } from "./queries";
import "./index.css";
import TableRow from "../../components/table-row";
import AddLeadForm from "../../components/add-lead-form";

export interface Lead {
  id: String;
  attributes: {
    Name: String;
    email: String;
    Source: String;
    Status: String;
    Notes: String;
    createdAt: String;
    updatedAt: String;
  };
}

export default function Clients() {
  const [leads, setLeads] = useState<Array<Lead>>([]);
  const [filteredLeads, setFilteredLeads] = useState<Array<Lead>>([]);
  const [searchText, setSearchText] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [viewMode, setViewMode] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    setFilteredLeads(
      leads.filter(
        (lead) =>
          lead.attributes.Name.toLowerCase().includes(
            searchText.toLowerCase()
          ) ||
          lead.attributes.email.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, leads]);

  useQuery(GET_LEADS, {
    onCompleted: (res) => {
      setLeads(res.leads.data);
      setFilteredLeads(res.leads.data);
    },
  });

  const handleAddModalClose = () => {
    setShowAddModal(false);
    setSelectedLead(null);
    setViewMode(false);
  };

  const handleViewLead = (lead) => {
    setSelectedLead(lead);
    setViewMode(true);
    setShowAddModal(true);
  };

  const handleEditLead = (lead) => {
    setSelectedLead(lead);
    setShowAddModal(true);
  };

  const handleDeleteLead = (id) => {
    setLeads(leads.filter((lead) => lead.id !== id));
    setAlertMessage("Lead deleted successfully");
  };

  const handleSave = () => {
    if (selectedLead) {
      const date = new Date().toISOString();
      let selectedIndex = -1;
      const newLeads = [...leads];
      newLeads.forEach((lead, index) => {
        if (lead.id === selectedLead?.id) {
          selectedIndex = index;
        }
      });
      if (selectedIndex >= 0) {
        newLeads[selectedIndex] = {
          ...selectedLead,
          attributes: {
            ...selectedLead.attributes,
            updatedAt: date,
          },
        };
        setAlertMessage("Lead modified successfully");
      } else {
        newLeads[newLeads.length] = {
          ...selectedLead,
          attributes: {
            ...selectedLead.attributes,
            createdAt: date,
            updatedAt: date,
          },
        };
        setAlertMessage("Lead added successfully");
      }
      setLeads(newLeads);
      handleAddModalClose();
    }
  };

  return (
    <Container fluid>
      <Col>
        {!!alertMessage.length && (
          <Alert
            variant="success"
            onClose={() => setAlertMessage("")}
            dismissible
            className="my-4"
          >
            {alertMessage}
          </Alert>
        )}{" "}
        <Row>
          <h1>Clients</h1>
        </Row>
        <Row>
          <Tabs className="mb-3 w-100">
            <Tab
              eventKey="clients"
              title="Clients"
            >
              <Container fluid>
                <Row className="my-4">
                  <Col
                    xs={12}
                    md={6}
                    lg={5}
                    xl={4}
                    className="d-flex align-items-center py-2"
                  >
                    <Search
                      size={24}
                      className="mr-2"
                    />
                    <Form.Control
                      type="text"
                      placeholder="Search"
                      className="w-100"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </Col>
                  <Col
                    xs={0}
                    md={2}
                    lg={4}
                    xl={6}
                  ></Col>
                  <Col
                    xs={12}
                    md={4}
                    lg={3}
                    xl={2}
                    className="d-flex justify-content-end py-2"
                  >
                    <Button
                      onClick={() => {
                        setShowAddModal(true);
                        setSelectedLead({
                          id: leads.length.toString(),
                          attributes: {
                            Name: "",
                            email: "",
                            Notes: "",
                            Source: "",
                            Status: "",
                            createdAt: "",
                            updatedAt: "",
                          },
                        });
                      }}
                      variant="outline-none"
                      className="font-weight-bold custom-shadow d-flex align-items-center justify-content-center py-2 px-4 rounded w-100"
                    >
                      Add Lead{" "}
                      <PlusCircle
                        size={20}
                        className="ml-2"
                      />
                    </Button>
                    <AddLeadForm
                      show={showAddModal}
                      onHide={handleAddModalClose}
                      viewMode={viewMode}
                      selectedLead={selectedLead}
                      setSelectedLead={setSelectedLead}
                      onSave={handleSave}
                    />
                  </Col>
                </Row>
                <Row className="border-bottom font-weight-bold px-2 lead d-none d-md-flex">
                  <Col
                    md={2}
                    className="pb-2"
                  >
                    Lead Date
                  </Col>
                  <Col md={2}>Name</Col>
                  <Col md={3}>Email</Col>
                  <Col md={1}>Source</Col>
                  <Col md={2}>Last Updated</Col>
                  <Col md={1}>Status</Col>
                  <Col md={1}></Col>
                </Row>
                {filteredLeads.length === 0 ? (
                  <Alert
                    variant="light"
                    className="d-flex justify-content-center"
                  >
                    No data found
                  </Alert>
                ) : (
                  filteredLeads.map((lead) => (
                    <TableRow
                      key={lead.id as Key}
                      lead={lead}
                      onViewLead={() => handleViewLead(lead)}
                      onEditLead={() => handleEditLead(lead)}
                      onDeleteLead={() => handleDeleteLead(lead.id)}
                    />
                  ))
                )}
              </Container>
            </Tab>
            <Tab
              eventKey="tab1"
              title="Tab1"
            >
              Tab 1
            </Tab>
            <Tab
              eventKey="tab2"
              title="Tab2"
            >
              Tab 2
            </Tab>
          </Tabs>
        </Row>
      </Col>
    </Container>
  );
}
