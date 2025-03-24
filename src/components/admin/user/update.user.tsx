import { updateUserAPI } from "@/services/api";
import { App, Button, Divider, Form, FormProps, Input, Modal } from "antd";
import { useEffect, useState } from "react";

interface IProps {
    openModalUpdate: boolean,
    setOpenModalUpdate: (v: boolean) => void,
    refreshTable: () => void,
    dataUser: IUserModal | null,
    setDataUser: (v: IUserModal | null) => void
}

type FieldType = {
    _id: string,
    fullName: string,
    email: string,
    phone: string,
}

const UpdateUser = (props: IProps) => {
    const {openModalUpdate, refreshTable, setOpenModalUpdate, dataUser, setDataUser} = props;
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const { message } = App.useApp();
    const [form] = Form.useForm();
      const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const { _id, fullName ,phone } = values;
        setIsSubmit(true)
        const res = await updateUserAPI(_id, fullName, phone);
        if (res.data) {
                message.success("Cập nhật user thành công!");
                setOpenModalUpdate(false);
                refreshTable();
            } else {
              message.error((res as any).message);
            }
        setIsSubmit(false)
      };

    useEffect(() => {
        form.setFieldsValue({
            _id: dataUser?._id,
            email: dataUser?.email,
            fullName: dataUser?.fullName,
            phone: dataUser?.phone
        })
    }, [dataUser])

    return (
        <>
         <Modal
            open={openModalUpdate}
            footer={[
                <Button onClick={() => {
                    setOpenModalUpdate(false)
                }} type="primary">
                    Hủy
                </Button>,
                <Button onClick={() => 
                    form.submit()
                } type="primary">
                    Cập nhật
                </Button>
                ]}
            confirmLoading={isSubmit}
          >
            <div className="heading">
                      <h2 className="text text-large">Cập nhật thông tin user</h2>
                      <Divider />
                  </div>

                    <Form
                      form={form}
                      name="register-form"
                      onFinish={onFinish}
                      autoComplete="off"
                    >
                      <Form.Item<FieldType>
                        label="ID"
                        name="_id"
                        hidden
                      >
                        <Input disabled/>
                      </Form.Item>

                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                      >
                        <Input disabled/>
                      </Form.Item>

                      <Form.Item<FieldType>
                        label="Username"
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                      >
                        <Input />
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

export default UpdateUser;