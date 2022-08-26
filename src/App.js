import "antd/dist/antd.css";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import LoginForm from "./components/loginForm";
import axios from "axios";
import { Button } from "antd";
import ClientTable from "./components/ClientTable";
import { initClients } from "./db/initClients";
import { axiosWithAuth } from "./utilities/axiosWithAuth";

const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clients, setClients] = useState([]);

  const getClientData = async (key, client) => {
    try {
      const res = await axiosWithAuth(key).get(
        "https://portalapi.doctorgenius.com/prod/LeadInquiryReports?$orderby=dateCreated desc"
      );

      client.value = res.data.$values;

      if (!clients.includes(client)) {
        setClients((current) => [...current, client]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getImpersonate = async (client) => {
    const req = { Username: client.username };
    try {
      const res = await axiosWithAuth(localStorage.getItem("token")).post(
        "https://adminapi.doctorgenius.com/prod/AdminUsers/Impersonate",
        req
      );
      getClientData(res.data, client);
    } catch (err) {
      console.log(err);
    }
  };
  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token || null) {
      setIsLoggedIn(true);
      for (let i = 0; i < initClients.length; i++) {
        getImpersonate(initClients[i]);
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  function Logout() {
    window.localStorage.removeItem("token");
    checkToken();
  }

  const onFinish = (values) => {
    axios
      .post("https://adminapi.doctorgenius.com/prod/AdminUsers/Login", values)
      .then((res) => {
        localStorage.setItem("token", res.data);
        checkToken();
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            // items={[
            //   {
            //     key: "1",
            //     icon: <UserOutlined />,
            //     label: "nav 1",
            //   },
            //   {
            //     key: "2",
            //     icon: <VideoCameraOutlined />,
            //     label: "nav 2",
            //   },
            //   {
            //     key: "3",
            //     icon: <UploadOutlined />,
            //     label: "nav 3",
            //   },
            // ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: "full",
            }}
          >
            {/* enter content here */}

            {isLoggedIn ? (
              <div>
                {" "}
                <ClientTable clients={clients} />
                <Button type="primary" onClick={Logout}>
                  logout
                </Button>{" "}
              </div>
            ) : (
              <LoginForm
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                checkToken={checkToken}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}

            {/* enter content here */}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
