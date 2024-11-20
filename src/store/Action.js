// Action để cập nhật giá trị tìm kiếm (searchTerm)
export const setSearchTerm = (value) => ({
    type: 'SET_SEARCH_TERM',   // Tên hành động, giúp Redux biết bạn muốn làm gì
    payload: value,            // Dữ liệu bạn muốn cập nhật vào store (ở đây là giá trị tìm kiếm)
});