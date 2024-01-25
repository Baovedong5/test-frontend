import { Button, Divider, Form, Input, message, notification } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../../styles/auth.module.scss";
import { callRegister } from "../../config/api";

interface IUser {
  name: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const navigate = useNavigate();

  const onFinish = async (values: IUser) => {
    const { name, email, password } = values;
    setIsSubmit(true);
    const res = await callRegister(name, email, password);
    setIsSubmit(false);
    if (res?.data?.data?._id) {
      message.success("Đăng ký tài khoản thành công !");
      navigate("/");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description:
          res.data.message && Array.isArray(res.data.message)
            ? res.data.message[0]
            : res.data.message,
        duration: 5,
      });
    }
  };

  return (
    <div className={style["register-page"]}>
      <main className={style.main}>
        <div className={style.container}>
          <section className={style.wrapper}>
            <div>
              <h2 className={`${style.text} ${style["text-large"]}`}>
                Đăng Ký Tài Khoản
              </h2>
              <Divider />
            </div>

            <Form name="basic" onFinish={onFinish} autoComplete="off">
              <Form.Item
                labelCol={{ span: 24 }}
                label="Họ tên"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Họ tên không được để trống",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Email không được để trống",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Mật khẩu không được để trống",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmit}>
                  Đăng Ký
                </Button>
              </Form.Item>
              <Divider>Or</Divider>
              <p className={`${style.text} ${style["text-normal"]}`}>
                Bạn đã có tài khoản ?
                <span style={{ marginLeft: "0.8rem" }}>
                  <Link to="/login">Đăng nhập</Link>
                </span>
              </p>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
