
const initialState = {
    searchTerm: '',  // Khai báo giá trị mặc định cho searchTerm
    // carts: [],
    product: '',
};

// Reducer để xử lý các hành động
const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SEARCH_TERM':   // Kiểm tra xem action.type có phải là 'SET_SEARCH_TERM' không
            return {
                ...state,          // Giữ nguyên state cũ
                searchTerm: action.payload,   // Cập nhật giá trị tìm kiếm với payload từ action
            };
        // case 'SET_CARTS':  
        //     return {
        //         ...state,
        //         carts: action.payload,
        // }; 
        case 'ID_PRODUCT':
            return{
                ...state,
                product:action.payload
            }   
        default:
            return state;
    }
};

export default searchReducer;