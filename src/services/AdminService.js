import axios from "axios";
import { useCallback} from "react";
import AuthUser from "./AuthUser";

export default function AdminService(){
    const apiUrl = process.env.REACT_APP_API_URL_ADMIN;
    const {token} = AuthUser();


///////////// ADMIN ///////////////////////////////////////

    const createAdmin = async(values) => {
        try{
            const response = await axios.post(`${apiUrl}/createAdmin`, 
            {
                email: values.email,
                password: values.password,
                name: values.name,
                phone: values.phone,
                gender: values.gender,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
            })
            return response;
        }

        catch(error){
            throw error
        }
    }

    const getAdmin = useCallback(async (value) => {
        try{
            const response = await axios.get(`${apiUrl}/getAdmin`, {
                params: { search: value },
                headers: {
                    "Content-Type": "application/json",
                },
            })
            return response.data
        }
        catch(error){
            throw error
        }
    }, [apiUrl])

    const updateAdmin = async(formData, id) => {
        try{
            const response = await axios.post(`${apiUrl}/updateRoleAdmin`,
                {
                    data: formData.role,
                    id: id
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` 
                    },
            });
            return response
        }
        catch(error){
            throw error
        }
    }

    const deleteAdmin = async(selectedRowKeys) =>{
        try{
            const response = await axios.delete(`${apiUrl}/deleteAdmin`,
                {    data: { selectedRowKeys }, 
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` 
                    },
                }
            )
            return response
        }
        catch(error){
            throw error
        }
    }

//////////////////////////////////// USER ////////////////////////////

const getUser = useCallback(async (value) => {
    try{
        const response = await axios.get(`${apiUrl}/getUser`, {
            params: { search: value },
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response.data
    }
    catch(error){
        throw error
    }
}, [apiUrl])

const updateUser = async(formData, id) => {
    try{
        const response = await axios.post(`${apiUrl}/updateRoleUser`,
            {
                data: formData.role,
                id: id
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
        });
        return response
    }
    catch(error){
        throw error
    }
}

const deleteUser = async(selectedRowKeys) =>{
    try{
        const response = await axios.delete(`${apiUrl}/deleteUser`,
            {    data: { selectedRowKeys }, 
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
            }
        )
        return response
    }
    catch(error){
        throw error
    }
}

////////////////////// PRODUCT ///////////////////////////////

const createProduct = async(formData) => {
    try{
        const response = await axios.post(`${apiUrl}/createProduct`, 
        {
               nameProduct: formData.nameProduct,
               brand: formData.brand,
               description: formData.description,
               discount: formData.discount,
               image: formData.img,
               inventory: formData.inventory,
               origin: formData.origin,
               price: formData.price,
               productType: formData.productType,              
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
        })
        return response;
    }

    catch(error){
        throw error
    }
}

const getProduct = useCallback(async (value) => {
    try{
        const response = await axios.get(`${apiUrl}/getProduct`, {
            params: { search: value },
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response.data
    }
    catch(error){
        throw error
    }
}, [apiUrl])

const updateProduct = async(selectedProduct) => {
    try{
        const response = await axios.post(`${apiUrl}/updateProduct`,
            {
                id: selectedProduct.key,
                name: selectedProduct.name,
                productType: selectedProduct.productType,
                description: selectedProduct.description,
                price: selectedProduct.price,
                inventory: selectedProduct.inventory,
                origin: selectedProduct.origin,
                brand: selectedProduct.brand,
                image: selectedProduct.image,
                discount: selectedProduct.discount,
                variant: selectedProduct.variant
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
        });
        return response
    }
    catch(error){
        throw error
    }
}

const deleteProduct = async(selectedRowKeys) =>{
    try{
        const response = await axios.delete(`${apiUrl}/deleteProduct`,
            {    data: { selectedRowKeys }, 
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
            }
        )
        return response
    }
    catch(error){
        throw error
    }
}



////////////////////////// CATWGORIES ////////////////////

const createCategory = async(values, admin_id) => {
    try{
        const response = await axios.post(`${apiUrl}/createCategory`, 
        {
            name: values.name,
            admin_id: admin_id
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
        })
        return response;
    }

    catch(error){
        throw error
    }
}

const getCategories = useCallback(async (value) => {
    try{
        const response = await axios.get(`${apiUrl}/getCategories`, {
            params: { search: value },
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response.data
    }
    catch(error){
        throw error
    }
}, [apiUrl])

const updateCategory = async(data,id, admin_id) => {
    try{
        const response = await axios.post(`${apiUrl}/updateCategory`,
            {
                name: data,
                id: id,
                admin_id: admin_id
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
        });
        return response
    }
    catch(error){
        throw error
    }
}

const deleteCategories = async(selectedRowKeys) =>{
    try{
        const response = await axios.delete(`${apiUrl}/deleteCategories`,
            {    data: { selectedRowKeys }, 
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
            }
        )
        return response
    }
    catch(error){
        throw error
    }
}

///////////////////////// ORDER ///////////////////////////


    const getAllOrder = useCallback(async () => {
        try {
            const response = await axios.get(`${apiUrl}/getOrder`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }, [apiUrl]);



    const updateOrder = async(condition, id) => {
        try{
            const response = await axios.post(`${apiUrl}/updateOrder`, 
                {
                    id: id,
                    condition: condition
                },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
           return response
        }
        catch(error){
            throw error
        }
    }

///////////////////////////////// SUPPLIERS //////////////////////////////////////////

const createSuppliers = async(values, admin_id) => {
    try{
        const response = await axios.post(`${apiUrl}/createSuppliers`, 
        {
            name: values.name,
            address: values.address,
            admin_id: admin_id
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
        })
        return response;
    }

    catch(error){
        throw error
    }
}

const getSuppliers = useCallback(async (value) => {
    try{
        const response = await axios.get(`${apiUrl}/getSuppliers`, {
            params: { search: value },
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response.data
    }
    catch(error){
        throw error
    }
}, [apiUrl])

const updateSuppliers = async(data,id, admin_id) => {
    try{
        const response = await axios.post(`${apiUrl}/updateSuppliers`,
            {
                name: data.name,
                address: data.address,
                id: id,
                admin_id: admin_id
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
        });
        return response
    }
    catch(error){
        throw error
    }
}

const deleteSuppliers = async(selectedRowKeys) =>{
    try{
        const response = await axios.delete(`${apiUrl}/deleteSuppliers`,
            {    data: { selectedRowKeys }, 
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
            }
        )
        return response
    }
    catch(error){
        throw error
    }
}

//////////////////////////////// VARIANTS /////////////////////////////////////////////

const createVariants = async(values, admin_id) => {
    try{
        const response = await axios.post(`${apiUrl}/createVariants`, 
        {
            name: values.name,
            product_id: values.product_id,
            admin_id: admin_id,
            price: values.price
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
        })
        return response;
    }

    catch(error){
        throw error
    }
}

const getVariants = useCallback(async (value) => {
    try{
        const response = await axios.get(`${apiUrl}/getVariants`, {
            params: { search: value },
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response.data
    }
    catch(error){
        throw error
    }
}, [apiUrl])

const updateVariants= async(data, admin_id) => {
    try{
        console.log(data)
        // const response = await axios.post(`${apiUrl}/updateVariants`,
        //     {
        //         id: data.key,
        //         name: data.name,
        //         categories_id: data.created_by_Category,
        //         admin_id: admin_id
        //     },
        //     {
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Authorization": `Bearer ${token}` 
        //         },
        // });
        // return response
    }
    catch(error){
        throw error
    }
}

const deleteVariants = async(selectedRowKeys) =>{
    try{
        const response = await axios.delete(`${apiUrl}/deleteVariants`,
            {    data: { selectedRowKeys }, 
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
            }
        )
        return response
    }
    catch(error){
        throw error
    }
}

///////////////////////////////////////////// GET MESSAGE USER ////////////////////////////////////////////////////////////////

const getMessageUser = useCallback(async() => {
    try{
        const response = await axios.get(`${apiUrl}/getMessageUser`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
            })
        return response.data
    }
    catch(error){
        throw error
    }
},[token,apiUrl])

const getUserMessage = useCallback(async(id) => {
    try{
      const response = await axios.get(`${apiUrl}/getUserMessage/${id}`,
        {
          
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          }
        })
        return response.data
    }catch(error)
    {
      throw error
    }
  }, [apiUrl,token])

  const readMessage = useCallback(async(id) => {
    try{
      const response = await axios.get(`${apiUrl}/readMessage/${id}`,
        {
          
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          }
        })
        return response
    }
    catch(error){
      throw error
    }
  },[apiUrl, token])

  const sendMessageAdmin = useCallback(async(data) => {
    try{
      const response = await axios.post(`${apiUrl}/sendMessage`,
        data,
        {
          
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          }
        })
        return response
    }
    catch(error){
      throw error
    }
  }, [apiUrl,token])

  const notReadMessage = useCallback(async() => {
    try{
      const response = await axios.get(`${apiUrl}/notReadMessage`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          }
        })
        return response.data
    }
    catch(error){
      throw error
    }
  },[apiUrl, token])

 /////////////////////////////////////////////// Turnover ////////////////////////////////////////////////
 
 const SumTotalMoney = useCallback(async(search) => {
    try{
        const response = await axios.get(`${apiUrl}/SumTotalMoney`,
            {
                params: { search },
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}` 
                }
              })
        return response.data      
    }
    catch(error){
        throw error
    }
 },[apiUrl,token])

 const AmountProduct = useCallback(async(search) => {
    try{
        const response = await axios.get(`${apiUrl}/AmountProduct`,
            {
                params: { search },
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}` 
                }
              })
        return response.data      
    }
    catch(error){
        throw error
    }
 },[apiUrl,token])


    return{
        createAdmin,
        getAdmin,
        updateAdmin,
        deleteAdmin,
        getUser,
        updateUser,
        deleteUser,
        createProduct,
        getProduct,
        updateProduct,
        deleteProduct,
        createCategory,
        getCategories,
        updateCategory,
        deleteCategories,
        updateOrder,
        getAllOrder,
        createSuppliers,
        getSuppliers,
        updateSuppliers,
        deleteSuppliers,
        createVariants,
        getVariants,
        updateVariants,
        deleteVariants,
        getMessageUser,
        getUserMessage,
        readMessage,
        sendMessageAdmin,
        notReadMessage,
        SumTotalMoney,
        AmountProduct
    }
}