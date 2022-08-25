import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../utilities/axiosWithAuth";
import axios from "axios";
// import initClients from "../db/initClients";

const initClients = [
  {
    id: "12613",
    name: "Visalia Care Dental",
    username: "visaliacaredental@gmail.com",
  },
  {
    id: "13147",
    name: "Grand Parkway Dental Care",
    username: "drk@gppdental.com",
  },
];

function ClientInformation() {
  const [clients, setClients] = useState(initClients);
  clients.map((client) => {
    const { username } = client;
    const req = { Username: username };
    const adminToken = localStorage.getItem("token");
    return axiosWithAuth(adminToken)
      .post(
        "https://adminapi.doctorgenius.com/prod/AdminUsers/Impersonate",
        req
      )
      .then((res) => {
        client.token = res.data;
        axiosWithAuth(client.token)
          .get("https://portalapi.doctorgenius.com/prod/LeadInquiryReports")
          .then((res) => {
            client.value = res.data.$values;
            console.log(clients);
          });
      });
  });
  return (
    <div>
      {clients.map(() => {
        return (
          <div>
            <div>column 1</div>
            <div>column 2</div>
            <div>column 3</div>
            <div>column 4</div>
          </div>
        );
      })}
    </div>
  );
}

export default ClientInformation;
