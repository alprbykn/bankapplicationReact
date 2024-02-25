

import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import AddAccount from './components/AddAccount';
import axios from 'axios';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import FilterAccounts from './components/FilterAccounts';
import EditAccount from './components/EditAccount';

const AccountDetails = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data,setData] = useState([])
  const [resetRequired,setResetRequired] = useState(false)
  const [filterValues,setFilterValues] = useState({})
  const columns = [
    {
      title:"operations",
      width:100,
      dataIndex: '',
      key: 'x',
      render: (v) =>
      <div style={{ display: 'flex', justifyContent: 'center' , alignItems: 'center' }}>
       <EditAccount data = {v} reset = {triggerReset}/>
        <DeleteOutlined style={{color:'red'}} onClick={()=>{
            axios.delete(`http://localhost:8081/api/accounts/${v.id}`).then(()=>{
              setResetRequired(!resetRequired)
            })
        }} />
      </div>
    },
    {
      title: 'number',
      dataIndex: 'number',
    },
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'balance',
      dataIndex: 'balance',
    },
  ];
  
  useEffect(()=>{
    console.log("triggered with", filterValues)
    axios.post("http://localhost:8081/api/accounts/search", null, { params: filterValues})
    .then((res)=>{
    if(res!==undefined){

      setData(res.data)
    }
    })
  },[resetRequired,filterValues])

function triggerReset(){
  return setResetRequired(!resetRequired)
}

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <AddAccount reset={triggerReset}/>
        <FilterAccounts reset={triggerReset} filter={setFilterValues}/>
       
      </div>
      <Table  columns={columns} dataSource={data} />
    </div>
  );
};
export default AccountDetails;