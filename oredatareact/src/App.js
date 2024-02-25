import React from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Login from './Login';
import AccountDetails from './AccountDetails';
import Transactions from './Transsactions';
import Registration from './Registration';
import { useAuth } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

const { Header, Content, Footer } = Layout;

function App() {

const { isAuthenticated, logout } = useAuth();

  return (
    <Router>
      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <div className="demo-logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            {isAuthenticated ? (
              <>
                <Menu.Item key="1">
                  <Link to="/account">Account</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/transactions">Transactions</Link>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item key="1">
                  <Link to="/login">Login</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/register">Register</Link>
                </Menu.Item>
              </>
            )}
          </Menu>
        </Header>
        <Content style={{ padding: '50px', minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<AccountDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/account" element={<AccountDetails />} />
            <Route path="/transactions" element={<Transactions />} />

          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
