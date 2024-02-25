import React, { useState } from 'react';
import { Form, Input, InputNumber } from 'antd';
import axios from 'axios'
import { Button, Modal, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
const EditAccount = ({data,reset}) => {
    const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        axios.put(`http://localhost:8081/api/accounts/${data.id}`, values)
        reset()
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
          <EditOutlined  onClick={showModal}/>
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
      name:data.name,
      number:data.number,
      balance:data.balance
    }}
    autoComplete="off"
  >
    <Form.Item
      label="number"
      name="number"
      
    >
      <Input />
    </Form.Item>


    <Form.Item
      label="name"
      name="name"
      
    >
      <Input />
    </Form.Item>
    
    <Form.Item
      label="balance"
      name="balance"
      
    >
      <InputNumber />
    </Form.Item>
   
  </Form>
      </Modal>
    </>
  );
};
export default EditAccount;