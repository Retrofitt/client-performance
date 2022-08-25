import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../utilities/axiosWithAuth";
import { Space, Table, Tag } from "antd";
// import axios from "axios";
import { initClients } from "../db/initClients";

function ClientInformation() {
  const [clients, setClients] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const newList = [];
  const adminToken = localStorage.getItem("token");

  const getClientData = async (key, client) => {
    try {
      const res = await axiosWithAuth(key).get(
        "https://portalapi.doctorgenius.com/prod/LeadInquiryReports"
      );

      client.value = res.data.$values;
      newList.push(client);
      console.log(newList);
    } catch (err) {
      console.log(err);
    }
  };

  const getImpersonate = async (client) => {
    const req = { Username: client.username };
    try {
      const res = await axiosWithAuth(adminToken).post(
        "https://adminapi.doctorgenius.com/prod/AdminUsers/Impersonate",
        req
      );
      getClientData(res.data, client);
    } catch (err) {
      console.log(err);
    }
  };

  const checkNewList = () => {
    if (newList.length === initClients.length) {
      setClients(newList);
      setIsUpdated(true);
    }
  };

  for (let i = 0; i < initClients.length; i++) {
    getImpersonate(initClients[i]);
    checkNewList();
  }

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
