import React, { useState } from 'react';
import { Form, Input } from 'antd';
import axios from 'axios'
import { Button, Modal, Space } from 'antd';
const FilterAccounts = ({reset,filter}) => {
    const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        return filter(values)
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
          Filter Accounts
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
      
    >
      <Input />
    </Form.Item>


    <Form.Item
      label="name"
      name="name"
      
    >
      <Input />
    </Form.Item>
   
  </Form>
      </Modal>
    </>
  );
};
export default FilterAccounts;