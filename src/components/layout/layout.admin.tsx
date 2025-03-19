import { Button, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { Link, Outlet, useLocation } from "react-router-dom";
import { UserOutlined, BookOutlined, ShoppingCartOutlined, DashboardOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const LayoutAdmin = () => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    console.log(location)
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{display: "flex" ,color: "white", justifyContent: "center", margin: "20px", fontSize: "16px"}}>Admin</div>
          <Menu theme="dark" mode="vertical" defaultSelectedKeys={[location.pathname]}>
            <Menu.Item key="/admin" icon={<DashboardOutlined />}>
              <Link to="/admin">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="/admin/user" icon={<UserOutlined />}>
              <Link to="/admin/user">Manage Users</Link>
            </Menu.Item>
            <Menu.Item key="/admin/book" icon={<BookOutlined />}>
              <Link to="/admin/book">Manage Books</Link>
            </Menu.Item>
            <Menu.Item key="/admin/order" icon={<ShoppingCartOutlined />}>
              <Link to="/admin/order">Manage Orders</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
          <Content style={{ margin: "20px", padding: "20px", background: "#fff" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
  );

}

export default LayoutAdmin