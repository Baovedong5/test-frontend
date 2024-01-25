import { Link, useNavigate } from "react-router-dom";
import style from "../../styles/client.module.scss";
import { FaReact } from "react-icons/fa";
import { useAppSelector } from "../../redux/hook";
import { Avatar, Dropdown, Space } from "antd";
import { DashOutlined, LogoutOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

const Header = () => {
  const navigate = useNavigate();

  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );

  const itemsDropdown: MenuProps["items"] = [
    {
      label: <Link to={"/admin"}>Trang quản trị</Link>,
      key: "admin",
      icon: <DashOutlined />,
    },
    {
      label: <label style={{ cursor: "pointer" }}>Đăng xuất</label>,
      key: "logout",
      icon: <LogoutOutlined />,
    },
  ];

  const user = useAppSelector((state) => state.account.user);
  return (
    <div className={style["header-section"]}>
      <div className={style["container"]}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className={style["brand"]}>
            <FaReact onClick={() => navigate("/")} title="logo" />
          </div>
          <div className={style["extra"]}>
            {isAuthenticated === false ? (
              <Link to={"/login"}>Đăng nhập</Link>
            ) : (
              <Dropdown menu={{ items: itemsDropdown }} trigger={["click"]}>
                <Space style={{ cursor: "pointer" }}>
                  <span>Welcome {user?.name}</span>
                  <Avatar>{user?.name.substring(0, 2)?.toUpperCase()}</Avatar>
                </Space>
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
