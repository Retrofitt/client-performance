import "antd/dist/antd.css";
import React from "react";

import { Table } from "antd";

function ClientTable(props) {
  const { clients } = props;

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
      title: "New Clients 3mo",
      dataIndex: ["value", "2", "totalNewPatients"],
      key: "totalNewPatients3mo",
    },
    {
      title: "Total Calls",
      dataIndex: ["value", "0", "totalCalls"],
      key: "totalCalls",
    },
    {
      title: "Total Calls 3mo",
      dataIndex: ["value", "2", "totalCalls"],
      key: "totalCalls3mo",
    },
    {
      title: "Web forms",
      dataIndex: ["value", "0", "totalWebforms"],
      key: "totalWebforms",
    },
    {
      title: "Web forms 3mo",
      dataIndex: ["value", "2", "totalWebforms"],
      key: "totalWebforms3mo",
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={clients} />
    </div>
  );
}

export default ClientTable;
