import React, { useState } from 'react'
import AdminService from '../../services/AdminService'
import { Button, Flex, Table } from 'antd';

const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    
  ];

const CategoriesPage = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const {categories} = AdminService()
    const dataSource = categories.map((categorie) => ({
      key: categorie.id,
      id: categorie.id,
      name: categorie.name,
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
    <h1>Categoris</h1>
    <Flex gap="middle" vertical>
      <Flex align="center" gap="middle">
        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Reload
        </Button>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex>
      <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} pagination={{ pageSize: 5 }} />
    </Flex>
    </>
  )
}


export default CategoriesPage