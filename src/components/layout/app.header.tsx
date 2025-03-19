import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Input, MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";
import { useCurrentApp } from "components/context/app.context";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AppHeader = () => {
    const {user} = useCurrentApp();
    const [cartCount, setCartCount] = useState(10);

    const items: MenuProps['items'] = [
        {
          label: (
            <Link to="/admin">
                Trang quản trị
            </Link>
          ),
          key: "dashboard",
        },
        {
            label: (
                <Link to="/">
                    Quản lý tài khoản
                </Link>
              ),
          key: "profile",
        },
        {
            label: (
                <Link to="/">
                    Lịch sử mua hàng
                </Link>
              ),
          key: "history",
        },
        {
            label: (
                <Link to="/logout">
                    Đăng xuất
                </Link>
              ),
          key: "logout",
        },
      ];

    return (
        <Header style={{ display: "flex", alignItems: "center", padding: "0 20px", background: "#fff", maxWidth: 1240, margin: "0 auto"}}>
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <img src="https://otakuusamagazine.com/wp-content/uploads/2020/11/ousa_succubus_albedo-1024x576.jpg" 
          alt="Logo" style={{borderRadius: 4, height: 40, marginRight: 10 }} />
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>Succubus</span>
        </div>
        <Input.Search placeholder="Bạn tìm gì hôm nay" style={{ minWidth: 300, margin: 40 }} />
        <Badge count={cartCount} offset={[-5, 5]}>
          <ShoppingCartOutlined style={{ fontSize: 24, marginRight: 20, cursor: "pointer" }} />
        </Badge>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <div style={{ display: "flex", alignItems: "center", cursor: "pointer", marginLeft: 40, width: 160 }}>
            <Avatar icon={<UserOutlined />} style={{ marginRight: 5 }} />
            <span>{user?.role === "admin" ? "I'm Admin" : "I'm User"}</span>
          </div>
        </Dropdown>
      </Header>
    )
}

export default AppHeader;