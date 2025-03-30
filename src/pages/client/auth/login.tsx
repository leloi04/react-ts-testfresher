import { useState } from "react";
import type { FormProps } from 'antd';
import { Button, Divider, Form, Input, App } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import './register.scss';
import { loginAPI } from "services/api";
import { useCurrentApp } from "@/components/context/app.context";

type FieldType = {
  username: string,
  password: string
};

const LoginPage = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const { message } = App.useApp();
  const navigate = useNavigate();
  const {isAuthenticated, setIsAuthenticated, setUser} = useCurrentApp();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    
    setIsSubmit(true);
    const {username, password } = values;
    const res = await loginAPI(username, password);
    if (res.data) {
      setIsAuthenticated(true);
      setUser((res as any).data.user);
            localStorage.setItem('access_token', (res as any).data.access_token);
            message.success("Đăng nhập thành công!");
            navigate("/");
        } else {
          setIsAuthenticated(false)
          message.error((res as any).message);
        }
    setIsSubmit(false);
  };
    return (
      <div className="register-page">
      <main className="main">
          <div className="container">
              <section className="wrapper">
                  <div className="heading">
                      <h2 className="text text-large">Đăng nhập Tài Khoản</h2>
                      <Divider />
                  </div>
                    <Form
                      name="register-form"
                      onFinish={onFinish}
                      autoComplete="off"
                    >
                      <Form.Item<FieldType>
                        label="Email"
                        name="username"
                        rules={[{ required: true, message: 'Please input your email!' },
                          {type: "email", message: "email khong dung dinh dang!"}
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' },]}
                      >
                        <Input.Password />
                      </Form.Item>

                      <Form.Item label={null}>
                        <Button type="primary" htmlType="submit" loading={isSubmit}>
                          Đăng nhập
                        </Button>
                        <Divider>Or</Divider>
                        <p style={{display: "flex", justifyContent: "center"}}>
                         Chưa có tài khoản?
                          <span>
                              <Link to='/register' > Đăng ký </Link>
                          </span>
                        </p>
                      </Form.Item>
                    </Form>
              </section>
          </div>
      </main>
      </div>
    )
  }

  export default LoginPage;