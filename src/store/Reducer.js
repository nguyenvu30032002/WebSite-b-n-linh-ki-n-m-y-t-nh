const initialState = {
    searchTerm: '',  // Khai báo giá trị mặc định cho searchTerm
};

// Reducer để xử lý các hành động
const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SEARCH_TERM':   // Kiểm tra xem action.type có phải là 'SET_SEARCH_TERM' không
            return {
                ...state,          // Giữ nguyên state cũ
                searchTerm: action.payload,   // Cập nhật giá trị tìm kiếm với payload từ action
            };
        default:
            return state;  // Nếu không phải 'SET_SEARCH_TERM', trả về state không thay đổi
    }
};

export default searchReducer;