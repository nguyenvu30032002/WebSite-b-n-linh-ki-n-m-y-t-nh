import axios from "axios";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { message } from "antd";

export default function AuthUser() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const secretKey  = process.env.REACT_APP_SECRET_KEY;
    const navigate = useNavigate();

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        return tokenString ? JSON.parse(tokenString) : null;
    }

    const getExpires_in = () => {
        const expires_inString = sessionStorage.getItem('expires_in');
        return expires_inString ? JSON.parse(expires_inString) : null; // Parse as a number
    }

    const [token, setToken] = useState(getToken());
    const [expires_in, setExpires_in] = useState(getExpires_in());

    const saveToken = (token) => {
        sessionStorage.setItem('token', JSON.stringify(token));
        setToken(token);
    }

    const saveExpiresIn = (expires_in) => {
        const currentTime = new Date().getTime();
        const expirationTime = currentTime + expires_in * 1000; // Tính toán thời gian hết hạn
        sessionStorage.setItem('expires_in', JSON.stringify(expires_in));
        sessionStorage.setItem('expiresAt', JSON.stringify(expirationTime)); // Lưu thời gian hết hạn
        setExpires_in(expires_in);
    }


    // Tạo instance Axios
    const http = axios.create({
        baseURL: apiUrl,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    //////////////////////////////////////////////////////

    
    const getUser = () => {
        const userString = sessionStorage.getItem('user');
        if (userString) {
            try {
                const decryptedBytes = CryptoJS.AES.decrypt(userString, secretKey);
                const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
                return decryptedData ? JSON.parse(decryptedData) : null; 
            } catch (error) {
                return null; 
            }
        }
        return null; 
   };

   const id = getUser().id
   const logoutUser = useCallback(async () => {
       
       try {
           
           const response = await axios.post(
               `${apiUrl}/logout/${id}`,
               {}, // Empty body, as you're just logging out
               {
                   headers: {
                       "Content-Type": "application/json",
                   }
               }
           );
           return response;
       } catch (error) {
           throw error;
       }
   }, [apiUrl, id]); // Add getUser as a dependency
   

   const logout = () => {
       logoutUser()
       sessionStorage.clear();
       navigate('/login');
   }
 
    const [user, setUser] = useState(getUser());
     const saveUser = (userData) => {
       const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(userData), secretKey).toString(); // Mã hóa
        sessionStorage.setItem('user', encryptedUser); 
        setUser(userData); 
        if(userData.role === 'User'){
            message.success('Đăng nhập thành công')
            setTimeout(() => {
                const redirectPath = localStorage.getItem('redirectAfterLogin') || '/'; 
                localStorage.removeItem('redirectAfterLogin');
                navigate(redirectPath);
            }, 500);
        }
        else{
            message.success('Đăng nhập thành công')
            setTimeout(() => {
                navigate('/administrator');
            }, 500);
        }
    };
 
//    const fetchUser = async () => {
//     if (token) {
//        try {
//            const response = await http.post('/me', {}, { 
//                headers: {
//                    "Authorization": `Bearer ${token}`
//                }
//            });
//            const userData = response.data;
//            if (userData) {
//                saveUser(userData);
//            }
//        } catch (err) {
//        }
//    }
//    };
 
//    useEffect(() => {
//      // Chỉ gọi fetchUser nếu chưa có thông tin người dùng
//      if (!user && token) {
//          fetchUser();
//    }
//    }, [token]);


    return {
        http,
        setToken: saveToken,
        token,
        getToken,
        logout,
        setExpires_in: saveExpiresIn,
        expires_in,
        getUser,
        setUser: saveUser,
        user
    }
}
