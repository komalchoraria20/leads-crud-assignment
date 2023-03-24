import { gql } from "@apollo/client";

export const GET_LEADS = gql`
  query fetchLeads {
    leads {
      data {
        id
        attributes {
          Name
          email
          Source
          createdAt
          updatedAt
          Status
          Notes
        }
      }
    }
  }
`;

export const CREATE_LEAD = gql`
  mutation createLead($lead: LeadInput!) {
    createLead(data: $lead) {
      data {
        id
        attributes {
          Name
          email
          Source
          createdAt
          updatedAt
          Status
          Notes
        }
      }
    }
  }
`;

export const UPDATE_LEAD = gql`
  mutation updateLead($id: ID!, $lead: LeadInput!) {
    updateLead(id: $id, data: $lead) {
      data {
        id
        attributes {
          Name
          email
          Source
          Status
          Notes
        }
      }
    }
  }
`;

export const DELETE_LEAD = gql`
  mutation deleteLead($id: ID!) {
    deleteLead(id: $id) {
      data {
        id
      }
    }
  }
`;
