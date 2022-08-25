import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../utilities/axiosWithAuth";
import { Table } from "antd";
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
  const adminToken = localStorage.getItem("token");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "totalNewPatients",
      dataIndex: ["value", "0", "totalNewPatients"],
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "totalCall",
      dataIndex: ["value", `0`, "totalCalls"],
      sorter: {
        compare: (a, b) => a.totalCalls - b.totalCalls,
        multiple: 2,
      },
    },
    {
      title: "totalWebforms",
      dataIndex: ["value", "0", "totalWebforms"],
      sorter: {
        compare: (a, b) => a.totalWebforms - b.totalWebforms,
        multiple: 1,
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  clients.map(async (client) => {
    const { username } = client;
    const req = { Username: username };
    return await axiosWithAuth(adminToken)
      .post(
        "https://adminapi.doctorgenius.com/prod/AdminUsers/Impersonate",
        req
      )
      .then(async (res) => {
        client.token = res.data;
        await axiosWithAuth(client.token)
          .get("https://portalapi.doctorgenius.com/prod/LeadInquiryReports")
          .then((res) => {
            client.value = res.data.$values;
          });
      });
  });
  console.log(initClients);
  return (
    <div>
      <Table columns={columns} dataSource={clients} onChange={onChange} />
    </div>
  );
}

export default ClientInformation;
