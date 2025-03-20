import { Button, Layout, Menu, MenuProps, theme } from 'antd';
import { useState } from 'react';
import { Link, Outlet, useLocation } from "react-router-dom";
import { UserOutlined, BookOutlined, ShoppingCartOutlined, DashboardOutlined, MenuUnfoldOutlined, MenuFoldOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import ManageUserPage from '@/pages/admin/manage.user';

const { Header, Sider, Content } = Layout;

const LayoutAdmin = () => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const items: MenuProps['items'] = [
            {
                label: (
                  <Link to="/admin">Dashboard</Link>
                  ),
                  icon: <DashboardOutlined />,
              key: "/admin",
            },
            {
                label: (
                  "Manage Users"
                  ),
                  icon: <UserOutlined />,
                  key: '',
              children: [
                { key: '/admin/user',
                  label: (
                  <Link to="/admin/user">CRUD</Link>),
                  icon: <UsergroupAddOutlined /> 
                },
                
              ]
            },
            {
                label: (
                  <Link to="/admin/book">Manage Books</Link>
                ),
                icon: <BookOutlined />,
              key: "/admin/book",
            },
            {
              label: (
                <Link to="/admin/order">Manage Orders</Link>
              ),
              icon: <ShoppingCartOutlined />,
            key: "/admin/order",
          },
          ];
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider style={{backgroundColor: "white"}} trigger={null} collapsible collapsed={collapsed}>
        <div style={{display: "flex" , justifyContent: "center", margin: "20px", fontSize: "16px"}}>Admin</div>
          <Menu items={items} theme="light" mode="inline" defaultSelectedKeys={[location.pathname]}>
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