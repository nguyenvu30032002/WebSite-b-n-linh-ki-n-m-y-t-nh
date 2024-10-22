import { Button, Flex, Table } from 'antd';
import React, { useState } from 'react'
import AdminService from '../../services/AdminService';

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
      },
  ];

const UserPage = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const {users} = AdminService()
    const dataSource = users.map((user) => ({
      key: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone
    }));

    const start = () => {
      setLoading(true);
      // ajax request after empty completing
      setTimeout(() => {
        setSelectedRowKeys([]);
        setLoading(false);
      }, 1000);
    };
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
    <>
    <h1>User</h1>
    <Flex gap="middle" vertical>
      <Flex align="center" gap="middle">
        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Reload
        </Button>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex>
      <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} pagination={{ pageSize: 7 }} />
    </Flex>
    </>
  )
}

export default UserPage