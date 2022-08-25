import "antd/dist/antd.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import LoginForm from "./components/loginForm";
import axios from "axios";
import { Button, Form, Input } from "antd";

const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token || null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

function Logout() {
  window.localStorage.removeItem("token");
  window.location.reload(false);
}

  useEffect(() => {
    checkToken();
  });
  const onFinish = (values) => {
    // console.log("Success:", values);
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
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "nav 1",
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: "nav 2",
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: "nav 3",
              },
            ]}
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
              <div>  <Button type="primary" onClick={Logout}>
              logout
            </Button> </div>
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
