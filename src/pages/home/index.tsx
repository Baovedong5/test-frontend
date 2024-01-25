import { useEffect, useState } from "react";
import style from "../../styles/client.module.scss";
import { callListProduct } from "../../config/api";
import { Card, Col, Row } from "antd";
import { useAppSelector } from "../../redux/hook";
import { useNavigate } from "react-router-dom";

interface IProduct {
  _id: string;
  name: string;
  description: string;
  imgUrl: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

const HomePage = () => {
  const [listProduct, setListProduct] = useState<IProduct[]>([]);

  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const limit = 0;
    const page = 0;
    const res = await callListProduct(page, limit);
    //@ts-ignore
    setListProduct(res.data.data.result);
  };
  return (
    <div className={style["container"]} style={{ marginTop: "20px" }}>
      <Row gutter={[16, 16]}>
        {listProduct.map((item) => (
          <Col key={item._id} span={8}>
            <Card
              hoverable
              style={{ width: 240, padding: 0 }}
              cover={
                <img
                  alt="example"
                  src={`${import.meta.env.VITE_BACKEND_URL}/images/upload/${
                    item.imgUrl
                  }`}
                />
              }
            >
              <p style={{ fontSize: "18px", paddingRight: "10px" }}>
                {item.name}
              </p>
              {isAuthenticated === true ? (
                <span>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item?.price)}
                </span>
              ) : (
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/login")}
                >
                  Liên hệ
                </span>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomePage;
