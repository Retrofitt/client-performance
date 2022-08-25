import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../utilities/axiosWithAuth";
import axios from "axios";
import initClients from "../db/initClients";

// NOT FUNCTIONAL

function Clients() {
  const [clients, setClients] = useState(initClients);
  clients.forEach((client) => {
    const [username] = client;
    axios.post("somehwere.com", username).then((res) => {
      client.token = res.data;
    });

    axiosWithAuth(client.token)
      .get("somehwere.com")
      .then((res) => {
        client.value = res.data;
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

export default Clients;
