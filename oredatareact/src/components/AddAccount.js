import React, { useState } from 'react';
import { Form, Input } from 'antd';
import axios from 'axios'
import { Button, Modal, Space } from 'antd';
const App = ({reset}) => {
    const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        return axios.post("http://localhost:8081/api/accounts/create", values)
      })
      .then((response) => {
        reset();
        console.log(response.data, "resp");
      })
      .catch((error) => {
        console.error('Error occurred during form submission:', error);
      })
      .finally(() => {
      
        form.resetFields();
        setOpen(false);
      });
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Space>
        <Button type="primary" onClick={showModal}>
          Add Account
        </Button>
      </Space>
      <Modal
        open={open}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
        
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >

  <Form
  form={form}
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    autoComplete="off"
  >
    <Form.Item
      label="number"
      name="number"
      rules={[
        {
          required: true,
          message: 'Please input your number!',
        },
      ]}
    >
      <Input />
    </Form.Item>


    <Form.Item
      label="name"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input your name!',
        },
      ]}
    >
      <Input />
    </Form.Item>


    <Form.Item
      label="balance"
      label="balance"
      name="balance"
      rules={[
        {
          required: true,
          message: 'Please input your balance!',
        },
      ]}
    >
      <Input />
    </Form.Item>


   
  </Form>
      </Modal>
    </>
  );
};
export default App;