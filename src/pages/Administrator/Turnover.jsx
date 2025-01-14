import React, { useCallback, useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Wrapper } from './Turnover';
import { DatePicker } from 'antd';
import AdminService from '../../services/AdminService';

const Turnover = () => {
    const {SumTotalMoney, AmountProduct} = AdminService()
    const [search, setSearch] = useState('');
    const [sumTotalMoney, setSumTotalMoney] = useState([])
    const [amountProduct, setamountProduct] = useState([]);
    const onChange = (date, dateString) => {
        setSearch(dateString)
      };
//////////////////////////////////////////////////////////////////////////////////////////////////

const fetchSumTotalMoney = useCallback(async() => {
    try{
        const data = await SumTotalMoney(search)
        setSumTotalMoney(data)
    }
    catch(error){
        throw error
    }
},[SumTotalMoney, search])

useEffect(() => {
    if(search)
    {
        fetchSumTotalMoney()
    }
},[fetchSumTotalMoney,search])

const calculateTotalMoneyByMonth = (month) => {
    const totalMoney = sumTotalMoney
      .filter(item => new Date(item.created_at).getMonth() + 1 === month) // Kiểm tra tháng
      .reduce((total, item) => total + parseFloat(item.totalMoney), 0); // Tính tổng tiền
    return totalMoney; // Trả về số, không phải chuỗi
  };

const dataSumTotalMoney = [
    {
      name: 'Tháng 1',
      total_money: calculateTotalMoneyByMonth(1),
    },
    {
      name: 'Tháng 2',
      total_money: calculateTotalMoneyByMonth(2),
    },
    {
      name: 'Tháng 3',
      total_money: calculateTotalMoneyByMonth(3),
    },
    {
      name: 'Tháng 4',
      total_money: calculateTotalMoneyByMonth(4),
    },
    {
      name: 'Tháng 5',
      total_money: calculateTotalMoneyByMonth(5),
    },
    {
      name: 'Tháng 6',
      total_money: calculateTotalMoneyByMonth(6),
    },
    {
      name: 'Tháng 7',
      total_money: calculateTotalMoneyByMonth(7),
    },
    {
      name: 'Tháng 8',
      total_money: calculateTotalMoneyByMonth(8),
    },
    {
      name: 'Tháng 9',
      total_money: calculateTotalMoneyByMonth(9),
    },
    {
      name: 'Tháng 10',
      total_money: calculateTotalMoneyByMonth(10),
    },
    {
      name: 'Tháng 11',
      total_money: calculateTotalMoneyByMonth(11),
    },
    {
      name: 'Tháng 12',
      total_money: calculateTotalMoneyByMonth(12),
    },
  ];


/////////////////////////////////////////////////////////////////////////////////////////////////

const calculateOrderCountByMonth = (month) => {
    const orderCount = sumTotalMoney
      .filter(item => new Date(item.created_at).getMonth() + 1 === month) // Kiểm tra tháng
      .length; // Đếm số lượng đơn hàng sau khi lọc
    return orderCount; // Trả về số lượng đơn hàng
  };

    const dataSumOrder = [
        {
          name: 'Tháng 1',
          Amount: calculateOrderCountByMonth(1),
        },
        {
          name: 'Tháng 2',
          Amount: calculateOrderCountByMonth(2),
        },
        {
          name: 'Tháng 3',
          Amount: calculateOrderCountByMonth(3),
        },
        {
          name: 'Tháng 4',
          Amount: calculateOrderCountByMonth(4),
        },
        {
          name: 'Tháng 5',
          Amount: calculateOrderCountByMonth(5),
        },
        {
          name: 'Tháng 6',
          Amount: calculateOrderCountByMonth(6),
        },
        {
          name: 'Tháng 7',
          Amount: calculateOrderCountByMonth(7),
        },
        {
            name: 'Tháng 8',
            Amount: calculateOrderCountByMonth(8),
          },
          {
            name: 'Tháng 9',
            Amount: calculateOrderCountByMonth(9),
          },
          {
            name: 'Tháng 10',
            Amount: calculateOrderCountByMonth(10),
          },
          {
            name: 'Tháng 11',
            Amount: calculateOrderCountByMonth(11),
          },
          {
            name: 'Tháng 12',
            Amount: calculateOrderCountByMonth(12),
          },
      ];

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const fetchAmountProduct = useCallback(async() => {
        try{
            const data = await AmountProduct(search)
            setamountProduct(data)
        }
        catch(error){
            throw error
        }
    },[AmountProduct,search])
    useEffect(() => {
        if(search){
            fetchAmountProduct()
        }
    }, [fetchAmountProduct,search])

    const counts = {};

    // Duyệt qua các đơn hàng

    amountProduct.forEach((order) => {
        order.order_detail.forEach((detail) => {
          const { product_id, amount } = detail;
          const name = detail.created_by_product?.name || "Unknown"; // Lấy tên sản phẩm từ created_by_product
      
          // Nếu sản phẩm đã tồn tại, cộng số lượng
          if (counts[product_id]) {
            counts[product_id].amount += amount;
          } else {
            // Nếu chưa, khởi tạo với số lượng, tên sản phẩm và product_id
            counts[product_id] = { product_id, name, amount };
          }
        });
      });
    // Chuyển `counts` thành mảng
    const dataSumProduct = Object.values(counts);
    

const sortedData = dataSumProduct.sort((a, b) => b.amount - a.amount);

// Lấy 5 sản phẩm bán chạy nhất
const top5Products = sortedData.slice(0, 5);

const totalOrderDetails = amountProduct.reduce((total, order) => {
  return total + (order.order_detail?.length || 0);
}, 0);

// Chuyển đổi dữ liệu để phù hợp với dataProduct
const dataProduct = top5Products.map((product) => ({
  name: product.name,
  value: product.amount,
  amount:  totalOrderDetails,
}));

const CustomTooltip = ({ payload, label, active }) => {
  if (active && payload && payload.length) {
    const product = payload[0].payload;
 
    return (
      <div className="custom-tooltip" style={{backgroundColor: '#fff', maxWidth: '180px', border: '1px solid #ccc'}}>
        <p>{`Sản phẩm: ${product.name}`}</p>
        <p>{`Đã bán: ${product.value}/${totalOrderDetails}`}</p>
      </div>
    );
  }
  return null;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#63f059'];

const data = [
  {
    name: 'Mục tiêu',  // Thêm phần còn lại để hoàn thành 100%
    amount: 100,  // Phần còn lại của vòng tròn
    fill: '#c8ee55', // Màu của phần còn lại
  },
  {
    name: 'Đã bán',
    amount: totalOrderDetails,
    fill: '#63f059',
  },
  
];

const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};

///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Wrapper>
        <div className='divZero'>
            <DatePicker onChange={onChange} picker="year" />
        </div>
        <div className='divOne'>
            <div className='totalMoney'>
                <h3>Tổng doanh thu</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                    width={500}
                    height={300}
                    data={dataSumTotalMoney}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line name='Doanh thu' type="monotone" dataKey="total_money" stroke="#e31717" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className='sumOrder'>
                <ResponsiveContainer width="100%" height="100%">
                    <h3>Đơn hàng đã bán</h3>
                    <BarChart
                    width={500}
                    height={300}
                    data={dataSumOrder}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    {/* <YAxis ticks={[0, 25, 50, 75, 100]} /> */}
                    <YAxis/>
                    <Tooltip />
                    <Legend />
                    <Bar name='Số lượng' dataKey="Amount" stackId="a" fill="#4fdcf2" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
           
        </div>
        <div className='divTwo'>
            <div className='sumPayProduct'>
                <h3>Sản phẩm đã bán</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" barSize={50} data={data}>
                      <RadialBar
                        minAngle={15}
                        label={{ position: 'insideStart', fill: '#000000' }}
                        background
                        clockWise
                        dataKey="amount" // Chỉ định giá trị cần hiển thị (tỷ lệ phần trăm)
                      />
                      <Tooltip />
                      <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
                    </RadialBarChart>
                </ResponsiveContainer>
            </div>
            <div className='productPay'>
                <h3>Sản phẩm bán chạy</h3>
                <PieChart width={500} height={300} >
                  <Pie
                    data={dataProduct}
                    cx={250}
                    cy={140}
                    innerRadius={90}
                    outerRadius={120}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dataProduct.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </div>
        </div>
    </Wrapper>
  )
}

export default Turnover