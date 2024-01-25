import { Button, Divider, Form, Input, message, notification } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../../styles/auth.module.scss";
import { callLogin } from "../../config/api";
import { useAppDispatch } from "../../redux/hook";
import { setUserLoginInfo } from "../../redux/slice/accountSlice";

interface IValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish = async (values: IValues) => {
    const { email, password } = values;
    setIsSubmit(true);
    const res = await callLogin(email, password);
    setIsSubmit(false);
    if (res?.data?.data) {
      message.success("Đăng nhập thành công");

      //@ts-ignore
      dispatch(setUserLoginInfo(res.data.data.user));
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
    <div className={style["login-page"]}>
      <main className={style.main}>
        <div className={style.container}>
          <section className={style.wrapper}>
            <div>
              <h2 className={`${style.text} ${style["text-large"]}`}>
                Đăng Nhập
              </h2>
              <Divider />
            </div>

            <Form name="basic" onFinish={onFinish} autoComplete="off">
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
                  Đăng nhập
                </Button>
              </Form.Item>
              <Divider>Or</Divider>
              <p className={`${style.text} ${style["text-normal"]}`}>
                Chưa có tài khoản ?
                <span style={{ marginLeft: "0.8rem" }}>
                  <Link to="/register">Đăng Ký</Link>
                </span>
              </p>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
