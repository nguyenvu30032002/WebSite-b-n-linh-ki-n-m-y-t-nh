import { Button, Flex, Table } from 'antd';
import React, { useState } from 'react'
import AdminService from '../../services/AdminService'

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Origin',
      dataIndex: 'origin',
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
      },
  ];

const ProductPage = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const {products} = AdminService()

    const dataSource = products.map((product) => ({
      key: product.id,
      name: product.name,
      type: product.productType,
      origin: product.origin,
      brand: product.brand
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
    <h1>Product</h1>
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


export default ProductPage