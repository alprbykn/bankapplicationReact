import React, { useState } from 'react';
import AuthService from './AuthService';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import { Button, Checkbox, Form, Input } from 'antd';



const Login = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    AuthService.login(values.username, values.password).then(r=>{
      if (r) {
        navigate("/account")
        console.log(r)
        // Redirect or do something on successful login
      } else {
        // Handle login error
      }
    })
     
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
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
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item> 

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  );
};

export default Login;
