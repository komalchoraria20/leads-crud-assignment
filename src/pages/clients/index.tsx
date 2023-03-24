import React, { Key, useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
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

import { CREATE_LEAD, DELETE_LEAD, GET_LEADS, UPDATE_LEAD } from "./queries";
import "./index.css";
import AddLeadForm from "../../components/add-lead-form";
import Table from "react-bootstrap/Table";
import moment, { MomentInput } from "moment";
import { startCase } from "lodash";
import Action from "../../components/action";

export interface Lead {
  id?: string;
  attributes: {
    Name: string;
    email: string;
    Source: string;
    Status: string;
    Notes: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

const INITIAL_LEAD = {
  attributes: {
    Name: "",
    email: "",
    Notes: "",
    Source: "",
    Status: "",
  },
};

export default function Clients() {
  const [leads, setLeads] = useState<Array<Lead>>([]);
  const [filteredLeads, setFilteredLeads] = useState<Array<Lead>>([]);
  const [searchText, setSearchText] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead>(INITIAL_LEAD);
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
    nextFetchPolicy: "cache-only",
  });

  const [createLead] = useMutation(CREATE_LEAD, {
    variables: { lead: selectedLead?.attributes },
    onCompleted: (data) => {
      const newLeads = [data.createLead.data, ...leads];
      handleAddModalClose();
      setAlertMessage("Lead added successfully");
      setLeads(newLeads);
    },
  });

  const [updateLead] = useMutation(UPDATE_LEAD, {
    variables: {
      lead: {
        Name: selectedLead.attributes.Name,
        email: selectedLead.attributes.email,
        Notes: selectedLead.attributes.Notes,
        Source: selectedLead.attributes.Source,
        Status: selectedLead.attributes.Status,
      },
      id: selectedLead?.id,
    },
    onCompleted: (data) => {
      const newLeads = [...leads];
      newLeads.forEach((lead, index) => {
        if (lead.id === data.updateLead.data?.id) {
          newLeads[index] = data.updateLead.data;
        }
      });
      handleAddModalClose();
      setAlertMessage("Lead updated successfully");
      setLeads(newLeads);
    },
  });

  const [deleteLead] = useMutation(DELETE_LEAD, {
    onCompleted: (data) => {
      setLeads(leads.filter((lead) => lead.id !== data.deleteLead.data.id));
      setAlertMessage("Lead deleted successfully");
    },
  });

  const handleAddModalClose = () => {
    setShowAddModal(false);
    setSelectedLead(INITIAL_LEAD);
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
    deleteLead({
      variables: {
        id,
      },
    });
  };

  const handleSave = () => {
    if (selectedLead) {
      if (selectedLead.id) {
        updateLead();
      } else {
        createLead();
      }
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
                    onClick={() => setShowAddModal(true)}
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
              <Table responsive>
                <thead>
                  <tr>
                    <th>Lead Date</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Source</th>
                    <th>Last Updated</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id as Key}>
                      <td>
                        {moment(
                          lead.attributes.createdAt as MomentInput
                        ).format("MMM D, YYYY")}{" "}
                        {moment(
                          lead.attributes.createdAt as MomentInput
                        ).format("h:mm A")}
                      </td>
                      <td>{lead.attributes.Name}</td>
                      <td>{lead.attributes.email}</td>
                      <td>{startCase(lead.attributes.Source)}</td>
                      <td>
                        {moment(
                          lead.attributes.updatedAt as MomentInput
                        ).format("D MMMM YYYY")}
                      </td>
                      <td>{startCase(lead.attributes.Status)}</td>
                      <td>
                        <Action
                          onViewLead={() => handleViewLead(lead)}
                          onEditLead={() => handleEditLead(lead)}
                          onDeleteLead={() => handleDeleteLead(lead.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
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
