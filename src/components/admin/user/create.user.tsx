import { createUser } from "@/services/api";
import { App, Divider, Form, FormProps, Input, message, Modal } from "antd";
import { useState } from "react";

interface IProps {
    openModal: boolean,
    setOpenModal: (v: boolean) => void,
    refreshTable: () => void
}

type FieldType = {
    fullName: string,
    email: string,
    password: string,
    phone: string,
}

const CreateUser = (props: IProps) => {
    const {openModal, refreshTable, setOpenModal} = props;
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const { message } = App.useApp();
    const [form] = Form.useForm();
    
      const handleCancel = () => {
        setOpenModal(false);
        form.resetFields();
      };

      const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const { fullName, email, password, phone } = values;
        setIsSubmit(true)
        const res = await createUser(fullName, email, password, phone);
        if (res.data) {
                message.success("Thêm mới user thành công!");
                form.resetFields();
                setOpenModal(false);
                refreshTable();
            } else {
              message.error((res as any).message);
            }
        setIsSubmit(false)
      };

    return (
        <>
          <Modal
            open={openModal}
            onOk={() => {
                form.submit();
            }}
            onCancel={handleCancel}
            confirmLoading={isSubmit}
          >
            <div className="heading">
                      <h2 className="text text-large">Thêm tài khoản user</h2>
                      <Divider />
                  </div>
                    <Form
                      form={form}
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
                    </Form>
          </Modal>
        </>
    )
}

export default CreateUser;