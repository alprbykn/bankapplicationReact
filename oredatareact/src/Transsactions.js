

import React, { useEffect, useState } from 'react';
import { Button, Table, Select } from 'antd';
import MakeTransaction from './components/MakeTransaction';
import axios from 'axios';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const Transactions = () => {
  const [data,setData] = useState([])
  const [resetRequired,setResetRequired] = useState(false)
  const [filterValues,setFilterValues] = useState(1)
  const [accounts,setAccounts] = useState(22)


  useEffect(()=>{
    axios.post("http://localhost:8081/api/accounts/search", filterValues).
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
  },[resetRequired])
  const columns = [
    {
      title:"operations",
      width:100,
      dataIndex: '',
      key: 'x',
      render: (v) =>
      <div style={{ display: 'flex', justifyContent: 'center' , alignItems: 'center' }}>
        <EditOutlined style={{ marginRight: '5px' }} />
        <DeleteOutlined style={{color:'red'}} onClick={()=>{
            axios.delete(`http://localhost:8081/api/accounts/${v.id}`).then(()=>{
              setResetRequired(!resetRequired)
            })
        }} />
      </div>
    },
    {
      title: 'from',
      dataIndex: 'from',
    },
    {
      title: 'to',
      dataIndex: 'to',
    },
    {
      title: 'amount',
      dataIndex: 'amount',
    },
    {
      title: 'transactionDate',
      dataIndex: 'transactionDate',
    },
    {
      title: 'status',
      dataIndex: 'status',
    },
  ];
  
  useEffect(()=>{ 
    axios.get(`http://localhost:8081/api/transactions/account/${filterValues}`).then((res)=>{
    if(res!==undefined){
      let tempData = []
      res.data.map((d)=>{
        let temp = {
          from:d.from.id,
          to:d.to.id,
          amount:d.amount
        }
        tempData.push(temp)
      })
      console.log("called")
      return setData(tempData)
    }
    })
  },[resetRequired,filterValues])

const onAccountSelect = (e) => {
  console.log(e)
  setFilterValues(e)
}


function triggerReset(){
  return setResetRequired(!resetRequired)
}
  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Select
    showSearch
    placeholder="Select an account"
    options={accounts}
    onChange={(e)=> onAccountSelect(e)}
    
  />
        <MakeTransaction reset={triggerReset}/>
  
        <span
          style={{
            marginLeft: 8,
          }}
        >
        </span>
      </div>
      <Table  columns={columns} dataSource={data} />
    </div>
  );
};
export default Transactions;