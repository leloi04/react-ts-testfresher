import { useState } from "react";
import type { FormProps } from 'antd';
import { Button, Divider, Form, Input, App } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import './register.scss';
import { registerAPI } from "services/api";

type FieldType = {
  fullName: string,
  email: string,
  password: string,
  phone: string,
};

const RegisterPage = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const { message } = App.useApp();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    
    setIsSubmit(true);
    const { fullName, email, password, phone } = values;
    const res = await registerAPI(fullName, email, password, phone);
    if (res.data) {
            message.success("Đăng ký user thành công!");
            navigate("/login");
        } else {
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
                      <h2 className="text text-large">Đăng Ký Tài Khoản</h2>
                      <Divider />
                  </div>
                    <Form
                      name="register-form"
                      onFinish={onFinish}
                      autoComplete="off"
                    >
                      <Form.Item<FieldType>
                        label="Username"
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item<FieldType>
                        label="Email"
                        name="email"
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

                      <Form.Item<FieldType>
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone!' }]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item label={null}>
                        <Button type="primary" htmlType="submit" loading={isSubmit}>
                          Đăng ký
                        </Button>
                        <Divider>Or</Divider>
                        <p style={{display: "flex", justifyContent: "center"}}>
                          Đã có tài khoản?
                          <span>
                              <Link to='/login' > Đăng Nhập </Link>
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

  export default RegisterPage;