import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../utilities/axiosWithAuth";
import { Space, Table, Tag } from "antd";
// import axios from "axios";
import { initClients } from "../db/initClients";

// const initClients = [
//   {
//     id: "12613",
//     name: "Visalia Care Dental",
//     username: "visaliacaredental@gmail.com",
//   },
//   {
//     id: "13147",
//     name: "Grand Parkway Dental Care",
//     username: "drk@gppdental.com",
//   },
// ];

function ClientInformation() {
  const [clients, setClients] = useState(initClients);

  const getClientData = async (key, client) => {
    try {
      const res = await axiosWithAuth(key).get(
        "https://portalapi.doctorgenius.com/prod/LeadInquiryReports"
      );

      client.value = res.data.$values;

      console.log(clients);
    } catch (err) {
      console.log(err);
    }
  };

  const getImpersonate = async (client) => {
    console.log(client);
    const adminToken = localStorage.getItem("token");
    const { username } = client;
    const req = { Username: username };
    try {
      const res = await axiosWithAuth(adminToken).post(
        "https://adminapi.doctorgenius.com/prod/AdminUsers/Impersonate",
        req
      );
      getClientData(res, client);
    } catch (err) {
      console.log(err);
    }
  };

  clients.map((client) => {
    return getImpersonate(client);
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // onFilter: (value, record) => record.name.indexOf(value) === 0,
      // sorter: (a, b) => a.name.length - b.name.length,
      // sortDirections: ["descend"],
    },
    {
      title: "New Clients",
      dataIndex: ["value", "0", "totalNewPatients"],
      key: "totalNewPatients",
    },
    {
      title: "Total Calls",
      dataIndex: ["value", "0", "totalCalls"],
      key: "totalCalls",
    },
    {
      title: "Web forms",
      dataIndex: ["value", "0", "totalWebforms"],
      key: "totalWebforms",
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={clients} />;
      {/* {clients.map(() => {
        return (
          <div>
            <div>column 1</div>
            <div>column 2</div>
            <div>column 3</div>
            <div>column 4</div>
          </div>
        );
      })} */}
    </div>
  );
}

export default ClientInformation;
