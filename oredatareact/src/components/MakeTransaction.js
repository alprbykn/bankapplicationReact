import React, { useState,useEffect } from 'react';
import { Form, Input } from 'antd';
import axios from 'axios'
import { Button, Modal, Space , Select} from 'antd';
const MakeTransaction = ({reset}) => {
    const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [accounts,setAccounts] = useState(22)


  useEffect(()=>{
    axios.post("http://localhost:8081/api/accounts/search", {}).
    then((res)=>{
    if(res!==undefined){
      let tempArr = []
      res.data.map((d)=>{
        let json = {
          label:d.id,
          value:d.id,
          key:d.id
        }
        tempArr.push(json)
      })
      setAccounts(tempArr)
    }
    })
  },[])
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        console.log(values)
        let val = {
          to:{id:values.to},
          from:{id:values.from},
          amount:values.amount
        }
        return axios.post("http://localhost:8081/api/transactions/transfer", val)
      })
      .then((response) => {
        reset();
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
         Make Transaction
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
      label="from"
      name="from"
      rules={[
        {
          required: true,
          message: 'Please input account!',
        },
      ]}
    >
     <Select
    showSearch
    placeholder="Select an account"
    options={accounts}
    
  />
    </Form.Item>
    <Form.Item
      label="to"
      name="to"
      rules={[
        {
          required: true,
          message: 'Please input account!',
        },
      ]}
    >
     <Select
    showSearch
    placeholder="Select an account"
    options={accounts}
    
  />
    </Form.Item>


    <Form.Item
      label="amount"
      name="amount"
      rules={[
        {
          required: true,
          message: 'Please input your amount!',
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
export default MakeTransaction;