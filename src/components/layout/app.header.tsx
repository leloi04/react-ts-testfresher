import { logoutAPI } from "@/services/api";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Input, MenuProps, Popover, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import { useCurrentApp } from "components/context/app.context";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AppHeader = () => {
    const {user, setUser, setIsAuthenticated} = useCurrentApp();
    const { carts, setCarts } = useCurrentApp();
    const navigation = useNavigate();
    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`
    let cartCount = carts ? carts.length : 0;
  
    const handleLogout = async () => {
      const res = await logoutAPI();
      if(res.data ) {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("access_token");
      }

    }

    const items: MenuProps['items'] = [
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
            label: <label
                onClick={() => handleLogout()}
            >
              Đăng xuất
            </label>,
          key: "logout",
        },
      ];

      if(user?.role === "ADMIN") {
        items.unshift(
          {
            label: (
              <Link to="/admin">
                  Trang quản trị
              </Link>
            ),
            key: "dashboard",
          }
        )
      }

      const contentPopover = (
        <div style={{width: "450px"}}>
              {carts?.map((item, index) => {
                return (
                  <Row key={`index-${index}`} style={{alignItems: "center", display: "flex", flexWrap: "nowrap"}} gutter={[5, 5]}>
                      <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item.detail.thumbnail}`} 
                      alt="image" style={{borderRadius: 4, width: "10%", margin: "5px 5px 0 0"}}/>
                      <span style={{margin: "0 16px 0 4px"}}>{item.detail.mainText}</span>
                      <span style={{marginLeft: "auto", color: "#de3837"}}>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(item.detail.price))}
                      </span>
                  </Row>
                )
              })}
              <button 
              onClick={() => navigation("order")}
              style={{
                display: "block",
                margin: "16px 8px 16px auto",
                padding: "8px 12px",
                cursor: "pointer",
                backgroundColor: "#de3837",
                border: "none",
                color: "#fff"
              }}>Xem giỏ hàng</button>
            </div>
      );

    return (
        <Header style={{ display: "flex", alignItems: "center", padding: "0 20px", background: "#fff", maxWidth: 1240, margin: "0 auto"}}>
        <div onClick={() => navigation("")} style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <img src="https://otakuusamagazine.com/wp-content/uploads/2020/11/ousa_succubus_albedo-1024x576.jpg" 
          alt="Logo" style={{borderRadius: 4, height: 40, marginRight: 10 }} />
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>Succubus</span>
        </div>
        <Input.Search placeholder="Bạn tìm gì hôm nay" style={{ minWidth: 300, margin: 40 }} />
        
          <Popover placement="bottomRight" content={contentPopover} title="Sản phẩm mới thêm" trigger={["hover"]}>
            <Badge count={cartCount}>
              <ShoppingCartOutlined style={{ fontSize: 24, marginRight: 8, cursor: "pointer" }} />
            </Badge>
          </Popover>
        
        <Dropdown menu={{ items }} trigger={["click"]}>
          <div 
          onClick={() => { if (!user) navigation("/login"); }}
          style={{ display: "flex", alignItems: "center", cursor: "pointer", marginLeft: 40, width: 160 }}>
            <Avatar style={{ marginRight: 5 }} src={<img src={urlAvatar} alt="avatar" />} />
            <span>{user ? (user.role === "ADMIN" ? "Im' Admin" : "Im' User") : "Tài Khoản"}</span>
          </div>
        </Dropdown>
      </Header>
    )
}

export default AppHeader;