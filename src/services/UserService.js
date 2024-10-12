import AuthUser from "./AuthUser";
import axios from "axios";
import { message } from "antd";

export default function UserService() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const {token} = AuthUser();
    
    const userOrder = async(order) => {
        try {
            console.log('Order data being sent: ', order);
            const response = await axios.post(
                `${apiUrl}/order`, 
                order, // Gửi dữ liệu order
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` // Đính kèm token vào header
                    }
                }
            );
            message.success('Đặt hàng thành công')
            return response;
            
        } catch (err) {
            message.error(<>Đặt hàng thất bại <br />Vui lòng thử lại</>)
            throw err
            
        }
    }




    return {
      userOrder
    };
}
